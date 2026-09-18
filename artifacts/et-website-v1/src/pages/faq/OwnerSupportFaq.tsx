import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ownerSupportFaqs } from "@/data/faqData";
import { Link } from "wouter";

const GOLD = "#B4975A";

export default function OwnerSupportFaq() {
  return (
    <PageLayout>
      <SEO
        title="Property Owner Support FAQ | Cincinnati Property Management"
        description="Current EquityTeam owner-clients: answers on inspections, rent distribution, tenant screening, evictions, owner portal access, financial reporting, and more for Cincinnati & Dayton rental properties."
        canonical="/faq/owner-support"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": ownerSupportFaqs.map(q => ({
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
            Current Owner FAQ
          </p>
          <h1 className="font-cowling font-bold text-white text-5xl md:text-6xl uppercase mb-5">
            Current Owner FAQs
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Answers to ongoing questions from current EquityTeam owner-clients — from property inspections and rent distribution to evictions, maintenance markups, and Rentvine portal access.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black px-5 pb-20">
        <div className="max-w-screen-md mx-auto border-t border-white/10">
          <FaqAccordion items={ownerSupportFaqs} category="owner-support" />
        </div>
      </section>

      {/* Portal CTA */}
      <section className="bg-black py-16 px-5 border-t-4" style={{ borderTopColor: GOLD }}>
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-2xl text-white mb-2">Access your Owner Portal</h2>
            <p className="text-white/60">View statements, work orders, documents, and more — anytime.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="https://equityteam.rentvine.com/portals/owner/" target="_blank" rel="noopener noreferrer" className="btn-solid-secondary">Owner Portal Login</a>
            <Link href="/contact-us" className="btn-outline-secondary">Contact Support</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
