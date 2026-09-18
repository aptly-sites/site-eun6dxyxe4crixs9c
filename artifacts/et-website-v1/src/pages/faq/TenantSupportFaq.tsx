import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { tenantSupportFaqs } from "@/data/faqData";
import { Link } from "wouter";

const GOLD = "#B4975A";

export default function TenantSupportFaq() {
  return (
    <PageLayout>
      <SEO
        title="Tenant Support FAQ | Renting with EquityTeam Cincinnati"
        description="Currently renting with EquityTeam? Answers on pets, lease modifications, maintenance responsibilities, subletting, and early lease termination in Ohio."
        canonical="/faq/tenant-support"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": tenantSupportFaqs.map(q => ({
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
            Tenant Support FAQ
          </p>
          <h1 className="font-cowling font-bold text-white text-5xl md:text-6xl uppercase mb-5">
            Tenant Support FAQs
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Currently renting through EquityTeam? These answers cover pets, modifications, maintenance responsibilities, subletting, and your rights as a tenant in Ohio.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black px-5 pb-20">
        <div className="max-w-screen-md mx-auto border-t border-white/10">
          <FaqAccordion items={tenantSupportFaqs} category="tenant-support" />
        </div>
      </section>

      {/* Portal CTA */}
      <section className="bg-black py-16 px-5 border-t-4" style={{ borderTopColor: GOLD }}>
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-2xl text-white mb-2">Need help with your unit?</h2>
            <p className="text-white/60">Submit a maintenance request or contact your property manager through the Tenant Portal.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="https://equityteam.rentvine.com/portals/resident/" target="_blank" rel="noopener noreferrer" className="btn-solid-secondary">Tenant Portal Login</a>
            <Link href="/contact-us" className="btn-outline-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
