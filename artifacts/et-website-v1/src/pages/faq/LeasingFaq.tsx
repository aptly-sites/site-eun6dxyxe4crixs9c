import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { leasingFaqs } from "@/data/faqData";
import { Link } from "wouter";

const GOLD = "#B4975A";

export default function LeasingFaq() {
  return (
    <PageLayout>
      <SEO
        title="Rental Application & Leasing FAQ | Cincinnati Ohio Rentals"
        description="How to apply for a rental in Cincinnati or Dayton Ohio. Answers on background checks, security deposits, Section 8, lease terms, and move-in timelines from EquityTeam Property Management."
        canonical="/faq/leasing"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": leasingFaqs.map(q => ({
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
            Leasing FAQ
          </p>
          <h1 className="font-cowling font-bold text-white text-5xl md:text-6xl uppercase mb-5">
            Leasing FAQs
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Looking for a rental home in Cincinnati or Dayton? These answers cover the application process, qualifying criteria, security deposits, lease terms, and what to expect from move-in.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black px-5 pb-20">
        <div className="max-w-screen-md mx-auto border-t border-white/10">
          <FaqAccordion items={leasingFaqs} category="leasing" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16 px-5 border-t-4" style={{ borderTopColor: GOLD }}>
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-2xl text-white mb-2">Browse available rentals</h2>
            <p className="text-white/60">See current vacancies across Cincinnati and Dayton.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/contact-us" className="btn-solid-secondary">Contact Us</Link>
            <a href="https://equityteam.rentvine.com/portals/resident/" target="_blank" rel="noopener noreferrer" className="btn-outline-secondary">Tenant Portal</a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
