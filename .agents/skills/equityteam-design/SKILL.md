---
name: equityteam-design
description: EquityTeam visual design system — buttons, icons, imagery policy, Art Deco accents, layout grammar. Use whenever building or modifying any UI on the EquityTeam site (v1 React SPA at artifacts/et-website-v1, or WordPress theme at wp-theme/equityteam). Pairs with equityteam-brand (voice/messaging) and equityteam-typography (fonts).
---

# EquityTeam Design System

The visual contract for the EquityTeam Property Management site. Every page, on both v1 (React SPA) and WP theme, must comply with this skill. v1 and WP must stay visually identical.

## Core Principles

1. **Restraint = competence.** Editorial-quiet, never SaaS-loud. No bouncy hover effects, no gradient backgrounds, no shadows on buttons, no gratuitous animation.
2. **One system, used everywhere.** No new ad-hoc button styles, icon families, or color treatments per page.
3. **No exclamation marks** (see equityteam-brand). Same rule applies to UI microcopy.
4. **Art Deco editorial**, not literal Art Deco pastiche. Geometry, hairlines, gold accents, generous whitespace — not chrome sunbursts on every page.

## Color Tokens

CSS variables defined in `artifacts/et-website-v1/src/index.css` and mirrored in `wp-theme/equityteam/style.css`:

| Token | Value | Use |
|---|---|---|
| `--color-primary` / soft-black | `#121212` | Body text, dark sections, primary surfaces |
| `--color-secondary` / gold | `#B4975A` | Accents, CTAs, icons, rules, eyebrows |
| Hover gold | `#8a7142` | `.link-text` hover only |
| White | `#ffffff` | Light surfaces |
| Body grey | `#555` | Secondary prose |
| Border grey | `#e0e0e0` | Card borders at rest |

Never introduce blues, teals, or other accent colors. Gold is the only accent.

## Button & Link System (3 Tiers)

CSS lives in `artifacts/et-website-v1/src/index.css` (lines ~285–410) and `wp-theme/equityteam/style.css` (mirrored). All tiers use **square corners**, no shadows, no scale, no offset — only color/underline transitions.

### Tier 1 — Primary CTA (boxed)
**Use for:** money actions — "Schedule a Consult", "Free Rental Analysis", "Join Our Vendor Network".
- Classes: `btn-solid-secondary` or `btn-outline-secondary` (aliases — both render identically)
- 1px gold border, transparent fill, gold tracked-out caps (`letter-spacing: 0.18em`, `font-weight: 600`)
- Padding: `1rem 2rem`
- **Hover:** gold fills the box, text turns soft-black. 250ms color crossfade.
- On a gold band, wrap with `.on-gold` (or use `.btn-solid-primary`) to invert: solid soft-black at rest, hollow on hover.

### Tier 2 — Secondary CTA (typographic)
**Use for:** in-card / in-section actions — "Search Rentals", "Explore Residential Management →".
- Class: `cta-secondary`. Always pair the arrow with `<span class="cta-arrow">→</span>`.
- No box, no fill. Gold tracked caps, no padding except `padding-bottom: 0.25rem` for the underline.
- **Hover:** thin underline draws left→right (200ms), arrow nudges 4px right.
- Works with `.group:hover` parent on linked cards.

```jsx
<span className="cta-secondary">
  Search Rentals <span className="cta-arrow">→</span>
</span>
```

### Tier 3 — Inline Text Link (within prose)
**Use for:** links inside paragraphs — "our Cincinnati office", "Mark Thompson".
- Class: `link-text`
- Gold (`#B4975A`) with thin underline always present, 3px offset.
- Hover: deeper gold (`#8a7142`).

### Forbidden
- Pill/rounded buttons (use square only)
- `box-shadow` on any CTA
- `transform: scale()` on any hover
- The old `::before` offset-frame animation (removed)
- Mixing `btn-solid-secondary` with custom `text-secondary tracking-[0.1em]` hand-rolled CTAs — always use `cta-secondary`

## Icons — Phosphor Thin, Gold

**Library:** `@phosphor-icons/react` (installed in `artifacts/et-website-v1`). MIT license.

**Rules (non-negotiable):**
1. **Only Phosphor.** Never mix with Lucide, Heroicons, FontAwesome, emoji, or one-off SVGs (the existing `VintageSeparator` ornament is the one allowed exception — it is a brand mark, not an icon).
2. **`weight="thin"`** always. Never `regular`/`bold`/`fill`.
3. **Color: `#B4975A`** (gold) at rest. White on a gold background. Never grey, blue, or teal.
4. **Size:** 36px in cards, 24px inline with text, 20px in compact UI. Never larger than 48px.
5. **Use sparingly.** Icons earn their place — they support comprehension at a glance, not decorate.

**Canonical mappings** (use these for consistency across pages):

| Concept | Icon |
|---|---|
| Property Owners / Buildings | `Buildings` |
| Find a Rental / Lease / Resident | `Key` |
| Investors / Returns / Growth | `ChartLineUp` |
| Homeowners / Single property | `HouseLine` |
| Maintenance / Vendors | `Wrench` |
| Inspections / Quality | `MagnifyingGlass` |
| Reporting / Statements | `FileText` |
| Phone | `Phone` |
| Email | `EnvelopeSimple` |
| Location | `MapPin` |
| Calendar / Scheduling | `Calendar` |

**WP mirror:** copy the SVG markup from a rendered Phosphor Thin icon and inline it in PHP. Use `currentColor` and set `color: #B4975A` on the parent. Do not load a separate icon library in WP.

For an upgrade later: this skill should be updated with custom commissioned Art Deco icons (Path A from the design conversation). Phosphor Thin is the documented interim.

## Imagery Policy

> **Illustration where we're explaining. Photography where we're showing real estate.**

| Surface | Treatment |
|---|---|
| Hero (homepage, city pages) | Real color photo, golden-hour palette, color-graded warm |
| Property listings, city landing pages, case studies | Real color photography of actual properties — curated, no stock |
| Audience cards, About story, vendor recruitment, blog hero, 404, FAQ, service explainers | Custom B&W Art Deco line illustrations with gold accent lines |
| Team portraits | B&W photography preferred |

**Illustration spec when commissioning or generating:**
- Single-weight black line work, ~1.5pt
- Warm cream or transparent background
- Occasional gold (`#B4975A`) accent lines — never gold fills
- Geometric Art Deco motifs: chevrons, sunbursts, fan shells, stepped pyramids
- No shading, no gradients — pure line
- Reference: *The New Yorker* covers crossed with 1928 Chrysler Building blueprint annotations

**Never use:** generic SaaS stock photos, blue-tinted "real estate" stock, AI photos with the obvious uncanny look, mixed-style icon-illustrations.

## Art Deco Accents

Used sparingly to mark transitions and add brand personality. Do not stack accents in a single section.

**Allowed elements:**
- `<VintageSeparator />` (v1) / `et_vintage_sep` (WP) — gold geometric ornament for between-section dividers
- Thin gold rule (1px, ~80px wide, centered) — under hero accents and section eyebrows
- Soft text-shadow on hero copy over photos: `text-shadow: 0 2px 16px rgba(0,0,0,0.4)`
- Gold tracked-out eyebrows above headings (`letter-spacing: 0.32em`, `font-weight: 600`, gold)
- Bodoni Moda italic for pulled quotes

**Forbidden flourishes:**
- More than one ornament per section
- Gold corner brackets on every card
- Decorative SVGs that don't serve a purpose
- Drop caps anywhere except possibly a feature blog post
- Ornamental dividers on internal cards (the card border is enough)

## Layout Grammar

- **Section padding:** `py-16 md:py-20` (64–80px) for content sections; `py-24` for hero/quote bands
- **Container:** `max-w-screen-xl mx-auto` with `px-5 xl:px-0`
- **Card grid gap:** `gap-6` for 4-up, `gap-8` for 2/3-up
- **Card border at rest:** `border border-[#e0e0e0]`. Hover: `hover:border-secondary` (gold). Always group-link to the card's primary destination.
- **Sectional rhythm:** alternate white → soft-black → white → gold band sparingly. Two consecutive dark sections are forbidden.

## v1 ↔ WP Parity

Every visual change must ship to both:
1. v1 React SPA: edit `artifacts/et-website-v1/src/...` and verify in the dev preview.
2. WP theme: edit `wp-theme/equityteam/...` and push to GitHub via the Git Data API (see scratchpad in chat for the pattern). GitHub Actions rsyncs to Convesio at pm.equityteam.com.

If a feature lives only on one side, document why in the file header comment.

## CTA Placement Conventions

These rules supersede ad-hoc per-page decisions:

| CTA | Where it belongs | Where it does NOT belong |
|---|---|---|
| **Free Rental Analysis** | Investors audience card on Home; near the LTR section on Property Management Residential page; city landing pages | Generic footer CTA on Home (was removed) |
| **Schedule a Consult** | Hero of service pages; Contact pages | Every section of every page |
| **Join Our Vendor Network** | Trade Partners section on Home; /vendors page | Owner-focused service pages |
| **Search Rentals** | Find a Rental card; Resident-facing pages; LTR card | Owner pages (use Free Rental Analysis instead) |

## When in doubt

Ask: "Would this look out of place in a 1930s editorial publication, in *Monocle*, or on the Aesop website?" If yes, simplify.
