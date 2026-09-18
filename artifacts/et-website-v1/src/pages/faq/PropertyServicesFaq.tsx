import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { propertyServicesFaqs } from "@/data/faqData";
import { Link } from "wouter";

const GOLD = "#B4975A";

export default function PropertyServicesFaq() {
  return (
    <PageLayout>
      <SEO
        title="Property Maintenance & Repair Services FAQ | Cincinnati Ohio"
        description="How does EquityTeam handle maintenance and repairs for Cincinnati and Dayton rental properties? Answers on markups, turnovers, owner rehabs, and how maintenance requests are approved."
        canonical="/faq/property-services"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": propertyServicesFaqs.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": { "@type": "Answer", "text": q.answer },
          })),
        }}
      />

      {/* Header */}
      <section className="bg-black pt-36 pb-16 px-5">
        <div className="max-w-screen-md mx-auto text-center">
          <Link href="/faq" className="text-base font-bold tracking-[0.12em] uppercase mb-4 block hover:underline" style={{ color: GOLD }}>
            ← All FAQs
          </Link>
          <p className="text-secondary text-sm font-bold tracking-[0.18em] uppercase mb-4">
            Property Services FAQ
          </p>
          <h1 className="font-cowling font-bold text-white text-5xl md:text-6xl uppercase mb-5">
            Property Services FAQs
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            How EquityTeam handles maintenance, repairs, turnovers, and property services for rental properties across Cincinnati and Dayton — including our transparent markup policy and low-cost guarantee.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black px-5 pb-20">
        <div className="max-w-screen-md mx-auto border-t border-white/10">
          <FaqAccordion items={propertyServicesFaqs} category="property-services" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16 px-5 border-t-4" style={{ borderTopColor: GOLD }}>
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-2xl text-white mb-2">Questions about your property?</h2>
            <p className="text-white/60">Talk to our property services team directly.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/contact-us" className="btn-solid-secondary">Contact Us</Link>
            <a href="tel:+15134444010" className="btn-outline-secondary">(513) 444-4010</a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
