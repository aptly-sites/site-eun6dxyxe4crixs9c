---
name: ET site absolute-URL SSOT
description: How EquityTeam builds absolute URLs (canonical/og/schema/sitemap) from one source, and why the default lives in code not env.
---

# Absolute-URL single source of truth

All absolute URLs on the EquityTeam site (canonical, og:url, og:image, twitter:image,
every JSON-LD schema URL, and the sitemap) build from ONE value:
- Browser/SSR bundle: `SITE_URL` in `src/lib/siteUrl.ts` = `import.meta.env.VITE_SITE_URL ?? "https://www.equityteam.com"` (trailing slash stripped).
- Node scripts (e.g. `scripts/generate-sitemap.ts`): `process.env.VITE_SITE_URL ?? "https://www.equityteam.com"`. Node cannot read `import.meta.env`, so the two contexts read different globals but share the same default.

**Why the default is hardcoded to www (not just env):** the repo `.gitignore` (root) excludes all `.env`/`.env.*` files except `.env.example`. So no env file ships to the Vercel build, and a build with zero env config MUST still emit the correct production domain. `VITE_SITE_URL` is the override knob (set in the Vercel dashboard or `build-and-push.sh`) for pointing a build at a different host.

**How to apply:**
- Never hardcode `https://www.equityteam.com` or `https://pm.equityteam.com` for URL generation — import `SITE_URL` (or read `process.env` in Node) instead.
- og:image/twitter:image are absolutized centrally in `SEO.tsx` (`x.startsWith("http") ? x : SITE_URL + x`) so page code can pass relative image paths.
- Display image `<img src>` stay RELATIVE via `import.meta.env.BASE_URL` — do not absolutize those or dev/preview breaks.

**Intentional leftover `pm.equityteam.com` (do NOT change to www):** the publish-gate staging allowlist in `pages.config.json` (`stagingHosts`) and `middleware.js` (`STAGING_HOSTS`). These gate unpublished pages to a 404 except on staging hosts; adding www would defeat the gate.
