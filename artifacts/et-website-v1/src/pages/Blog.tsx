import { useState, useMemo } from "react";
import { Link, useSearch, useLocation } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";
import { ACTIVE_CATEGORIES, getCategoryBySlug } from "@/lib/blog/categories";

const BLOG_BG = `${import.meta.env.BASE_URL}images/general/blog-bg.jpg`;
const POSTS_PER_PAGE = 12;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function PostCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <article className="group relative overflow-hidden border border-[#2a2a2a] hover:border-secondary transition-colors" style={{ paddingBottom: "75%" }}>
      {/* Background — image or pure black */}
      {post.img ? (
        <img
          src={post.img}
          alt={post.imgAlt ?? post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[#121212]" />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Title only */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="font-sans font-bold text-white text-lg leading-snug group-hover:text-secondary transition-colors">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default function Blog() {
  const searchStr = useSearch();
  const [, navigate] = useLocation();
  const params = new URLSearchParams(searchStr);

  const activeCategory = params.get("category") ?? "all";
  const searchQuery = params.get("q") ?? "";
  const currentPage = Math.max(1, parseInt(params.get("page") ?? "1", 10));

  const [localQ, setLocalQ] = useState(searchQuery);

  function pushParams(overrides: Record<string, string>) {
    const next = new URLSearchParams(searchStr);
    Object.entries(overrides).forEach(([k, v]) => {
      if (v) next.set(k, v); else next.delete(k);
    });
    next.delete("page");
    navigate(`/blog?${next.toString()}`);
  }

  const filtered = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory !== "all") {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return [...posts].sort((a, b) => b.date.localeCompare(a.date));
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const visible = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  // Build a real, crawlable href for a given page while preserving the active
  // category/search filters. Rendered via wouter <Link> so bots see a normal
  // <a href="/blog?page=N"> and the SPA still navigates client-side.
  function pageHref(n: number) {
    const next = new URLSearchParams(searchStr);
    next.set("page", String(n));
    return `/blog?${next.toString()}`;
  }

  function onPageClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    pushParams({ q: localQ, category: activeCategory === "all" ? "" : activeCategory });
  }

  return (
    <PageLayout>
      <SEO
        title="Property Management Blog | Cincinnati &amp; Dayton | EquityTeam"
        description="Property management tips for Cincinnati &amp; Dayton landlords. Insights on leasing, maintenance, Ohio rental law, market updates, and vacation rentals."
        canonical="/blog"
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
      />

      {/* Hero */}
      <section
        className="relative z-10 px-5 xl:px-0 pt-28 pb-14 md:pt-56 md:pb-32 bg-no-repeat bg-cover bg-center bg-[#121212b3] bg-blend-multiply"
        style={{ backgroundImage: `url('${BLOG_BG}')` }}
      >
        <div className="max-w-screen-xl mx-auto relative">
          <div className="w-12 h-px bg-secondary mb-5" />
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-6 text-3xl md:text-7xl">
            Blog
          </h1>
          <p className="font-cordo italic text-white/80 text-xl md:text-2xl max-w-xl">
            Insights for property owners, renters, vacation rental hosts, and guests — from the EquityTeam team.
          </p>
        </div>
      </section>

      {/* Category pills + search */}
      <div className="bg-[#121212] border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Pills — scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 flex-1 min-w-0 no-scrollbar">
            <button
              onClick={() => pushParams({ category: "", q: searchQuery })}
              className={`flex-shrink-0 text-base font-bold tracking-[0.12em] uppercase px-3 py-1.5 border transition-colors ${activeCategory === "all" ? "bg-white border-white text-black" : "border-white/20 text-white/50 hover:border-white hover:text-white"}`}
            >
              All
            </button>
            {ACTIVE_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => pushParams({ category: cat.slug, q: searchQuery })}
                className={`flex-shrink-0 text-base font-bold tracking-[0.12em] uppercase px-3 py-1.5 border transition-colors ${activeCategory === cat.slug ? "bg-white border-white text-black" : "border-white/20 text-white/50 hover:border-white hover:text-white"}`}
              >
                {cat.displayName}
              </button>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-shrink-0">
            <input
              type="search"
              value={localQ}
              onChange={(e) => setLocalQ(e.target.value)}
              placeholder="Search posts…"
              className="border border-white/20 bg-[#1c1c1c] text-white placeholder:text-white/30 text-base px-3 py-1.5 w-full sm:w-44 focus:outline-none focus:border-secondary transition-colors"
            />
            <button type="submit" className="bg-secondary text-black text-base font-bold px-3 py-1.5 hover:bg-secondary/90 transition-colors">
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="bg-[#121212] min-h-[60vh]">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-12 md:py-16">

          {/* Result count */}
          <p className="font-sans font-semibold text-base text-white/40 tracking-[0.18em] uppercase mb-8" aria-live="polite">
            {filtered.length === 0
              ? "No posts match your filters"
              : `${filtered.length} post${filtered.length === 1 ? "" : "s"}${activeCategory !== "all" ? ` in ${getCategoryBySlug(activeCategory)?.displayName ?? activeCategory}` : ""}${searchQuery ? ` matching "${searchQuery}"` : ""}`}
          </p>

          {visible.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visible.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-sans text-white/60 mb-3">No posts match your filters right now.</p>
              <p className="font-sans text-white/60 text-base mb-6">New posts are added regularly — try clearing a filter or searching a different term.</p>
              <button
                onClick={() => { setLocalQ(""); pushParams({ category: "", q: "" }); }}
                className="inline-block font-sans text-base font-bold text-secondary hover:underline"
              >
                Clear all filters →
              </button>
            </div>
          )}

          {/* Pagination — real anchors (/blog?page=N) so paginated posts are crawlable */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-1" aria-label="Blog pagination">
              {safePage > 1 ? (
                <Link
                  href={pageHref(safePage - 1)}
                  onClick={onPageClick}
                  className="px-3 py-2 text-base font-bold border border-white/20 text-white/50 hover:border-secondary hover:text-secondary transition-colors"
                  aria-label="Previous page"
                >
                  ‹
                </Link>
              ) : (
                <span
                  className="px-3 py-2 text-base font-bold border border-white/20 text-white/20 cursor-default"
                  aria-disabled="true"
                  aria-label="Previous page"
                >
                  ‹
                </span>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
                n === safePage ? (
                  <span
                    key={n}
                    aria-current="page"
                    className="px-3 py-2 text-base font-bold border bg-secondary border-secondary text-black"
                  >
                    {n}
                  </span>
                ) : (
                  <Link
                    key={n}
                    href={pageHref(n)}
                    onClick={onPageClick}
                    className="px-3 py-2 text-base font-bold border border-white/20 text-white/50 hover:border-secondary hover:text-secondary transition-colors"
                  >
                    {n}
                  </Link>
                )
              )}
              {safePage < totalPages ? (
                <Link
                  href={pageHref(safePage + 1)}
                  onClick={onPageClick}
                  className="px-3 py-2 text-base font-bold border border-white/20 text-white/50 hover:border-secondary hover:text-secondary transition-colors"
                  aria-label="Next page"
                >
                  ›
                </Link>
              ) : (
                <span
                  className="px-3 py-2 text-base font-bold border border-white/20 text-white/20 cursor-default"
                  aria-disabled="true"
                  aria-label="Next page"
                >
                  ›
                </span>
              )}
            </nav>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
