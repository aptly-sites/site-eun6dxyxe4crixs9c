import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";

const BASE = import.meta.env.BASE_URL;

const WHAT_WE_DO: { title: string; body: string }[] = [
  {
    title: "Repairs & Maintenance",
    body: "From routine fixes to complex repairs, our in-house team and vetted contractor network handle the work — priced 10% below retail and completed to a documented standard.",
  },
  {
    title: "Renovation & Project Management",
    body: "Unit turns, room renovations, and full property rehabs managed from estimate to completion. We coordinate every trade, inspect the work, and keep you informed throughout.",
  },
  {
    title: "Preventative Maintenance",
    body: "Scheduled inspections and routine service intervals that catch problems early — reducing emergency repairs, protecting asset value, and extending system life.",
  },
  {
    title: "Make-Ready Services",
    body: "Full unit preparation between tenants — cleaning, painting, punch-out repairs, and final inspection. Properties delivered rent-ready on schedule.",
  },
  {
    title: "Landscaping & Exterior Care",
    body: "Lawn care, seasonal cleanup, snow removal, gutter cleaning, and exterior upkeep coordinated through proven local vendors who show up reliably.",
  },
  {
    title: "24/7 Emergency Services",
    body: "Around-the-clock response for plumbing failures, HVAC outages, and structural issues — dispatched fast, resolved completely, and documented for your records.",
  },
];

const PS_FAQS: { question: string; answer: string }[] = [
  {
    question: "Do I have to be an EquityTeam management client to use Property Services?",
    answer: "No. Property Services is available as a standalone offering for homeowners and investors, as well as to owners already in one of our management programs. Maintenance, make-ready, renovation, and project management are all available on their own.",
  },
  {
    question: "How is Property Services priced?",
    answer: "Labor is guaranteed 10% below retail market rates. Larger projects and renovations are quoted up front after a walkthrough, with a clear written scope and estimate before any work begins.",
  },
  {
    question: "Do you handle emergencies after hours?",
    answer: "Yes. We provide 24/7 emergency response for issues like plumbing failures, HVAC outages, and storm or water damage — dispatched quickly and documented for your records.",
  },
];

const PS_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Homeowner Property Services",
  serviceType: "Property Maintenance, Renovation, and Project Management",
  description:
    "Professional property services in Cincinnati and Dayton, Ohio — repairs, maintenance, renovation, make-ready, landscaping, and 24/7 emergency response by EquityTeam's in-house team and vetted vendor network.",
  url: `${SITE_URL}/property-services`,
  areaServed: [
    { "@type": "City", name: "Cincinnati", containedInPlace: { "@type": "State", name: "Ohio" } },
    { "@type": "City", name: "Dayton", containedInPlace: { "@type": "State", name: "Ohio" } },
  ],
  provider: {
    "@type": "LocalBusiness",
    name: "EquityTeam Property Management",
    url: SITE_URL,
    telephone: "+15134444010",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11427 Reed Hartman Hwy",
      addressLocality: "Cincinnati",
      addressRegion: "OH",
      postalCode: "45241",
      addressCountry: "US",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property Services",
    itemListElement: WHAT_WE_DO.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  },
};

const PS_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PS_FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function PropertyServices() {
  return (
    <PageLayout>
      <SEO
        title="Property Services | EquityTeam Cincinnati &amp; Dayton"
        description="Property maintenance &amp; repairs in Cincinnati &amp; Dayton — make-ready, renovation, landscaping, and 24/7 emergency response by EquityTeam."
        canonical="/property-services"
        schemas={[PS_SERVICE_SCHEMA, PS_FAQ_SCHEMA]}
      />

      {/* 1. HERO */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${BASE}images/property-services.jpg`}
            alt="Homeowner talking with an EquityTeam property services manager as a maintenance worker repairs the roofline behind them"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/60 to-[#121212]/35" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center w-full">
          <h1
            className="block uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[64px] md:max-w-[900px] mx-auto"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
          >
            Property Services
          </h1>
          <p
            className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal mb-8 md:max-w-[760px] mx-auto"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            Repairs, maintenance, renovation &amp; project management — done right, for every property type across Greater Cincinnati &amp; Dayton
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/contact-us" className="btn-solid-secondary uppercase">Schedule a Free Consult</Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8">
            <a href="#services" className="cta-secondary text-white hover:text-secondary">What We Do <span className="cta-arrow">→</span></a>
            <a href="#faq" className="cta-secondary text-white hover:text-secondary">FAQ <span className="cta-arrow">→</span></a>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW + WHAT WE DO */}
      <section id="services" className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="section-heading text-black mb-6">Professional Services for Every Property</h2>
            <p className="font-sans text-lg text-black/70 leading-relaxed">
              EquityTeam's Homeowner Property Services division handles everything from routine maintenance to full renovations across Greater Cincinnati and Dayton — using a vetted network of licensed, insured contractors backed by in-house oversight. Whether your property is in our managed portfolio or you just need a trusted team, you get the same standard: transparent pricing, documented work, and accountability from start to finish.
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

      {/* 3. FAQ */}
      <section id="faq" className="bg-primary section-pad" aria-label="Frequently asked questions">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white">Property Services FAQ</h2>
          </div>
          <FaqAccordion items={PS_FAQS} variant="dark" />
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <GoldBorderCTA
        title="Need work done? Let's talk."
        btnLabel="Contact Us"
        btnHref="/contact-us"
        subtitle="Serving Greater Cincinnati & Dayton"
        variant="light"
      />
    </PageLayout>
  );
}
