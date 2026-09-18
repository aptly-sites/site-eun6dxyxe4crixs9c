/* ────────────────────────────────────────────────────────────
   Single source of truth for which routes get prerendered to
   static HTML at build time (scripts/prerender.ts consumes this
   via the SSR bundle).

   This module is imported into the Vite-built SSR bundle (it is
   re-exported from entry-server.tsx), so `import.meta.env` and the
   `@/` aliases resolve exactly as they do in the running app — the
   prerender script reads the result from dist/server.

   The location routes are derived programmatically from the same
   data sources the router maps over, so when a new location page is
   added to that data, it gets prerendered automatically with no
   edit to this file or to prerender.ts:
     - Community pages  → COMMUNITY_PAGES (communityData.ts), canonical
                          at /locations/{region}/{slug}
     - LocationPages    → REGION_SLUGS (locationRegistry.ts), at
                          /{slug}-property-management

   Excluded on purpose (see getExcludedRouteNotes for the rationale):
     - Pure redirects (e.g. /jobs → /careers, /pricing, /locations)
     - The Norris Lake region (its only page redirects off-site)
     - The /{slug}-property-management legacy redirects for slugs that
       are community pages (we prerender the canonical URL instead)
     - Genuinely dynamic routes with no fixed list (/blog/:slug,
       /residential-property-management/equityteam-vs-:competitor)
   ──────────────────────────────────────────────────────────── */

import { COMMUNITY_PAGES } from "@/data/communityData";
import { REGION_SLUGS, buildLocationUrl, type RegionId } from "@/data/locationRegistry";

/**
 * Static routes that render a fixed page component. These are explicit because
 * there is no data array to map over. Each must be a real, content-rendering
 * route (not a redirect).
 *
 * Note: /hoa-management, /co-living-management and /commercial-management are
 * currently marked published:false in pages.config.json — they are prerendered
 * here so the static HTML is ready, but the Vercel Edge middleware will keep
 * returning 404 for them until they are flipped to published:true.
 */
const STATIC_ROUTES: string[] = [
  // Primary
  "/",
  "/about-us",
  "/areas-we-serve",

  // Service lines
  "/residential-property-management",
  "/vacation-rental-management",
  "/property-services",
  "/real-estate-brokerage",
  "/hoa-management",
  "/co-living-management",
  "/commercial-property-management",

  // Resource Center (hub + per-audience pages)
  "/resources",
  "/resources/residential-owners",
  "/resources/commercial-owners",
  "/resources/vacation-rental-owners",
  "/resources/hoa-boards",
  "/resources/residential-tenants",
  "/resources/commercial-tenants",
  "/resources/vacation-rental-guests",
  "/resources/hoa-homeowners",
  "/resources/property-services",

  // Conversion / engagement
  "/contact-us",
  "/free-rental-analysis",
  "/for-rent",
  "/for-sale",
  "/careers",
  "/feedback",
  "/vendors",
  "/portal-logins",
  "/realtor-referral-program",

  // Owner tools / calculators
  "/tools/rent-vs-sell",
  "/tools/rent-affordability",
  "/tools/pm-fee-roi",
  "/tools/1031-exchange",
  "/tools/eviction-cost",
  "/tools/vacancy-cost",
  "/tools/str-vs-ltr",

  // Content hubs (post/detail pages stay dynamic via the SPA fallback)
  "/blog",

  // Legal / policy
  "/terms-and-conditions",
  "/accessibility",
  "/privacy-policy",
  "/sitemap",
  "/real-estate-investing-and-tax-disclosure",
  "/email-confidentiality-disclosure",
];

/** Every community page's canonical URL, e.g. /locations/cincinnati/blue-ash. */
export function getCommunityRoutes(): string[] {
  return COMMUNITY_PAGES.map((cfg) => cfg.urlPath);
}

/**
 * Every LocationPage route, e.g. /kettering-property-management. Skips the
 * Norris Lake region (off-site redirect) and any slug that is also a community
 * page (its /{slug}-property-management URL only redirects to the canonical
 * /locations/{region}/{slug}, which getCommunityRoutes already covers).
 */
export function getLocationPageRoutes(): string[] {
  const communitySlugs = new Set(COMMUNITY_PAGES.map((cfg) => cfg.slug));
  const out: string[] = [];
  for (const rid of Object.keys(REGION_SLUGS) as RegionId[]) {
    if (rid === "norris-lake") continue; // only page is an external redirect
    for (const slug of REGION_SLUGS[rid]) {
      if (communitySlugs.has(slug)) continue; // canonical handled as a community page
      out.push(buildLocationUrl(slug));
    }
  }
  return out;
}

/** The full, de-duplicated, ordered list of routes to prerender. */
export function getPrerenderRoutes(): string[] {
  const routes = new Set<string>();
  for (const r of STATIC_ROUTES) routes.add(r);
  for (const r of getCommunityRoutes()) routes.add(r);
  for (const r of getLocationPageRoutes()) routes.add(r);
  return [...routes];
}
