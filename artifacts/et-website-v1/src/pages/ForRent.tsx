import { RentalSearch } from "@/features/rentals/RentalSearch";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { forRentFaqs } from "@/data/faqData";

const APTLY_URL = "https://portal.getaptly.com/search/Eun6dxYxe4CRiXS9c/";

const applySteps = [
  {
    number: "1",
    heading: "Find a home",
    description: "Browse listings below. Filter by city, bedrooms, price, and pets to find homes that fit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    number: "2",
    heading: "Schedule a self-tour",
    description: 'Tour most homes on your own schedule with "See It Now." Pick a time and we\'ll text you access instructions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: "3",
    heading: "Submit your application",
    description: "Every adult 18+ applies. $49 application fee per applicant. Most applications take about 9 minutes. Decisions in 2–3 business days.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    number: "4",
    heading: "Sign and move in",
    description: "Once approved, sign the lease, pay move-in funds, and get access to your new home.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
];

const screeningCriteria = [
  {
    heading: "Income",
    body: "Combined household net income of at least 2.5× the monthly rent, verified through paystubs, tax returns (self-employed), or an offer letter. Housing vouchers count toward income.",
  },
  {
    heading: "Credit & Rental History",
    body: "There's no single credit cutoff score — we use published, rent-tiered credit standards with a minimum floor, and applicants who fall below their tier can still qualify with a surcharge or added income. Two years of verifiable rental history with no evictions or eviction filings in the last three years. See our full screening criteria for exact thresholds.",
  },
  {
    heading: "Background",
    body: "Standard criminal background check. We evaluate convictions individually — type, recency, and relevance to tenancy.",
  },
];

const benefitsList = [
  "$100,000 property liability coverage",
  "$10,000 personal property coverage",
  "HVAC filters delivered to your door",
  "Free ACH rent payment",
  "Utility concierge — we help set up utilities at move-in",
  "On-time rent payments reported to all three credit bureaus to help build your credit",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: forRentFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ForRent() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", looking: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return;
    setSending(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/owner-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message: form.looking,
          summary: form.looking ? `Rental preferences: ${form.looking}` : "Rental preferences were not specified.",
          website: data.get("website"),
          formSource: "Rental Match Request",
          pageTitle: document.title,
          pageUrl: location.origin + location.pathname + location.search,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to send your request.");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your request.");
    } finally {
      setSending(false);
    }
  }

  return (
    <PageLayout>
      <SEO
        title="Homes for Rent in Cincinnati and Dayton, Ohio | EquityTeam"
        description="Browse professionally managed homes for rent in Greater Cincinnati &amp; Dayton — self-tours, a transparent application process, and fast decisions."
        canonical="/for-rent"
        schema={faqSchema}
        breadcrumbs={[{ name: "Homes for Rent", href: "/for-rent" }]}
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-primary pt-28 pb-12 md:pt-40 md:pb-14 px-5 xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="w-16 h-1 bg-secondary mb-7" aria-hidden="true" />
          <h1 className="font-cowling font-bold uppercase leading-none text-white text-[28px] md:text-[52px] lg:text-[60px] max-w-4xl mb-6">
            Homes for Rent in Cincinnati and Dayton, Ohio
          </h1>
          <p className="text-white/80 font-sans text-base md:text-lg leading-relaxed max-w-2xl">
            Browse <a href="/residential-property-management" className="text-secondary hover:underline">professionally managed</a> rentals from EquityTeam. Self-tour most homes on your schedule, apply in about 9 minutes, and most decisions come back within 2–3 business days.
          </p>
        </div>
      </section>

      <div className="flex justify-center px-5 py-8 bg-white">
        <a className="btn-solid-secondary uppercase" href="/tools/rent-affordability">
          Calculate My Rent Budget
        </a>
      </div>
      <RentalSearch />

      {/* ── HOW TO APPLY — 4-STEP STRIP ──────────────── */}
      <section className="bg-primary section-pad xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-cowling font-bold uppercase text-secondary text-2xl md:text-3xl tracking-widest mb-12 md:mb-14">
            How to Apply
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            {applySteps.map((step) => (
              <div key={step.number} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-cowling font-bold text-4xl text-secondary leading-none">{step.number}</span>
                  <span className="text-secondary">{step.icon}</span>
                </div>
                <h3 className="font-sans font-bold text-white text-base uppercase tracking-widest">{step.heading}</h3>
                <p className="font-sans text-white/70 text-base leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-start mb-10">
            <a
              href={APTLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid-secondary inline-block uppercase"
            >
              Start an Application →
            </a>
          </div>

          {/* Same-day apply banner */}
          <div className="border-l-4 border-secondary bg-secondary/10 px-6 py-5">
            <p className="font-sans text-white text-base leading-relaxed">
              <strong className="text-secondary">Same-day special:</strong> Apply on the same day you tour and we'll credit your application fees back when you sign the lease. One small reward for moving fast — and one fewer reason to wait.
            </p>
          </div>
        </div>
      </section>

      {/* ── SCREENING CRITERIA ───────────────────────── */}
      <section className="bg-white section-pad xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-cowling font-bold uppercase text-primary text-2xl md:text-3xl tracking-widest mb-3">
            What We Look For
          </h2>
          <p className="font-sans text-[#555] text-base leading-relaxed max-w-2xl mb-10 md:mb-12">
            We publish our screening criteria so you can apply with confidence. Equal Housing Opportunity — we evaluate every applicant fairly against the same standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {screeningCriteria.map((col) => (
              <div key={col.heading} className="border-t-2 border-secondary pt-6">
                <h3 className="font-sans font-bold text-primary text-base uppercase tracking-widest mb-3">{col.heading}</h3>
                <p className="font-sans text-[#555] text-base leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vTHckBqH-nl4_ULQSQxWcISpiVwnSZZnxjg3Ne8W-toF7m-1eShrpVctNdlK6dp_aUWwLYqMhQhKhNP/pub"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans text-base font-semibold text-secondary hover:underline tracking-wide"
          >
            See the full screening criteria →
          </a>
        </div>
      </section>

      {/* ── RESIDENT BENEFITS PACKAGE ─────────────────── */}
      <section className="bg-primary section-pad xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="border border-secondary/40 px-8 py-10 md:px-12 md:py-12">
            <div className="flex flex-col md:flex-row md:items-start md:gap-16">
              <div className="md:max-w-sm mb-8 md:mb-0 flex-shrink-0">
                <div className="w-12 h-0.5 bg-secondary mb-5" />
                <h2 className="font-cowling font-bold uppercase text-secondary text-xl md:text-2xl tracking-widest mb-4 leading-tight">
                  Every Lease Includes the Resident Benefits Package
                </h2>
                <p className="text-white font-sans font-bold text-lg mb-6">$29/month</p>
                <p className="text-white/70 font-sans text-base leading-relaxed mb-6">
                  Required with every EquityTeam lease. Real protection and convenience built in.
                </p>
                <a
                  href="/resident-benefits"
                  className="inline-block font-sans text-base font-semibold text-secondary hover:underline tracking-wide"
                >
                  Learn more about the Resident Benefits Package →
                </a>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {benefitsList.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-secondary/20 border border-secondary flex items-center justify-center">
                      <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#B4975A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-sans text-white/80 text-base leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="bg-primary section-pad xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-cowling font-bold uppercase text-secondary text-2xl md:text-3xl tracking-widest mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 font-sans text-base mb-10">Applying to Rent</p>
          <FaqAccordion items={forRentFaqs} defaultOpenIdx={0} />
          <div className="mt-10 pt-8 border-t border-white/10">
            <a
              href={APTLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid-secondary inline-block uppercase"
            >
              Start an Application →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAIR HOUSING DISCLOSURE ───────────────────── */}
      <section className="bg-white py-10 md:py-12 px-5 xl:px-0 border-t border-[#e0e0e0]">
        <div className="max-w-screen-xl mx-auto">
          <p className="font-sans text-[#555] text-base leading-relaxed max-w-3xl mb-3">
            <strong className="text-primary">Equal Housing Opportunity.</strong> EquityTeam complies with all federal, Ohio, and local fair housing laws. We do not discriminate based on race, color, religion, national origin, sex, familial status, disability, or any other protected class.
          </p>
          <p className="font-sans text-[#555] text-base leading-relaxed max-w-3xl">
            Full screening criteria, fees, and lease terms are available on each property listing and on request. Ohio Real Estate License REC.2012001994.{" "}
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vTHckBqH-nl4_ULQSQxWcISpiVwnSZZnxjg3Ne8W-toF7m-1eShrpVctNdlK6dp_aUWwLYqMhQhKhNP/pub"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-secondary hover:underline"
            >
              Full screening criteria
            </a>
            {" "}·{" "}
            <a href="/privacy-policy" className="text-secondary hover:underline">Privacy policy</a>
            {" "}·{" "}
            <a href="/contact-us" className="text-secondary hover:underline">Contact us</a>
          </p>
        </div>
      </section>

      {/* ── BOTTOM CTA / CONTACT ──────────────────────── */}
      <section className="bg-primary section-pad xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="w-12 h-0.5 bg-secondary mb-6" />
              <h2 className="font-cowling font-bold uppercase text-white text-2xl md:text-3xl tracking-widest mb-4 leading-tight">
                Don't see what you're looking for?
              </h2>
              <p className="font-sans text-white/70 text-base leading-relaxed mb-8">
                Tell us what you need — bedrooms, neighborhood, budget, move-in date — and we'll reach out when something matches.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+15134444010"
                  className="inline-flex items-center gap-2 font-sans text-secondary font-semibold text-base hover:underline"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  (513) 444-4010
                </a>
                <a
                  href="mailto:tenants@equityteam.com"
                  className="inline-flex items-center gap-2 font-sans text-secondary font-semibold text-base hover:underline"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  tenants@equityteam.com
                </a>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="border border-secondary/40 px-8 py-10 text-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-secondary mx-auto mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-sans text-white font-semibold mb-1">We'll be in touch.</p>
                  <p className="font-sans text-white/60 text-base">We'll reach out when a matching home becomes available.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div hidden aria-hidden="true">
                    <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fr-name" className="block font-sans text-base font-semibold text-white/60 uppercase tracking-wider mb-1.5">Name</label>
                      <input
                        id="fr-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 text-white font-sans text-base px-4 py-3 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/30"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="fr-email" className="block font-sans text-base font-semibold text-white/60 uppercase tracking-wider mb-1.5">Email</label>
                      <input
                        id="fr-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 text-white font-sans text-base px-4 py-3 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/30"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fr-phone" className="block font-sans text-base font-semibold text-white/60 uppercase tracking-wider mb-1.5">Phone</label>
                    <input
                      id="fr-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 text-white font-sans text-base px-4 py-3 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/30"
                      placeholder="(513) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="fr-looking" className="block font-sans text-base font-semibold text-white/60 uppercase tracking-wider mb-1.5">What are you looking for?</label>
                    <textarea
                      id="fr-looking"
                      rows={4}
                      value={form.looking}
                      onChange={(e) => setForm((f) => ({ ...f, looking: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 text-white font-sans text-base px-4 py-3 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/30 resize-none"
                      placeholder="Bedrooms, neighborhood, budget, move-in date..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-solid-secondary uppercase self-start disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Send →"}
                  </button>
                  <p className="font-sans text-sm text-white/60">
                    By submitting, you’re asking EquityTeam to contact you about available rentals. <a href="/privacy-policy" className="underline">Privacy policy</a>.
                  </p>
                  {submitError && <p role="alert" className="font-sans text-sm text-red-300">{submitError}</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
