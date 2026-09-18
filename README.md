# EquityTeam website

The current website is a React 19 + TypeScript application built with Vite. It renders on the server during local development and prerenders its pages to static HTML for Vercel. The canonical URL defaults to `https://www.equityteam.com`.

## Local development

Use Node.js 24 and the pnpm version pinned in `package.json` (Corepack can activate it).

```sh
pnpm install --frozen-lockfile
PORT=3100 BASE_PATH=/ pnpm --filter @workspace/et-website-v1 dev
```

Open http://localhost:3100. The development server reloads when source files change.

Optional website settings are documented in `artifacts/et-website-v1/.env.example`. Google Maps requires `VITE_GOOGLE_MAPS_API_KEY`; analytics uses `VITE_GA_MEASUREMENT_ID`.

## Repository layout

| Path | Purpose |
| --- | --- |
| `artifacts/et-website-v1/src` | Website routes, components, content, styles, and client/server entry points |
| `artifacts/et-website-v1/public` | Static images, fonts, robots.txt, and sitemap |
| `artifacts/et-website-v1/scripts` | Prerendering, sitemap generation, and SEO tools |
| `artifacts/et-website-v1/api` | Vercel contact-form function |
| `artifacts/et-website-v1/pages.config.json` | Published/draft page configuration |
| `artifacts/api-server` | Separate Express API for forms, email, and blog view counts |
| `artifacts/mockup-sandbox` | Standalone gallery of pricing design prototypes |
| `lib/db` | Database schema and Drizzle configuration |
| `lib/api-spec`, `lib/api-zod`, `lib/api-client-react` | API specification and generated schemas/client |
| `scripts` | Standalone workspace utilities |

The local website server does not start the separate API or Vercel functions. Backend behavior needs its corresponding runtime and environment configuration; previewing a page does not verify form delivery.

## Build and validation

```sh
BASE_PATH=/ pnpm --filter @workspace/et-website-v1 run build:vercel
pnpm run typecheck
```

The website build produces the client bundle, server rendering bundle, and prerendered HTML under `artifacts/et-website-v1/dist/`. Website CI validates the same production build. The workspace typecheck also includes the API and prototype gallery; see `docs/code-cleanup.md` for the pre-existing validation findings recorded during cleanup.

Both the root and website directory contain Vercel configuration for their respective project-root layouts. Preserve the website's redirect rules and page-publication middleware when changing deployment settings. Legacy URL redirects remain necessary for existing links and search traffic.

Git history retains the removed migration scripts and obsolete page implementations. Use ordinary Git branches and review changes before publishing.

## Rental listings

`/for-rent` uses the native Aptly-powered search, map, and listing details. See [rental-listings.md](docs/rental-listings.md) for routes, public data sources, refresh behavior, and tests.
