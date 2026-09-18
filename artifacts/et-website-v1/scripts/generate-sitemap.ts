/**
 * Generates public/sitemap.xml.
 *
 * URL source — derived from the same reconciled data the prerender system uses
 * (mirrors the logic in src/lib/prerenderRoutes.ts):
 *
 *   • Static pages    — explicit list of real, published, non-redirect routes
 *   • Community pages — COMMUNITY_PAGES from communityData.ts (canonical URLs
 *                       at /locations/{region}/{slug}); each slug appears once
 *   • Location pages  — REGION_SLUGS from locationRegistry.ts, minus community
 *                       slugs (handled above) and minus norris-lake (off-site
 *                       redirect); produces /{slug}-property-management and
 *                       /{slug}-vacation-rental-management
 *
 * Excluded on purpose:
 *   Redirects:   /property-management-residential, /short-term-vacation-rentals,
 *                /pricing, /search-rentals, /jobs, /vendor, /locations,
 *                /{community-slug}-property-management (redirects to canonical)
 *   Unpublished: /co-living-management, /hoa-management, /commercial-management,
 *                /home-concierge
 *   Off-site:    /norris-lake-vacation-rental-management
 *
 * Run: pnpm sitemap
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { COMMUNITY_PAGES } from "../src/data/communityData";
import {
  REGION_SLUGS,
  REGIONS,
  buildLocationUrl,
  type RegionId,
} from "../src/data/locationRegistry";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../public/sitemap.xml");
const ORIGIN = (process.env.VITE_SITE_URL ?? "https://www.equityteam.com").replace(/\/$/, "");

interface UrlEntry {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

// ─── Static pages ──────────────────────────────────────────────────────────────
// Real, published, non-redirect routes only. Keep in sync with App.tsx and
// prerenderRoutes.ts STATIC_ROUTES.
const CORE_PAGES: UrlEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/residential-property-management", changefreq: "weekly", priority: "0.9" },
  { loc: "/vacation-rental-management", changefreq: "weekly", priority: "0.9" },
  { loc: "/commercial-property-management", changefreq: "weekly", priority: "0.8" },
  { loc: "/hoa-management", changefreq: "weekly", priority: "0.8" },
  { loc: "/property-services", changefreq: "weekly", priority: "0.8" },
  { loc: "/real-estate-brokerage", changefreq: "weekly", priority: "0.8" },
  { loc: "/resources", changefreq: "monthly", priority: "0.7" },
  { loc: "/resources/residential-owners", changefreq: "monthly", priority: "0.6" },
  { loc: "/resources/commercial-owners", changefreq: "monthly", priority: "0.5" },
  { loc: "/resources/vacation-rental-owners", changefreq: "monthly", priority: "0.5" },
  { loc: "/resources/hoa-boards", changefreq: "monthly", priority: "0.5" },
  { loc: "/resources/residential-tenants", changefreq: "monthly", priority: "0.6" },
  { loc: "/resources/commercial-tenants", changefreq: "monthly", priority: "0.5" },
  { loc: "/resources/vacation-rental-guests", changefreq: "monthly", priority: "0.5" },
  { loc: "/resources/hoa-homeowners", changefreq: "monthly", priority: "0.5" },
  { loc: "/resources/property-services", changefreq: "monthly", priority: "0.6" },
  { loc: "/free-rental-analysis", changefreq: "monthly", priority: "0.9" },
  { loc: "/for-rent", changefreq: "daily", priority: "0.8" },
  { loc: "/for-sale", changefreq: "weekly", priority: "0.7" },
  { loc: "/about-us", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact-us", changefreq: "monthly", priority: "0.7" },
  { loc: "/areas-we-serve", changefreq: "monthly", priority: "0.8" },
  { loc: "/careers", changefreq: "weekly", priority: "0.5" },
  { loc: "/portal-logins", changefreq: "yearly", priority: "0.4" },
  { loc: "/realtor-referral-program", changefreq: "monthly", priority: "0.6" },
  { loc: "/vendors", changefreq: "monthly", priority: "0.5" },
  { loc: "/feedback", changefreq: "monthly", priority: "0.4" },
];

const TOOL_PAGES: UrlEntry[] = [
  { loc: "/tools/rent-affordability", changefreq: "monthly", priority: "0.8" },
  { loc: "/tools/rent-vs-sell", changefreq: "monthly", priority: "0.8" },
  { loc: "/tools/pm-fee-roi", changefreq: "monthly", priority: "0.8" },
  { loc: "/tools/1031-exchange", changefreq: "monthly", priority: "0.8" },
  { loc: "/tools/eviction-cost", changefreq: "monthly", priority: "0.7" },
  { loc: "/tools/vacancy-cost", changefreq: "monthly", priority: "0.7" },
  { loc: "/tools/str-vs-ltr", changefreq: "monthly", priority: "0.7" },
];

// blogPosts.ts references `import.meta.env.BASE_URL`, which is only available
// inside Vite — so we parse the raw source text for slugs instead of
// importing the module directly (mirrors scripts/seo-audit.ts).
function getBlogEntries(): Array<{ slug: string; lastmod?: string }> {
  const src = readFileSync(resolve(__dirname, "../src/data/blogPosts.ts"), "utf8");
  const arrayStart = src.indexOf("export const blogPosts");
  const body = src.slice(arrayStart);
  const blocks = body.split(/\n  \{\n/).slice(1);
  return blocks
    .map((block) => {
      const slug = block.match(/slug:\s*"([^"]*)"/)?.[1];
      const lastmod = block.match(/updatedAt:\s*"([^"]*)"/)?.[1]
        ?? block.match(/date:\s*"([^"]*)"/)?.[1];
      return slug ? { slug, lastmod } : null;
    })
    .filter((entry): entry is { slug: string; lastmod?: string } => entry !== null);
}

const BLOG_PAGES: UrlEntry[] = [
  { loc: "/blog", changefreq: "weekly", priority: "0.7" },
  ...getBlogEntries().map(({ slug, lastmod }) => ({
    loc: `/blog/${slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
    lastmod,
  })),
];

const LEGAL_PAGES: UrlEntry[] = [
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms-and-conditions", changefreq: "yearly", priority: "0.3" },
  { loc: "/accessibility", changefreq: "yearly", priority: "0.3" },
  { loc: "/sitemap", changefreq: "yearly", priority: "0.3" },
  { loc: "/real-estate-investing-and-tax-disclosure", changefreq: "yearly", priority: "0.3" },
  { loc: "/email-confidentiality-disclosure", changefreq: "yearly", priority: "0.3" },
];

// ─── Community pages ───────────────────────────────────────────────────────────
// One entry per community page at its canonical /locations/{region}/{slug} URL.
// Derived from COMMUNITY_PAGES — same array App.tsx and prerenderRoutes.ts use.
function getCommunityEntries(): UrlEntry[] {
  return COMMUNITY_PAGES.map((cfg) => ({
    loc: cfg.urlPath,
    changefreq: "monthly",
    priority: "0.8",
  }));
}

// ─── Location pages ────────────────────────────────────────────────────────────
// Mirrors prerenderRoutes.getLocationPageRoutes() exactly:
//   • Skip norris-lake region (only page is an off-site redirect)
//   • Skip any slug that is a community page (canonical already handled above)
function getLocationGroups(): { label: string; entries: UrlEntry[] }[] {
  const communitySlugs = new Set(COMMUNITY_PAGES.map((cfg) => cfg.slug));
  return (Object.keys(REGION_SLUGS) as RegionId[])
    .filter((rid) => rid !== "norris-lake")
    .map((rid) => {
      const region = REGIONS[rid];
      const entries = REGION_SLUGS[rid]
        .filter((slug) => !communitySlugs.has(slug))
        .sort((a, b) => a.localeCompare(b))
        .map((slug) => ({
          loc: buildLocationUrl(slug),
          changefreq: "monthly" as const,
          priority: "0.8",
        }));
      return { label: `Location pages — ${region.name}, ${region.state}`, entries };
    });
}

// ─── Build ─────────────────────────────────────────────────────────────────────
function urlBlock(comment: string, entries: UrlEntry[]): string {
  return [
    `  <!-- ${comment} -->`,
    ...entries.map(
      (e) =>
        `  <url><loc>${ORIGIN}${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
    ),
  ].join("\n");
}

function build(): string {
  const communityEntries = getCommunityEntries();
  const locationGroups = getLocationGroups();

  const sections: string[] = [
    urlBlock("Core pages", CORE_PAGES),
    "",
    urlBlock("Owner Calculator Tools", TOOL_PAGES),
    "",
    urlBlock("Blog", BLOG_PAGES),
    "",
    urlBlock("Community pages — canonical /locations/{region}/{slug}", communityEntries),
    "",
    ...locationGroups.flatMap(({ label, entries }) => [urlBlock(label, entries), ""]),
    urlBlock("Legal / policy", LEGAL_PAGES),
  ];

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ``,
    ...sections,
    ``,
    `</urlset>`,
    ``,
  ].join("\n");
}

const xml = build();
writeFileSync(OUTPUT, xml, "utf8");

const communityCount = getCommunityEntries().length;
const locationCount = getLocationGroups().reduce((sum, g) => sum + g.entries.length, 0);
const staticCount = CORE_PAGES.length + TOOL_PAGES.length + BLOG_PAGES.length + LEGAL_PAGES.length;
console.log(`✓ Wrote ${OUTPUT}`);
console.log(`  ${staticCount} static pages`);
console.log(`  ${communityCount} community pages (canonical /locations/... URLs)`);
console.log(`  ${locationCount} location pages`);
console.log(`  Total: ${staticCount + communityCount + locationCount} URLs`);
