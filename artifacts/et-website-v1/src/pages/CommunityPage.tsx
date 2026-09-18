import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CommunityHero } from "@/components/CommunityHero";
import { MarketInsightsGrid } from "@/components/MarketInsightsGrid";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { NearbyAreasMap } from "@/components/NearbyAreasMap";
import { Star } from "@phosphor-icons/react";
import type { CommunityConfig } from "@/data/communityData";

const BASE = import.meta.env.BASE_URL;

const PARTNER_LOGOS: { src: string; alt: string; height: number; rating?: string }[] = [
  { src: `${BASE}images/badges/narpm.png`, alt: "National Association of REALTORS® member", height: 44 },
  { src: `${BASE}images/badges/bbb.png`, alt: "NARPM — National Association of Residential Property Managers member", height: 80 },
  { src: `${BASE}images/badges/naa.png`, alt: "National Apartment Association member", height: 46 },
  { src: `${BASE}images/badges/oh-best-pm-2025.png`, alt: "Ohio Best Property Management Company 2025 award", height: 100 },
  { src: `${BASE}images/badges/google-reviews.png`, alt: "Google Reviews — verified client ratings for EquityTeam Property Management", height: 44, rating: "4.3" },
  { src: `${BASE}images/badges/expertise-award.png`, alt: "Cincinnati property management industry recognition award", height: 54 },
];

interface CommunityPageProps {
  config: CommunityConfig;
}

export default function CommunityPage({ config }: CommunityPageProps) {
  const c = config;

  // Ahrefs: the full "{City} Property Management & Property Services | EquityTeam"
  // title runs to 72 chars for longer city names (e.g. Downtown Cincinnati,
  // Sugarcreek Township, Washington Township), over Google's display limit.
  // Drop the secondary "& Property Services" clause only when the title is long.
  const seoTitle =
    c.seoTitle.length > 71
      ? c.seoTitle.replace(" & Property Services", "")
      : c.seoTitle;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: c.business.name,
    telephone: c.business.telephone,
    url: c.business.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.business.streetAddress,
      addressLocality: c.business.addressLocality,
      addressRegion: c.business.addressRegion,
      postalCode: c.business.postalCode,
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: c.cityName,
        containedInPlace: { "@type": "State", name: c.stateName },
      },
      {
        "@type": "City",
        name: "Cincinnati",
        containedInPlace: { "@type": "State", name: "Ohio" },
      },
      {
        "@type": "City",
        name: "Dayton",
        containedInPlace: { "@type": "State", name: "Ohio" },
      },
      {
        "@type": "Place",
        name: "Norris Lake, Tennessee",
      },
    ],
    subOrganization: {
      "@type": "Organization",
      name: "Deerfield Vacation Rentals",
      url: "https://www.deerfieldvacationrentals.com",
      description:
        "Tennessee vacation rental management at Norris Lake, operated by EquityTeam.",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      reviewCount: "200",
      bestRating: "5",
    },
    review: c.testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.stars, bestRating: 5 },
      reviewBody: t.text,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <PageLayout>
      <SEO
        title={seoTitle}
        description={c.seoDescription}
        canonical={c.urlPath}
        ogImage={c.heroImage}
        schemas={[localBusinessSchema, faqSchema]}
        breadcrumbs={[
          { name: "Locations", href: "/areas-we-serve" },
          { name: c.regionName, href: `/locations/${c.regionName.toLowerCase()}` },
          { name: c.cityName, href: c.urlPath },
        ]}
      />

      {/* ── 1. HERO + 2. TRUST BANNER ─────────────────────────────────────── */}
      <CommunityHero
        image={c.heroImage}
        imageAlt={c.heroImageAlt}
        imagePosition={c.heroImagePosition}
        imageZoom={c.heroImageZoom}
        headline={c.heroHeadline}
        subhead={c.heroSubheadline}
        quote={c.founderQuote}
        quoteAttribution={c.founderName}
        stats={c.stats}
      />

      {/* ── 2. PARTNER LOGOS (trust bar) ─────────────────────────────────── */}
      <section className="py-10 md:py-12 px-5 xl:px-0 bg-white">
        <div className="max-w-screen-2xl mx-auto px-[20px] md:px-0">
          <div className="w-full flex flex-row flex-wrap justify-center gap-y-12 md:gap-2 items-center">
            {PARTNER_LOGOS.map((logo, i) => (
              <div key={i} className="max-h-[100px] h-full px-6 flex flex-col justify-center items-center gap-1">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: logo.height, width: "auto", maxHeight: logo.height }}
                  className="object-contain"
                />
                {logo.rating && (
                  <span className="flex items-center gap-1 font-sans font-semibold text-base tracking-[0.06em] text-[#121212]">
                    <span style={{ color: "#FBBC04" }}>★★★★★</span>
                    <span>{logo.rating}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTRO ──────────────────────────────────────────────────────── */}
      <section className="bg-black section-pad">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-sans text-lg md:text-xl leading-relaxed text-white/80">
            {c.introCopy}
          </p>
        </div>
      </section>

      {/* ── 4. SERVICES AVAILABLE HERE ───────────────────────────────────── */}
      <section className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-primary mb-4">
              Services Available in {c.cityName}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="border border-primary/15 p-8 flex flex-col hover:border-secondary transition-colors duration-200">
              <h3 className="font-sans font-bold text-xl text-primary mb-4">
                Property Management
              </h3>
              <p className="font-sans text-base text-primary/70 leading-relaxed mb-6 flex-1">
                Professional residential property management for single-family and multi-family rental properties in {c.cityName}.
              </p>
              <Link href="/residential-property-management" className="cta-secondary">
                Learn more about Residential PM <span className="cta-arrow">→</span>
              </Link>
            </div>
            <div className="border border-primary/15 p-8 flex flex-col hover:border-secondary transition-colors duration-200">
              <h3 className="font-sans font-bold text-xl text-primary mb-4">
                Property Services
              </h3>
              <p className="font-sans text-base text-primary/70 leading-relaxed mb-6 flex-1">
                Trusted property services for homeowners and investors — maintenance, repairs, renovations, and ongoing property care.
              </p>
              <Link href="/property-services" className="cta-secondary">
                Learn more about Property Services <span className="cta-arrow">→</span>
              </Link>
            </div>
            <div className="border border-primary/15 p-8 flex flex-col hover:border-secondary transition-colors duration-200">
              <h3 className="font-sans font-bold text-xl text-primary mb-4">
                Properties for Rent
              </h3>
              <p className="font-sans text-base text-primary/70 leading-relaxed mb-6 flex-1">
                Browse available rental homes and apartments managed by EquityTeam in {c.cityName} and across Greater Cincinnati.
              </p>
              <Link href="/for-rent" className="cta-secondary">
                View Properties for Rent <span className="cta-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. AREA OVERVIEW ─────────────────────────────────────────────── */}
      <section className="bg-black section-pad">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="section-heading text-white mb-4">{c.areaOverview.heading}</h2>
          </div>
          <div className="space-y-6">
            {c.areaOverview.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-base md:text-lg leading-relaxed text-white/80">
                {p}
              </p>
            ))}
            {c.areaOverview.source && (
              <p className="font-sans text-sm italic text-white/50">{c.areaOverview.source}</p>
            )}
          </div>
        </div>
      </section>

      {/* ── 6. LOCAL MARKET INSIGHTS ─────────────────────────────────────── */}
      <section className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-primary mb-4">Local Market Insights</h2>
            <p className="font-sans text-primary/70 text-base max-w-2xl mx-auto">
              A quick snapshot of the {c.cityName} real estate market.
            </p>
          </div>
          <MarketInsightsGrid
            cards={c.marketInsights}
            dataAccessedDate={c.dataAccessedDate}
            sources={c.marketInsightsSources}
            note={c.marketInsightsNote}
          />
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="bg-black section-pad">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4">What Owners Are Saying</h2>
            <p className="font-sans text-white/70 text-base max-w-2xl mx-auto">
              Real reviews from EquityTeam&rsquo;s clients &amp; customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {c.testimonials.map((t) => (
              <div key={t.name} className="border border-white/15 p-8 flex flex-col">
                <div className="flex gap-1 mb-4 text-secondary">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={18} weight="fill" />
                  ))}
                </div>
                <p className="font-sans text-base text-white/80 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="font-sans font-bold text-base text-white">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-white section-pad">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="section-heading text-primary mb-4">
              Frequently Asked Questions — {c.cityName}
            </h2>
          </div>
          <FaqAccordion items={c.faqs} variant="light" />
        </div>
      </section>

      {/* ── 9. NEARBY AREAS ──────────────────────────────────────────────── */}
      <section className="bg-black section-pad">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="section-heading text-white mb-4">{c.nearbyHeading}</h2>
            <p className="font-sans text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              EquityTeam serves these surrounding neighborhood communities.
            </p>
          </div>

          {/* Two-column layout on md+: vertical list of areas (closest → furthest)
              on the left, interactive map on the right. Stacks on mobile.
              Link styling matches the home page area-pill pattern: transparent
              border that lights up gold on hover. */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-8 md:gap-10 lg:gap-12 items-start mb-10 md:mb-12">
            <div>
              <p className="font-sans text-base italic text-white/60 px-4 mb-3">
                Listed in order of closest proximity to {c.cityName}.
              </p>
              <ol className="list-none p-0 m-0">
                {c.nearbyAreas.map((area, idx) =>
                  area.comingSoon ? (
                    <li key={area.name} className="block">
                      <span className="px-4 py-3 border border-transparent font-sans font-medium text-base leading-tight tracking-[0.08em] text-white/30 inline-flex items-baseline gap-3 uppercase cursor-default">
                        <span className="text-secondary/60 font-semibold tabular-nums w-5 text-right">{idx + 1}.</span>
                        <span>{area.name}</span>
                      </span>
                    </li>
                  ) : (
                    <li key={area.name} className="block">
                      <Link
                        href={area.href}
                        className="px-4 py-3 border border-transparent font-sans font-medium text-base leading-tight tracking-[0.08em] text-white inline-flex items-baseline gap-3 uppercase hover:border-secondary transition-all duration-200"
                      >
                        <span className="text-secondary font-semibold tabular-nums w-5 text-right">{idx + 1}.</span>
                        <span>{area.name}</span>
                      </Link>
                    </li>
                  )
                )}
              </ol>
            </div>

            <NearbyAreasMap
              focalName={c.cityName}
              focalCoords={{
                lat: c.business.geo?.latitude ?? 39.2326,
                lng: c.business.geo?.longitude ?? -84.3783,
              }}
              areas={c.nearbyAreas
                .filter((a) => a.coords)
                .map((a) => ({
                  name: a.name,
                  href: a.href,
                  coords: a.coords!,
                  comingSoon: a.comingSoon,
                }))}
            />
          </div>

          <div className="text-center mt-10">
            <Link href={c.allAreasHref} className="cta-secondary">
              {c.allAreasLabel} <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. CTA ──────────────────────────────────────────────────────── */}
      <GoldBorderCTA
        title={c.ctaHeadline}
        btnLabel="Contact Us"
        btnHref="/contact-us"
        subtitle={c.ctaSubheadline}
        variant="light"
      />
    </PageLayout>
  );
}
