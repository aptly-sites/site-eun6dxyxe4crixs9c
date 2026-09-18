---
name: equityteam-typography
description: EquityTeam brand typography system — fonts, sizes, weights, tracking, and usage rules. Use whenever making font, heading, text styling, or type hierarchy decisions for the EquityTeam website (v1 React SPA or WordPress theme).
---

# EquityTeam Typography System

Art deco property management brand. Positioning: industry leader, professional and trustworthy, but approachable — not overpriced or too elegant. Good people working hard for clients.

> **Brand voice, positioning, messaging pillars, service-line architecture, and copy rules** live in the companion skill **`equityteam-brand`** (`.agents/skills/equityteam-brand/SKILL.md`). Load that skill whenever writing copy or making messaging decisions. This skill covers visual type and color implementation only.

## How typography reinforces brand positioning

- **CowlingSans H1 ALL CAPS** = quiet, architectural authority — the "best, established" feel
- **Bodoni Moda H2** = editorial gravitas — the "trusted publication" feel (Wall Street Journal, not a flyer)
- **Raleway body** = clean, professional, never folksy
- **Gold accents only on proof points and CTAs** — gold is "earned attention"

## Font Families

| Variable | Font | Fallback | Source |
|---|---|---|---|
| `font-cowling` | CowlingSans | Poppins | Local `@font-face` (.otf) |
| `font-display` | Bodoni Moda | Playfair Display | Google Fonts |
| `font-sans` | Raleway | sans-serif | Google Fonts |
| `font-marseille` | Marseille | Playfair Display | Local `@font-face` (.otf) |

**Google Fonts import string:**
```
Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400;1,6..96,500&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400
```

## Complete Type Scale Reference

| Role | Font | Case | Weight | Size | Tracking | CSS Class / Element |
|---|---|---|---|---|---|---|
| H1 | CowlingSans | ALL CAPS | Regular 400 | 72px | 0.12em | `h1`, `font-cowling uppercase` |
| H2 | Bodoni Moda | Title Case | Regular 400 | 48px | 0.01em | `h2`, `font-display` |
| H3 | Bodoni Moda | Sentence case | Regular 400 | 32px | 0.01em | `h3`, `font-display` |
| H4 / Labels | Raleway | ALL CAPS | SemiBold 600 | 16px | 0.28em | `h4`, `font-sans font-semibold uppercase` |
| Body / p | Raleway | Natural | Regular 400 | 17px | — | `p`, `font-sans` |
| Pull quotes | Bodoni Moda | Natural | Regular 400 italic | 24px | 0.01em | `blockquote`, `.pull-quote` |
| Captions | Raleway | Natural | Light 300 | 16px | 0.04em | `figcaption`, `.caption` |
| Stat numbers | CowlingSans | — | Bold 700 | 64px | — | Hero stat values (2003, 98%, etc.) |
| Hero accent | Marseille | Natural | Regular 400 script | Contextual | — | `font-marseille` — once per page max |

**Hard rule: Nothing under 16px anywhere on the site.**

## Color System

| Role | Value | Token | Notes |
|---|---|---|---|
| Black (background AND text) | `#121212` | `--color-onyx` | ONE soft-black sitewide — backgrounds AND text, never pure #000 |
| White (background AND text) | `#FFFFFF` | `--color-paper` | ONE white sitewide — never off-white or cream |
| Brand gold | `#B4975A` | `--color-gold` | Accent, CTAs, eyebrows, attribution lines, signatures |
| Gold hover | `#C8AB6E` | `--color-gold-hover` | Lighter gold for hover/active states only |
| Silver | `#e0e0e0` | `--color-silver` | Borders, dividers, subtle UI lines, placeholder icons — never for text |
| Accent purple | `#4f2683` | `--color-purple` | Occasional highlight callouts only — use very sparingly |

**Hard rules:**
- ONE black = `#121212`. Never `#000000`, `#333`, or any other grey masquerading as black.
- ONE white = `#FFFFFF`. Never off-white, cream, or `#f5f5f5` for backgrounds.
- ONE silver = `#e0e0e0`. Use for borders and dividers. Never use Tailwind `gray-*` utilities for brand elements — always use `border-[#e0e0e0]` or `var(--color-silver)`.
- Purple = `#4f2683`. Maximum once or twice per page, only for promotional badges, highlight labels, or special callout boxes.
- In code, prefer CSS tokens (`var(--color-onyx)`, etc.) or Tailwind's overridden `bg-black`/`text-black` (both resolve to `#121212`).

## Pull Quote Pattern (use italic always)

```jsx
<h2 className="font-display font-normal italic text-5xl leading-tight">
  "Let Us Treat Your Property Like It's Our Own."
</h2>
<span className="block text-secondary font-sans font-semibold uppercase tracking-[0.32em] text-base md:text-lg mt-[30px]">
  — Mark Thompson, Founder/CEO/Broker
</span>
```
Bodoni Moda's italic is its most expressive form — pull quotes must be italic. Attributions go in **gold** with uppercase Raleway tracking, never plain white/black.

## Eyebrow / Section Subheading Tracking

Small uppercase labels (eyebrows, stat labels, section subheadings) use `letter-spacing: 0.32em` for that luxury magazine feel. Anything tighter looks utilitarian.

## CSS Custom Properties (index.css :root)

```css
--text-h1:      4.5rem;      /* 72px */
--text-h2:      3rem;        /* 48px */
--text-h3:      2rem;        /* 32px */
--text-h4:      1rem;        /* 16px */
--text-body:    1.0625rem;   /* 17px */
--text-quote:   1.5rem;      /* 24px */
--text-caption: 1rem;        /* 16px */
```

## Design Decisions & Rationale

- **H1 all caps**: CowlingSans is a geometric display font; uppercase with generous tracking conveys quiet authority
- **H2 mixed case (Title Case)**: Bodoni Moda's high-contrast strokes are wasted in all caps — the rhythm of ascenders and descenders creates warmth
- **H3 sentence case**: More conversational at content level; easier to scan for longer phrases
- **H4 tiny + very tracked**: The architectural micro-label look — 16px with 0.28em tracking reads as subordinate despite meeting the size floor
- **Raleway over Roboto**: Has geometric art deco DNA without competing with display fonts; Light (300) through SemiBold (600) gives a complete range
- **Marseille sparingly**: Script used once per page for a signature hero moment — overuse kills the effect
- **Bodoni italic for quotes**: The italic form of Bodoni is where its design shines — used for testimonials and pull quotes

## Blockquote / Quote HTML Pattern

```html
<blockquote>
  "Let us treat your property like it's our own."
  <cite>— Mark M., Property Owner</cite>
</blockquote>
```

Auto-styles: Bodoni Moda italic 24px, gold left border 3px, `<cite>` renders as Raleway SemiBold 16px uppercase gold.

For hero pull quotes without the border:
```html
<div class="pull-quote">...</div>
```

## Implementation Files

- **v1 React SPA**: `artifacts/et-website-v1/src/index.css` (base layer)
- **v1 HTML font imports**: `artifacts/et-website-v1/index.html`
- **WordPress theme**: `wp-content/themes/equityteam/style.css` (to be kept in sync)

## Tailwind Class Mapping

| Semantic role | Tailwind classes |
|---|---|
| Section heading (H2) | `font-display font-normal` |
| Service card heading (H3) | `font-display font-normal` |
| Hero subtitle / tagline (p) | `font-display font-bold` |
| Stat value number | `font-cowling font-bold` |
| Label / eyebrow | `font-sans font-semibold uppercase tracking-[0.28em]` |
| Body paragraph | `font-sans` (inherits from base) |
| Button text | `uppercase tracking-[0.1em]` |

## What NOT to Do

- Do not use `font-marseille` on structural elements (h2, h3, p) — only accent/hero moments
- Do not use `font-cowling` on H2 elements — that's CowlingSans territory only for H1 and stat numbers
- Do not use `font-bold` on H2/H3 (Bodoni Moda's elegance lives at Regular weight)
- Do not add a fourth display font — the system uses 3 (CowlingSans, Bodoni, Raleway) + Marseille for accent
- Do not set any font below 16px
