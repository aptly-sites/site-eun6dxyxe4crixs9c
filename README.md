# EquityTeam — static build mirror

This repo is a **generated static build**, not source code. It exists so Aptly's website-hosting
custom-site import (`admin_importCustomWebsite` / `admin_resetSiteToCustom`) has a plain static
site to mirror in — the real source lives at [`aptly-sites/equityteam`](https://github.com/aptly-sites/equityteam),
a pnpm-workspace monorepo (React 19 + Vite + SSR prerendering) that has no committed static output
and can't be built by Aptly's own `npm ci && npm run build` deploy workflow (its own `preinstall`
script refuses anything but pnpm).

## What's here

- Everything at the repo root is the prerendered output of `pnpm --filter @workspace/et-website-v1
  run build:vercel` from the source repo — 240 prerendered routes (marketing pages, the full blog,
  and individually pre-rendered `/for-rent` listing pages), plus all static assets. This is
  `artifacts/et-website-v1/dist/public` from the source repo, copied as-is (minus two stray
  `.jpg.bak` files).
- `functions/` — three Cloudflare Pages Functions, hand-ported from the source repo's Vercel
  serverless functions (`artifacts/et-website-v1/api/**`, Express-style `req`/`res`) to the
  Fetch-API-based `onRequestGet`/`onRequestPost` convention Pages Functions use:
  - `functions/api/owner-lead.js` — creates an Aptly owner-lead contact + board card, with an
    optional Google Places address-verification step for calculator-driven leads.
  - `functions/api/nearby-schools.js` — GreatSchools lookup for rental listing pages; falls back
    to a shared, already-live Cloudflare-hosted proxy when no `GREATSCHOOLS_API_KEY` is set, so it
    works with zero configuration out of the box.
  - `functions/api/forms/contact.js` — the general contact form: forwards to EquityTeam's existing
    Google Apps Script email router *and* creates an Aptly owner-lead card.
  - `functions/_lib/` — shared logic between the two owner-lead-creating functions above.

## Not ported

- `middleware.js` (Vercel Edge Middleware — draft/published page gating) has no Cloudflare Pages
  equivalent and was dropped. Every page in this build is published.
- The separate Express API server (`artifacts/api-server` in the source repo — forms, email, blog
  view counts) is backend infrastructure, out of scope for a static site mirror.

## Env vars to set on the Cloudflare Pages project

None of these are set here — add them as Pages environment variables once this is imported:

| Variable | Used by |
| --- | --- |
| `APTLY_API_TOKEN` | owner-lead, contact form (Board API token, scoped to the owner-leads board only) |
| `APTLY_OWNER_LEADS_BOARD_ID` | owner-lead, contact form |
| `APTLY_OWNER_LEADS_STAGE` | owner-lead, contact form |
| `APTLY_EMAIL_USER_ID` / `APTLY_EMAIL_CHANNEL_ID` | owner-lead only — sends a calculator-report email; omit to skip that step |
| `GOOGLE_MAPS_API_KEY` (or `VITE_GOOGLE_MAPS_API_KEY`) | owner-lead — address verification for calculator-driven leads only |
| `GREATSCHOOLS_API_KEY` (or `GREAT_SCHOOLS`) | nearby-schools — optional, falls back to a shared proxy if unset |

## Regenerating this

This isn't meant to be hand-edited. To refresh it after the source site changes, rebuild the
source repo (`pnpm install --frozen-lockfile && BASE_PATH=/ pnpm --filter @workspace/et-website-v1
run build:vercel`), copy `artifacts/et-website-v1/dist/public/*` over the root here (excluding
`functions/` and this README), and re-apply any changes to the three ported functions if the
source's `api/**`/`server/*.mjs` changed.
