/**
 * Single source of truth for the site's absolute base URL.
 *
 * Every absolute URL on the site — canonical, og:url, og:image, twitter
 * image, and all JSON-LD schema URLs (BreadcrumbList items, LocalBusiness /
 * Organization / Service `url`, etc.) — is built from this constant, so the
 * production domain lives in exactly one place.
 *
 * Override per environment with the VITE_SITE_URL build-time variable; it
 * defaults to the production domain so a build with no env configured still
 * ships correct absolute URLs. Any trailing slash is stripped so callers can
 * safely concatenate `${SITE_URL}${path}`.
 */
export const SITE_URL = (
  (import.meta.env?.VITE_SITE_URL as string | undefined) ?? "https://www.equityteam.com"
).replace(/\/$/, "");
