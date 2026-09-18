import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";

const BASE = import.meta.env.BASE_URL;

const WHAT_WE_DO: { title: string; body: string }[] = [
  {
    title: "Investor Acquisitions",
    body: "We help investors find, evaluate, and acquire rental and investment property — bringing two decades of on-the-ground management insight to every deal so you buy assets that actually perform.",
  },
  {
    title: "Seller Representation",
    body: "Listing and selling homes and investment properties with professional marketing, accurate pricing, and negotiation that protects your equity from list to close.",
  },
  {
    title: "Buyer Representation",
    body: "Representing homebuyers and investors through the full purchase — search, offer strategy, due diligence, and closing coordination with a team that knows the local market.",
  },
  {
    title: "Portfolio & 1031 Exchange Support",
    body: "Strategic buying and selling for growing portfolios, including 1031 exchange coordination to help you defer taxes and reinvest efficiently.",
  },
  {
    title: "Valuations & Market Analysis",
    body: "Data-driven pricing, rental analysis, and broker price opinions so you always know what a property is worth as a home and as an investment.",
  },
  {
    title: "Realtor Referral Partnerships",
    body: "We partner with agents whose clients need management or investment expertise — a win-win referral relationship that keeps your client relationship intact.",
  },
];

const BROKERAGE_FAQS: { question: string; answer: string }[] = [
  {
    question: "Does EquityTeam work with real estate investors?",
    answer: "Yes — investor representation is core to our brokerage. We help investors acquire, sell, and 1031-exchange rental and investment property, drawing on two decades of property management experience to identify assets that perform.",
  },
  {
    question: "Is EquityTeam a licensed real estate brokerage?",
    answer: "Yes. EquityTeam is a licensed Ohio real estate broker (license REC.2012001994) and a member of the National Association of Realtors (NAR), serving Greater Cincinnati and Dayton since 2008.",
  },
  {
    question: "Can you help me buy an investment property and then manage it?",
    answer: "Yes. Buying through our brokerage means a seamless transition into management — the same team that helps you acquire the property can lease it and manage it, with no handoff between companies.",
  },
];

const BROKERAGE_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "EquityTeam Real Estate Brokerage",
  description:
    "Licensed Ohio real estate brokerage serving Cincinnati and Dayton — investor acquisitions, buyer and seller representation, portfolio and 1031 exchange support, and valuations.",
  url: `${SITE_URL}/real-estate-brokerage`,
  telephone: "+15134444010",
  areaServed: [
    { "@type": "City", name: "Cincinnati", containedInPlace: { "@type": "State", name: "Ohio" } },
    { "@type": "City", name: "Dayton", containedInPlace: { "@type": "State", name: "Ohio" } },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "11427 Reed Hartman Hwy",
    addressLocality: "Cincinnati",
    addressRegion: "OH",
    postalCode: "45241",
    addressCountry: "US",
  },
};

const BROKERAGE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BROKERAGE_FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function RealEstateBrokerage() {
  return (
    <PageLayout>
      <SEO
        title="Real Estate Brokerage Cincinnati &amp; Dayton | EquityTeam"
        description="Licensed Ohio real estate brokerage for Cincinnati &amp; Dayton — investor acquisitions, buyer &amp; seller representation, and 1031 exchange support."
        canonical="/real-estate-brokerage"
        schemas={[BROKERAGE_SERVICE_SCHEMA, BROKERAGE_FAQ_SCHEMA]}
      />

      {/* 1. HERO */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${BASE}images/heroes/brokerage-consult.jpg`}
            alt="Three people reviewing a home purchase on a laptop during a real estate brokerage consultation"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/60 to-[#121212]/35" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center w-full">
          <h1
            className="block uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[64px] md:max-w-[900px] mx-auto"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
          >
            Real Estate Brokerage
          </h1>
          <p
            className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal mb-8 md:max-w-[760px] mx-auto"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            A brokerage built for investors and homeowners — backed by two decades of property management insight across Greater Cincinnati &amp; Dayton
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
            <h2 className="section-heading text-black mb-6">Brokerage, Built for Investors</h2>
            <p className="font-sans text-lg text-black/70 leading-relaxed">
              Most brokerages close the deal and disappear. EquityTeam manages thousands of doors across Greater Cincinnati and Dayton — so we know what makes a property a good buy, a strong rental, and a sound long-term investment. Whether you're buying your first investment property, selling a home, or repositioning a portfolio, our licensed team brings real operating experience to every transaction. Are you an agent with a client who needs us?{" "}
              <Link href="/realtor-referral-program" className="text-secondary underline underline-offset-2 hover:no-underline">Explore our Realtor Referral Program</Link>.
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
            <h2 className="section-heading text-white">Real Estate Brokerage FAQ</h2>
          </div>
          <FaqAccordion items={BROKERAGE_FAQS} variant="dark" />
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <GoldBorderCTA
        title="Buying, selling, or building a portfolio? Let's talk."
        btnLabel="Contact Us"
        btnHref="/contact-us"
        subtitle="Serving Greater Cincinnati & Dayton"
        variant="light"
      />
    </PageLayout>
  );
}
