/*
PHASE 2 — NEIGHBORHOOD LINKING STRUCTURE
Each neighborhood/community name will eventually link to a dedicated location page following this URL pattern:
  /[service]/[market]/[neighborhood]/
Examples:
  /residential-property-management/cincinnati/hyde-park/
  /residential-property-management/cincinnati/oakley/
  /residential-property-management/dayton/centerville/
  /vacation-rental-management/norris-lake/deerfield-resort/
*/

import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Link } from "wouter";
import {
  getRegionLocations,
  type LocationLink,
} from "@/data/locationRegistry";

import { SITE_URL } from "@/lib/siteUrl";

const BASE = import.meta.env.BASE_URL;
const SITE = SITE_URL;

type Market = {
  id: "cincinnati" | "dayton" | "norris-lake";
  name: string;
  state: string;
  imageSrc: string;
  serviceTag: string;
  description: string;
  listLabel: string;
  buttonLabel: string;
  buttonHref: string;
  buttonExternal?: boolean;
  communities?: string[];
  geo: { latitude: number; longitude: number };
  containedInPlace: { name: string; abbr: string };
};

const MARKETS: Market[] = [
  {
    id: "cincinnati",
    name: "Cincinnati",
    state: "Ohio",
    imageSrc: `${BASE}images/locations/cincinnati--downtown-2.jpg`,
    serviceTag: "Full-Service Market",
    description:
      "Greater Cincinnati has been EquityTeam's home market since 2008. Below are some of the cities and neighborhoods we serve.",
    listLabel: "Cities & Neighborhoods Served",
    buttonLabel: "Explore Greater Cincinnati",
    buttonHref: "/cincinnati-property-management",
    geo: { latitude: 39.1031, longitude: -84.5120 },
    containedInPlace: { name: "Ohio", abbr: "OH" },
  },
  {
    id: "dayton",
    name: "Dayton",
    state: "Ohio",
    imageSrc: `${BASE}images/locations/dayton-golden-hour.png`,
    serviceTag: "Full-Service Market",
    description:
      "EquityTeam proudly serves the Greater Dayton area. Below are some of the cities and neighborhoods we serve.",
    listLabel: "Communities Served",
    buttonLabel: "Explore Greater Dayton",
    buttonHref: "/dayton-property-management",
    geo: { latitude: 39.7589, longitude: -84.1916 },
    containedInPlace: { name: "Ohio", abbr: "OH" },
  },
  {
    id: "norris-lake",
    name: "Norris Lake",
    state: "Tennessee",
    imageSrc: `${BASE}images/locations/norris-lake-golden-hour.png`,
    serviceTag: "Vacation Rental Management",
    description:
      "Vacation rental management at Norris Lake operates under our Deerfield Vacation Rentals brand — serving owners around Deerfield Resort and the northern lake communities.",
    listLabel: "Communities Served",
    communities: ["Deerfield Resort", "Big Creek Springs", "Dock", "Flat Hollow", "Sugar Hollow"],
    buttonLabel: "Visit Deerfield Vacation Rentals",
    buttonHref: "https://deerfieldvacationrentals.com",
    buttonExternal: true,
    geo: { latitude: 36.3045, longitude: -83.8460 },
    containedInPlace: { name: "Tennessee", abbr: "TN" },
  },
];

const SERVICE_LINES = [
  { name: "Residential Property Management", href: "/residential-property-management" },
  { name: "Vacation Rental Management", href: "/vacation-rental-management" },
  { name: "HOA Management", href: "/hoa-management" },
  { name: "Commercial Management", href: "/commercial-property-management" },
  { name: "Home Property Services", href: "/property-services" },
  { name: "Property Services", href: "/property-services" },
];

const FAQ_ITEMS = [
  {
    question: "What areas does EquityTeam serve?",
    answer:
      "EquityTeam serves Greater Cincinnati and Greater Dayton in Ohio. Vacation rental management at Norris Lake, Tennessee operates through our Deerfield Vacation Rentals brand. We are actively evaluating expansion into additional markets.",
  },
  {
    question: "Does EquityTeam manage vacation rentals in Tennessee?",
    answer:
      "Vacation rental management at Norris Lake, Tennessee operates under our Deerfield Vacation Rentals brand — a specialized sub-brand serving owners around Deerfield Resort and the northern lake communities. Visit deerfieldvacationrentals.com to learn more.",
  },
  {
    question: "Is Deerfield Vacation Rentals part of EquityTeam?",
    answer:
      "Yes. Deerfield Vacation Rentals is EquityTeam's Tennessee vacation rental brand, serving Norris Lake and the surrounding communities.",
  },
  {
    question: "What types of property does EquityTeam manage?",
    answer:
      "EquityTeam manages residential rentals, vacation rentals, shared living properties, HOA communities, and commercial properties. We also offer home concierge and property services across our markets.",
  },
  {
    question: "How long has EquityTeam been in business?",
    answer:
      "EquityTeam was founded in Cincinnati in 2008 and has served owners and residents across Greater Cincinnati and Dayton continuously since.",
  },
];

function MarketCard({ market }: { market: Market }) {
  const locations = getRegionLocations(market.id);
  return (
    <div className="w-full border-1 border-secondary p-3 flex flex-col">
      <div
        className="w-full px-8 h-[240px] bg-no-repeat bg-cover bg-center bg-[#121212b3] bg-blend-multiply flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: `url(${market.imageSrc})` }}
      >
        <h2 className="font-sans font-bold text-[24px] !leading-tight text-secondary !mb-2 !uppercase">
          {market.name}, {market.state}
        </h2>
        <p className="font-sans font-medium text-[13px] tracking-[0.18em] uppercase text-white/85">
          {market.serviceTag}
        </p>
      </div>

      <div className="px-0 md:px-6 pt-9 pb-3 flex flex-col flex-1">
        <p className="font-sans text-base leading-relaxed text-primary/80 mb-7">
          {market.description}
        </p>

        <h3 className="font-sans !font-bold !text-[15px] tracking-[0.12em] uppercase text-secondary !mb-4">
          {market.listLabel}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 mb-9">
          {market.communities
            ? market.communities.map((name) => (
                <span
                  key={name}
                  className="w-full inline-block font-sans font-normal text-base leading-tight tracking-[0.08em] mb-6 text-primary uppercase"
                >
                  {name}
                </span>
              ))
            : locations.map((loc: LocationLink) => (
                <Link key={loc.slug} href={loc.urlPath}>
                  <span className="w-full inline-block font-sans font-normal text-base leading-tight tracking-[0.08em] mb-6 text-primary hover:text-secondary transition uppercase">
                    {loc.displayName}
                  </span>
                </Link>
              ))}
        </div>

        <div className="mt-auto">
          {market.buttonExternal ? (
            <a
              href={market.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans font-semibold text-[14px] tracking-[0.14em] uppercase text-secondary border border-secondary px-6 py-3 hover:bg-secondary hover:text-primary transition"
            >
              {market.buttonLabel}
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ) : (
            <Link href={market.buttonHref}>
              <span className="inline-block font-sans font-semibold text-[14px] tracking-[0.14em] uppercase text-secondary border border-secondary px-6 py-3 hover:bg-secondary hover:text-primary transition cursor-pointer">
                {market.buttonLabel} →
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Locations() {
  // ── Schemas ───────────────────────────────────────────────
  const placesSchema = MARKETS.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${m.name}, ${m.state}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: m.geo.latitude,
      longitude: m.geo.longitude,
    },
    containedInPlace: {
      "@type": "State",
      name: m.containedInPlace.name,
    },
  }));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EquityTeam",
    url: SITE_URL,
    foundingDate: "2008",
    areaServed: MARKETS.map((m) => ({
      "@type": "Place",
      name: `${m.name}, ${m.containedInPlace.abbr}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: m.geo.latitude,
        longitude: m.geo.longitude,
      },
      containedInPlace: {
        "@type": "State",
        name: m.containedInPlace.name,
      },
    })),
    subOrganization: {
      "@type": "Organization",
      name: "Deerfield Vacation Rentals",
      description:
        "EquityTeam's Tennessee vacation rental brand serving Norris Lake and surrounding waterfront communities.",
      areaServed: {
        "@type": "Place",
        name: "Norris Lake, TN",
        geo: { "@type": "GeoCoordinates", latitude: 36.3045, longitude: -83.8460 },
        containedInPlace: { "@type": "State", name: "Tennessee" },
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <PageLayout>
      <SEO
        title="Property Management Areas | Cincinnati &amp; Dayton | EquityTeam"
        description="Property management across Cincinnati and Dayton, Ohio — residential, vacation rental, HOA, and commercial. Also serving Norris Lake, Tennessee."
        canonical="/areas-we-serve"
        ogImage={`${SITE}${BASE}images/locations/cincinnati--downtown-2.jpg`}
        breadcrumbs={[
          { name: "Company", href: "/about-us" },
          { name: "Areas We Serve", href: "/areas-we-serve" },
        ]}
        schemas={[organizationSchema, ...placesSchema, faqSchema]}
      />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative z-10 pt-28 pb-24 md:pt-40 md:pb-32 bg-primary">
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center w-full">
          <h1 className="block uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[64px] md:max-w-[960px] mx-auto">
            Areas We Serve
          </h1>
          <p className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal mb-0 md:max-w-[820px] mx-auto">
            Professional property management in Cincinnati and Dayton, Ohio<br />
            Includes residential, commercial, HOA<br />
            Vacation rental management at Norris Lake, Tennessee<br />
            Property services are available in all areas where we manage property
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARKET CARDS
      ══════════════════════════════════════ */}
      <div className="w-full max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-10 md:gap-8 w-full md:grid-cols-2 lg:grid-cols-3">
          {MARKETS.map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SERVICE LINES STRIP
      ══════════════════════════════════════ */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-5">
          <p className="font-sans text-center text-[18px] md:text-[20px] leading-relaxed text-white/85 max-w-3xl mx-auto mb-10">
            Across every market we serve, EquityTeam delivers professional property management and property services.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {SERVICE_LINES.map((s) => (
              <Link key={s.href} href={s.href}>
                <span className="inline-block font-sans font-semibold text-[13px] tracking-[0.14em] uppercase text-white border border-white/30 px-5 py-3 hover:border-secondary hover:text-secondary transition cursor-pointer">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LOCAL EXPERTISE
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-screen-md mx-auto px-5">
          <h2 className="font-cowling uppercase text-primary text-[32px] md:text-[44px] leading-tight mb-8 text-center">
            Local Expertise, Professional Standards
          </h2>
          <div className="space-y-6 font-sans text-base md:text-[17px] leading-relaxed text-primary/80">
            <p>
              EquityTeam was founded in Cincinnati in 2008 and has served owners and residents across Greater Cincinnati and Dayton continuously since. In 2026, we expanded to Norris Lake, Tennessee under the brand Deerfield Vacation Rentals to serve vacation rental owners in Tennessee's premier lake destination.
            </p>
            <p>
              Every market we serve is managed by people who know the neighborhoods, the rental rates, the local regulations, and the property types that perform best — backed by the systems, technology, and guarantees of a professionally built management company. We are actively evaluating expansion into additional Ohio and Tennessee markets.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-screen-md mx-auto px-5">
          <h2 className="font-cowling uppercase text-white text-[32px] md:text-[44px] leading-tight mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={FAQ_ITEMS} defaultOpenIdx={0} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28 border-t border-primary/10">
        <div className="max-w-screen-md mx-auto px-5 text-center">
          <h2 className="font-cowling uppercase text-primary text-[32px] md:text-[48px] leading-tight mb-5">
            Own Property in One of Our Markets?
          </h2>
          <p className="font-marseille text-primary/75 text-[18px] md:text-[22px] leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you have a single rental, a growing portfolio, or a vacation home — we have a service line built for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-rental-analysis">
              <span className="inline-block font-sans font-semibold text-[14px] tracking-[0.14em] uppercase text-primary bg-secondary px-8 py-4 hover:opacity-90 transition cursor-pointer">
                Get Started
              </span>
            </Link>
            <Link href="/contact-us">
              <span className="inline-block font-sans font-semibold text-[14px] tracking-[0.14em] uppercase text-primary border border-primary/30 px-8 py-4 hover:border-secondary hover:text-secondary transition cursor-pointer">
                Schedule a Consult
              </span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
