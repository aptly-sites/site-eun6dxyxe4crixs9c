/**
 * Generates seoTitle / metaDescription overrides for posts that fail length
 * checks, and writes them into blogPosts.ts. Does not touch visible post
 * titles (H1) or excerpts (card previews) — only adds new optional fields
 * consumed by the SEO component.
 * Run: node --import tsx/esm scripts/seo-fix.ts [--apply]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_POSTS_PATH = resolve(__dirname, "../src/data/blogPosts.ts");
const BLOG_CONTENT_PATH = resolve(__dirname, "../src/data/blogContent.ts");
const APPLY = process.argv.includes("--apply");

interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  hasSeoTitle: boolean;
  hasMetaDescription: boolean;
}

function parseBlogPosts(src: string): BlogPostMeta[] {
  const arrayStart = src.indexOf("export const blogPosts");
  const body = src.slice(arrayStart);
  const blocks = body.split(/\n  \{\n/).slice(1);
  return blocks.map((block) => {
    const slugMatch = block.match(/slug:\s*"([^"]*)"/);
    const titleMatch = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/);
    const excerptMatch = block.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/);
    const unescape = (s: string) => s.replace(/\\"/g, '"').replace(/\\'/g, "'");
    return {
      slug: slugMatch ? slugMatch[1] : "UNKNOWN",
      title: titleMatch ? unescape(titleMatch[1]) : "",
      excerpt: excerptMatch ? unescape(excerptMatch[1]) : "",
      hasSeoTitle: /seoTitle:\s*"/.test(block),
      hasMetaDescription: /metaDescription:\s*"/.test(block),
    };
  });
}

function parseBlogContent(): Record<string, string> {
  const src = readFileSync(BLOG_CONTENT_PATH, "utf8");
  const result: Record<string, string> = {};
  const entryRegex = /"([a-z0-9-]+)":\s*`([\s\S]*?)`,\n\n/g;
  let m: RegExpExecArray | null;
  while ((m = entryRegex.exec(src)) !== null) result[m[1]] = m[2];
  return result;
}

function truncateAtWord(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut).trim();
}

function buildSeoTitle(title: string): { value: string; needsReview: boolean } {
  const suffixesToShrink = [" | EquityTeam Blog", " | EquityTeam", ""];
  for (const suf of suffixesToShrink) {
    const candidate = title + suf;
    if (candidate.length >= 50 && candidate.length <= 60) return { value: candidate, needsReview: false };
  }

  const fullLen = title.length + " | EquityTeam Blog".length;
  if (fullLen > 60) {
    // Title too long even with brand — truncate title, keep short suffix.
    for (const suf of [" | EquityTeam", ""]) {
      const maxTitleLen = 60 - suf.length;
      const truncated = truncateAtWord(title, maxTitleLen);
      const candidate = truncated + suf;
      if (candidate.length >= 50 && candidate.length <= 60) return { value: candidate, needsReview: false };
    }
    const truncated = truncateAtWord(title, 60);
    return { value: truncated, needsReview: truncated.length < 50 };
  }

  // Title (even bare) too short to reach 50 — grow with a longer, still-accurate suffix.
  const growSuffixes = [
    " Guide | EquityTeam",
    " | EquityTeam Property Management",
    " Guide | EquityTeam Blog",
    " | EquityTeam Cincinnati Property Management",
  ];
  for (const suf of growSuffixes) {
    const candidate = title + suf;
    if (candidate.length >= 50 && candidate.length <= 60) return { value: candidate, needsReview: false };
  }
  // Nothing fit cleanly — return best-effort and flag for manual review.
  const fallback = title + " | EquityTeam Property Management Blog";
  return { value: truncateAtWord(fallback, 60), needsReview: true };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function bodyParagraphs(html: string): string[] {
  const matches = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)];
  return matches.map((m) => stripHtml(m[1])).filter((t) => t.length > 0);
}

function truncateAtSentenceOrWord(text: string, maxLen: number, minLen = 0): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastPeriod = cut.lastIndexOf(". ");
  // Only prefer the sentence boundary if it still lands within the target
  // range — otherwise (e.g. the only period is the original short excerpt's)
  // it would collapse the text back down below minLen.
  if (lastPeriod > maxLen * 0.6 && lastPeriod + 1 >= minLen) {
    return cut.slice(0, lastPeriod + 1).trim();
  }
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut).trim();
}

function buildMetaDescription(excerpt: string, bodyHtml: string): { value: string; needsReview: boolean } {
  if (excerpt.length > 160) {
    const truncated = truncateAtSentenceOrWord(excerpt, 160, 150);
    return { value: truncated, needsReview: truncated.length < 150 };
  }

  if (excerpt.length >= 150) return { value: excerpt, needsReview: false };

  // Too short — extend using the post's own body paragraphs until it reaches 150+.
  const paragraphs = bodyParagraphs(bodyHtml);
  let extended = excerpt.trim();

  for (const para of paragraphs) {
    if (extended.length >= 150) break;
    const isRedundant = para.startsWith(extended.replace(/[.]$/, "")) || extended.includes(para.slice(0, 40));
    if (isRedundant) continue;
    const connector = extended.endsWith(".") ? " " : ". ";
    extended = extended + connector + para;
  }

  if (extended.length > 160) extended = truncateAtSentenceOrWord(extended, 160, 150);
  if (extended.length < 150) {
    return { value: extended, needsReview: true };
  }
  return { value: extended, needsReview: false };
}

// ─── Main ──────────────────────────────────────────────────────────────
const src = readFileSync(BLOG_POSTS_PATH, "utf8");
const posts = parseBlogPosts(src);
const blogContent = parseBlogContent();

interface Fix {
  slug: string;
  seoTitle?: string;
  metaDescription?: string;
  titleReview?: boolean;
  descReview?: boolean;
}

const fixes: Fix[] = [];

for (const post of posts) {
  const fix: Fix = { slug: post.slug };
  const currentTitleFull = `${post.title} | EquityTeam Blog`;

  if (!post.hasSeoTitle && (currentTitleFull.length < 50 || currentTitleFull.length > 60)) {
    const { value, needsReview } = buildSeoTitle(post.title);
    fix.seoTitle = value;
    fix.titleReview = needsReview;
  }

  if (!post.hasMetaDescription && (post.excerpt.length < 150 || post.excerpt.length > 160)) {
    const { value, needsReview } = buildMetaDescription(post.excerpt, blogContent[post.slug] ?? "");
    fix.metaDescription = value;
    fix.descReview = needsReview;
  }

  if (fix.seoTitle || fix.metaDescription) fixes.push(fix);
}

console.log(`\nGenerated fixes for ${fixes.length} posts.\n`);
const needsReview = fixes.filter((f) => f.titleReview || f.descReview);
console.log(`⚠️  ${needsReview.length} posts need manual review (auto-fix couldn't cleanly hit the target range):`);
for (const f of needsReview) {
  if (f.titleReview) console.log(`   - ${f.slug}: seoTitle "${f.seoTitle}" (${f.seoTitle!.length} chars) still outside 50-60`);
  if (f.descReview) console.log(`   - ${f.slug}: metaDescription (${f.metaDescription!.length} chars) still outside 150-160`);
}

if (APPLY) {
  let updated = src;
  for (const fix of fixes) {
    const escaped = fix.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const blockRegex = new RegExp(`(slug:\\s*"${escaped}"[\\s\\S]*?excerpt:\\s*"(?:[^"\\\\]|\\\\.)*",\\n)`);
    updated = updated.replace(blockRegex, (match, group1) => {
      let insertion = "";
      if (fix.seoTitle) insertion += `    seoTitle: ${JSON.stringify(fix.seoTitle)},\n`;
      if (fix.metaDescription) insertion += `    metaDescription: ${JSON.stringify(fix.metaDescription)},\n`;
      return group1 + insertion;
    });
  }
  writeFileSync(BLOG_POSTS_PATH, updated, "utf8");
  console.log(`\n✅ Applied ${fixes.length} fixes to blogPosts.ts`);
} else {
  console.log(`\nDry run only — pass --apply to write changes to blogPosts.ts`);
}

writeFileSync(resolve(__dirname, "../../../.local/seo-fixes.json"), JSON.stringify(fixes, null, 2));
