import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ownerSalesFaqs } from "@/data/faqData";
import { Link } from "wouter";

const GOLD = "#B4975A";

export default function OwnerSalesFaq() {
  return (
    <PageLayout>
      <SEO
        title="Property Management Fees & Services FAQ | Cincinnati Ohio"
        description="How much does a property manager cost in Cincinnati or Dayton? Get authoritative answers on fees, guarantees, tenant screening, and what to look for when hiring a property management company in Ohio."
        canonical="/faq/owner-sales"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": ownerSalesFaqs.map(q => ({
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
            Prospective Owner FAQ
          </p>
          <h1 className="font-cowling font-bold text-white text-5xl md:text-6xl uppercase mb-5">
            Prospective Owner FAQs
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Considering hiring a property management company in Cincinnati or Dayton? These answers cover everything you need to evaluate your options — fees, screening, guarantees, and what separates good managers from great ones.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black px-5 pb-20">
        <div className="max-w-screen-md mx-auto border-t border-white/10">
          <FaqAccordion items={ownerSalesFaqs} category="owner-sales" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16 px-5 border-t-4" style={{ borderTopColor: GOLD }}>
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-2xl text-white mb-2">Ready to talk numbers?</h2>
            <p className="text-white/60">Get a free rental analysis and custom pricing for your property.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/free-rental-analysis" className="btn-solid-secondary">Free Rental Analysis</Link>
            <a href="https://calendly.com/et-mark-t" target="_blank" rel="noopener noreferrer" className="btn-outline-secondary">Schedule a Consult</a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
