/**
 * Audits the generated HTML that search engines and answer engines receive.
 * This intentionally checks build output rather than React source.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "dist", "public");

async function findHtml(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return findHtml(full);
    return entry.name === "index.html" ? [full] : [];
  }));
  return nested.flat();
}

function matches(html: string, pattern: RegExp) {
  return [...html.matchAll(pattern)];
}

async function main() {
  const files = await findHtml(PUBLIC_DIR);
  const errors: string[] = [];
  const canonicalOwners = new Map<string, string>();

  for (const file of files) {
    const route = "/" + path.relative(PUBLIC_DIR, path.dirname(file)).replaceAll(path.sep, "/");
    const html = await fs.readFile(file, "utf-8");
    const titles = matches(html, /<title>([\s\S]*?)<\/title>/gi);
    const descriptions = matches(html, /<meta\s+name="description"\s+content="([^"]*)"/gi);
    const canonicals = matches(html, /<link\s+rel="canonical"\s+href="([^"]*)"/gi);
    const robots = matches(html, /<meta\s+name="robots"\s+content="([^"]*)"/gi);
    const h1s = matches(html, /<h1\b/gi);
    const jsonLd = matches(html, /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);

    if (titles.length !== 1 || !titles[0]?.[1]?.trim()) errors.push(`${route}: expected one non-empty title`);
    if (descriptions.length !== 1 || descriptions[0][1].length < 50) errors.push(`${route}: missing or short meta description`);
    if (canonicals.length !== 1) errors.push(`${route}: expected one canonical URL`);
    if (robots.length !== 1) errors.push(`${route}: expected one robots directive`);
    if (h1s.length !== 1) errors.push(`${route}: expected one H1, found ${h1s.length}`);
    if (jsonLd.length === 0) errors.push(`${route}: missing JSON-LD`);

    for (const [, payload] of jsonLd) {
      try { JSON.parse(payload); }
      catch { errors.push(`${route}: invalid JSON-LD`); }
    }

    const canonical = canonicals[0]?.[1];
    if (canonical) {
      const owner = canonicalOwners.get(canonical);
      if (owner && owner !== route) errors.push(`${route}: canonical duplicates ${owner} (${canonical})`);
      else canonicalOwners.set(canonical, route);
    }
  }

  const sitemap = await fs.readFile(path.join(PUBLIC_DIR, "sitemap.xml"), "utf-8");
  const sitemapUrls = matches(sitemap, /<loc>([^<]+)<\/loc>/g).map((m) => m[1]);
  if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push("sitemap.xml: duplicate URLs");

  if (errors.length) {
    console.error(`SEO build audit failed with ${errors.length} issue(s):`);
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(`SEO build audit passed: ${files.length} prerendered pages, ${sitemapUrls.length} sitemap URLs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
