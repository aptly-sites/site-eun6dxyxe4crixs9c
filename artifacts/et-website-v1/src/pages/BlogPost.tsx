import { useParams, Link, Redirect } from "wouter";
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { getBlogPost, blogPosts } from "@/data/blogPosts";
import { blogContent } from "@/data/blogContent";
import { BlogCta } from "@/lib/blog/ctas";
import { getCategoryBySlug } from "@/lib/blog/categories";
import { SITE_URL } from "@/lib/siteUrl";

const VIEW_COUNTER_SLUGS = new Set([
  "renter-homeowner-assistance-programs-cincinnati-dayton",
  "smoke-co-detector-compliance-ohio",
]);

function usePostViewCount(slug: string): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!VIEW_COUNTER_SLUGS.has(slug)) return;
    let cancelled = false;
    fetch(`/api/blog-views/${encodeURIComponent(slug)}`, {
      method: "POST",
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data: { count: number }) => {
        if (!cancelled) setCount(data.count);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  return count;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function buildFaqSchema(html: string): object | null {
  const faqStart = html.indexOf("<h2>Frequently Asked Questions</h2>");
  if (faqStart === -1) return null;

  const afterFaq = html.slice(faqStart);
  const pairs: Array<{ q: string; a: string }> = [];
  const re = /<p><strong>(.*?)<\/strong><br\s*\/?>([\s\S]*?)<\/p>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(afterFaq)) !== null) {
    const q = m[1].replace(/<[^>]+>/g, "").trim();
    const a = m[2].replace(/<[^>]+>/g, "").trim();
    if (q && a) pairs.push({ q, a });
  }
  if (pairs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function withLazyImages(html: string): string {
  return html.replace(/<img(\s)/gi, '<img loading="lazy"$1');
}

function withScrollableTables(html: string): string {
  return html.replace(
    /<table(\s|>)/gi,
    '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:1.5rem"><table$1'
  ).replace(/<\/table>/gi, '</table></div>');
}

function clampDesc(d: string): string {
  if (!d || d.length <= 160) return d;
  return d.slice(0, 157).replace(/\s+\S*$/, "").trim() + "\u2026";
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  const viewCount = usePostViewCount(slug ?? "");

  if (!post) return <Redirect href="/blog" />;

  const body = blogContent[post.slug];
  const cat = getCategoryBySlug(post.category);

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.img ? (post.img.startsWith("http") ? post.img : `${SITE_URL}${post.img}`) : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      "@type": "Person",
      name: post.author,
      worksFor: {
        "@type": "Organization",
        name: "EquityTeam Property Management",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "EquityTeam Property Management",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo/equityteam-logo.webp`,
      },
    },
    description: post.excerpt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const faqSchema = body ? buildFaqSchema(body) : null;
  const postSchemas: object[] = [blogPostingSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <PageLayout>
      <SEO
        title={post.seoTitle ?? `${post.title} | EquityTeam Blog`}
        description={clampDesc(post.metaDescription ?? post.excerpt)}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.img}
        ogImageAlt={post.imgAlt ?? post.title}
        author={post.author}
        publishedTime={post.date}
        modifiedTime={post.updatedAt ?? post.date}
        section={cat?.displayName ?? post.category}
        tags={post.tags}
        schemas={postSchemas}
        breadcrumbs={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <section
        className="relative pt-24 pb-14 md:pt-52 md:pb-32 overflow-hidden bg-[#121212]"
      >
        {/* Photo layer */}
        {post.img && (
          <img
            src={post.img}
            alt={post.imgAlt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
        {/* Gradient overlay — light at top, darker at bottom for WCAG AA contrast */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.72))" }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 xl:px-0">
          <nav className="text-base text-white/50 mb-8 flex items-center justify-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-secondary transition-colors">Blog</Link>
            {cat && (
              <>
                <span>/</span>
                <Link href={`/blog?category=${cat.slug}`} className="hover:text-secondary transition-colors">{cat.displayName}</Link>
              </>
            )}
            <span>/</span>
            <span className="text-white/70 truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="max-w-[760px] mx-auto text-center">
            {cat && (
              <p className="text-base font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-white/80">
                {cat.displayName}
              </p>
            )}
            <div className="w-12 h-px bg-secondary mb-5 mx-auto" />
            <h1 className="font-cowling font-bold text-2xl md:text-6xl text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-[#121212]">
        <div className="max-w-3xl mx-auto px-5">

          {/* Post metadata row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-8 text-sm font-sans text-white/40">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} read</span>
            {viewCount !== null && VIEW_COUNTER_SLUGS.has(post.slug) && (
              <>
                <span aria-hidden="true">·</span>
                <span>{viewCount.toLocaleString()} views</span>
              </>
            )}
          </div>

          {body ? (
            <div
              className="prose prose-lg max-w-none prose-h2:font-display prose-h2:font-normal prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:tracking-tight prose-h2:text-left prose-h3:font-display prose-h3:font-normal prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-left prose-h4:font-sans prose-h4:font-semibold prose-h4:uppercase prose-h4:tracking-[0.20em] prose-h4:text-left prose-headings:text-secondary prose-p:text-white/75 prose-p:leading-relaxed prose-p:font-sans prose-li:text-white/75 prose-li:font-sans prose-ul:my-4 prose-ol:my-4 prose-strong:text-white prose-strong:font-semibold prose-a:text-secondary prose-a:no-underline prose-a:hover:underline prose-img:w-full prose-img:max-w-full prose-img:my-10 prose-img:object-cover prose-figure:my-10 prose-figure:mx-0 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:font-sans prose-figcaption:text-white/40 prose-figcaption:mt-3"
              dangerouslySetInnerHTML={{ __html: withScrollableTables(withLazyImages(body)) }}
            />
          ) : (
            <p className="text-lg font-sans text-black/60 leading-relaxed mb-10">{post.excerpt}</p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?q=${encodeURIComponent(tag)}`}
                  className="text-base font-bold uppercase tracking-wider px-3 py-1 border border-white/20 text-white/50 hover:border-secondary hover:text-secondary transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Audience-aware CTA */}
          <BlogCta name={post.cta} />

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-4">
              <p className="text-base font-sans font-semibold tracking-[0.28em] uppercase mb-5 text-secondary">
                Related Articles
              </p>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group block border border-white/10 p-4 hover:border-secondary transition-colors"
                  >
                    <p className="text-base font-sans text-white/40 mb-1">{p.readTime} read</p>
                    <h4 className="font-sans font-semibold text-white text-base leading-snug group-hover:text-secondary transition-colors">
                      {p.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-white/10">
            <Link href="/blog" className="font-sans font-semibold text-base text-secondary hover:underline transition-colors">
              ← Back to All Posts
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
