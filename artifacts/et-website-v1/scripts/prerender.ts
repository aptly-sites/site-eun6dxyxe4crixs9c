/* ────────────────────────────────────────────────────────────
   Prerender selected routes to static HTML using the SSR build.

   Reads dist/public/index.html as the shell, invokes the SSR
   render() for each route in ROUTES, splices the rendered head
   (canonical, og tags, JSON-LD) into <!--ssr-head--> and the
   rendered body into #root, then writes:

     dist/public/<path>/index.html

   Vercel serves these static files before falling back to the
   SPA rewrite, so crawlers and AI engines get the full content
   in the initial HTML response.
   ──────────────────────────────────────────────────────────── */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CLIENT_DIR = path.join(ROOT, "dist", "public");
const SERVER_ENTRY = path.join(ROOT, "dist", "server", "entry-server.js");

/**
 * Blog post slugs, read straight from the source data at build time. We
 * text-parse rather than `import` blogPosts.ts because that module references
 * import.meta.env.BASE_URL, which only resolves inside Vite (importing it here
 * breaks the build) — the same reason scripts/generate-sitemap.ts text-parses.
 * This auto-syncs: add or remove a post and its detail page prerenders (or
 * stops) with no other edit. No hardcoded list to maintain.
 */
async function getBlogSlugs(): Promise<string[]> {
  const src = await fs.readFile(path.join(ROOT, "src", "data", "blogPosts.ts"), "utf-8");
  const start = src.indexOf("export const blogPosts");
  const body = start >= 0 ? src.slice(start) : src;
  return [...new Set([...body.matchAll(/\n\s*slug:\s*"([^"]+)"/g)].map((m) => m[1]))];
}

async function addRentalRoutesToSitemap(routes: string[], lastModified?: unknown) {
  if (routes.length === 0) return;
  const sitemapPath = path.join(CLIENT_DIR, "sitemap.xml");
  let xml = await fs.readFile(sitemapPath, "utf-8");
  const existing = new Set(
    [...xml.matchAll(/<loc>https:\/\/www\.equityteam\.com([^<]*)<\/loc>/g)].map((m) => m[1]),
  );
  const parsedLastmod = lastModified ? new Date(lastModified as string | number | Date) : null;
  const lastmod = parsedLastmod && !Number.isNaN(parsedLastmod.getTime())
    ? parsedLastmod.toISOString().slice(0, 10)
    : undefined;
  const blocks = [...new Set(routes)]
    .filter((route) => !existing.has(route))
    .map((route) => {
      const isListing = route.split("/").filter(Boolean).length >= 6;
      return [
        "  <url>",
        `    <loc>https://www.equityteam.com${route}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        "    <changefreq>daily</changefreq>",
        `    <priority>${isListing ? "0.8" : "0.7"}</priority>`,
        "  </url>",
      ].join("\n");
    });
  if (blocks.length === 0) return;
  xml = xml.replace(
    "</urlset>",
    `  <!-- Live rental inventory and city landing pages -->\n${blocks.join("\n")}\n\n</urlset>`,
  );
  await fs.writeFile(sitemapPath, xml, "utf-8");
  console.log(`Added ${blocks.length} live rental URLs to dist/public/sitemap.xml.`);
}

async function main() {
  const shell = await fs.readFile(path.join(CLIENT_DIR, "index.html"), "utf-8");

  const mod = await import(pathToFileURL(SERVER_ENTRY).href);
  if (typeof mod.render !== "function") {
    throw new Error("SSR entry has no exported render() function");
  }
  if (typeof mod.getPrerenderRoutes !== "function") {
    throw new Error("SSR entry has no exported getPrerenderRoutes() function");
  }

  /* The route list is generated programmatically (see
     src/lib/prerenderRoutes.ts) from the same location data the router maps
     over, so new location pages are prerendered automatically with no edit
     here. Genuinely dynamic routes (/blog/:slug, competitor pages) and pure
     redirects are intentionally excluded there. */
  const baseRoutes: string[] = mod.getPrerenderRoutes();
  if (!Array.isArray(baseRoutes) || baseRoutes.length === 0) {
    throw new Error("getPrerenderRoutes() returned no routes");
  }
  // Blog post detail pages — slugs read from source data at build time so the
  // list auto-syncs when posts are added/removed (no hardcoded list).
  const blogRoutes = (await getBlogSlugs()).map((slug) => `/blog/${slug}`);
  const rentalData = await mod.loadRentalData('/for-rent');
  if (rentalData?.error) console.warn('Aptly is unavailable; rental pages will load inventory in the browser.');
  const rentalRoutes: string[] = rentalData?.listings?.flatMap((listing: any) => [mod.listingPath(listing), mod.cityPath(listing)]) || [];
  const ROUTES: string[] = [...new Set([...baseRoutes, ...blogRoutes, ...rentalRoutes])];
  await addRentalRoutesToSitemap(rentalRoutes, rentalData?.asOf);
  console.log(`Prerendering ${ROUTES.length} routes (incl. ${blogRoutes.length} blog posts)…`);

  let okCount = 0;
  for (const route of ROUTES) {
    try {
      // base "" (not "/") so prerendered <Link> hrefs are "/path", not "//path"
      // (must match the client router base in App.tsx, which is BASE_URL sans trailing slash → "")
      const pageRentals = route.startsWith("/for-rent") ? await mod.loadRentalData(route) : undefined;
      const { html, headHtml, dataHtml } = mod.render(route, "", pageRentals);

      let out = shell;
      // When the SSR head supplies its own <title>, drop the shell's static
      // default <title> so the page ends up with a single, per-page title.
      // (Crawlers use the first <title> in document order; leaving the default
      // in would mask every per-page title.)
      if (/<title\b[^>]*>/i.test(headHtml)) {
        out = out.replace(/\s*<title\b[^>]*>[\s\S]*?<\/title>/i, "");
      }
      // Splice rendered head before </head> (preferring the ssr-head marker)
      if (out.includes("<!--ssr-head-->")) {
        out = out.replace("<!--ssr-head-->", headHtml + dataHtml);
      } else {
        out = out.replace("</head>", `    ${headHtml}${dataHtml}\n  </head>`);
      }
      // Splice rendered body into the empty #root container
      out = out.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );

      const outDir = path.join(CLIENT_DIR, route.replace(/^\/+/, ""));
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, "index.html"), out, "utf-8");
      console.log(`  ✓ ${route} → ${path.relative(ROOT, outDir)}/index.html`);
      okCount++;
    } catch (err) {
      console.error(`  ✗ ${route} — ${(err as Error).message}`);
      process.exitCode = 1;
    }
  }
  console.log(`Prerendered ${okCount}/${ROUTES.length} routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
