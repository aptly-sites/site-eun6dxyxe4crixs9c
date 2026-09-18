import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LOCATION_DATA } from "@/data/locationData";
import { buildLocationFaqs, LOCATION_FAQ_STATS, FALLBACK_FAQ_STATS } from "@/data/locationFaqData";
import { SITE_URL } from "@/lib/siteUrl";
import {
  parseLocationFromPath,
  getRegionLocations,
  REGIONS,
  type RegionMeta,
} from "@/data/locationRegistry";
import {
  ShieldCheck,
  Clock,
  Calculator,
  Key,
  PawPrint,
  Wrench,
  House,
  CurrencyDollar,
  FileText,
} from "@phosphor-icons/react";

const ORIGIN = import.meta.env.BASE_URL.replace(/\/$/, '');

function boldFirstET(text: string): string {
  return text.replace("EquityTeam", "<strong>EquityTeam</strong>");
}

// ─────────────────────────────────────────────────────────────────────────────
// Guarantees — split by service line. LTR set is the original 9; vacation is
// the universal subset that actually applies to short-stay nightly rentals.
// ─────────────────────────────────────────────────────────────────────────────

const LTR_GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "90-Day Risk-Free Guarantee",
    body: "Cancel within the first 90 days and we'll refund all paid management charges — no questions asked.",
  },
  {
    icon: Clock,
    title: "48-Hour Response Guarantee",
    body: "We'll return your call or email within 48 business hours or credit your account $20.",
  },
  {
    icon: Calculator,
    title: "Accounting Accuracy Guarantee",
    body: "If you find an accounting error, we'll fix it and credit you 10% of the difference.",
  },
  {
    icon: Key,
    title: "Leasing Guarantee",
    body: "Signed lease within 21 days of your unit being rent-ready, or management fees are credited until leased. Tenants we place are guaranteed for 12 months — if they leave early, we prorate a credit toward the next leasing fee.",
  },
  {
    icon: PawPrint,
    title: "Pet Damage Guarantee",
    body: "We collect pet rent and cover up to $1,000 in pet-related damage above and beyond the security deposit. Service and companion animals are also covered with ET+.",
  },
  {
    icon: Wrench,
    title: "Reduced Repairs Guarantee",
    body: "Our labor rates are guaranteed to be 10% below retail — or we credit you the difference, plus 10% of the difference amount.",
  },
  {
    icon: House,
    title: "Property Protection Guarantee",
    body: "Covers malicious tenant damage up to $35,000 and theft damage up to $15,000. (ET+)",
  },
  {
    icon: CurrencyDollar,
    title: "Rent Guarantee",
    body: "Covers lost rent for up to 25 weeks due to lease breaks, evictions, death, or other qualifying events — capped at $3,000/month. (ET+)",
  },
  {
    icon: FileText,
    title: "Eviction Protection Guarantee",
    body: "Eviction-related expenses refunded up to $6,000 — covering filing fees, legal defense, sheriff costs, and rekeying. (ET+)",
  },
];

const VACATION_GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "90-Day Risk-Free Guarantee",
    body: "Cancel within the first 90 days and we'll refund all management charges — no questions asked.",
  },
  {
    icon: Clock,
    title: "48-Hour Response Guarantee",
    body: "We'll return your call or email within 48 business hours or credit your account $20.",
  },
  {
    icon: Calculator,
    title: "Accounting Accuracy Guarantee",
    body: "If you find an accounting error, we'll fix it and credit you 10% of the difference.",
  },
  {
    icon: Wrench,
    title: "Reduced Repairs Guarantee",
    body: "Our labor rates are guaranteed to be 10% below retail — or we credit you the difference, plus 10% of the difference amount.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Service tabs — residential property management vs short-term/vacation rentals.
// ─────────────────────────────────────────────────────────────────────────────

const LTR_SERVICES = [
  {
    id: "item-1",
    title: "Tenant Screening",
    body: "A thorough tenant screening process is essential for securing reliable renters who will care for your property and pay rent on time. Our professional property managers conduct background checks, credit evaluations, rental history verifications, and employment confirmations to ensure prospective tenants meet strict criteria. This reduces the risk of late payments, rental damage, and evictions, ultimately providing property owners with peace of mind and long-term rental stability.",
  },
  {
    id: "item-2",
    title: "Property Marketing",
    body: "Effective property marketing minimizes vacancy periods and attracts high-quality tenants. Our property managers use professional photography, comprehensive rental unit descriptions, and strategic listing placements on top rental websites to maximize exposure. Additionally, we leverage social media and local networks to ensure your rental reaches the right audience quickly, reducing downtime and increasing profitability.",
  },
  {
    id: "item-3",
    title: "Leasing Agreements",
    body: "A well-crafted leasing agreement protects both landlords and tenants by clearly outlining rental terms, responsibilities, and legal requirements. Our property management business creates legally compliant leases that address rent policies, maintenance expectations, and tenant obligations, minimizing disputes and ensuring smooth tenancy. Our expertise helps prevent costly legal issues while promoting fair and enforceable rental terms.",
  },
  {
    id: "item-4",
    title: "Move-In Inspections",
    body: "Move-in inspections provide a detailed record of the property's condition before a tenant takes possession, helping to prevent disputes over security deposits. As your property manager, we conduct thorough inspections with written reports and photos, ensuring tenants acknowledge existing conditions. This documentation safeguards you, as the property owner, from false damage claims and ensures tenants understand their maintenance responsibilities.",
  },
  {
    id: "item-5",
    title: "Regular Property Inspections",
    body: "Routine property inspections help identify maintenance issues early, preventing costly repairs and preserving property value. We'll schedule and conduct periodic inspections to ensure tenants are complying with lease agreements and to check for potential property concerns. These proactive inspections contribute to tenant satisfaction and long-term property upkeep.",
  },
  {
    id: "item-6",
    title: "Rent Collection with Online Payments",
    body: "Online rent collection simplifies the payment process, reducing late payments and ensuring steady cash flow. We provide secure online portals where tenants can pay rent conveniently from anywhere. What's more, our automated reminders and multiple payment options improve on-time payments while reducing administrative burdens for landlords, making the entire rent collection process seamless and efficient.",
  },
  {
    id: "item-7",
    title: "Maintenance and Repairs",
    body: "Prompt maintenance and repairs keep rental properties in top condition, enhancing tenant satisfaction and property value. Our property management team will coordinate and oversee repairs and work with our network of trusted vendors, ensuring issues are resolved quickly and cost-effectively. Our 24/7 emergency response services also protect owners from major damages, helping to maintain the property's appeal and long-term profitability.",
  },
];

const VACATION_SERVICES = [
  {
    id: "v-1",
    title: "Multi-Platform Listings",
    body: "We list your property professionally on Airbnb, VRBO, Booking.com, and a direct-booking channel — each listing written, photographed, and optimized to convert lake-trip travelers. A single channel rarely fills a calendar; a coordinated multi-channel presence does, while preventing the double-bookings that come from running platforms manually.",
  },
  {
    id: "v-2",
    title: "Dynamic Pricing",
    body: "Nightly rates are adjusted by demand, seasonality, weekends, local events, and lead time so the property earns its true potential — not last year's number. Pricing is reviewed continuously, not set-and-forget, which is what separates a real revenue manager from a static listing.",
  },
  {
    id: "v-3",
    title: "Guest Screening & Communication",
    body: "Every guest is vetted, every booking acknowledged, and every question answered by a real local team — not an offshore call center. Written house rules, ID verification, and round-the-clock messaging protect the home, the neighbors, and the experience the guest came for.",
  },
  {
    id: "v-4",
    title: "Hotel-Grade Turnovers",
    body: "Between every stay we deliver a hotel-grade turnover — laundered linens, fresh consumables, staged spaces, and a documented checklist completed by trusted local cleaners. Mid-stay touch-ups are handled when guest tenure warrants. This is the layer that drives 5-star reviews and repeat bookings.",
  },
  {
    id: "v-5",
    title: "Maintenance & Inspections",
    body: "Routine inspections happen after every stay. Preventative maintenance is scheduled in advance for HVAC, plumbing, dock, deck, and seasonal closing. Our trusted in-house and partner trades handle anything that comes up — quickly, cost-effectively, and without owners chasing vendors.",
  },
  {
    id: "v-6",
    title: "Owner Reporting & Direct Deposits",
    body: "Transparent monthly statements with occupancy, ADR, and channel-level detail. Direct-deposit owner draws on the same Friday cadence as our residential portfolio. You see exactly what the property earned and exactly what it cost — no spreadsheets, no surprises.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cross-region link map — when on a Cincinnati page, point at Dayton; when on
// a TN page, point at Ohio. Lets browsers and bots discover other markets.
// ─────────────────────────────────────────────────────────────────────────────

const CROSS_REGION_LINK: Record<RegionMeta["id"], { label: string; href: string }> = {
  cincinnati: { label: "Dayton, Ohio Property Management →", href: "/dayton-property-management" },
  dayton: { label: "Cincinnati, Ohio Property Management →", href: "/locations/cincinnati/blue-ash" },
  "norris-lake": { label: "Cincinnati & Dayton, Ohio Property Management →", href: "/areas-we-serve" },
};

export default function LocationPage() {
  const [loc] = useLocation();
  const [activeService, setActiveService] = useState(0);
  const [tabInteracted, setTabInteracted] = useState(false);

  useEffect(() => {
    setActiveService(0);
    setTabInteracted(false);
  }, [loc]);

  const parsed = parseLocationFromPath(loc);
  if (!parsed) return null;

  const { slug, displayName: cityName, region, urlPath } = parsed;
  const isVacation = region.primaryService === "vacation";

  const data = LOCATION_DATA[slug];
  const img = data?.img ?? `https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80`;
  const heroImg = data?.img?.startsWith('/')
    ? `${ORIGIN}${data.img}`
    : data?.img ?? `${ORIGIN}/images/locations/heroes/${slug}-hero.jpg`;

  const fallbackParas = isVacation
    ? [
        `Are you a property owner on or near ${cityName}, ${region.stateName}, looking for a serious short-term/vacation rental management partner? EquityTeam brings two decades of property management discipline to a single focused service line in Tennessee: short-term/vacation rental management for ${cityName} homes.`,
        `We treat each ${cityName} property as a real hospitality business — professional photography, multi-channel listings on Airbnb, VRBO, Booking.com, and a direct-booking site. Pricing is tuned to season, weekends, and lead time, and turnovers are hotel-grade between every stay.`,
        `Guest screening, written house rules, and round-the-clock messaging protect your home and your neighbors. Routine inspections after every stay and trusted local trades keep the property ready for the next group.`,
        `Owner reporting follows the same Friday cadence as our Ohio residential portfolio — transparent monthly statements, occupancy and ADR detail, and direct-deposit owner draws.`,
        `Contact EquityTeam to talk through projected revenue, local ordinance fit, and what it takes to run a ${cityName} short-term/vacation rental well.`,
      ]
    : [
        `Are you a property owner in ${cityName}, ${region.stateName}, looking for reliable, professional property management? EquityTeam is here to help. With years of experience serving the greater Cincinnati and Dayton markets, our team delivers comprehensive management solutions that maximize your returns and minimize your stress.`,
        `We handle every aspect of managing your ${cityName} rental — from marketing your property and screening tenants to collecting rent, coordinating maintenance, and delivering transparent financial reports. Our goal is to make property ownership as effortless and profitable as possible for you.`,
        `EquityTeam's rigorous tenant screening process protects your investment. We evaluate each applicant's credit history, background, employment, and rental record to ensure only qualified, responsible tenants occupy your ${cityName} property.`,
        `Our proactive approach to maintenance keeps your property in excellent condition and your tenants satisfied. We coordinate with trusted local contractors to address issues quickly and cost-effectively, preventing small problems from becoming expensive repairs.`,
        `Contact EquityTeam today to learn how our professional property management services can help you achieve your investment goals in ${cityName}.`,
      ];

  const paras = data?.paras ?? fallbackParas;

  const cityDesc: string[] = data?.cityDesc ?? [
    `${cityName}, ${region.stateName}, offers residents a welcoming community with convenient access to everything the surrounding region has to offer. With well-maintained neighborhoods, excellent schools, and a variety of local amenities, ${cityName} is an attractive place to call home for residents of all backgrounds.`,
    `The area boasts a strong sense of community spirit, with local events, parks, and businesses that contribute to an appealing quality of life. Its location and access to major employment and recreation centers make ${cityName} a practical and desirable place for renters and homeowners alike.`,
    `(Source: Wikipedia)`,
  ];

  const mapSrc = data?.mapSrc
    ?? `https://maps.google.com/maps?q=${encodeURIComponent(data?.mapQ ?? `${cityName} ${region.stateName} USA`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  // Service-aware copy
  const heroH1 = isVacation
    ? `${cityName} Short-Term/Vacation Rentals`
    : `${cityName} Property Management`;
  const introH2 = isVacation
    ? `Let Us Manage Your ${cityName} Short-Term/Vacation Rental`
    : `Let Us Manage Your ${cityName} Rental Property`;
  const servicesH2 = isVacation
    ? `Our ${cityName} Short-Term/Vacation Rental Services`
    : `Our ${cityName} Property Management Services`;
  const services = isVacation ? VACATION_SERVICES : LTR_SERVICES;
  const guarantees = isVacation ? VACATION_GUARANTEES : LTR_GUARANTEES;
  const areasHeading = `${region.name} & Surrounding Areas`;
  const sameRegionLocations = getRegionLocations(region.id);
  const crossRegion = CROSS_REGION_LINK[region.id];

  // Breadcrumb JSON-LD for rich-results eligibility
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve` },
      { "@type": "ListItem", position: 3, name: `${region.name}, ${region.state}`, item: `${SITE_URL}/areas-we-serve#${region.id}` },
      { "@type": "ListItem", position: 4, name: cityName, item: `${SITE_URL}${urlPath}` },
    ],
  };

  const seoTitle = isVacation
    ? `${cityName} Vacation Rental Management | EquityTeam`
    : `${cityName} Property Management | EquityTeam`;

  const seoDescription = isVacation
    ? `Vacation rental management in ${cityName}, ${region.stateName} by EquityTeam — listings, dynamic pricing, guest screening, and turnovers.`
    : `Professional property management in ${cityName}, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.`;

  const locationFaqs = isVacation ? [
    {
      question: `How much does vacation rental management cost in ${cityName}?`,
      answer: `EquityTeam's vacation rental management fees vary based on property size and service level. There are no hidden charges — our full fee structure is reviewed with every owner before we start. Contact us for a projected revenue estimate and fee breakdown specific to your ${cityName} property.`,
    },
    {
      question: `What platforms will my ${cityName} vacation rental be listed on?`,
      answer: `We list every property on Airbnb, VRBO, Booking.com, and a direct-booking channel — each professionally photographed, written, and optimized for conversions. Running a single channel rarely fills a ${cityName} calendar; a coordinated multi-platform presence does.`,
    },
    {
      question: `How does EquityTeam handle guest screening for ${cityName} vacation rentals?`,
      answer: `Every guest is vetted before booking is confirmed. We verify ID, review platform history, enforce written house rules, and handle all pre- and post-stay communication — protecting your ${cityName} home and your neighbors.`,
    },
    {
      question: `What is included in the turnover process for my ${cityName} property?`,
      answer: `After every stay we deliver a hotel-grade turnover — laundered linens, restocked consumables, staged spaces, and a documented checklist completed by trusted local cleaners. Mid-stay touch-ups are handled when guest tenure warrants it.`,
    },
    {
      question: `How do I get paid as a ${cityName} vacation rental owner with EquityTeam?`,
      answer: `Owner draws are deposited directly to your account on a regular cadence, accompanied by a transparent monthly statement showing occupancy, ADR, and channel-level detail. No spreadsheets, no surprises.`,
    },
  ] : buildLocationFaqs(cityName, LOCATION_FAQ_STATS[slug] ?? FALLBACK_FAQ_STATS);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: locationFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EquityTeam Property Management",
    description: `Professional property management in ${cityName}, ${region.stateName}. EquityTeam has managed residential rental properties in the greater ${region.name} area since 2008.`,
    telephone: "+15134444010",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "11427 Reed Hartman Hwy",
      addressLocality: "Cincinnati",
      addressRegion: "OH",
      postalCode: "45241",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      containedInPlace: { "@type": "State", name: region.stateName },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      reviewCount: "200",
      bestRating: "5",
    },
  };

  return (
    <PageLayout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={urlPath}
        ogImage={heroImg}
        schemas={[localBusinessSchema, faqSchema]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-28 md:pt-48 md:overflow-hidden">
        {/* Location-specific hero image — LCP, SEO-crawlable */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt={`${cityName}, ${region.stateName} ${isVacation ? "vacation rental" : "property management"} — EquityTeam`}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-[#121212]/40 to-[#121212]/10" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center">
          <h1
            className="uppercase font-cowling font-bold leading-none text-white mb-6 text-[28px] md:text-[72px] md:max-w-[960px] mx-auto"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}
          >
            {heroH1}
          </h1>
          <blockquote
            className="text-white font-display font-normal italic text-[24px] md:text-[32px] leading-snug md:max-w-screen-md mx-auto border-l-0 pl-0"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}
          >
            &ldquo;We&rsquo;ll treat your property like it&rsquo;s our own.&rdquo;
          </blockquote>
          <span
            className="block text-white text-base leading-normal mt-5 font-sans font-semibold uppercase tracking-[0.2em]"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}
          >
            — Mark Thompson, Founder/CEO/Broker
          </span>
          <div className="text-center mt-10">
            <Link href="/contact-us" className="btn-solid-secondary uppercase">
              Schedule a Consult
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="overlay-gradient pb-8 md:pb-10 pt-8 md:pt-14 px-5 xl:px-0 z-10 relative">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="md:flex md:justify-between gap-16">
              {[
                { label: "Since", value: "2003" },
                { label: "Transactions", value: "3000+" },
                { label: "Customer Satisfaction", value: "98%" },
                { label: "Assets Managed", value: "$100M+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center mb-10 md:mb-0 last:mb-0">
                  <span className="block font-sans font-bold text-base leading-tight tracking-[0.18em] text-white uppercase mb-4">
                    {stat.label}
                  </span>
                  <span className="block font-cowling font-bold text-[40px] md:text-[56px] leading-none text-secondary">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Content ───────────────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white px-5 xl:px-0 service-content-section">
        <div className="max-w-screen-xl mx-auto">
          <div className="w-full text-center">
            <h2 className="section-heading font-sans font-normal text-[40px] md:text-5xl leading-none text-primary mb-15 md:mb-18 mx-auto">
              {introH2}
            </h2>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-20 md:gap-8">
            {/* Left: paragraphs + CTA */}
            <div className="px-6 md:px-0 basis-full lg:basis-2/3 xl:basis-1/2 md:pr-8 service-content inner-pages-main-content">
              {paras.map((p, i) => (
                i === 0
                  ? <p key={i} dangerouslySetInnerHTML={{ __html: boldFirstET(p) }} />
                  : <p key={i}>{p}</p>
              ))}
              <div className="relative z-10 text-center md:text-left mt-8">
                <Link href="/contact-us" className="btn-solid-secondary uppercase w-auto">
                  Schedule a Call
                </Link>
              </div>
            </div>

            {/* Right: photo + stats box */}
            <div className="basis-full lg:basis-1/3 xl:basis-1/2 pl-0 md:pl-8">
              <img className="mb-12 block w-full" src={img} alt={`${cityName} ${isVacation ? "vacation rental" : "property"} management`} />
              <div className="w-full p-8 md:p-15 bg-primary">
                <div className="border-1 border-secondary p-8 md:p-15 text-center grid grid-cols-1 gap-12">
                  {isVacation ? (
                    <>
                      <div>
                        <div className="font-sans font-bold text-2xl text-secondary m-0 mb-3">Listing Channels</div>
                        <div className="text-white font-sans text-lg leading-tight">
                          Airbnb<br />VRBO<br />Booking.com<br />Direct
                        </div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-2xl text-secondary m-0 mb-3">Avg Response Time</div>
                        <div className="text-white font-sans text-lg leading-tight">Under 1 hour</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-2xl text-secondary m-0 mb-3">Turnover Standard</div>
                        <div className="text-white font-sans text-lg leading-tight">Hotel-grade</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-2xl text-secondary m-0 mb-3">Owner Draw Cadence</div>
                        <div className="text-white font-sans text-lg leading-tight">Monthly direct deposit</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="font-sans font-bold text-2xl text-secondary m-0 mb-3">Unit Types</div>
                        <div className="text-white font-sans text-lg leading-tight">
                          60% SF<br />35% MF/Apts<br />5% other
                        </div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-2xl text-secondary m-0 mb-3">Avg Rental Days on Market</div>
                        <div className="text-white font-sans text-lg leading-tight">13</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-2xl text-secondary m-0 mb-3">Avg Occupancy Rate</div>
                        <div className="text-white font-sans text-lg leading-tight">92%</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-2xl text-secondary m-0 mb-3">Avg Rent Collected</div>
                        <div className="text-white font-sans text-lg leading-tight">94%</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guarantees ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 section-pad bg-primary">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4">Service Guarantees</h2>
            <p className="font-sans text-white/70 text-base max-w-2xl mx-auto">
              We align our services with our Owners' interests — and offer guarantees you won't find anywhere else.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="border border-white/15 p-8 relative hover:border-secondary transition-colors duration-200"
              >
                <g.icon size={32} weight="thin" className="text-secondary mb-5" />
                <h3 className="font-sans font-bold text-base text-white mb-3">{g.title}</h3>
                <p className="font-sans text-base text-white/70 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Management Services ───────────────────────────────────────────────── */}
      <section id="services-section" className="relative pt-16 md:pt-20 pb-16 md:pb-20 bg-white">
        <div className="max-w-[640px] mx-auto text-center px-5">
          <h2 className="font-display font-normal text-[40px] md:text-5xl leading-none text-primary mb-15">
            {servicesH2}
          </h2>
        </div>

        <div className="max-w-screen-xl mx-auto relative px-5">
          {/* Tab navigation */}
          <div className="max-w-[650px] mx-auto text-center mb-8 md:mb-14">
            {services.map((svc, i) => (
              <button
                key={svc.id}
                onClick={() => { setActiveService(i); setTabInteracted(true); }}
                className={`services-tab-btn font-sans font-bold leading-tight uppercase pb-4 mx-1 sm:mx-4 mb-6 border-b-2 border-white inline-block cursor-pointer bg-transparent transition-all duration-150 text-primary ${
                  activeService === i && tabInteracted
                    ? "opacity-100 md:!border-secondary"
                    : "opacity-50"
                }`}
              >
                {svc.title}
              </button>
            ))}
          </div>

          {/* Mobile: single active card */}
          <div className="md:hidden px-1">
            <div className="max-w-[536px] mx-auto border border-secondary p-12 text-left text-primary">
              <h3 className="font-display font-normal text-[40px] leading-none mb-8 text-primary">
                {services[activeService].title}
              </h3>
              <p>{services[activeService].body}</p>
            </div>
          </div>

          {/* Tablet (md): 2 cards */}
          {(() => {
            const start2 = Math.min(activeService, services.length - 2);
            const twoCards = services.slice(start2, start2 + 2);
            return (
              <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-5">
                {twoCards.map((svc, j) => (
                  <div
                    key={svc.id}
                    onClick={() => setActiveService(start2 + j)}
                    className="border border-secondary p-12 text-left text-primary cursor-pointer"
                  >
                    <h3 className="font-display font-normal text-[40px] leading-none mb-8 text-primary">
                      {svc.title}
                    </h3>
                    <p>{svc.body}</p>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Desktop (lg+): 3 cards */}
          {(() => {
            const start3 = Math.min(activeService, services.length - 3);
            const threeCards = services.slice(start3, start3 + 3);
            return (
              <div className="hidden lg:grid lg:grid-cols-3 gap-5">
                {threeCards.map((svc, j) => (
                  <div
                    key={svc.id}
                    onClick={() => setActiveService(start3 + j)}
                    className="border border-secondary p-12 text-left text-primary cursor-pointer"
                  >
                    <h3 className="font-display font-normal text-[40px] leading-none mb-8 text-primary">
                      {svc.title}
                    </h3>
                    <p>{svc.body}</p>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Schedule a Call CTA */}
          <div className="max-w-screen-xl px-5 text-center mt-15 mx-auto relative z-10">
            <Link
              href="/contact-us"
              className="btn-outline-secondary !text-primary bg-white"
            >
              SCHEDULE A CALL
            </Link>
          </div>
        </div>
      </section>

      {/* ── Free Rental Analysis CTA ─────────────────────────────────────────── */}
      <section className="relative py-14 md:py-16 px-5 md:px-10 bg-primary">
        <div id="cta-module" className="absolute -top-10" />
        <div className="border-4 border-secondary px-6 py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-center justify-center md:justify-between gap-5 md:gap-10">
          <h2 className="font-cowling font-normal text-2xl md:text-3xl leading-tight text-white uppercase tracking-[0.08em] text-center md:text-left m-0">
            Get Your Free Rental Analysis
          </h2>
          <div className="relative z-10 shrink-0">
            <Link href="/free-rental-analysis" className="block btn-solid-secondary uppercase whitespace-nowrap">
              Click To Start
            </Link>
          </div>
        </div>
      </section>

      {/* ── City Description + Map ────────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white">
        <div id="about-module" className="absolute -top-10" />
        <div className="max-w-screen-xl mx-auto grid grid-cols-1">
          <div className="mx-auto md:mx-0 w-full pt-11 flex px-13">
            <div className="w-full">
              <h2 className="section-heading text-primary mb-8 md:mb-10">{cityName}, {region.stateName}</h2>
              <div className="text-primary leading-normal inner-pages-main-content">
                {cityDesc.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="relative z-10 text-center">
                <Link
                  href="/contact-us"
                  className="btn-solid-secondary uppercase sm:mr-5 w-4/5 sm:w-auto mt-2 inline-block"
                >
                  Schedule a Consult
                </Link>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full mt-15" id="area-map">
            <iframe
              src={mapSrc}
              width="600"
              height="450"
              style={{ border: 0, width: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${cityName}`}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-primary" aria-label="Frequently asked questions">
        <div className="max-w-screen-md mx-auto px-5 xl:px-0">
          <h2 className="section-heading text-white text-center mb-12 md:mb-16">
            {isVacation
              ? `${cityName} Vacation Rental FAQs`
              : `${cityName} Property Management FAQs`}
          </h2>
          <FaqAccordion items={locationFaqs} />
        </div>
      </section>

      {/* ── Areas We Serve (region-aware) ────────────────────────────────────── */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 md:px-0">
          <div className="w-full text-center">
            <span className="inline-block section-heading text-primary mb-6">
              {areasHeading}
            </span>
            <p className="font-sans text-base text-primary/70 mb-10 max-w-2xl mx-auto">
              {region.serviceLabel} across the greater {region.name}, {region.stateName} area.
            </p>
            <ul className="mx-auto text-center list-none p-0 m-0">
              {sameRegionLocations.map((area) => (
                <li key={area.slug} className="inline-block">
                  <Link
                    href={area.urlPath}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="px-4 py-4 mx-1 my-1 border border-white font-medium text-base leading-tight tracking-[0.08em] text-primary inline-block uppercase hover:border-secondary transition-all duration-200"
                  >
                    {area.displayName}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Cross-region link — points users to other markets / service lines */}
            <div className="mt-12 pt-8 border-t border-primary/10 max-w-2xl mx-auto">
              <p className="font-sans text-base tracking-[0.12em] uppercase text-primary/60 mb-3">
                Looking for another market
              </p>
              <Link
                href={crossRegion.href}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-block font-sans font-semibold tracking-[0.1em] uppercase text-secondary hover:underline"
              >
                {crossRegion.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
