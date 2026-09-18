# Native rental listings

Adapted the existing rental-search implementation from the sibling Equity Team checkout (`../app/components` and `../app/lib`) into this React/Vite website. The original checkout is unchanged.

## Routes and code

- `/for-rent`: existing website introduction, application guidance, and FAQs, with native rental search replacing the Aptly iframe.
- `/for-rent/:state/:city`: filtered city inventory.
- `/for-rent/:state/:city/:zip/:street--id`: stable listing details keyed by Aptly ID.
- Implementation: `artifacts/et-website-v1/src/features/rentals/`.

Search includes city/address search, bedrooms, maximum rent, pet filtering, sorting, photo carousels, map/list views, and comparison of up to three homes. Details include photos, published features and fees, nearby listings, and Aptly tour/application links. The site's header/footer and branding are preserved; imported rental styles are scoped to `.et-rentals`.

## Data and hosting

The public widget is `https://portal.getaptly.com/search/Eun6dxYxe4CRiXS9c/`. The imported implementation uses Aptly's public available-locations endpoint and public per-listing details, with six concurrent detail requests and a five-minute in-process inventory cache. Records explicitly marked unpublished are excluded. Partial detail failures preserve public location summaries; complete feed failures show a portal fallback link. No Aptly API token is needed or exposed.

Development renders rental data server-side. Production builds prerender the available property/city routes and serialize the initial data for matching client hydration. The browser refreshes the inventory from the public feed after mounting, including on SPA navigation. New listings can load through the existing SPA fallback before the next build; their prerendered HTML is added on the next deployment. Tour windows are computed after client mount so builds do not freeze time-sensitive dates. Final availability and reservations are handled by Aptly.

Maps use bundled Leaflet/marker clustering with OpenStreetMap tiles. The inherited CARTO tile URL required an API key and was replaced. Listing cards remain usable if the map library cannot load. Filters/comparison selections are temporary browser state, not saved accounts or lead records.

## Validation

- Verified 34 public available listings during integration.
- Production build generated 239 pages: the previous 197 plus 34 property and 8 city pages.
- `pnpm --filter @workspace/et-website-v1 test:rentals`: 3 tests passed (feed failure/recovery, unpublished filtering, partial data, stable URLs, pricing/date handling, safe links, serialized data).
- `pnpm --filter @workspace/et-website-v1 test:rentals:render`: 2 tests passed after building (loading/empty/error states, minimal detail data, removed listings, metadata/hydration, current tour-window loading).
- Browser checks passed for city filtering, no-match recovery, comparisons/Escape, detail navigation, breadcrumb return, tour URL generation, and mobile map/list behavior without horizontal page overflow.
- TypeScript reports only the same 36 existing blog-data errors documented in `code-cleanup.md`.
- No live applications, contact requests, or tour reservations were submitted. Changes are local; publishing requires the normal site deployment.
