/* ────────────────────────────────────────────────────────────
   Vercel Edge Middleware — draft/published gate.

   Plain JS on purpose. Vercel's standalone tsc pass on
   middleware.ts kept failing with "Emit skipped" even when the
   file had no cross-file or JSON imports. Shipping as .js
   bypasses that step entirely.

   ⚠️  KEEP IN SYNC with ./pages.config.json (used by the client
        <PublishGuard> and dev Express middleware). Add/remove
        unpublished paths in BOTH places.

   Bypass mechanisms (any one is enough):
     • Hostname matches a stagingHosts entry
     • Cookie et_preview=1
     • ?preview=true   (also sets the cookie)
     • ?preview=false  (clears the cookie)
   ──────────────────────────────────────────────────────────── */

const STAGING_HOSTS = [
  "localhost",
  "127.0.0.1",
  "*.replit.dev",
  "*.repl.co",
  "*.vercel.app",
];

const PREVIEW_COOKIE_NAME = "et_preview";
const PREVIEW_COOKIE_MAX_AGE_SEC = 2592000;

/* Paths NOT yet public. Everything else defaults to published
   (so dynamic routes like /:location-property-management or
   /blog/:slug aren't blocked). */
const UNPUBLISHED_PATHS = new Set([
  "/co-living-management",
]);

export const config = {
  matcher: "/((?!_next|_vercel|api|.*\\..*).*)",
};

function normalize(p) {
  if (!p) return "/";
  const noQ = p.split("?")[0].split("#")[0];
  const trimmed = noQ.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function isStagingHost(hostname) {
  if (!hostname) return false;
  const h = hostname.toLowerCase().split(":")[0];
  for (const raw of STAGING_HOSTS) {
    const s = raw.toLowerCase();
    if (s.startsWith("*.")) {
      if (h.endsWith(s.slice(1))) return true;
    } else if (h === s) {
      return true;
    }
  }
  return false;
}

function isPathPublished(pathname) {
  return !UNPUBLISHED_PATHS.has(normalize(pathname));
}

function parseCookieHeader(header) {
  const out = {};
  if (!header) return out;
  for (const piece of header.split(";")) {
    const eq = piece.indexOf("=");
    if (eq < 0) continue;
    const k = piece.slice(0, eq).trim();
    const v = piece.slice(eq + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

function buildSetCookie(action) {
  if (action === "set") {
    return `${PREVIEW_COOKIE_NAME}=1; Path=/; Max-Age=${PREVIEW_COOKIE_MAX_AGE_SEC}; SameSite=Lax`;
  }
  return `${PREVIEW_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const cookies = parseCookieHeader(request.headers.get("cookie"));
  const cookieValue = cookies[PREVIEW_COOKIE_NAME] ?? null;
  const previewQuery = url.searchParams.get("preview");

  let cookieAction = "none";
  let previewActive = cookieValue === "1";
  if (previewQuery === "true" || previewQuery === "1") {
    previewActive = true;
    cookieAction = "set";
  } else if (previewQuery === "false" || previewQuery === "0") {
    previewActive = false;
    cookieAction = "clear";
  }

  const staging = isStagingHost(url.hostname);
  const allowed =
    previewActive || staging || isPathPublished(url.pathname);

  const setCookie = cookieAction === "none" ? null : buildSetCookie(cookieAction);

  if (allowed) {
    // Staging hosts (Vercel previews, *.vercel.app, local dev) serve the same
    // content as production, so they must never be indexed — otherwise Google
    // treats them as duplicate content competing with www.equityteam.com.
    // Only staging responses are rewritten; production stays a passthrough.
    if (!setCookie && !staging) return undefined;
    const passthrough = await fetch(request);
    const headers = new Headers(passthrough.headers);
    if (setCookie) headers.append("set-cookie", setCookie);
    if (staging) headers.set("x-robots-tag", "noindex, nofollow");
    return new Response(passthrough.body, {
      status: passthrough.status,
      statusText: passthrough.statusText,
      headers,
    });
  }

  // Blocked → return 404 with the SPA shell so the client-side
  // <PublishGuard> renders NotFound consistently.
  const shellUrl = new URL("/index.html", request.url);
  const shellRes = await fetch(shellUrl.toString());
  const shellBody = await shellRes.text();
  const headers = new Headers();
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("x-publish-status", "blocked");
  headers.set("cache-control", "no-store");
  if (setCookie) headers.append("set-cookie", setCookie);
  return new Response(shellBody, { status: 404, headers });
}
