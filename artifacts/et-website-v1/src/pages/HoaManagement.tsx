import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";

const BASE = import.meta.env.BASE_URL;

const WHAT_WE_DO: { title: string; body: string }[] = [
  {
    title: "Board Support & Administration",
    body: "Meeting preparation, agenda management, minutes, and ongoing administrative coordination — so volunteer boards can lead without being buried in operations.",
  },
  {
    title: "Dues Collection & Financial Reporting",
    body: "Online assessment billing, automated collection, delinquency follow-up, and transparent monthly financial statements. Every dollar tracked and reported with clarity.",
  },
  {
    title: "Vendor & Maintenance Coordination",
    body: "Common-area landscaping, lighting, pool maintenance, and repairs coordinated through our vetted vendor network — priced competitively and managed to completion.",
  },
  {
    title: "CC&R Enforcement",
    body: "Consistent, professional enforcement of community rules and covenants — handled with documentation and fairness to protect property values and community standards.",
  },
  {
    title: "Homeowner Communication",
    body: "A single digital point of contact for homeowner inquiries, maintenance requests, and community notices — keeping residents informed and reducing board burden.",
  },
  {
    title: "Reserve Fund Guidance",
    body: "Guidance on reserve contributions and expenditures, aligned with long-term capital needs so the community is never caught unprepared for major repairs.",
  },
];

const HOA_FAQS: { question: string; answer: string }[] = [
  {
    question: "What does EquityTeam's HOA management include?",
    answer: "EquityTeam provides full-service HOA management: board support and administration, assessment billing and collection, financial reporting, CC&R enforcement, vendor and common-area maintenance coordination, homeowner communication, and reserve-fund guidance — all run on modern association-management software for communities across Greater Cincinnati and Dayton.",
  },
  {
    question: "How is HOA management pricing determined?",
    answer: "HOA pricing is tailored to each community based on size, number of units, and scope of services. We provide a transparent written proposal after an initial consultation — contact our team for a quote for your association.",
  },
  {
    question: "Do you work with self-managed HOAs that want to transition to professional management?",
    answer: "Yes. We regularly onboard self-managed and previously-managed associations. The transition includes reviewing governing documents, current financials, vendor contracts, and open items, then establishing clear reporting and communication from day one.",
  },
];

const HOA_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "HOA Management",
  serviceType: "Homeowners Association Management",
  description:
    "Professional HOA management in Cincinnati and Dayton, Ohio — board support, assessment collection, CC&R enforcement, vendor coordination, and financial reporting for homeowners associations.",
  url: `${SITE_URL}/hoa-management`,
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HOA Management Services",
    itemListElement: WHAT_WE_DO.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  },
};

const HOA_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOA_FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function HoaManagement() {
  return (
    <PageLayout>
      <SEO
        title="HOA Management Cincinnati &amp; Dayton, Ohio | EquityTeam"
        description="HOA management in Cincinnati &amp; Dayton — board support, dues collection, CC&amp;R enforcement, and vendor coordination. Modern and transparent."
        canonical="/hoa-management"
        schemas={[HOA_SERVICE_SCHEMA, HOA_FAQ_SCHEMA]}
      />

      {/* 1. HERO */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${BASE}images/hoa-community-street.jpg`}
            alt="Suburban street of brick homes, sidewalks, and manicured lawns in an HOA-managed community"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/60 to-[#121212]/30" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center w-full">
          <h1
            className="block uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[64px] md:max-w-[900px] mx-auto"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
          >
            HOA Management
          </h1>
          <p
            className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal mb-8 md:max-w-[760px] mx-auto"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            A modern, transparent approach to association management for communities across Greater Cincinnati &amp; Dayton
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
            <h2 className="section-heading text-black mb-6">HOA Management, Done Right</h2>
            <p className="font-sans text-lg text-black/70 leading-relaxed">
              EquityTeam provides full-service HOA management across Greater Cincinnati and Dayton — protecting property values, enforcing community standards, and keeping operations running smoothly without burning out volunteer boards. We pair licensed expertise and transparent reporting with modern association-management software.
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
            <h2 className="section-heading text-white">HOA Management FAQ</h2>
          </div>
          <FaqAccordion items={HOA_FAQS} variant="dark" />
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <GoldBorderCTA
        title="Let's talk about your community."
        btnLabel="Contact Us"
        btnHref="/contact-us"
        subtitle="Serving Greater Cincinnati & Dayton"
        variant="light"
      />
    </PageLayout>
  );
}
