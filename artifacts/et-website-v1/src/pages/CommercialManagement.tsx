import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";

const BASE = import.meta.env.BASE_URL;

const WHAT_WE_DO: { title: string; body: string }[] = [
  {
    title: "Tenant Relations & Leasing",
    body: "Commercial tenant sourcing, lease negotiation support, and ongoing tenant relations managed with professionalism — keeping occupancy high and relationships productive.",
  },
  {
    title: "Rent Collection & CAM Reconciliation",
    body: "Monthly rent collection, common-area maintenance (CAM) charge administration, and annual reconciliation handled with precision and full reporting to owners.",
  },
  {
    title: "Maintenance & Vendor Coordination",
    body: "All maintenance requests triaged, dispatched, and followed to completion — using our vetted contractor network and in-house oversight to protect the asset and the tenant relationship.",
  },
  {
    title: "Property Inspections",
    body: "Regular interior and exterior inspections with documented condition reports — identifying deferred maintenance before it becomes a capital problem.",
  },
  {
    title: "Financial Reporting",
    body: "Clear, detailed monthly statements covering income, expenses, and occupancy — so owners always have an accurate picture of their property's performance.",
  },
  {
    title: "Lease Compliance",
    body: "Active monitoring of lease terms, renewal timelines, and tenant obligations — with proactive outreach to address issues before they escalate.",
  },
];

const CPM_FAQS: { question: string; answer: string }[] = [
  {
    question: "What types of commercial properties does EquityTeam manage?",
    answer: "EquityTeam manages office, retail, mixed-use, and small-to-mid-size commercial buildings across Greater Cincinnati and Dayton — including tenant leasing, CAM administration, maintenance, inspections, and financial reporting.",
  },
  {
    question: "How is commercial property management priced?",
    answer: "Commercial pricing depends on the property type, size, tenant mix, and scope of services. We provide a transparent written proposal after an initial consultation — contact our team for a quote.",
  },
  {
    question: "Do you handle CAM reconciliation?",
    answer: "Yes. We administer common-area maintenance charges throughout the year and complete an annual reconciliation with full reporting to owners and tenants.",
  },
];

const CPM_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Commercial Property Management",
  serviceType: "Commercial Property Management",
  description:
    "Professional commercial property management in Cincinnati and Dayton, Ohio — tenant leasing, CAM reconciliation, maintenance coordination, inspections, and financial reporting.",
  url: `${SITE_URL}/commercial-property-management`,
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

const CPM_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CPM_FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function CommercialManagement() {
  return (
    <PageLayout>
      <SEO
        title="Commercial Property Management Cincinnati | EquityTeam"
        description="Commercial property management in Cincinnati &amp; Dayton, Ohio. Tenant leasing, CAM reconciliation, maintenance, inspections, and transparent reporting."
        canonical="/commercial-property-management"
        schemas={[CPM_SERVICE_SCHEMA, CPM_FAQ_SCHEMA]}
      />

      {/* 1. HERO */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${BASE}images/heroes/commercial-hero-lowrise.jpg`}
            alt="Modern low-rise commercial office building with a brick and glass facade at sunset"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/60 to-[#121212]/30" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center w-full">
          <h1
            className="block uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[64px] md:max-w-[900px] mx-auto"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
          >
            Commercial Property Management
          </h1>
          <p
            className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal mb-8 md:max-w-[760px] mx-auto"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            Professional management for office, retail, and mixed-use assets across Greater Cincinnati &amp; Dayton
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/contact-us" className="btn-solid-secondary uppercase">Schedule a Free Consult</Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8">
            <a href="#services" className="cta-secondary text-white hover:text-secondary">What We Handle <span className="cta-arrow">→</span></a>
            <a href="#faq" className="cta-secondary text-white hover:text-secondary">FAQ <span className="cta-arrow">→</span></a>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW + WHAT WE HANDLE */}
      <section id="services" className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="section-heading text-black mb-6">Commercial Management, Done Right</h2>
            <p className="font-sans text-lg text-black/70 leading-relaxed">
              EquityTeam manages office, retail, and mixed-use commercial property across Greater Cincinnati and Dayton — protecting the asset, keeping quality tenants in place, and reporting with total transparency. A disciplined, technology-driven approach backed by a licensed Ohio brokerage with two decades of property management experience.
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
            <h2 className="section-heading text-white">Commercial Property Management FAQ</h2>
          </div>
          <FaqAccordion items={CPM_FAQS} variant="dark" />
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <GoldBorderCTA
        title="Let's talk about your commercial property."
        btnLabel="Contact Us"
        btnHref="/contact-us"
        subtitle="Serving Greater Cincinnati & Dayton"
        variant="light"
      />
    </PageLayout>
  );
}
