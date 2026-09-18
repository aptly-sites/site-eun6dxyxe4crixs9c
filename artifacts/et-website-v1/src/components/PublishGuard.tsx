import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import NotFound from "@/pages/not-found";
import {
  checkPageAccess,
  parseCookieHeader,
  pagesConfig,
} from "@/lib/pagesConfig";

/**
 * Client-side guard for the draft/published flag.
 *
 * During SSR (and the first client render to keep hydration stable) the
 * guard always passes through. Immediately after mount, it checks the
 * current location against `pages.config.json` and either renders the
 * regular Router or substitutes <NotFound /> in place of it.
 *
 * Server-side enforcement (dev Express middleware + Vercel Edge
 * middleware) also returns a real 404 status code so crawlers/SEO
 * see a 404 instead of a 200. The client guard exists for SPA
 * navigations after the initial load.
 */
export function PublishGuard({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const previewQuery = url.searchParams.get("preview");
    const cookies = parseCookieHeader(document.cookie);
    const cookieValue = cookies[pagesConfig.previewCookieName] ?? null;

    const result = checkPageAccess({
      pathname: location,
      hostname: window.location.hostname,
      cookieValue,
      previewQuery,
    });

    if (result.cookieAction === "set") {
      document.cookie = `${pagesConfig.previewCookieName}=1; path=/; max-age=${pagesConfig.previewCookieMaxAgeSec}; samesite=lax`;
    } else if (result.cookieAction === "clear") {
      document.cookie = `${pagesConfig.previewCookieName}=; path=/; max-age=0; samesite=lax`;
    }

    setAllowed(result.allowed);
  }, [location]);

  if (!allowed) return <NotFound />;
  return <>{children}</>;
}
