# Typography verification: pm.equityteam.com vs v1 SPA reference

Date: 2026-05-08
Reference: v1 React SPA (run locally — production `/v1/` currently 404s, see notes)
Production: live WordPress site at `https://pm.equityteam.com`

## CSS token parity (style.css vs artifacts/et-website-v1/src/index.css)

Both stylesheets define the same brand font tokens and load the same Google
Fonts bundle. Local `@font-face` declarations for `CowlingSans` and `Marseille`
exist in both.

| Token              | WP theme               | v1 SPA                 | Match |
| ------------------ | ---------------------- | ---------------------- | ----- |
| `--font-sans`      | Raleway                | Raleway                | ✓     |
| `--font-display`   | Bodoni Moda → Playfair | Bodoni Moda → Playfair | ✓     |
| `--font-bodoni`    | Bodoni Moda            | Bodoni Moda            | ✓     |
| `--font-marseille` | Marseille → Playfair   | Marseille → Playfair   | ✓     |
| `--font-cowling`   | CowlingSans → Poppins  | CowlingSans → Poppins  | ✓     |
| `--font-roboto`    | Raleway (alias)        | Raleway (alias)        | ✓     |
| `--font-poppins`   | Raleway (alias)        | Raleway (alias)        | ✓     |
| `--font-raleway`   | Raleway                | Raleway                | ✓     |

## Desktop comparison (1280×720)

| Page                                | Element                              | WP renders        | v1 renders        | Result |
| ----------------------------------- | ------------------------------------ | ----------------- | ----------------- | ------ |
| `/` home                            | Hero "PROPERTY MANAGEMENT"           | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/` home                            | Subhead "by a team you can trust."   | Playfair italic   | Playfair italic   | ✓ match |
| `/` home                            | "Cincinnati & Dayton, Ohio"          | Raleway           | Raleway           | ✓ match |
| `/` home                            | Stat labels (EXPERIENCE SINCE …)     | Raleway tracked   | Raleway tracked   | ✓ match |
| `/` home                            | Stat numbers (2003, 3000+, 98%)      | Bodoni Moda gold  | Bodoni Moda gold  | ✓ match |
| `/` home                            | Pull quote                           | Playfair italic   | Playfair italic   | ✓ match |
| `/property-management-residential`  | Hero display                         | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/property-management-residential`  | Hero subhead                         | Playfair italic   | Playfair italic   | ✓ match |
| `/property-management-residential`  | "Stop Being a Landlord…" section H   | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/free-rental-analysis`             | "FREE RENTAL ANALYSIS"               | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/free-rental-analysis`             | Italic quote subhead                 | Playfair italic   | Playfair italic   | ✓ match |
| `/free-rental-analysis`             | Form labels / body                   | Raleway           | Raleway           | ✓ match |
| `/contact-us`                       | "CONTACT US" hero                    | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/contact-us`                       | Italic quote subhead                 | Playfair italic   | Playfair italic   | ✓ match |
| `/contact-us`                       | "Send Us a Message" sub-heading      | Raleway*          | Bodoni Moda       | ⚠ source |
| `/pricing`                          | Hero "Professional Management…"      | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/pricing`                          | Plan name "ET Basic / Plus / Premium" | CowlingSans      | CowlingSans       | ✓ match |
| `/pricing`                          | Plan rate ("7%", "9%", "12%")        | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/pricing`                          | Bullet list / body                   | Raleway           | Raleway           | ✓ match |
| `/pricing`                          | "MOST POPULAR" badge                 | Raleway tracked   | Raleway tracked   | ✓ match |
| `/tools/pm-fee-roi`                 | "PM FEE ROI CALCULATOR"              | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/tools/pm-fee-roi`                 | Calculator labels / body             | Raleway           | Raleway           | ✓ match |

\* WP `templates/tpl-contact.php` has inline `font-family:'Roboto'` on the
"Send Us a Message" / "Contact Information" sub-headings (lines 23, 57). Because
`--font-roboto` is aliased to Raleway and the page-level body also uses Raleway,
the rendered visual is the same as Raleway, but the source still violates the
brand-token sweep. **Already covered by the existing tracked tasks
"Stop loading the unused Roboto font on pm.equityteam.com" and "Move inline
font and color styles into the stylesheet"** — not duplicated here.

## Mobile comparison (402×874 — iPhone-class)

| Page                                | Element                              | WP renders        | v1 renders        | Result |
| ----------------------------------- | ------------------------------------ | ----------------- | ----------------- | ------ |
| `/` home                            | Logo + hamburger nav                 | Raleway           | Raleway           | ✓ match |
| `/` home                            | Hero "PROPERTY MANAGEMENT"           | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/` home                            | Italic subhead                       | Playfair italic   | Playfair italic   | ✓ match |
| `/` home                            | Stats numbers + labels               | Bodoni / Raleway  | Bodoni / Raleway  | ✓ match |
| `/` mobile menu open                | PROPERTIES / SERVICES / RESOURCES …  | Raleway tracked   | Raleway tracked   | ✓ match |
| `/property-management-residential`  | Hero display                         | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/free-rental-analysis`             | Hero "FREE RENTAL ANALYSIS"          | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/contact-us`                       | "CONTACT US" hero                    | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/pricing` (above the fold)         | Hero copy                            | Raleway           | Bodoni / Raleway  | ✓ match |
| `/pricing` (cards section)          | Plan name "ET Basic / ET Plus"       | CowlingSans       | CowlingSans       | ✓ match |
| `/pricing` (cards section)          | Plan rate "7% / 9%"                  | Bodoni Moda       | Bodoni Moda       | ✓ match |
| `/pricing` (cards section)          | Plan bullet list                     | Raleway           | Raleway           | ✓ match |
| `/pricing` (cards section)          | "MOST POPULAR" badge                 | Raleway tracked   | Raleway tracked   | ✓ match |
| `/tools/pm-fee-roi`                 | Hero "PM FEE ROI CALCULATOR"         | Bodoni Moda       | Bodoni Moda       | ✓ match |

## Summary

- The brand font system on pm.equityteam.com matches the v1 reference SPA across
  every required surface — nav, forms, hero displays, italic sub-elements,
  pricing cards, body, calculator, mobile menu — at both desktop and mobile
  viewports.
- No new typography regressions found.
- The single source-level mismatch (`Roboto` inline on `/contact-us` headings)
  is already scheduled in two existing tasks.

## Side observations (out of typography scope, surfaced for the team)

1. **`pm.equityteam.com/v1/` is not reachable on production.** `/v1/` returns
   HTTP 404, and `/v1/<page>` 301-redirects back to the WP equivalent (or 404s
   for paths that don't exist as WP pages, e.g. `/v1/tools/pm-fee-roi`).
   Verification was therefore done against a local v1 SPA build. Tracked as
   follow-up task **#10** ("Make the v1 reference site reachable at
   pm.equityteam.com/v1/ in production").
2. **Mobile header CTA overlap** at 402px: the `Contact Us` button overlaps the
   logo and hamburger on **both** the WP site and the v1 SPA. Visible in the
   captured WP mobile screenshots (`wp_*_mobile.jpg`) and the v1 mobile
   screenshots. It is a shared layout/positioning bug, not a typography issue.
   Tracked as follow-up task **#9** ("Fix the overlapping Contact Us button on
   mobile in the v1 reference site").

## Related tracked tasks

| Ref | Title                                                                       | Relationship                                            |
| --- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| #2  | Stop loading the unused Roboto font on pm.equityteam.com                    | Pre-existing — covers the inline-`Roboto` source mismatch on `/contact-us` |
| #3  | Move inline font and color styles into the stylesheet                       | Pre-existing — also covers inline-`Roboto`              |
| #9  | Fix the overlapping Contact Us button on mobile in the v1 reference site    | New follow-up filed from this verification              |
| #10 | Make the v1 reference site reachable at pm.equityteam.com/v1/ in production | New follow-up filed from this verification              |

## Acceptance note

Because production `/v1/` is currently 404 (see follow-up #10), the local v1
SPA build was used as the authoritative reference for this verification.
Awaiting product acceptance of that baseline.

## Screenshots captured

Local v1 SPA (desktop + mobile):
- `screenshots/v1_home_desktop.jpg`
- `screenshots/v1_pm_desktop.jpg`
- `screenshots/v1_fra_desktop.jpg`
- `screenshots/v1_contact_desktop.jpg`
- `screenshots/v1_pricing_desktop.jpg`
- `screenshots/v1_pmroi_desktop.jpg`
- `screenshots/v1_home_mobile.jpg`
- `screenshots/v1_pm_mobile.jpg`
- `screenshots/v1_pricing_mobile.jpg`

Production WordPress (desktop):
- `attached_assets/screenshots/pm_equityteam_com.png`
- `attached_assets/screenshots/pm_equityteam_com_property-management-residential.png`
- `attached_assets/screenshots/pm_equityteam_com_free-rental-analysis.png`
- `attached_assets/screenshots/pm_equityteam_com_contact-us.png`
- `attached_assets/screenshots/pm_equityteam_com_pricing.png`
- `attached_assets/screenshots/pm_equityteam_com_tools_pm-fee-roi.png`

Production WordPress (mobile, captured via puppeteer at 402×874):
- `screenshots/wp_home_mobile.jpg`
- `screenshots/wp_home_mobile_menu.jpg`  (mobile nav panel open)
- `screenshots/wp_pm_mobile.jpg`
- `screenshots/wp_fra_mobile.jpg`
- `screenshots/wp_contact_mobile.jpg`
- `screenshots/wp_pricing_mobile.jpg`
- `screenshots/wp_pricing_cards_mobile.jpg`  (scrolled to plan cards)
- `screenshots/wp_pmroi_mobile.jpg`
