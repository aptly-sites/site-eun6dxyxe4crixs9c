import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FreeRentalAnalysisForm } from "@/features/leads/FreeRentalAnalysisForm";
import { SITE_URL } from "@/lib/siteUrl";
import { Link } from "wouter";

const FACTORS = [
  ["01", "Comparable rentals", "We review nearby homes with similar bedrooms, bathrooms, size, property type, and amenities—not just a broad ZIP-code average."],
  ["02", "Property condition", "Renovations, finishes, parking, outdoor space, pet policies, and overall presentation can move a home above or below the neighborhood baseline."],
  ["03", "Local demand", "Available inventory, recent leasing activity, employer access, school proximity, and neighborhood demand all shape what renters will pay now."],
  ["04", "Timing and strategy", "Seasonality and the balance between rent and days vacant matter. The best asking price supports income without creating avoidable vacancy."],
];

const MARKETS = [
  ["Home market since 2008", "Greater Cincinnati", "Local pricing varies block by block across Cincinnati and its surrounding communities. EquityTeam evaluates neighborhood competition along with each home’s specific features.", "/locations/cincinnati", "Explore Cincinnati service areas"],
  ["Full-service Ohio market", "Greater Dayton", "From Dayton’s established neighborhoods to nearby suburban communities, we use current local rental activity to build a practical leasing recommendation.", "/locations/dayton", "Explore Dayton service areas"],
  ["Vacation rental market", "Norris Lake, Tennessee", "Vacation-rental income depends on season, lake access, amenities, sleeping capacity, and guest demand. This market is served through Deerfield Vacation Rentals.", "/vacation-rental-management", "View vacation rental management"],
];

const FAQS = [
  { question: "What is included in an EquityTeam rental analysis?", answer: "We review relevant rental competition, property characteristics, location, current demand, and likely leasing considerations. The goal is a useful pricing range and a clear next step—not an automated number without local context." },
  { question: "How soon will I hear from EquityTeam?", answer: "A team member will contact you after your request to confirm the property details needed for the analysis. Most completed analyses are delivered within one to two business days after we have the necessary information." },
  { question: "Why can an online rent estimate differ from a local analysis?", answer: "Automated tools rely heavily on public records and broad comparable data. They may not fully account for renovations, exact condition, parking, layout, street-level differences, or today’s competition. A local review adds those details." },
  { question: "Which markets does EquityTeam serve?", answer: "EquityTeam provides full-service residential property management in Greater Cincinnati and Greater Dayton, Ohio. Vacation rental management around Norris Lake, Tennessee is provided through Deerfield Vacation Rentals." },
  { question: "Do I have to hire EquityTeam to receive an analysis?", answer: "No. The rental analysis is offered without cost or obligation for prospective clients considering professional property management." },
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Free Rental Analysis", provider: { "@type": "Organization", name: "EquityTeam", url: SITE_URL }, areaServed: ["Greater Cincinnati, Ohio", "Greater Dayton, Ohio", "Norris Lake, Tennessee"], url: `${SITE_URL}/free-rental-analysis`, description: "A no-cost rental pricing analysis for property owners in EquityTeam's service markets." };

export default function FreeRentalAnalysis() {
  return (
    <PageLayout>
      <SEO title="Free Rental Analysis | Cincinnati &amp; Dayton | EquityTeam" description="Request a free rental analysis from EquityTeam. Get local pricing guidance for rental properties in Greater Cincinnati, Greater Dayton, and Norris Lake." canonical="/free-rental-analysis" schemas={[faqSchema, serviceSchema]} speakableSelectors={["h1", "h2"]} />

      <section className="relative z-10 bg-[#121212] px-5 pb-16 pt-28 md:pb-20 md:pt-45 xl:px-0">
        <div className="mx-auto max-w-screen-xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-secondary">Local rental pricing guidance</p>
          <h1 className="mx-auto mb-5 max-w-[980px] font-cowling text-[40px] font-bold uppercase leading-none text-white md:text-[60px]">What could your property rent for?</h1>
          <p className="mx-auto max-w-[760px] text-lg leading-relaxed text-white/80 md:text-xl">Get a no-cost rental analysis informed by the property, nearby competition, and the market conditions renters are responding to today.</p>
        </div>
      </section>

      <main className="bg-white">
        <section className="bg-[#faf8f5] px-5 py-16 md:py-20 xl:px-0">
          <div className="mx-auto grid max-w-screen-xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,.85fr)] lg:items-start">
            <div className="pt-2">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary">A local review, not a generic guess</p>
              <h2 className="mb-6 font-cowling text-[34px] font-bold uppercase leading-tight text-black md:text-[46px]">Start with the market. Finish with the property.</h2>
              <div className="space-y-5 text-base leading-relaxed text-black/70 md:text-lg">
                <p>Online estimates can provide a useful benchmark, but two rentals in the same ZIP code can perform very differently. Condition, layout, parking, renovations, amenities, and even the surrounding blocks can change the result.</p>
                <p>EquityTeam combines available market evidence with local operating experience across <Link href="/locations/cincinnati" className="link-text">Greater Cincinnati</Link> and <Link href="/locations/dayton" className="link-text">Greater Dayton</Link>. For homes around Norris Lake, our <Link href="/vacation-rental-management" className="link-text">vacation rental team</Link> considers seasonal guest demand and property-specific amenities.</p>
                <p>Submit the form and we’ll contact you for the remaining property details. Once we have what we need, we’ll prepare a pricing recommendation you can use to plan your next move.</p>
              </div>
              <div className="mt-8 grid grid-cols-3 border-y border-black/15 py-6 text-center">
                <div><strong className="block text-2xl text-secondary">$0</strong><span className="text-xs uppercase tracking-wider text-black/55">Analysis fee</span></div>
                <div className="border-x border-black/15"><strong className="block text-2xl text-secondary">1–2</strong><span className="text-xs uppercase tracking-wider text-black/55">Business days</span></div>
                <div><strong className="block text-2xl text-secondary">Local</strong><span className="text-xs uppercase tracking-wider text-black/55">Market review</span></div>
              </div>
            </div>
            <FreeRentalAnalysisForm />
          </div>
        </section>

        <section className="px-5 py-16 md:py-24 xl:px-0">
          <div className="mx-auto max-w-screen-xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">What affects rental value</p>
              <h2 className="font-cowling text-[34px] font-bold uppercase leading-tight text-black md:text-[46px]">The estimate is more than a square-foot calculation</h2>
            </div>
            <div className="grid gap-px bg-black/15 md:grid-cols-2 lg:grid-cols-4">
              {FACTORS.map(([number, title, text]) => <article key={number} className="bg-white p-7 md:p-8"><span className="mb-7 block text-sm font-bold tracking-[0.18em] text-secondary">{number}</span><h3 className="mb-3 text-xl font-bold text-black">{title}</h3><p className="text-base leading-relaxed text-black/65">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#121212] px-5 py-16 text-white md:py-24 xl:px-0">
          <div className="mx-auto grid max-w-screen-xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Build a reliable rent range</p><h2 className="mb-5 font-cowling text-[34px] font-bold uppercase leading-tight md:text-[46px]">How owners can research rent</h2><p className="text-base leading-relaxed text-white/70">A strong pricing decision uses several signals. These steps help separate a realistic asking rent from a number that only looks good on paper.</p></div>
            <ol className="space-y-7">
              {[
                ["Study active competition", "Look at rentals that a prospective resident would consider alongside yours. Match the neighborhood, property type, bedroom count, size, condition, and major amenities as closely as possible."],
                ["Check listing history", "An advertised price does not prove a home leased at that amount. Note price reductions, time on market, and listings that disappear and return."],
                ["Account for the property itself", "Adjust for renovations, deferred maintenance, parking, laundry, outdoor areas, utilities, pet policies, and features that affect daily use."],
                ["Balance rent against vacancy", "A higher asking price can reduce annual income when it creates a long vacancy. Compare the potential increase with the cost of each additional vacant week."],
              ].map(([title, text], index) => <li key={title} className="grid grid-cols-[44px_1fr] gap-5 border-b border-white/15 pb-7 last:border-0"><span className="grid h-10 w-10 place-items-center rounded-full border border-secondary text-sm font-bold text-secondary">{index + 1}</span><div><h3 className="mb-2 text-xl font-bold text-secondary">{title}</h3><p className="leading-relaxed text-white/70">{text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="px-5 py-16 md:py-24 xl:px-0">
          <div className="mx-auto max-w-screen-xl">
            <div className="mb-12 text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Markets we know</p><h2 className="font-cowling text-[34px] font-bold uppercase text-black md:text-[46px]">Rental analysis for EquityTeam service areas</h2></div>
            <div className="grid gap-6 lg:grid-cols-3">
              {MARKETS.map(([eyebrow, title, text, href, cta]) => <article key={title} className="flex flex-col border border-black/15 p-7 md:p-8"><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary">{eyebrow}</p><h3 className="mb-4 text-2xl font-bold text-black">{title}</h3><p className="mb-7 flex-1 leading-relaxed text-black/65">{text}</p><Link href={href} className="cta-secondary text-sm">{cta} <span className="cta-arrow">→</span></Link></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#faf8f5] px-5 py-16 md:py-20 xl:px-0">
          <div className="mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-2 lg:items-center">
            <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Independent starting points</p><h2 className="mb-5 font-cowling text-[34px] font-bold uppercase text-black md:text-[44px]">Compare automated rental estimates</h2><p className="mb-4 leading-relaxed text-black/70">Public tools can help you establish a baseline before speaking with a local expert. Try more than one source and look for a range rather than treating a single result as a guaranteed lease price.</p><p className="leading-relaxed text-black/70">Automated results may miss recent improvements, exact condition, local street differences, and current competition. Use them as context for the property-specific review EquityTeam provides.</p></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <ExternalTool href="https://www.zillow.com/rental-manager/price-my-rental/" name="Zillow Rent Zestimate" text="Review an automated estimate and advertised rental competition." />
              <ExternalTool href="https://www.redfin.com/rental-estimate" name="Redfin Rental Estimate" text="Compare a second data-based view of potential fair-market rent." />
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:py-24 xl:px-0">
          <div className="mx-auto grid max-w-screen-xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Plan the next step</p><h2 className="mb-5 font-cowling text-[34px] font-bold uppercase text-black md:text-[44px]">Turn a rent estimate into an operating decision</h2><p className="leading-relaxed text-black/70">Pricing is one part of the plan. Explore the tools and services that help owners compare options, reduce vacancy, and understand professional management.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">{[["Residential property management", "/residential-property-management"], ["Rent vs. sell calculator", "/tools/rent-vs-sell"], ["Vacancy cost calculator", "/tools/vacancy-cost"], ["All service areas", "/areas-we-serve"]].map(([label, href]) => <Link key={href} href={href} className="flex items-center justify-between border border-black/15 p-5 font-bold text-black transition-colors hover:border-secondary hover:text-secondary"><span>{label}</span><span>→</span></Link>)}</div>
          </div>
        </section>

        <section className="bg-[#121212] px-5 py-16 text-white md:py-20 xl:px-0">
          <div className="mx-auto max-w-4xl"><div className="mb-10 text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Rental analysis questions</p><h2 className="font-cowling text-[34px] font-bold uppercase md:text-[44px]">Frequently asked questions</h2></div><FaqAccordion items={FAQS} defaultOpenIdx={0} /></div>
        </section>
      </main>
    </PageLayout>
  );
}

function ExternalTool({ href, name, text }: { href: string; name: string; text: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="group border border-black/15 bg-white p-7 transition-colors hover:border-secondary"><span className="mb-5 block text-xs font-bold uppercase tracking-[0.16em] text-secondary">External resource</span><strong className="mb-3 block text-2xl text-black">{name}</strong><span className="text-sm leading-relaxed text-black/60">{text}</span><span className="mt-6 block text-sm font-bold text-secondary">Visit resource ↗</span></a>;
}
