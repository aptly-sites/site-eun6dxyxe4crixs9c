import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";

const GOLD = "#B4975A";

const categories = [
  {
    title: "Prospective Owner FAQs",
    subtitle: "Considering hiring a property manager?",
    desc: "Answers to the most common questions from rental property owners evaluating professional management — fees, guarantees, screening, and more.",
    href: "/faq/owner-sales",
    count: 8,
  },
  {
    title: "Current Owner FAQs",
    subtitle: "Already working with us?",
    desc: "Ongoing questions from current owner-clients about inspections, rent distribution, maintenance, portals, evictions, and reporting.",
    href: "/faq/owner-support",
    count: 15,
  },
  {
    title: "Leasing FAQs",
    subtitle: "Looking for a rental?",
    desc: "Information for prospective tenants on the application process, background checks, lease terms, security deposits, and move-in timelines.",
    href: "/faq/leasing",
    count: 9,
  },
  {
    title: "Tenant Support FAQs",
    subtitle: "Currently renting with us?",
    desc: "Answers for current residents on pets, modifications, maintenance responsibilities, subletting, and breaking a lease in Ohio.",
    href: "/faq/tenant-support",
    count: 7,
  },
  {
    title: "Property Services FAQs",
    subtitle: "Maintenance & repairs",
    desc: "How we handle maintenance requests, markups, turnovers, and which repairs are owner- vs. management-directed.",
    href: "/faq/property-services",
    count: 4,
  },
];

export default function FaqHub() {
  return (
    <PageLayout>
      <SEO
        title="Property Management FAQ | Cincinnati & Dayton Ohio"
        description="Comprehensive FAQ library covering property management fees, tenant screening, evictions, owner portals, leasing, and more — from EquityTeam's experts in Cincinnati and Dayton, OH."
        canonical="/faq"
        speakableSelectors={["h1", "h2"]}
        breadcrumbs={[{ name: "FAQ", href: "/faq" }]}
      />

      {/* Header */}
      <section className="bg-black pt-36 pb-20 text-center px-5">
        <p className="text-secondary text-sm font-bold tracking-[0.18em] uppercase mb-4">
          Property Management FAQ
        </p>
        <h1 className="font-cowling font-bold text-white text-5xl md:text-6xl uppercase mb-6">
          Cincinnati &amp; Dayton Property Management FAQ
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
          Authoritative answers to the most common property management questions in Cincinnati and Dayton, Ohio — from fees and guarantees to tenant screening, maintenance, and portals.
        </p>
      </section>

      {/* Category cards */}
      <section className="bg-white section-pad">
        <div className="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="block group border border-black/10 hover:border-[#B4975A] transition-colors duration-200 p-8"
            >
              <p className="text-base font-bold tracking-[0.12em] uppercase mb-2 text-black/40 group-hover:text-[#B4975A] transition-colors">
                {cat.subtitle} · {cat.count} questions
              </p>
              <h2 className="font-sans font-bold text-xl text-black mb-3 group-hover:text-[#B4975A] transition-colors">
                {cat.title}
              </h2>
              <p className="text-black/60 text-base leading-relaxed">{cat.desc}</p>
              <p className="mt-5 text-base font-bold" style={{ color: GOLD }}>
                View all questions →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black section-pad text-center">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-white mb-4">
          Still have questions?
        </h2>
        <p className="text-white/60 mb-8 text-lg">
          Talk directly with our team — no scripts, no call centers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendly.com/et-mark-t"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid-secondary"
          >
            Schedule a Consult
          </a>
          <a href="tel:+15134444010" className="btn-outline-secondary">
            (513) 444-4010
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
