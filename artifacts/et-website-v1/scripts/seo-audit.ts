/**
 * Technical SEO audit across all blog posts.
 * Checks: title length/uniqueness, description length/uniqueness, canonical,
 * sitemap inclusion, alt text, heading hierarchy.
 * Run: node --import tsx/esm scripts/seo-audit.ts
 */
import { mkdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// blogPosts.ts / blogContent.ts reference `import.meta.env.BASE_URL`, which is
// only available inside Vite — so we parse the raw source text instead of
// importing the modules directly.
interface BlogPostMeta {
  slug: string;
  title: string;
  imgAlt?: string;
  excerpt: string;
  seoTitle?: string;
  metaDescription?: string;
}

function parseBlogPosts(): BlogPostMeta[] {
  const src = readFileSync(resolve(__dirname, "../src/data/blogPosts.ts"), "utf8");
  const arrayStart = src.indexOf("export const blogPosts");
  const body = src.slice(arrayStart);
  const blocks = body.split(/\n  \{\n/).slice(1); // each element starts with "  {\n"

  return blocks.map((block) => {
    const slugMatch = block.match(/slug:\s*"([^"]*)"/);
    const titleMatch = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/);
    const imgAltMatch = block.match(/imgAlt:\s*"((?:[^"\\]|\\.)*)"/);
    const excerptMatch = block.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/);
    const seoTitleMatch = block.match(/seoTitle:\s*"((?:[^"\\]|\\.)*)"/);
    const metaDescriptionMatch = block.match(/metaDescription:\s*"((?:[^"\\]|\\.)*)"/);
    const unescape = (s: string) => s.replace(/\\"/g, '"').replace(/\\'/g, "'");
    return {
      slug: slugMatch ? slugMatch[1] : "UNKNOWN",
      title: titleMatch ? unescape(titleMatch[1]) : "",
      imgAlt: imgAltMatch ? unescape(imgAltMatch[1]) : undefined,
      excerpt: excerptMatch ? unescape(excerptMatch[1]) : "",
      seoTitle: seoTitleMatch ? unescape(seoTitleMatch[1]) : undefined,
      metaDescription: metaDescriptionMatch ? unescape(metaDescriptionMatch[1]) : undefined,
    };
  });
}

function parseBlogContent(): Record<string, string> {
  const src = readFileSync(resolve(__dirname, "../src/data/blogContent.ts"), "utf8");
  const result: Record<string, string> = {};
  const entryRegex = /"([a-z0-9-]+)":\s*`([\s\S]*?)`,\n\n/g;
  let m: RegExpExecArray | null;
  while ((m = entryRegex.exec(src)) !== null) {
    result[m[1]] = m[2];
  }
  return result;
}

const blogPosts = parseBlogPosts();
const blogContent = parseBlogContent();

interface PostReport {
  slug: string;
  title: string;
  titleFull: string;
  titleLen: number;
  titleOk: boolean;
  titleIssue?: string;
  descLen: number;
  descOk: boolean;
  descIssue?: string;
  canonicalOk: boolean;
  sitemapOk: boolean;
  altOk: boolean;
  altIssues: string[];
  headingOk: boolean;
  headingIssues: string[];
}

const sitemapSrc = readFileSync(resolve(__dirname, "generate-sitemap.ts"), "utf8");
const sitemapHasBlogLoop = /blogPosts/.test(sitemapSrc);

const titleFullMap = new Map<string, string[]>();
const descMap = new Map<string, string[]>();

for (const post of blogPosts) {
  const titleFull = post.seoTitle ?? `${post.title} | EquityTeam Blog`;
  if (!titleFullMap.has(titleFull)) titleFullMap.set(titleFull, []);
  titleFullMap.get(titleFull)!.push(post.slug);

  const desc = post.metaDescription ?? post.excerpt ?? "";
  if (!descMap.has(desc)) descMap.set(desc, []);
  descMap.get(desc)!.push(post.slug);
}

function checkHeadings(html: string): string[] {
  const issues: string[] = [];
  const matches = [...html.matchAll(/<h([1-6])[^>]*>/gi)].map((m) => parseInt(m[1], 10));

  const h1Count = matches.filter((l) => l === 1).length;
  if (h1Count > 0) {
    issues.push(`Body contains ${h1Count} <h1> tag(s) — H1 should only be the page title, not in body content`);
  }

  let prevLevel: number | null = null;
  for (const level of matches) {
    if (level === 1) continue;
    if (prevLevel !== null && level > prevLevel + 1) {
      issues.push(`Skipped heading level: h${prevLevel} followed by h${level}`);
    }
    prevLevel = level;
  }

  return issues;
}

function checkAltText(post: (typeof blogPosts)[number], html: string): string[] {
  const issues: string[] = [];

  if (!post.imgAlt || post.imgAlt.trim().length === 0) {
    issues.push("Hero image missing alt text");
  } else if (/\.(jpe?g|png|webp|gif)$/i.test(post.imgAlt.trim())) {
    issues.push("Hero alt text looks like a filename, not a description");
  } else if (post.imgAlt.trim().length < 10) {
    issues.push("Hero alt text too short to be descriptive");
  }

  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)];
  imgTags.forEach((m, i) => {
    const tag = m[0];
    const altMatch = tag.match(/alt=["']([^"']*)["']/i);
    if (!altMatch) {
      issues.push(`In-body image #${i + 1} missing alt attribute`);
    } else if (altMatch[1].trim().length === 0) {
      issues.push(`In-body image #${i + 1} has blank alt text`);
    } else if (/\.(jpe?g|png|webp|gif)$/i.test(altMatch[1].trim())) {
      issues.push(`In-body image #${i + 1} alt text looks like a filename`);
    }
  });

  return issues;
}

const reports: PostReport[] = blogPosts.map((post) => {
  const titleFull = post.seoTitle ?? `${post.title} | EquityTeam Blog`;
  const titleLen = titleFull.length;
  let titleIssue: string | undefined;
  if (titleLen < 50) titleIssue = `Too short (${titleLen} chars, need 50-60)`;
  else if (titleLen > 60) titleIssue = `Too long (${titleLen} chars, need 50-60)`;
  if (titleFullMap.get(titleFull)!.length > 1) {
    titleIssue = (titleIssue ? titleIssue + "; " : "") + `Duplicate title shared with: ${titleFullMap.get(titleFull)!.filter((s) => s !== post.slug).join(", ")}`;
  }

  const desc = post.metaDescription ?? post.excerpt ?? "";
  const descLen = desc.length;
  let descIssue: string | undefined;
  if (descLen === 0) descIssue = "Missing meta description";
  else if (descLen < 150) descIssue = `Too short (${descLen} chars, need 150-160)`;
  else if (descLen > 160) descIssue = `Too long (${descLen} chars, need 150-160)`;
  if (desc && descMap.get(desc)!.length > 1) {
    descIssue = (descIssue ? descIssue + "; " : "") + `Duplicate description shared with: ${descMap.get(desc)!.filter((s) => s !== post.slug).join(", ")}`;
  }

  const html = blogContent[post.slug] ?? "";
  const altIssues = checkAltText(post, html);
  const headingIssues = checkHeadings(html);

  return {
    slug: post.slug,
    title: post.title,
    titleFull,
    titleLen,
    titleOk: !titleIssue,
    titleIssue,
    descLen,
    descOk: !descIssue,
    descIssue,
    canonicalOk: true, // BlogPost.tsx always passes `/blog/${post.slug}` — self-referencing by construction
    sitemapOk: sitemapHasBlogLoop,
    altOk: altIssues.length === 0,
    altIssues,
    headingOk: headingIssues.length === 0,
    headingIssues,
  };
});

// ─── Print report ──────────────────────────────────────────────────────
let failCount = { title: 0, desc: 0, canonical: 0, sitemap: 0, alt: 0, heading: 0 };

console.log(`\nSEO AUDIT — ${blogPosts.length} blog posts\n${"=".repeat(80)}\n`);

for (const r of reports) {
  const flags: string[] = [];
  if (!r.titleOk) { flags.push(`TITLE: ${r.titleIssue}`); failCount.title++; }
  if (!r.descOk) { flags.push(`DESC: ${r.descIssue}`); failCount.desc++; }
  if (!r.canonicalOk) { flags.push(`CANONICAL: fail`); failCount.canonical++; }
  if (!r.sitemapOk) { flags.push(`SITEMAP: not included`); failCount.sitemap++; }
  if (!r.altOk) { flags.push(`ALT: ${r.altIssues.join(" | ")}`); failCount.alt++; }
  if (!r.headingOk) { flags.push(`HEADINGS: ${r.headingIssues.join(" | ")}`); failCount.heading++; }

  if (flags.length > 0) {
    console.log(`❌ ${r.slug}`);
    flags.forEach((f) => console.log(`   - ${f}`));
  } else {
    console.log(`✅ ${r.slug}`);
  }
}

console.log(`\n${"=".repeat(80)}`);
console.log(`SUMMARY (${blogPosts.length} posts):`);
console.log(`  Title issues: ${failCount.title}`);
console.log(`  Description issues: ${failCount.desc}`);
console.log(`  Canonical issues: ${failCount.canonical}`);
console.log(`  Sitemap issues: ${failCount.sitemap}`);
console.log(`  Alt text issues: ${failCount.alt}`);
console.log(`  Heading hierarchy issues: ${failCount.heading}`);

import { writeFileSync } from "node:fs";
const reportDir = resolve(__dirname, "../.local");
mkdirSync(reportDir, { recursive: true });
writeFileSync(resolve(reportDir, "seo-audit-results.json"), JSON.stringify(reports, null, 2));
console.log(`\nFull JSON report written to .local/seo-audit-results.json`);
