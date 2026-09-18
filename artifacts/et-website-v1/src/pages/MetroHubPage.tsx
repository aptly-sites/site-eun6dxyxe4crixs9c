import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { COMMUNITY_PAGES } from "@/data/communityData";
import { SITE_URL } from "@/lib/siteUrl";
import {
  ShieldCheck,
  Clock,
  Calculator,
  Key,
  PawPrint,
  Wrench,
  House,
  CurrencyDollar,
  FileText,
} from "@phosphor-icons/react";

const ORIGIN = import.meta.env.BASE_URL.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// Metro-level configuration — copy, stats, FAQs
// ─────────────────────────────────────────────────────────────────────────────

const METRO_DATA = {
  cincinnati: {
    name: "Greater Cincinnati",
    shortName: "Cincinnati",
    state: "Ohio",
    urlPath: "/locations/cincinnati",
    heroImage: `${ORIGIN}/images/locations/cincinnati-golden-hour.png`,
    heroAlt: "Cincinnati, Ohio skyline at golden hour",
    seoTitle: "Greater Cincinnati Property Management | EquityTeam",
    seoDescription:
      "EquityTeam manages the Greater Cincinnati metro's largest residential property portfolio — 54+ communities across Hamilton, Warren, Butler, and Clermont counties. Professional property management since 2008.",
    overviewHeading: "Manage Your Greater Cincinnati Rental Property with EquityTeam",
    overviewParas: [
      "EquityTeam is Greater Cincinnati's largest residential property management company — and this is where we started. Founded in Cincinnati in 2008, we manage the region's most diverse property portfolio: Victorian rowhouses in Over-the-Rhine, established single-family neighborhoods in Hyde Park and Blue Ash, newer suburban construction in Mason and West Chester, and everything between.",
      "Corporate anchors — Procter & Gamble, Kroger, Fifth Third Bank, and Cincinnati Children's Hospital — drive consistent high-income tenant demand across the metro. The University of Cincinnati and Cincinnati State add a steady graduate and professional renter segment. Average 1BR rents hover around $950 metro-wide, with premium submarkets reaching $1,200–$1,600+ for 3BR units.",
      "We manage the full asset lifecycle: tenant acquisition, rent collection, maintenance coordination, owner reporting, and financial optimization. Our rigorous tenant screening reduces vacancy and turnover, and our guaranteed service terms align our incentives with yours.",
      "Contact us to discuss your Cincinnati-area property — we'll run a free rental market analysis and walk you through our fee structure.",
    ],
    marketInsights: [
      { label: "Metro Population", value: "2.2M+" },
      { label: "Avg 1BR Rent", value: "~$950/mo" },
      { label: "Avg Vacancy Rate", value: "~5.8%" },
      { label: "Communities Served", value: "54+" },
      { label: "In Market Since", value: "2008" },
    ],
    communitiesHeading: "Greater Cincinnati Communities We Serve",
    communitiesSubhead:
      "Click any community for property management details, local market insights, and service coverage specific to that area.",
    faqsHeading: "Greater Cincinnati Property Management FAQs",
    faqs: [
      {
        question: "What areas of Greater Cincinnati does EquityTeam manage?",
        answer:
          "We cover 54+ communities across the Cincinnati MSA — from urban core neighborhoods like Over-the-Rhine, Hyde Park, and Clifton to suburban hubs like Blue Ash, Mason, and West Chester, and outlying markets like Lebanon, Loveland, and Hamilton. If you have a property in Hamilton, Warren, Butler, or Clermont County, we likely serve your market.",
      },
      {
        question: "What property types does EquityTeam manage in Cincinnati?",
        answer:
          "Our Cincinnati portfolio spans single-family homes, condos and townhomes, small multi-family (2–4 units), larger apartment communities, shared and co-living properties, HOA-governed communities, and commercial properties. We also manage short-term vacation rentals in Tennessee through our Deerfield Vacation Rentals brand.",
      },
      {
        question: "How does EquityTeam price its Cincinnati property management services?",
        answer:
          "Pricing is based on property type, unit count, and service tier. There are no startup fees or hidden charges — our full fee structure is reviewed with every owner before we start. Contact us for a free rental market analysis and a custom quote for your Cincinnati-area property.",
      },
    ],
    crossRegionLabel: "Dayton, Ohio Property Management →",
    crossRegionHref: "/dayton-property-management",
    ogImage: `${SITE_URL}/images/locations/cincinnati--downtown-2.jpg`,
  },

  dayton: {
    name: "Greater Dayton",
    shortName: "Dayton",
    state: "Ohio",
    urlPath: "/locations/dayton",
    heroImage: `${ORIGIN}/images/locations/dayton-golden-hour.png`,
    heroAlt: "Dayton, Ohio skyline at golden hour over the Great Miami River",
    seoTitle: "Greater Dayton Property Management | EquityTeam",
    seoDescription:
      "EquityTeam manages residential rental properties across 31 communities in Greater Dayton, Ohio. Full-service property management in Montgomery, Greene, Warren, and Clark counties.",
    overviewHeading: "Manage Your Greater Dayton Rental Property with EquityTeam",
    overviewParas: [
      "Greater Dayton spans eight counties in southwest Ohio, anchored by Montgomery County and extending into Greene, Warren, and Clark counties. The metro's ~815,000 residents are spread across a notably diverse set of communities — from HOA suburbs like Beavercreek, Centerville, and Oakwood to the urban core of Dayton, and outlying markets like Eaton, Greenville, and Yellow Springs.",
      "Dayton's rental demand is driven by some of Ohio's most stable institutional employers: Wright-Patterson Air Force Base (the region's largest single employer), a large hospital and healthcare network, and four major universities — University of Dayton, Wright State, Sinclair, and Cedarville. Average rents on 1BR units range from $750 in workforce neighborhoods to $1,100+ in premium suburbs.",
      "Cap rates on Dayton-area single-family rentals routinely run 6–9% — well above what comparable properties deliver in Columbus or Cincinnati. That combination of institutional tenant demand and yield makes Greater Dayton one of Ohio's most investor-friendly rental MSAs.",
      "EquityTeam manages properties across 31 communities throughout Greater Dayton, delivering the same full-service management model that built our Cincinnati portfolio. Contact us to discuss your Dayton-area property.",
    ],
    marketInsights: [
      { label: "Metro Population", value: "~815K" },
      { label: "Avg 1BR Rent", value: "~$875/mo" },
      { label: "Avg Cap Rate (SFR)", value: "6–9%" },
      { label: "Communities Served", value: "31" },
      { label: "In Market Since", value: "2015" },
    ],
    communitiesHeading: "Greater Dayton Communities We Serve",
    communitiesSubhead:
      "Click any community for property management details, local market insights, and service coverage specific to that area.",
    faqsHeading: "Greater Dayton Property Management FAQs",
    faqs: [
      {
        question: "What makes Greater Dayton an attractive rental market?",
        answer:
          "Dayton offers some of Ohio's highest rental yields: strong tenant demand from Wright-Patterson AFB, four major universities, and a large healthcare and manufacturing workforce, combined with home purchase prices well below Columbus and Cincinnati. Average cap rates of 6–9% on single-family rentals are common across the metro.",
      },
      {
        question: "Which Dayton-area communities does EquityTeam serve?",
        answer:
          "We manage properties across 31 communities covering Montgomery, Greene, Warren, and Clark counties — from the HOA suburbs of Beavercreek, Centerville, and Oakwood to workforce markets like Trotwood and West Carrollton, and outlying markets like Eaton, Greenville, and Yellow Springs.",
      },
      {
        question: "How do I get started with EquityTeam in Dayton?",
        answer:
          "Schedule a free consultation using the link below. We'll review your property, run a rental market analysis, and walk you through our fee structure and management plan — no startup fees, no long-term lock-in required.",
      },
    ],
    crossRegionLabel: "Cincinnati, Ohio Property Management →",
    crossRegionHref: "/cincinnati-property-management",
    ogImage: `${SITE_URL}/images/locations/dayton-golden-hour.png`,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Guarantees — shared with LocationPage
// ─────────────────────────────────────────────────────────────────────────────

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "90-Day Risk-Free Guarantee",
    body: "Cancel within the first 90 days and we'll refund all paid management charges — no questions asked.",
  },
  {
    icon: Clock,
    title: "48-Hour Response Guarantee",
    body: "We'll return your call or email within 48 business hours or credit your account $20.",
  },
  {
    icon: Calculator,
    title: "Accounting Accuracy Guarantee",
    body: "If you find an accounting error, we'll fix it and credit you 10% of the difference.",
  },
  {
    icon: Key,
    title: "Leasing Guarantee",
    body: "Signed lease within 21 days of your unit being rent-ready, or management fees are credited until leased. Tenants we place are guaranteed for 12 months.",
  },
  {
    icon: PawPrint,
    title: "Pet Damage Guarantee",
    body: "We collect pet rent and cover up to $1,000 in pet-related damage above and beyond the security deposit.",
  },
  {
    icon: Wrench,
    title: "Reduced Repairs Guarantee",
    body: "Our labor rates are guaranteed to be 10% below retail — or we credit you the difference, plus 10%.",
  },
  {
    icon: House,
    title: "Property Protection Guarantee",
    body: "Covers malicious tenant damage up to $35,000 and theft damage up to $15,000. (ET+)",
  },
  {
    icon: CurrencyDollar,
    title: "Rent Guarantee",
    body: "Covers lost rent for up to 25 weeks due to lease breaks, evictions, death, or other qualifying events — capped at $3,000/month. (ET+)",
  },
  {
    icon: FileText,
    title: "Eviction Protection Guarantee",
    body: "Eviction-related expenses refunded up to $6,000 — covering filing fees, legal defense, sheriff costs, and rekeying. (ET+)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function MetroHubPage({ region }: { region: "cincinnati" | "dayton" }) {
  const m = METRO_DATA[region];

  const communities = COMMUNITY_PAGES.filter((c) =>
    c.urlPath.startsWith(`/locations/${region}/`)
  );

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve` },
      { "@type": "ListItem", position: 3, name: m.name, item: `${SITE_URL}${m.urlPath}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: m.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <PageLayout>
      <SEO
        title={m.seoTitle}
        description={m.seoDescription}
        canonical={m.urlPath}
        ogImage={m.ogImage}
        schemas={[faqSchema]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-28 md:pt-48 md:overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={m.heroImage}
            alt={m.heroAlt}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-[#121212]/40 to-[#121212]/10" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center">
          <h1
            className="uppercase font-cowling font-bold leading-none text-white mb-6 text-[28px] md:text-[72px] md:max-w-[960px] mx-auto"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
          >
            {m.name}
          </h1>
          <p
            className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal leading-snug md:max-w-screen-md mx-auto mb-2"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            Property Management &amp; Property Services
          </p>
          <blockquote
            className="text-white font-display font-normal italic text-[24px] md:text-[32px] leading-snug md:max-w-screen-md mx-auto border-l-0 pl-0"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            &ldquo;We&rsquo;ll treat your property like it&rsquo;s our own.&rdquo;
          </blockquote>
          <span
            className="block text-white text-base leading-normal mt-5 font-sans font-semibold uppercase tracking-[0.2em]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            — Mark Thompson, Founder/CEO/Broker
          </span>
          <div className="text-center mt-10">
            <Link href="/contact-us" className="btn-solid-secondary uppercase">
              Schedule a Consult
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="overlay-gradient pb-8 md:pb-10 pt-8 md:pt-14 px-5 xl:px-0 z-10 relative">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="md:flex md:justify-between gap-16">
              {[
                { label: "Since", value: "2008" },
                { label: "Transactions", value: "3,000+" },
                { label: "Customer Satisfaction", value: "98%" },
                { label: "Assets Managed", value: "$100M+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center mb-10 md:mb-0 last:mb-0">
                  <span className="block font-sans font-bold text-base leading-tight tracking-[0.18em] text-white uppercase mb-4">
                    {stat.label}
                  </span>
                  <span className="block font-cowling font-bold text-[40px] md:text-[56px] leading-none text-secondary">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Overview ───────────────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white px-5 xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="w-full text-center mb-12 md:mb-16">
            <h2 className="section-heading font-sans font-normal text-[40px] md:text-5xl leading-none text-primary mx-auto">
              {m.overviewHeading}
            </h2>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-20 md:gap-8">
            {/* Left: paragraphs + CTA */}
            <div className="px-6 md:px-0 basis-full lg:basis-2/3 xl:basis-1/2 md:pr-8 service-content inner-pages-main-content">
              {m.overviewParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="relative z-10 text-center md:text-left mt-8">
                <Link href="/contact-us" className="btn-solid-secondary uppercase w-auto">
                  Schedule a Call
                </Link>
              </div>
            </div>

            {/* Right: market stats box */}
            <div className="basis-full lg:basis-1/3 xl:basis-1/2 pl-0 md:pl-8">
              <div className="w-full p-8 md:p-15 bg-primary">
                <div className="border-1 border-secondary p-8 md:p-15 text-center grid grid-cols-1 gap-10">
                  <div>
                    <div className="font-sans font-bold text-xl text-secondary mb-1 uppercase tracking-widest">
                      {m.name} Market
                    </div>
                  </div>
                  {m.marketInsights.map((insight) => (
                    <div key={insight.label}>
                      <div className="font-sans font-bold text-xl text-secondary m-0 mb-3">{insight.label}</div>
                      <div className="text-white font-sans text-lg leading-tight">{insight.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Cards Grid ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50 px-5 xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-primary mb-4">{m.communitiesHeading}</h2>
            <p className="font-sans text-base text-primary/70 max-w-2xl mx-auto">
              {m.communitiesSubhead}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {communities.map((community) => (
              <Link
                key={community.slug}
                href={community.urlPath}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group relative block overflow-hidden aspect-[4/3] bg-primary"
              >
                <img
                  src={community.heroImage}
                  alt={community.heroImageAlt ?? `${community.cityName}, Ohio`}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-200 group-hover:from-black/85" />
                <div className="absolute inset-0 flex items-end p-3">
                  <span className="font-sans font-bold text-white text-sm leading-tight uppercase tracking-[0.06em] group-hover:text-secondary transition-colors duration-200">
                    {community.cityName}
                  </span>
                </div>
                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary transition-colors duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantees ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 section-pad bg-primary">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4">Service Guarantees</h2>
            <p className="font-sans text-white/70 text-base max-w-2xl mx-auto">
              We align our services with our owners' interests — and offer guarantees you won't find anywhere else.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {GUARANTEES.map((g) => (
              <div
                key={g.title}
                className="border border-white/15 p-8 relative hover:border-secondary transition-colors duration-200"
              >
                <g.icon size={32} weight="thin" className="text-secondary mb-5" />
                <h3 className="font-sans font-bold text-base text-white mb-3">{g.title}</h3>
                <p className="font-sans text-base text-white/70 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Rental Analysis CTA ─────────────────────────────────────────── */}
      <section className="relative py-14 md:py-16 px-5 md:px-10 bg-primary">
        <div className="border-4 border-secondary px-6 py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-center justify-center md:justify-between gap-5 md:gap-10">
          <h2 className="font-cowling font-normal text-2xl md:text-3xl leading-tight text-white uppercase tracking-[0.08em] text-center md:text-left m-0">
            Get Your Free Rental Analysis
          </h2>
          <div className="relative z-10 shrink-0">
            <Link href="/free-rental-analysis" className="block btn-solid-secondary uppercase whitespace-nowrap">
              Click To Start
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white" aria-label="Frequently asked questions">
        <div className="max-w-screen-md mx-auto px-5 xl:px-0">
          <h2 className="section-heading text-primary text-center mb-12 md:mb-16">{m.faqsHeading}</h2>
          <FaqAccordion items={[...m.faqs]} />
        </div>
      </section>

      {/* ── Cross-region link ─────────────────────────────────────────────────── */}
      <section className="relative py-12 bg-gray-50 border-t border-primary/10">
        <div className="max-w-screen-xl mx-auto px-5 text-center">
          <p className="font-sans text-base tracking-[0.12em] uppercase text-primary/60 mb-3">
            Looking for another market
          </p>
          <Link
            href={m.crossRegionHref}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-block font-sans font-semibold tracking-[0.1em] uppercase text-secondary hover:underline"
          >
            {m.crossRegionLabel}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
