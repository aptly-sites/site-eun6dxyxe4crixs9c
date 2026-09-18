---
name: FAQ location system
description: Standardized 3-question FAQ module wired to all Ohio PM location pages; data coverage, wiring status, and SSR behavior.
---

# FAQ Location System

## Status: Complete
All tasks T001–T006 from the session plan are done.

## Module
`src/data/locationFaqData.ts` — exports:
- `LocationFaqStats` interface (medianHHI, renterPct, rent1BR, rent3BR)
- `buildLocationFaqs(city, stats)` → 3 FAQ items (Q1 data-driven, Q2/Q3 templated)
- `FALLBACK_FAQ_STATS` — metro-level fallback (flags pages with no researched data)
- `LOCATION_FAQ_STATS` — keyed by slug, 84 entries total

## Wiring
- **Dayton LocationPage system** (`LocationPage.tsx`): imports builder, wraps in FAQPage JSON-LD schema, injects into `<FaqAccordion>`
- **Cincinnati CommunityPage system** (`cincinnatiCommunities.ts` `makeCincinnatiConfig`): builder called with slug; income/renterPct reused from existing market-insights data; rents researched
- **Standalone community configs** (`communityData.ts`): blue-ash, delhi, clifton all wired

## Data coverage
- ~54 Cincinnati slugs: all have real data (no fallbacks used)
- 30 Dayton slugs: all have real Census ACS + Zillow/RentCafe data
- 0 slugs relying on FALLBACK_FAQ_STATS

**Why:** FaqAccordion renders answers via dangerouslySetInnerHTML inside a `<p>` — use `<br/>` + bullet chars, NOT `<ul>` tags.

## SSR behavior (important)
- **Cincinnati CommunityPages** (`/locations/cincinnati/:slug`) → SSR renders correctly. Verified Hyde Park: 154 KB, FAQ Q1-Q3 present, 0 `<link>` tags inside `#root`, hydration clean.
- **Dayton LocationPages** (`/:slug-property-management`) → SSR returns empty root div (~51 KB Vite dev shell). Pre-existing issue; no errors thrown. Root cause: Wouter `base="/v1"` + custom static hook interaction — Wouter does NOT strip the base from the custom hook's returned path before matching `/:location-property-management`, so the route never matches during SSR. Renders correctly client-side after hydration.
- **Fix if needed**: strip `basePath` from `pagePath` before passing to `createStaticLocationHook` in `entry-server.tsx`: `const hookPath = pagePath.startsWith(basePath) ? pagePath.slice(basePath.length) || "/" : pagePath;` then pass `hookPath` instead of `pagePath`.

## Hydration fix (server.ts)
- React 19 emits `<link rel="preload">` tags inside `#root` during SSR. Regex strips them from `appHtml` and hoists them into `<head>` before sending to client. Eliminates hydration mismatch on every page.

## Health check bypass (server.ts)
- `app.get([basePath, "${basePath}/", "/", ""], ...)` returns bare 200 immediately — no SSR cold-compile on the Replit health probe. First non-root SSR request still takes 90+ seconds (one-time Vite cold-compile).

## Related TS fixes applied alongside
- `communityData.ts`: cliftonConfig was missing `dataAccessedDate` field
- `LocationPage.tsx`: stray `q1` identifier removed (merge artifact)
- `MetroHubPage.tsx`: `m.faqs` spread with `[...m.faqs]` to satisfy mutable `FaqItem[]`
- `Exchange1031.tsx`: unsupported `max` prop removed from `InputField`
