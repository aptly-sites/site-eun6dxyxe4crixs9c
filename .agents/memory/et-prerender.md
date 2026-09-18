---
name: ET website prerender / SSG
description: How EquityTeam (artifacts/et-website-v1) prerenders pages and the non-obvious traps when changing the route list.
---

# EquityTeam SSG / prerender

The site is a Vite React SPA with **hand-rolled** static prerendering (no SSG lib).
`pnpm build` = `vite build` (client) + `vite build --ssr src/entry-server.tsx` + `tsx scripts/prerender.ts`. Vercel serves the prerendered `dist/public/<path>/index.html` files before falling back to the SPA. There is no runtime SSR in production.

## Route list is generated, not hardcoded
- The prerender route list is built programmatically in `src/lib/prerenderRoutes.ts` (`getPrerenderRoutes()`), so new location pages auto-prerender with no script edit.
- That helper is **re-exported from `src/entry-server.tsx`** and `scripts/prerender.ts` reads it from the built SSR bundle (`dist/server/entry-server.js`).
- **Why not import the data directly in the tsx script:** `cincinnatiCommunities.ts` evaluates `import.meta.env.BASE_URL` at module load, which is `undefined` under plain node/tsx, so importing `communityData.ts` outside Vite throws. The SSR bundle has `import.meta.env` defined, so running the route logic from the bundle is the robust path.
- **How to apply:** any future change to which routes prerender goes in `prerenderRoutes.ts`. Don't try to import `communityData`/`cincinnatiCommunities` from a bare tsx script.

## Shell-pollution trap when re-running prerender alone
- `scripts/prerender.ts` reads its HTML shell from `dist/public/index.html`. The `/` (home) route **writes to that same file**.
- A single `pnpm build` run is fine (it reads the clean shell into memory once, before the loop). But re-running `tsx scripts/prerender.ts` standalone a second time reads the already-prerendered home page as the "shell" → duplicate `<title>`/content.
- **How to apply:** when iterating, always re-run the client `vite build` to restore a clean shell before re-running prerender. Don't trust a standalone prerender re-run.

## Two location URL systems (dedup rule)
- Cincinnati communities: canonical `/locations/cincinnati/{slug}` from `COMMUNITY_PAGES` (communityData.ts). Each ALSO registers a legacy redirect `/{slug}-property-management`.
- LocationPage system: `/{slug}-property-management` from `REGION_SLUGS` (locationRegistry.ts), via `buildLocationUrl`. Dayton lives here; only ~3 Cincinnati slugs (middletown, sycamore, western-hills) are LocationPage-only.
- **Dedup for prerender:** prerender every `COMMUNITY_PAGES` canonical; for `REGION_SLUGS` skip the `norris-lake` region (external redirect off-site) and skip any slug that is also a community page (its `/{slug}-property-management` is just a redirect → would prerender empty).

## Other prerender facts
- `PublishGuard` passes through during SSR, so unpublished pages (pages.config.json `published:false`, e.g. hoa/co-living/commercial) DO prerender with real content — but Vercel Edge middleware still 404s them at request time until published.
- The shell (`index.html`) ships a static default `<title>`; the prerender splice now strips it when the SSR head supplies its own, so crawlers see a single per-page title (they use the first `<title>` in document order).
- Metro hub routes `/locations/cincinnati` and `/locations/dayton` do NOT exist (would 404); the real hub is `/areas-we-serve`. `/jobs` redirects to `/careers`.
