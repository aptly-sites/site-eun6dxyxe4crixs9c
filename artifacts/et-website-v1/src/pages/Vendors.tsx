import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";

const trades = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "General Contracting",
  "Handyman / Punch-out",
  "Painting",
  "Flooring",
  "Landscaping & Snow",
  "Cleaning & Turnover",
  "Pest Control",
  "Appliance Repair",
];

const principles = [
  {
    title: "Steady, year-round volume",
    body: "We manage hundreds of doors across Greater Cincinnati and Dayton. Preferred vendors get a consistent pipeline of work — not one-off jobs.",
  },
  {
    title: "Fast, predictable payment",
    body: "Approved invoices are paid on a regular cycle. No chasing owners, no 90-day waits.",
  },
  {
    title: "Clear scope, fewer surprises",
    body: "Our managers triage requests before dispatch, so you arrive with a documented scope and a tenant who is expecting you.",
  },
  {
    title: "Treated as part of the team",
    body: "Vendors are an extension of EquityTeam. We listen, we communicate, and we build long-term, win-win relationships.",
  },
];

export default function Vendors() {
  return (
    <PageLayout>
      <SEO
        title="Trade Partners & Vendor Network | EquityTeam"
        description="EquityTeam is building long-term, win-win relationships with serious tradespeople across Cincinnati & Dayton. Apply to join our preferred vendor network."
        canonical="/vendors"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-14 md:pt-45 md:pb-30 bg-no-repeat bg-cover bg-center bg-primary">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <h1 className="font-cowling font-bold text-white text-3xl md:text-7xl leading-[1.05] uppercase mb-6">
            Join Our Cincinnati &amp; Dayton Vendor Network
          </h1>
          <p className="text-white max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            We&rsquo;re building long-term, win-win relationships with serious tradespeople across Greater Cincinnati and Dayton.
          </p>
          <div className="mt-10">
            <a href="#apply" className="btn-solid-secondary uppercase">Apply to Join</a>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white section-pad xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {principles.map((p) => (
              <div key={p.title}>
                <h3 className="font-display text-black text-[26px] md:text-[30px] leading-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-black leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trades */}
      <section className="bg-primary section-pad xl:px-0">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="font-display text-white text-[34px] md:text-[44px] leading-tight mb-10">
            Trades We Work With Across Cincinnati &amp; Dayton
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {trades.map((t) => (
              <span
                key={t}
                className="px-4 py-3 border border-secondary text-white font-sans font-medium text-base tracking-[0.08em] uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="bg-white section-pad xl:px-0">
        <div className="max-w-screen-md mx-auto text-center">
          <h2 className="font-display text-black text-[34px] md:text-[44px] leading-tight mb-6">
            Apply to Join
          </h2>
          <p className="text-black leading-relaxed mb-8">
            Tell us a little about your trade, your service area in Cincinnati or Dayton, and your insurance and licensing. A member of our team will follow up within two business days.
          </p>
          <p className="text-black leading-relaxed mb-10">
            Email&nbsp;
            <a
              href="mailto:vendors@equityteam.com?subject=Vendor%20Network%20Application"
              className="text-secondary underline underline-offset-4 hover:text-black"
            >
              vendors@equityteam.com
            </a>
            &nbsp;or reach our vendor team through the contact page.
          </p>
          <Link href="/contact-us" className="btn-solid-secondary uppercase">
            Contact Our Vendor Team
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
