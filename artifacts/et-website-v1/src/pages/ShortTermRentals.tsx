import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";

const BASE = import.meta.env.BASE_URL;

const WHAT_WE_DO: { title: string; body: string }[] = [
  {
    title: "Multi-Platform Listing & Distribution",
    body: "Professional listings on Airbnb, VRBO, Booking.com, and a direct-booking channel — written, photographed, and optimized to convert guests.",
  },
  {
    title: "Dynamic Revenue Management",
    body: "Nightly rates adjusted by demand, season, weekends, and lead time so your property earns its true potential — not last year's number.",
  },
  {
    title: "Guest Communication & Screening",
    body: "Vetted guests, written house rules, and round-the-clock messaging handled by a real local team — protecting your home.",
  },
  {
    title: "Turnovers, Linens & Restocking",
    body: "Hotel-grade turnovers between every stay — laundered linens, fresh consumables, and mid-stay touch-ups when needed.",
  },
  {
    title: "Maintenance, Inspections & Property Care",
    body: "Routine inspections after every stay, preventative maintenance scheduled in advance, and trusted local trades for every job.",
  },
  {
    title: "Owner Reporting & Direct Deposits",
    body: "Transparent monthly statements, occupancy and ADR reporting, and direct-deposit owner draws every Friday.",
  },
];

const VRM_FAQS: { question: string; answer: string }[] = [
  {
    question: "When will vacation rental management be available in Cincinnati and Dayton?",
    answer: "We're launching full-service vacation rental management across Greater Cincinnati and Dayton in late 2026. Join our launch list and we'll reach out as soon as onboarding opens in your area.",
  },
  {
    question: "How is vacation rental management different from long-term rental management?",
    answer: "Vacation rental management is an active hospitality operation — guest screening, dynamic nightly pricing, turnovers between every stay, multi-platform listing management, and 24/7 guest support. Long-term management focuses on leasing, resident relations, and ongoing maintenance. EquityTeam offers both.",
  },
  {
    question: "Which booking platforms do you manage?",
    answer: "We list and manage properties across Airbnb, VRBO, Booking.com, and direct-booking channels — with synchronized calendars and unified guest communication so you're never double-booked.",
  },
  {
    question: "Do you already manage vacation rentals somewhere today?",
    answer: "Yes. Our vacation rental operation is live today at Norris Lake, Tennessee under our sub-brand, Deerfield Vacation Rentals, specializing in the Norris Lake and Deerfield Resort communities. Visit deerfieldvacationrentals.com to learn more.",
  },
  {
    question: "How do you handle damage caused by guests?",
    answer: "We conduct a documented inspection after every guest stay. Damage claims are handled through platform resolution centers and, where applicable, damage-protection coverage.",
  },
];

const VRM_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Vacation Rental Management",
  serviceType: "Vacation Rental Property Management",
  description:
    "Full-service vacation rental management for Greater Cincinnati and Dayton, Ohio — Airbnb, VRBO, and direct-booking management, dynamic pricing, guest screening, turnovers, and owner reporting. Launching late 2026; proven today at Norris Lake, TN.",
  url: `${SITE_URL}/vacation-rental-management`,
  areaServed: [
    { "@type": "City", name: "Cincinnati", containedInPlace: { "@type": "State", name: "Ohio" } },
    { "@type": "City", name: "Dayton", containedInPlace: { "@type": "State", name: "Ohio" } },
  ],
  provider: {
    "@type": "LocalBusiness",
    name: "EquityTeam Property Management",
    telephone: "+15134444010",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "11427 Reed Hartman Hwy",
      addressLocality: "Cincinnati",
      addressRegion: "OH",
      postalCode: "45241",
      addressCountry: "US",
    },
  },
};

const VRM_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: VRM_FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function ShortTermRentals() {
  return (
    <PageLayout>
      <SEO
        title="Vacation Rental Management Cincinnati &amp; Dayton | EquityTeam"
        description="Vacation rental management for Greater Cincinnati &amp; Dayton — Airbnb, VRBO &amp; direct-booking, dynamic pricing, and 24/7 guest care. Launching late 2026."
        canonical="/vacation-rental-management"
        schemas={[VRM_SERVICE_SCHEMA, VRM_FAQ_SCHEMA]}
      />

      {/* 1. HERO */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${BASE}images/locations/heroes/over-the-rhine-hero.jpg`}
            alt="Historic storefronts in Over-the-Rhine, a popular Airbnb district in Cincinnati"
            className="w-full h-full object-cover object-center"
          />
          {/* clean neutral scrim for headline legibility (golden-hour styling deferred) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/60 to-[#121212]/30" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center w-full">
          <h1
            className="block uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[64px] md:max-w-[900px] mx-auto"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
          >
            Vacation Rental Management
          </h1>
          <p
            className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal mb-8 md:max-w-[780px] mx-auto"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            Full-service Airbnb, VRBO &amp; direct-booking management for Greater Cincinnati &amp; Dayton — launching late 2026, and proven today at Norris Lake, TN
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/contact-us" className="btn-solid-secondary uppercase">Join the Launch List</Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8">
            <a href="#services" className="cta-secondary text-white hover:text-secondary">What We Do <span className="cta-arrow">→</span></a>
            <a href="#where" className="cta-secondary text-white hover:text-secondary">Where We Operate <span className="cta-arrow">→</span></a>
            <a href="#faq" className="cta-secondary text-white hover:text-secondary">FAQ <span className="cta-arrow">→</span></a>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW + WHAT WE DO (white) */}
      <section id="services" className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="section-heading text-black mb-6">Full-Service Vacation Rental Management, Built for Cincinnati &amp; Dayton</h2>
            <p className="font-sans text-lg text-black/70 leading-relaxed">
              EquityTeam is bringing full-service vacation rental management to Greater Cincinnati and Dayton in late 2026 — the same hospitality operation, dynamic pricing, and owner-first reporting we've proven at Norris Lake, Tennessee through our sub-brand,{" "}
              <a href="https://deerfieldvacationrentals.com" target="_blank" rel="noopener noreferrer" className="text-secondary underline underline-offset-2 hover:no-underline">Deerfield Vacation Rentals</a>. Own an Airbnb or VRBO in Cincinnati or Dayton? Get on our launch list and be first in line when we go live.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {WHAT_WE_DO.map((item) => (
              <div key={item.title} className="border border-black/15 p-8 hover:border-secondary transition-colors duration-200">
                <h3 className="font-sans font-bold text-base uppercase tracking-[0.06em] text-black mb-3">{item.title}</h3>
                <p className="font-sans text-base text-black/70 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHERE WE OPERATE (black) */}
      <section id="where" className="bg-primary section-pad">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-6">Where We Operate</h2>
            <p className="font-sans text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              Our vacation rental program is live today at the lake and expanding into Ohio's two largest short-term-rental markets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="border border-white/15 bg-white/5 p-8 md:p-10">
              <p className="font-sans font-bold text-sm uppercase tracking-[0.12em] text-secondary mb-3">Available Now</p>
              <h3 className="font-cowling text-2xl md:text-3xl text-white mb-4">Norris Lake, Tennessee</h3>
              <p className="font-sans text-base text-white/70 leading-relaxed mb-5">
                Our vacation rental operation is live at Norris Lake and the Deerfield Resort communities under our sub-brand, Deerfield Vacation Rentals — full hospitality, dynamic pricing, and owner reporting, running today.
              </p>
              <a href="https://deerfieldvacationrentals.com" target="_blank" rel="noopener noreferrer" className="cta-secondary text-white hover:text-secondary">
                Visit Deerfield Vacation Rentals <span className="cta-arrow">→</span>
              </a>
            </div>
            <div className="border border-secondary bg-white/5 p-8 md:p-10">
              <p className="font-sans font-bold text-sm uppercase tracking-[0.12em] text-secondary mb-3">Launching Late 2026</p>
              <h3 className="font-cowling text-2xl md:text-3xl text-white mb-4">Greater Cincinnati &amp; Dayton</h3>
              <p className="font-sans text-base text-white/70 leading-relaxed mb-5">
                We're bringing the full program — Airbnb, VRBO, and direct-booking management — to Greater Cincinnati and Dayton in late 2026. Join the launch list to be first in line when onboarding opens.
              </p>
              <Link href="/contact-us" className="cta-secondary text-white hover:text-secondary">
                Join the Launch List <span className="cta-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ (white) */}
      <section id="faq" className="bg-white section-pad" aria-label="Frequently asked questions">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-black">Vacation Rental Management FAQ</h2>
          </div>
          <FaqAccordion items={VRM_FAQS} variant="light" />
        </div>
      </section>

      {/* 5. FINAL CTA (black) */}
      <GoldBorderCTA
        title="Be first when we launch in Cincinnati &amp; Dayton"
        btnLabel="Join the Launch List"
        btnHref="/contact-us"
        subtitle="Launching late 2026 · Live today at Norris Lake, TN"
        variant="dark"
      />
    </PageLayout>
  );
}
