# Cloudflare Pages Functions — required environment variables

Set these in this project's Cloudflare Pages Configuration (or from Aptly's
Website Manager → Configuration tab, if available for this site).

## `functions/api/owner-lead.js` and `functions/api/forms/contact.js`
(both use `functions/_lib/owner-lead.js`)

- `APTLY_API_TOKEN` — Board API token for lead/contact creation on `core-api.getaptly.com`.
- `APTLY_OWNER_LEADS_BOARD_ID` — target board for created lead cards.
- `APTLY_OWNER_LEADS_STAGE` — the board stage new leads land in.
- `APTLY_EMAIL_USER_ID` / `APTLY_EMAIL_CHANNEL_ID` — sender identity for the
  calculator report emails (Rent vs. Sell, PM Fee ROI, Eviction Cost, 1031
  Exchange, Vacancy Cost, STR vs. LTR). Without these, calculator report
  requests fail — everything else still works.
- `GOOGLE_MAPS_API_KEY` — used to verify a submitted address (place_id ->
  formatted address) for forms that require a verified address.

`functions/api/forms/contact.js` also posts to a fixed EquityTeam Google Apps
Script URL (department-routed staff notification email) — no separate env
var needed for that part, it's hardcoded same as the original.

## `functions/api/nearby-schools.js`

- `GREAT_SCHOOLS` (or `GREATSCHOOLS_API_KEY`) — optional. If unset, this
  falls back to a shared proxy another aptly-sites site already runs
  (`site-ydgjrcz9htcv4iav4.pages.dev`), same as the original code did. That
  fallback is real technical debt (one customer's site backs a feature
  other sites depend on) — worth giving this site its own key, or better,
  moving this to a proper core-api endpoint shared by all sites.
