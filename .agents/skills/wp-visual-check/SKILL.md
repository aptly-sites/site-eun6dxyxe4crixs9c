# WP Visual Check Skill

## Purpose
After every edit to the WordPress theme (CSS, PHP templates, or any page content), you MUST run this visual self-check before reporting the work as done. Never tell the user a page looks correct without completing these steps first.

## The Rule
**Every page edit cycle ends with a visual diff. If the live WP page does not match the v1 reference, keep fixing. Only stop when they match.**

---

## Step-by-Step Self-Check Protocol

### 1. Wait for Deploy
After pushing a commit, poll GitHub Actions until `status=completed, conclusion=success`:
```bash
node -e "
const https = require('https');
const opts = { hostname: 'api.github.com', path: '/repos/EquityTeam/equityteam-site/actions/runs?per_page=2', headers: { 'Authorization': 'Bearer ' + process.env.GITHUB_PAT, 'User-Agent': 'replit-agent', 'Accept': 'application/vnd.github.v3.json' } };
let d = ''; https.get(opts, r => { r.on('data', c => d+=c); r.on('end', () => { JSON.parse(d).workflow_runs.slice(0,2).forEach(r => console.log(r.head_commit.id.slice(0,8), r.status, r.conclusion||'-')); }); });
"
```

### 2. Wait for CDN Page Cache to Expire
The Atomic CDN caches WP page HTML for 5 minutes (`max-age=300`). After the deploy completes, wait ~5 minutes, then confirm the new CSS fingerprint is live:
```bash
curl -s "https://pm.equityteam.com/property-management-residential/" | grep 'style.css'
```
The `?ver=XXXXXXXXXX` value must be newer than before the deploy.

### 3. Take a FRESH Screenshot of the Live WP Page
**Critical:** Always add a unique query param to bypass Firecrawl's screenshot cache. Use the current timestamp or incrementing integer:
```
https://pm.equityteam.com/property-management-residential/?v=YYYYMMDD_N
```
Use `type='external_url'` with the screenshot tool. **Never screenshot the bare URL without a cache-bust param** — Firecrawl caches screenshots by URL and will return a stale image.

### 4. Take a Screenshot of the v1 Reference (Same Section)
Use the app_preview screenshot tool:
- artifact_dir_name: `et-website-v1`
- path: `/property-management` (or the relevant route)

### 5. Compare Side-by-Side
For each visible section in the WP screenshot, check against the v1:

| Check | What to look for |
|---|---|
| Hero background | Dark aerial photo visible, not plain grey/white |
| Hero overlay | Dark dramatic tone — not 50% grey over white |
| Hero gradient | Bottom fades to near-black |
| Title typography | Font, size, colour, weight match v1 |
| Subtitle typography | Font, size, colour match v1 |
| Button style | Border colour, text, uppercase, padding match v1 |
| Section spacing | Padding/margin between sections matches v1 |
| Section colours | Background colours match v1 (navy #21304e, white, etc.) |
| Content text | Text content and layout match v1 |

### 6. If They Don't Match — Fix Before Reporting
- Identify the specific CSS property or HTML element that differs
- Make the fix (CSS change, HTML template change, or both)
- Push the commit
- Repeat from Step 1

**Do NOT report the work as done until the screenshots visually match.**

---

## Step 6b: Verify All Sections Are Present (curl audit)

The screenshot tool only ever shows the **top of the page** (hero area) — Firecrawl does not scroll and anchor links are ignored. To audit sections below the fold, use curl + grep/text extraction:

```bash
# Check that key sections exist in the live HTML:
curl -s "https://pm.equityteam.com/property-management-residential/?v=audit1" | \
  grep -i 'guarantees\|pricing\|why-us\|services\|areas-v2\|cta-module\|reviews-module' | head -20

# Extract all visible text for content audit:
curl -s "https://pm.equityteam.com/property-management-residential/?v=audit2" | \
  sed 's/<[^>]*>//g' | grep -v '^[[:space:]]*$' | \
  sed 's/&#[0-9]*;//g;s/&amp;/\&/g;s/&nbsp;/ /g' | head -400
```

For each section, verify the key heading and unique content string is present in the output.

**Expected sections (in order) for the PM page:**
1. Hero: "Property Management" + "Schedule a Consult"
2. Stop Being a Landlord + "Get a Free Rental Analysis Today!"
3. Logos/Associations (navy bg)
4. Why Us (5 cards + stats box)
5. Real Customer Reviews (slider)
6. FRA CTA: "Get Your Free Rental Analysis / Click To Start"
7. Services (Onboarding, Leasing, Tenancy Management, Inspections, Accounting)
8. Guarantees (9 badge cards, black bg)
9. Second FRA CTA
10. Pricing (table with Single-Family/Multi-Family/ET+ columns)
11. Areas We Serve (Cincinnati Office + Dayton Office with city links)
12. Third FRA CTA
13. Footer

---

## Known Gotchas

### Firecrawl Can't Reach `etgrav.acsdemo.in`
The hero background image is hosted at `etgrav.acsdemo.in`. Firecrawl's browser cannot reach this domain. This means the hero background photo will NOT show in screenshots. This is expected — the hero will appear dark (near-black with `background-color: #111`) rather than showing the aerial photo. This is correct. Real users in actual browsers CAN reach this domain and see the photo.

**Correct appearance without image:** Near-black hero (`#111` + `rgba(0,0,0,0.65)` overlay) with gold text.  
**Wrong appearance without image:** Medium grey hero (50% grey over white) — this means `background-color: #111` is not being applied.

### Firecrawl Screenshot Cache
Firecrawl caches screenshots by URL. Always append `?v=YYYYMMDD_N` to force a fresh capture. Increment `_N` if you take multiple screenshots in the same session.

### Atomic CDN STALE Responses
The Atomic CDN (`x-ac` header) may serve STALE page HTML for 5+ minutes after a deploy. Always wait 5 minutes after the deploy completes before checking. If `curl -sI URL | grep x-ac` shows `STALE`, wait another minute and retry.

### OPcache
Convesio's OPcache has `validate_timestamps=0`, so PHP file changes are NOT picked up automatically. The deploy.yml's `et-opc.php` step (scp → curl → delete) is required to flush OPcache. If the PHP template looks wrong even after deploy, verify the OPcache flush step ran successfully in GitHub Actions logs.

### CSS Cache Busting
CSS files are cached by CDN for 1 year. The theme uses `filemtime()` to generate a new query string on every rsync deploy. Confirm the new CSS fingerprint is loaded by checking the `?ver=XXXXXXXXXX` value in the live page HTML.

---

## Full Check Example (Hero Section)

```
1. Push commit → wait for GH Actions to complete → wait 5 min for CDN
2. curl the page → confirm new ?ver= fingerprint in style.css link
3. Screenshot: https://pm.equityteam.com/property-management-residential/?v=20260507_2
4. Screenshot: v1 at /property-management (app_preview)
5. Compare:
   - WP: dark hero (near-black), gold "PROPERTY MANAGEMENT", subtitle, gold-bordered button ✅
   - WP: bottom of hero fades to dark ✅
   - WP: "Stop Being a Landlord" navy section below hero ✅
6. If all match → report done
   If not → fix CSS/template, push, repeat
```

---

## Files to Know

| File | Purpose |
|---|---|
| `wp-content/themes/equityteam/style.css` | All PM page CSS. Edit locally at `/tmp/style_fixed2.css` then push via GitHub Tree API |
| `wp-content/themes/equityteam/templates/tpl-property-management.php` | PM page HTML template |
| `wp-content/themes/equityteam/functions.php` | Theme bootstrap, CSS enqueue with filemtime() |
| `.github/workflows/deploy.yml` | rsync + OPcache flush + verify deploy pipeline |
| `artifacts/et-website-v1/src/pages/PropertyManagement.tsx` | v1 reference (780 lines) |

## GitHub Commit Pattern (Node.js via bash tool)
Use the GitHub Tree API — **never use `code_execution` sandbox** (it has no `process.env`). Always use the `bash` tool with `node -e "..."`:
1. GET `/repos/REPO/git/ref/heads/main` → baseSha
2. GET `/repos/REPO/git/commits/BASSHA` → baseTreeSha
3. POST `/repos/REPO/git/blobs` for each changed file
4. POST `/repos/REPO/git/trees` with `base_tree` + changed blobs
5. POST `/repos/REPO/git/commits` with message + tree + parents
6. PATCH `/repos/REPO/git/refs/heads/main` with new commit sha
