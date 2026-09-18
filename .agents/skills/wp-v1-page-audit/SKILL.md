---
name: wp-v1-page-audit
description: Audit and fix any WordPress page template to match the v1 React SPA (EquityTeam site). Use when a live page looks wrong, is missing content, or doesn't match the v1 reference. Covers the full workflow: read v1 source → read WP template → identify gaps → rewrite PHP template + append CSS → push to GitHub → auto-deploys in ~20s.
---

# WP v1 Page Audit Skill

## When to Use
- User says a page "looks different" on the live site vs v1
- A page is missing content sections, embeds, or interactive elements
- A page has inline styles where it should use CSS classes
- A page is a dashed placeholder box instead of real content
- Doing a full site audit to sweep all pages

## Pipeline Reminder
Every file edit goes through the GitHub REST API → auto-deploys via GitHub Actions in ~20s. Git commit is sandboxed in this environment — always use the node script pattern below.

### CRITICAL: CSS Cache-Busting (must do every time you add new CSS classes)
WordPress enqueues stylesheets with a version query string: `style.css?ver=2.1.0`. Browsers cache this URL indefinitely. If you add new CSS rules but the version number stays the same, **browsers silently serve old cached CSS** and the new classes appear to have no effect.

**Every time you add new CSS classes, bump `ET_THEME_VERSION` in `functions.php`:**
```
define( 'ET_THEME_VERSION', '2.1.0' );  // bump this number with every CSS push
```
- Increment the PATCH or MINOR version: `2.1.0` → `2.1.1` → `2.1.2`, or `2.1.0` → `2.2.0`
- Always include `functions.php` in the same commit as `style.css`
- This changes the enqueued URL to `style.css?ver=2.1.1`, forcing all browsers to fetch fresh CSS

### CRITICAL: Screenshot verification — use ?nocache=1
The external screenshot service (Firecrawl) caches screenshots. To force a fresh render:
```
https://pm.equityteam.com/for-sale/?nocache=1
```
Always use `?nocache=1` when taking a verification screenshot immediately after deploy.

### Confirming deploy without screenshots
Use curl to verify the ACTUAL HTML being served — more reliable than screenshot tools:
```bash
curl -s -L "https://pm.equityteam.com/<slug>" | grep -o 'class="[^"]*for-sale[^"]*"'
curl -s -L "https://pm.equityteam.com/<slug>" | grep -o 'style\.css?ver=[0-9.]*'
```
If the new classes appear AND the CSS version is the bumped number, the deploy is live.

---

## Step-by-Step Process

### Step 1 — Read the v1 source
```
artifacts/et-website-v1/src/pages/<PageName>.tsx
```
Key things to extract:
- Hero: background color, h1 font/size/color, any subheading
- Layout: single column or two-column (with sidebar)? Which widths?
- Content: all text blocks, headings, ordered lists, links
- Embeds: iframes (Aptly, MLS tools), third-party widgets — capture exact URLs
- Forms: field names, placeholders, action URL, submit label
- CTAs: button text, href, style (gold fill / outline-white / outline-gold)
- Sidebar: is there a sticky sidebar? What's in it?

### Step 2 — Read the current WP template
```bash
curl -s -H "Authorization: token ${GITHUB_PAT}" \
  "https://api.github.com/repos/EquityTeam/equityteam-site/contents/wp-content/themes/equityteam/templates/tpl-<page>.php" \
  | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const f=JSON.parse(d);console.log(Buffer.from(f.content,'base64').toString('utf8'));});"
```

### Step 3 — Gap analysis (mental, don't output unless asked)
- [ ] Hero section matches (bg, h1, subheading)?
- [ ] Content sections present (all h2 blocks, lists, links)?
- [ ] Iframes/embeds present with correct URLs?
- [ ] Forms present with correct fields and action?
- [ ] Sidebar present if v1 has one?
- [ ] CTAs match (text, href, style)?
- [ ] Uses CSS classes (not inline `style=""` attributes)?

### Step 4 — Check which CSS classes already exist
```bash
curl -s -H "Authorization: token ${GITHUB_PAT}" \
  "https://api.github.com/repos/EquityTeam/equityteam-site/contents/wp-content/themes/equityteam/style.css" \
  | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{
    const css=Buffer.from(JSON.parse(d).content,'base64').toString('utf8');
    ['container','section-pad','btn-gold','sidebar-form','two-col-layout'].forEach(c=>
      console.log(c+':', css.includes(c) ? 'EXISTS' : 'MISSING'));
  });"
```
Download full style.css only if new classes are needed.

### Step 5 — Write the new PHP template
Rules:
- Semantic HTML: `<main>`, `<section>`, `<aside>`
- CSS classes ONLY — never inline `style=""`
- Class naming: `.<page>-hero`, `.<page>-body`, `.<page>-layout`, `.<page>-sidebar`
- Always `defined('ABSPATH') || exit;` at top
- Always `get_header()` / `get_footer()`
- Internal links: `<?php echo esc_url( home_url('/path') ); ?>`
- Iframes: always include `loading="lazy"`, `title=""`, `referrerpolicy="no-referrer-when-downgrade"`, no `frameborder`

### Step 6 — Append new CSS to style.css (if needed)
Download full current style.css, append at bottom, save to `/tmp/current-style.css`.

CSS rules:
- Gold: `var(--color-gold, #B4975A)`
- Black: `var(--color-primary, #000000)`
- Display font: `var(--font-cowling, 'CowlingSans', 'Poppins', sans-serif)`
- Body font: `var(--font-roboto, 'Roboto', sans-serif)`
- Responsive: mobile-first, breakpoints at 768px and 1024px

**Already in style.css — do NOT re-add:**
`.container`, `.container--narrow`, `.section-pad`, `.section-pad--sm`, `.section-pad--lg`,
`.btn`, `.btn-gold`, `.btn-outline-white`, `.btn-outline-gold`,
`.bg-navy`, `.bg-black`, `.bg-gray`, `.text-white`, `.text-gold`, `.text-center`,
`.inner-pages-main-content`, `.default-page`, `.for-rent-*`, `.sidebar-form*`, `.two-col-*`

### Step 7 — Push both files in one commit via GitHub REST API
```javascript
// node script pattern
// 1. GET /repos/EquityTeam/equityteam-site/git/refs/heads/main → headSha
// 2. GET /repos/.../git/commits/{headSha} → treeSha
// 3. POST /repos/.../git/blobs for each file → sha per file
// 4. POST /repos/.../git/trees { base_tree: treeSha, tree: [{path, mode:'100644', type:'blob', sha}] }
// 5. POST /repos/.../git/commits { message, tree: newTreeSha, parents: [headSha] }
// 6. PATCH /repos/.../git/refs/heads/main { sha: newCommitSha }
```

Commit message format:
```
fix(<page>): match v1 layout — <brief description>

- <what changed in template>
- <what CSS was added>
```

### Step 8 — Tell user to verify
```
https://pm.equityteam.com/<page-slug>
```
Deploy lands in ~20 seconds after push.

---

## Page Map: v1 source → WP template → Live URL

| v1 File | WP Template | Live URL | Status |
|---|---|---|---|
| `ForRent.tsx` | `tpl-for-rent.php` | `/for-rent` | ✅ Fixed |
| `ForSale.tsx` | `tpl-for-sale.php` | `/for-sale` | ✅ Fixed |
| `FreeRentalAnalysis.tsx` | `tpl-free-rental-analysis.php` | `/free-rental-analysis` | ⬜ Not audited |
| `AboutUs.tsx` | `tpl-about.php` | `/about-us` | ⬜ Not audited |
| `ContactUs.tsx` | `tpl-contact.php` | `/contact-us` | ⬜ Not audited |
| `PropertyManagement.tsx` | `tpl-property-management.php` | `/property-management-residential` | ⬜ Not audited |
| `Pricing.tsx` | `tpl-pricing.php` | `/property-management-residential#pricing` | ⬜ Not audited |
| `faq/FaqHub.tsx` | `tpl-faq.php` | `/faq` | ⬜ Not audited |
| `Locations.tsx` | `tpl-locations.php` | `/locations` | ⬜ Not audited |
| `PortalLogins.tsx` | `tpl-portal-logins.php` | `/portal-logins` | ⬜ Not audited |
| `RealtorReferralProgram.tsx` | `tpl-realtor-referral.php` | `/realtor-referral-program` | ⬜ Not audited |
| `Jobs.tsx` | `tpl-jobs.php` | `/jobs` | ⬜ Not audited |
| `Feedback.tsx` | `tpl-feedback.php` | `/feedback` | ⬜ Not audited |
| `Blog.tsx` | `tpl-blog.php` | `/blog` | ⬜ Not audited |
| Legal pages | `tpl-legal.php` | `/privacy-policy` etc. | ⬜ Not audited |
| `LocationPage.tsx` | `single-city.php` | `/{city}-property-management` | ✅ Working |
| Tool pages | `templates/single-tool.php` | `/tools/{key}` | ✅ Built |

Update the Status column to ✅ after each page is fixed.

---

## Common Pitfalls

- **Inline styles**: Replace ALL `style=""` attributes with CSS classes.
- **Dashed placeholder boxes**: Always replace `border: 2px dashed` divs with real content from v1.
- **Missing iframes**: Check v1 for any `<iframe src="...">` — Aptly, MLS, Google Maps. Always missing from original WP templates.
- **Missing sidebar**: For Sale and Free Rental Analysis have a right-column sticky form in v1.
- **`--allow-root`**: Works for `wp post create`, `wp option update`, `wp rewrite flush` on Convesio. Fails on `wp menu item add-post`.
- **style.css size**: ~2000+ lines. Always download current, append at bottom, push. Never reconstruct from scratch.
- **Binary fonts**: `CowlingSans-Regular.otf` and `Marseille-Regular.otf` are committed as blobs in the theme. Don't re-push unless actually changed.

## Reusable CSS Components

### Sidebar form (For Sale, Free Rental Analysis)
```css
.sidebar-form            /* black bg, padding */
.sidebar-form__heading   /* gold label */
.sidebar-form__input     /* text inputs */
.sidebar-form__submit    /* gold full-width submit button */
```

### Two-column layout
```css
.two-col-layout    /* flex wrapper, gap, stacks on mobile */
.two-col-main      /* left content col (flex: 2) */
.two-col-sidebar   /* right sidebar col (flex: 1, sticky top: 92px) */
```

### Dark hero (reusable pattern)
```css
.<page>-hero              /* background: #000, padding-top: 9.5rem */
.<page>-hero__inner       /* max-width, text-align: center */
.<page>-hero__title       /* CowlingSans, gold, uppercase, clamp() size */
.<page>-hero__sub         /* white/65, Roboto */
```
