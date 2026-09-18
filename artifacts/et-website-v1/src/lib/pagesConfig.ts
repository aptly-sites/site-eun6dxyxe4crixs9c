/* ────────────────────────────────────────────────────────────
   Draft/published gate for the site.

   Single source of truth: ../../pages.config.json

   Used by:
     • src/components/PublishGuard.tsx  (client-side, post-hydration)
     • ../../server.ts                  (dev Express middleware)
     • ../../middleware.ts              (Vercel Edge Middleware)

   Bypass mechanisms (any one is enough):
     1. Request hostname matches a `stagingHosts` entry
        (supports `*.suffix` wildcards).
     2. Cookie `et_preview=1` is present.
     3. Query string includes `?preview=true` (also sets the cookie).
     `?preview=false` clears the cookie.
   ──────────────────────────────────────────────────────────── */

import rawConfig from "../../pages.config.json";

export interface PageEntry {
  path: string;
  published: boolean;
}

export interface PagesConfig {
  stagingHosts: string[];
  previewCookieName: string;
  previewCookieMaxAgeSec: number;
  pages: PageEntry[];
}

export const pagesConfig: PagesConfig = {
  stagingHosts: (rawConfig as any).stagingHosts ?? [],
  previewCookieName: (rawConfig as any).previewCookieName ?? "et_preview",
  previewCookieMaxAgeSec: (rawConfig as any).previewCookieMaxAgeSec ?? 2592000,
  pages: (rawConfig as any).pages ?? [],
};

function normalize(p: string): string {
  if (!p) return "/";
  // strip query/hash
  const noQ = p.split("?")[0].split("#")[0];
  // strip trailing slash (except root)
  const trimmed = noQ.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function isStagingHost(hostname: string | null | undefined): boolean {
  if (!hostname) return false;
  const h = hostname.toLowerCase().split(":")[0];
  return pagesConfig.stagingHosts.some((raw) => {
    const s = raw.toLowerCase();
    if (s.startsWith("*.")) {
      const suffix = s.slice(1); // ".replit.dev"
      return h.endsWith(suffix);
    }
    return h === s;
  });
}

/**
 * Returns whether the given path is publicly published.
 * Paths not present in the config default to `true` (so dynamic
 * routes such as /blog/:slug or /:area-property-management are
 * not blocked unless explicitly listed).
 */
export function isPathPublished(pathname: string): boolean {
  const target = normalize(pathname);
  const entry = pagesConfig.pages.find((p) => normalize(p.path) === target);
  return entry ? entry.published : true;
}

export type CookieAction = "set" | "clear" | "none";

export interface AccessCheckInput {
  pathname: string;
  hostname?: string | null;
  /** Raw value of the preview cookie, if any. */
  cookieValue?: string | null;
  /** Raw value of the `?preview=` query param, if any. */
  previewQuery?: string | null;
}

export interface AccessCheckResult {
  allowed: boolean;
  /** What the caller should do with the preview cookie. */
  cookieAction: CookieAction;
  /** Why the request was allowed (or blocked) — useful for headers/logs. */
  reason: "preview-query" | "preview-cookie" | "staging-host" | "published" | "unpublished";
}

export function checkPageAccess(input: AccessCheckInput): AccessCheckResult {
  const { pathname, hostname, cookieValue, previewQuery } = input;

  let cookieAction: CookieAction = "none";
  let previewActive = cookieValue === "1";

  if (previewQuery === "true" || previewQuery === "1") {
    previewActive = true;
    cookieAction = "set";
  } else if (previewQuery === "false" || previewQuery === "0") {
    previewActive = false;
    cookieAction = "clear";
  }

  if (previewActive) {
    return {
      allowed: true,
      cookieAction,
      reason: previewQuery ? "preview-query" : "preview-cookie",
    };
  }
  if (isStagingHost(hostname)) {
    return { allowed: true, cookieAction, reason: "staging-host" };
  }
  if (isPathPublished(pathname)) {
    return { allowed: true, cookieAction, reason: "published" };
  }
  return { allowed: false, cookieAction, reason: "unpublished" };
}

/** Tiny cookie-string parser usable in browser, Node, and edge runtimes. */
export function parseCookieHeader(header: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  header.split(";").forEach((piece) => {
    const eq = piece.indexOf("=");
    if (eq < 0) return;
    const k = piece.slice(0, eq).trim();
    const v = piece.slice(eq + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  });
  return out;
}

/** Build a Set-Cookie header value for the preview cookie. */
export function buildPreviewSetCookie(action: CookieAction): string | null {
  if (action === "none") return null;
  const name = pagesConfig.previewCookieName;
  if (action === "set") {
    return `${name}=1; Path=/; Max-Age=${pagesConfig.previewCookieMaxAgeSec}; SameSite=Lax`;
  }
  return `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}
