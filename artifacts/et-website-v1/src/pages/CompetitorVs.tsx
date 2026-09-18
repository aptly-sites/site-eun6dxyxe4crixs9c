import { useRoute } from "wouter";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import NotFound from "@/pages/not-found";
import { getCompetitor } from "@/data/competitors";

const GOLD = "#B4975A";

function StarIcon() {
  return (
    <svg width="22" height="21" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.87735 25.3333L8.04401 15.9667L0.777344 9.66667L10.3773 8.83333L14.1107 0L17.844 8.83333L27.444 9.66667L20.1773 15.9667L22.344 25.3333L14.1107 20.3667L5.87735 25.3333Z" fill={GOLD} />
    </svg>
  );
}

export default function CompetitorVs() {
  const [, params] = useRoute<{ competitor: string }>(
    "/residential-property-management/equityteam-vs-:competitor"
  );
  const slug = params?.competitor ?? "";
  const c = getCompetitor(slug);

  if (!c) return <NotFound />;

  const pageTitle = `EquityTeam vs. ${c.name} | Property Management Comparison`;

  return (
    <PageLayout>
      <SEO
        title={pageTitle}
        description={c.metaDescription}
        canonical={`/residential-property-management/equityteam-vs-${c.slug}`}
      />

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="bg-primary pt-32 md:pt-40 pb-16 md:pb-20 px-5">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="font-sans font-semibold text-sm tracking-[0.18em] text-secondary uppercase mb-5">
            Compare property managers
          </p>
          <h1 className="uppercase font-cowling font-bold text-white text-[36px] md:text-[56px] leading-[1.1] tracking-[0.02em] mb-6 max-w-4xl mx-auto">
            EquityTeam vs. {c.name}
          </h1>
          <p className="font-marseille text-white/80 text-[20px] md:text-[24px] leading-snug max-w-3xl mx-auto">
            Which is right for your property?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
            <Link href="/contact-us" className="btn-solid-secondary uppercase">
              Schedule a Free Consult
            </Link>
            <a href="#comparison" className="cta-secondary text-white hover:text-secondary">
              See the comparison <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. QUICK VERDICT
      ══════════════════════════════════════ */}
      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-heading text-black mb-6">The quick verdict</h2>
          <p className="font-sans text-black/80 text-lg leading-relaxed">
            {c.verdict}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. COMPARISON TABLE
      ══════════════════════════════════════ */}
      <section id="comparison" className="bg-primary section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4">
              Side-by-side comparison
            </h2>
            <p className="font-sans text-white/70 text-base max-w-2xl mx-auto">
              The same owner-outcome frame applied to both providers. Where a specific competitor data point is not independently verifiable, we frame it as typical for the category.
            </p>
          </div>

          <div className="max-w-5xl mx-auto border border-secondary/40">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-secondary/10 border-b border-secondary/40">
              <div className="px-4 md:px-6 py-4">
                <span className="font-sans font-bold text-base tracking-[0.12em] text-white/60 uppercase">Feature</span>
              </div>
              <div className="px-4 md:px-6 py-4 md:text-center md:border-l border-secondary/40">
                <span className="font-sans font-bold text-base tracking-[0.12em] text-secondary uppercase">EquityTeam</span>
              </div>
              <div className="px-4 md:px-6 py-4 md:text-center md:border-l border-secondary/40">
                <span className="font-sans font-bold text-base tracking-[0.12em] text-white/60 uppercase">{c.shortName}</span>
              </div>
            </div>

            {c.rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10 last:border-b-0"
              >
                <div className="px-4 md:px-6 py-4 md:border-r border-white/10">
                  <p className="font-sans font-semibold text-base text-white/90 leading-snug m-0">
                    {row.feature}
                  </p>
                </div>
                <div className="px-4 md:px-6 py-4 md:border-r border-white/10">
                  <p className="font-sans text-base text-secondary leading-snug m-0">
                    {row.et}
                  </p>
                </div>
                <div className="px-4 md:px-6 py-4">
                  <p className="font-sans text-base text-white/60 leading-snug m-0">
                    {row.competitor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. WHERE WE DIFFER
      ══════════════════════════════════════ */}
      <section className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-black mb-4">Where we differ</h2>
            <p className="font-sans text-black/70 text-base max-w-2xl mx-auto">
              A few places EquityTeam takes a meaningfully different approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {c.diffs.map((d) => (
              <div
                key={d.title}
                className="border border-black/15 p-8 hover:border-secondary transition-colors duration-200"
              >
                <h3 className="font-cowling font-bold text-2xl text-black tracking-[0.02em] mb-3">
                  {d.title}
                </h3>
                <p className="font-sans text-base text-black/70 leading-relaxed m-0">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. WHAT OWNERS SAY
      ══════════════════════════════════════ */}
      <section className="bg-primary section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4">What owners say</h2>
            <p className="font-sans text-white/70 text-base max-w-2xl mx-auto">
              A few EquityTeam owner reviews that speak to the differences above.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {c.reviews.map((r, i) => (
              <div
                key={i}
                className="border border-white/15 bg-white/5 px-6 py-10 text-center hover:border-secondary transition-colors duration-200"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, si) => <StarIcon key={si} />)}
                </div>
                <p className="font-sans text-base leading-relaxed text-white/80 mb-6">
                  "{r.text}"
                </p>
                <p className="font-sans font-bold text-base text-white">{r.author}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.google.com/search?q=EquityTeam+Cincinnati+OH+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-semibold text-base tracking-[0.18em] uppercase text-secondary hover:text-white transition-colors"
            >
              Read all Google reviews <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. CTA
      ══════════════════════════════════════ */}
      <GoldBorderCTA
        title="See how we compare to your current manager."
        btnLabel="Schedule a Free Consult"
        btnHref="/contact-us"
      />

      {/* ══════════════════════════════════════
          7. DISCLAIMER
      ══════════════════════════════════════ */}
      <section className="bg-white pt-10 pb-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-sm text-black/50 leading-relaxed m-0">
            Information based on publicly available data as of {c.dataAsOf}, including the competitor's website, public pricing, and Google reviews. Specific terms vary by location and may change.{" "}
            <Link href="/contact-us" className="underline hover:text-secondary">
              Contact us for a current comparison.
            </Link>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
