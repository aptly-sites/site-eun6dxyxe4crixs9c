import { useState, useEffect, ElementType } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";
import {
  Key,
  CheckSquare,
  Users,
  UserPlus,
  Storefront,
  Truck,
  SignOut,
} from "@phosphor-icons/react";

const BASE = import.meta.env.BASE_URL;
const GOLD = "#B4975A";

/* ── Inline star ── */
function StarIcon() {
  return (
    <svg width="22" height="21" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.87735 25.3333L8.04401 15.9667L0.777344 9.66667L10.3773 8.83333L14.1107 0L17.844 8.83333L27.444 9.66667L20.1773 15.9667L22.344 25.3333L14.1107 20.3667L5.87735 25.3333Z" fill={GOLD} />
    </svg>
  );
}

/* ── Checkmark list item ── */
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base leading-relaxed">
      <CheckSquare size={18} weight="thin" className="text-secondary flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

/* ── Lifecycle card helpers ── */
function LifecycleStandaloneCard({ item }: { item: { icon: ElementType; title: string; body: string } }) {
  const Icon = item.icon;
  return (
    <div className="border border-secondary bg-[#fdf9f3] px-5 py-4 text-center">
      <Icon size={22} weight="thin" className="text-secondary mx-auto mb-2" />
      <h3 className="font-sans font-bold text-base uppercase tracking-[0.06em] text-black mb-1.5">{item.title}</h3>
      <p className="font-sans text-base text-black/60 leading-relaxed">{item.body}</p>
    </div>
  );
}

function LifecycleCircleCard({ item }: { item: { icon: ElementType; title: string; body: string } }) {
  const Icon = item.icon;
  return (
    <div className="border border-[#d8d3ca] bg-white px-4 py-4 text-center hover:border-secondary transition-colors duration-200">
      <Icon size={20} weight="thin" className="text-secondary mx-auto mb-1.5" />
      <h3 className="font-sans font-bold text-base uppercase tracking-[0.05em] text-black mb-1.5">{item.title}</h3>
      <p className="font-sans text-base text-black/60 leading-relaxed">{item.body}</p>
    </div>
  );
}

/* ── Lifecycle mobile item ── */
function LifecycleMobileCard({ item, standalone }: { item: { icon: ElementType; title: string; body: string }; standalone?: boolean }) {
  const Icon = item.icon;
  return (
    <div className={`w-full max-w-sm px-6 py-5 text-center ${standalone ? "border border-secondary bg-[#fdf9f3]" : "border border-[#d8d3ca] bg-white"}`}>
      <Icon size={24} weight="thin" className="text-secondary mx-auto mb-2" />
      <h3 className="font-sans font-bold text-base uppercase tracking-[0.06em] text-black mb-2">{item.title}</h3>
      <p className="font-sans text-base text-black/60 leading-relaxed">{item.body}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */

const TRUST_STATS = [
  { label: "Occupancy Rate", value: "90%" },
  { label: "% Rent Collected", value: "93%" },
  { label: "Avg Days to Lease", value: "13" },
  { label: "Eviction Rate", value: "<1%" },
];

const LIFECYCLE_TOP = {
  icon: UserPlus,
  title: "Onboarding",
  body: "Sign management agreement; property assessment; meet your dedicated Property Manager.",
};

const LIFECYCLE_CIRCLE: Array<{ icon: ElementType; title: string; body: string }> = [
  {
    icon: Storefront,
    title: "Prepare Rooms",
    body: "Room-by-room prep; quality photos of private and shared spaces; per-room pricing to maximize revenue.",
  },
  {
    icon: Key,
    title: "Lease by Room",
    body: "Multi-platform listing; showing management; multi-level screening; individual lease drafting and signing; documented move-in inspection.",
  },
  {
    icon: Users,
    title: "Community Operations",
    body: "Per-room rent collection; common area oversight; maintenance coordination; lease enforcement and resident relations.",
  },
  {
    icon: Truck,
    title: "Turn & Re-lease",
    body: "Move-out inspection; room refresh; fast re-lease of the vacant room without disrupting the rest of the household.",
  },
];

const LIFECYCLE_BOTTOM = {
  icon: SignOut,
  title: "Offboarding",
  body: "Sale, transfer, or pause — settled promptly and professionally.",
};

type ServiceItem = string;
type ServiceGroup = { heading: string; items: ServiceItem[] };

const OWNER_SERVICES_GROUPED: ServiceGroup[] = [
  {
    heading: "Your Team",
    items: [
      "Your primary point of contact is an experienced property manager who, along with their assistant PM and PM coordinator, works as a dedicated team on your property — not a call center",
      "Single point of contact for every room, resident, and maintenance request",
      "24/7 emergency maintenance coverage",
    ],
  },
  {
    heading: "Leasing & Residents",
    items: [
      "Individual lease management — each resident signs their own lease, reducing group liability and making turnovers seamless",
      "Multi-level resident screening — credit, criminal background, eviction history, income verification, and past landlord references",
      "Residents screened for compatibility and respect for shared spaces",
      "Lease drafting and execution",
      "Move-in and move-out inspections with detailed photo documentation",
      "Firm but fair lease enforcement and proactive lease renewals",
    ],
  },
  {
    heading: "Property Care",
    items: [
      "Common area oversight — kitchens, bathrooms, living rooms, and outdoor spaces inspected regularly and maintained to a consistent standard",
      "Maintenance coordination through our in-house and vetted vendor network",
      "Dedicated property service manager overseeing every repair and project",
      "Asset management approach to every decision — protecting long-term property value",
    ],
  },
  {
    heading: "Financials",
    items: [
      "Per-room rent collection with multiple payment options",
      "Owner distributions every Friday via direct deposit",
      "Transparent monthly income and expense statements",
      "Annual 1099, Schedule E, and year-end tax reports",
      "24/7 Owner Portal with live ledger",
    ],
  },
  {
    heading: "Compliance & Fair Housing",
    items: [
      "Shared living properties carry unique regulatory considerations — we manage all leasing, occupancy, and fair housing compliance",
      "Occupancy and zoning compliance tailored to room-by-room living",
    ],
  },
];

const RESIDENT_SERVICES_GROUPED: ServiceGroup[] = [
  {
    heading: "Flexible Payments",
    items: [
      "Online rent payment — free ePayments and retail pay locations",
      "Multiple security deposit options — upfront, payment plan, or credit line",
    ],
  },
  {
    heading: "Portal & Maintenance",
    items: [
      "Live resident ledger",
      "24/7 work order submissions via Resident Portal",
      "Avg resolution for high priority = 3 days or less; for normal priority = 7 days or less",
    ],
  },
  {
    heading: "Shared Living Experience",
    items: [
      "Clean, well-maintained common areas held to a consistent standard",
      "Compatible housemates placed through careful screening",
      "Individual leases — your tenancy isn't tied to anyone else's",
    ],
  },
];

const OWNER_RESOURCE_GROUPS: {
  kicker: string;
  links: { label: string; href: string }[];
}[] = [
  {
    kicker: "Free Calculators",
    links: [
      { label: "Rent vs. Sell", href: "/tools/rent-vs-sell" },
      { label: "PM Fee ROI", href: "/tools/pm-fee-roi" },
      { label: "1031 Exchange", href: "/tools/1031-exchange" },
      { label: "Eviction Cost", href: "/tools/eviction-cost" },
      { label: "Vacancy Cost", href: "/tools/vacancy-cost" },
      { label: "STR vs. LTR", href: "/tools/str-vs-ltr" },
    ],
  },
  {
    kicker: "More From EquityTeam",
    links: [
      { label: "Owner Blog & Articles", href: "/blog" },
      { label: "Realtor Referral Program", href: "/realtor-referral-program" },
      { label: "Areas We Serve", href: "/areas-we-serve" },
      { label: "Property Services", href: "/property-services" },
      { label: "Owner Portal Login", href: "/portal-logins" },
      { label: "Talk to Our Team", href: "/contact-us" },
    ],
  },
  {
    kicker: "Frequently Asked",
    links: [
      { label: "Owner Support FAQ", href: "/faq/owner-support" },
      { label: "Leasing FAQ", href: "/faq/leasing" },
      { label: "Tenant Support FAQ", href: "/faq/tenant-support" },
      { label: "Property Services FAQ", href: "/faq/property-services" },
      { label: "All FAQs", href: "/faq" },
    ],
  },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Very reliable, responsive, transparent, and professional. I simply could not ask for more. Maintenance is great, reports are thorough and on time. I have had previous experience with another management company and the difference is night and day.",
    author: "Ida G.",
  },
  {
    stars: 5,
    text: "I had a property I couldn't sell and tried to be a landlord. I wish I would have turned the property over to the EquityTeam years ago. They are professional, honest, and quick to answer any questions you have. They found me a great tenant in 7 days after listing it.",
    author: "Mike M.",
  },
  {
    stars: 5,
    text: "I tried unsuccessfully renting my property from afar. I contacted 3 different property managers and I NAILED IT. They have a thorough process and solid resources for repairs. My duplex turned out far better than I thought, and got a tenant for better value than I anticipated.",
    author: "Doug Z.",
  },
  {
    stars: 5,
    text: "EquityTeam has managed my property for over a decade. The property has been vacant for less than a month in that time, which is outstanding. They do a great job of managing the tenant relationship while also taking great care of my property.",
    author: "Dave B.",
  },
];

const COLIVING_FAQS = [
  {
    question: "What is shared living property management?",
    answer: "Shared living property management is a room-by-room approach where each resident signs their own individual lease for a private room while sharing common areas like kitchens, bathrooms, and living spaces. EquityTeam handles individual leasing, resident screening and placement, common area oversight, maintenance coordination, per-room rent collection, and full fair housing compliance across Greater Cincinnati and Greater Dayton.",
  },
  {
    question: "How does room-by-room leasing work?",
    answer: "Each resident signs their own lease for a specific room rather than one group lease for the whole property. This reduces group liability risk and makes turnovers seamless — when one room changes hands, it doesn't disrupt the rest of the household. We market, screen, and lease each room individually, and re-lease vacant rooms quickly to keep the property fully occupied.",
  },
  {
    question: "How do you screen residents for shared living properties?",
    answer: "We screen every applicant using a multi-level process covering credit, criminal background, eviction history, income verification, and past landlord references. Because residents share common spaces, we also evaluate compatibility — placing people who respect shared spaces and are likely to stay long-term, which reduces friction and turnover.",
  },
  {
    question: "Who maintains the common areas in a shared living property?",
    answer: "EquityTeam oversees all common areas — kitchens, bathrooms, living rooms, and outdoor spaces are inspected regularly and maintained to a consistent standard. There are no grey areas between private and shared responsibility. Maintenance requests run through a single point of contact and are handled promptly through our in-house and vetted vendor network.",
  },
  {
    question: "How is rent collected and distributed for shared living?",
    answer: "Per-room rent is collected, reconciled, and disbursed to owners every Friday via direct deposit. Owners receive transparent monthly income and expense statements, annual 1099 and Schedule E tax reporting, and 24/7 access to a live ledger through the Owner Portal.",
  },
  {
    question: "How does EquityTeam handle maintenance and repairs?",
    answer: "EquityTeam provides a single point of contact for all maintenance requests. Most work is handled through our in-house technicians and vetted vendor network, overseen by a dedicated property service manager who acts in the property's long-term best interest. Residents can submit 24/7 work orders through the Resident Portal, and emergency maintenance coverage is available around the clock.",
  },
  {
    question: "How does shared living help maximize property revenue?",
    answer: "Room-by-room leasing consistently outperforms single-tenant occupancy on a per-square-foot basis. Because each room is leased individually, one departure doesn't zero out your income, and we fill rooms faster by marketing to the growing pool of residents seeking shared living options — helping you capture the upside without the operational complexity.",
  },
  {
    question: "What areas does EquityTeam serve for shared living management?",
    answer: "EquityTeam manages shared living properties across Greater Cincinnati and Greater Dayton, Ohio, including neighborhoods like Hyde Park, Oakley, Clifton, Over-the-Rhine, Norwood, Kettering, Centerville, and Beavercreek. EquityTeam is an Ohio licensed real estate broker (REC.2012001994).",
  },
];

const CINCINNATI_AREAS = [
  { name: "Blue Ash", href: "/blue-ash-property-management" },
  { name: "Camp Washington", href: "/camp-washington-property-management" },
  { name: "Cincinnati", href: "/" },
  { name: "Clifton", href: "/clifton-property-management" },
  { name: "College Hill", href: "/college-hill-property-management" },
  { name: "Columbia-Tusculum", href: "/columbia-tusculum-property-management" },
  { name: "Deer Park", href: "/deer-park-property-management" },
  { name: "Delhi", href: "/delhi-property-management" },
  { name: "Downtown", href: "/downtown-property-management" },
  { name: "East Walnut Hills", href: "/east-walnut-hills-property-management" },
  { name: "Evanston", href: "/evanston-property-management" },
  { name: "Forest Park", href: "/forest-park-property-management" },
  { name: "Hamilton", href: "/hamilton-property-management" },
  { name: "Harrison", href: "/harrison-property-management" },
  { name: "Hyde Park", href: "/hyde-park-property-management" },
  { name: "Indian Hill", href: "/indian-hill-property-management" },
  { name: "Kennedy Heights", href: "/kennedy-heights-property-management" },
  { name: "Kenwood", href: "/kenwood-property-management" },
  { name: "Loveland", href: "/loveland-property-management" },
  { name: "Madisonville", href: "/madisonville-property-management" },
  { name: "Mariemont", href: "/mariemont-property-management" },
  { name: "Middletown", href: "/middletown-property-management" },
  { name: "Montgomery", href: "/montgomery-property-management" },
  { name: "Mount Auburn", href: "/mount-auburn-property-management" },
  { name: "Mount Lookout", href: "/mount-lookout-property-management" },
  { name: "Mount Washington", href: "/mount-washington-property-management" },
  { name: "Mt. Adams", href: "/mt-adams-property-management" },
  { name: "Northside", href: "/northside-property-management" },
  { name: "Norwood", href: "/norwood-property-management" },
  { name: "Oakley", href: "/oakley-property-management" },
  { name: "Over-the-Rhine", href: "/over-the-rhine-property-management" },
  { name: "Pleasant Ridge", href: "/pleasant-ridge-property-management" },
  { name: "Sayler Park", href: "/sayler-park-property-management" },
  { name: "Sycamore", href: "/sycamore-property-management" },
  { name: "Terrace Park", href: "/terrace-park-property-management" },
  { name: "Walnut Hills", href: "/walnut-hills-property-management" },
  { name: "Western Hills", href: "/western-hills-property-management" },
  { name: "Westwood", href: "/westwood-property-management" },
  { name: "Winton Place", href: "/winton-place-property-management" },
];

const DAYTON_AREAS = [
  { name: "Beavercreek", href: "/beavercreek-property-management" },
  { name: "Centerville", href: "/centerville-property-management" },
  { name: "Clayton", href: "/clayton-property-management" },
  { name: "Dayton", href: "/dayton-property-management" },
  { name: "Englewood", href: "/englewood-property-management" },
  { name: "Fairborn", href: "/fairborn-property-management" },
  { name: "Franklin", href: "/franklin-property-management" },
  { name: "Germantown", href: "/germantown-property-management" },
  { name: "Harrison Township", href: "/harrison-township-property-management" },
  { name: "Huber Heights", href: "/huber-heights-property-management" },
  { name: "Kettering", href: "/kettering-property-management" },
  { name: "Miami Township", href: "/miami-township-property-management" },
  { name: "Miamisburg", href: "/miamisburg-property-management" },
  { name: "Oakwood", href: "/oakwood-property-management" },
  { name: "Riverside", href: "/riverside-property-management" },
  { name: "Springboro", href: "/springboro-property-management" },
  { name: "Trotwood", href: "/trotwood-property-management" },
  { name: "Vandalia", href: "/vandalia-property-management" },
  { name: "Washington Township", href: "/washington-township-property-management" },
  { name: "West Carrollton", href: "/west-carrollton-property-management" },
  { name: "Xenia", href: "/xenia-property-management" },
];

const COLIVING_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Shared Living Property Management",
  description: "Shared living and co-living property management in Cincinnati and Dayton, Ohio — individual room leases, resident screening, common area oversight, maintenance coordination, and full fair-housing compliance.",
  serviceType: "Shared Living Property Management",
  areaServed: [
    { "@type": "City", name: "Cincinnati", containedInPlace: { "@type": "State", name: "Ohio" } },
    { "@type": "City", name: "Dayton", containedInPlace: { "@type": "State", name: "Ohio" } },
  ],
  provider: {
    "@type": "LocalBusiness",
    name: "EquityTeam Property Management",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      reviewCount: "200",
      bestRating: "5",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Shared Living Management Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Individual Lease Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Resident Screening & Placement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Common Area Oversight" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance Coordination" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rent Collection & Owner Draws" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Compliance & Fair Housing" } },
    ],
  },
};

const COLIVING_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COLIVING_FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

/* ══════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════ */

export default function CoLivingManagement() {
  const n = REVIEWS.length;
  const [servicesTab, setServicesTab] = useState<"owners" | "residents">("owners");
  const [slideIndex, setSlideIndex] = useState(0);
  const calcPerPage = () => (typeof window !== "undefined" ? (window.innerWidth >= 1240 ? 3 : window.innerWidth >= 768 ? 2 : 1) : 1);
  const [perPage, setPerPage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setPerPage(calcPerPage());
    const onResize = () => setPerPage(calcPerPage());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxSlide = n - perPage;
  const itemPct = 100 / perPage;

  useEffect(() => {
    if (isPaused || maxSlide <= 0) return;
    const id = window.setInterval(() => setSlideIndex(i => (i >= maxSlide ? 0 : i + 1)), 6000);
    return () => window.clearInterval(id);
  }, [isPaused, maxSlide]);

  return (
    <PageLayout>
      <SEO
        title="Shared Living Property Management | EquityTeam Cincinnati & Dayton"
        description="Shared living property management in Cincinnati &amp; Dayton, Ohio. Individual room leases, resident screening, common area oversight, and full-service operations."
        canonical="/co-living-management"
        schemas={[COLIVING_SERVICE_SCHEMA, COLIVING_FAQ_SCHEMA]}
      />

      {/* ══════════════════════════════════════
          1. HERO  (stats pinned to bottom, always above the fold)
      ══════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col pt-28 md:pt-40 pb-0 md:overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${BASE}images/heroes/shared-living-hero.png`}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/55 to-[#121212]/20" />
        </div>

        {/* Main headline + CTA — grows to push stats to bottom */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-screen-xl mx-auto px-5 text-center pb-10 md:pb-14 w-full">
          <h1
            className="block uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[68px] md:max-w-[960px] mx-auto"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
          >
            Shared Living<br />Management
          </h1>
          <p
            className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal mb-3 md:max-w-[820px] mx-auto"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            Room-by-room leasing and full-service operations<br />in Greater Cincinnati &amp; Greater Dayton
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
            <Link href="/contact-us" className="btn-solid-secondary uppercase">
              Schedule a Free Consult
            </Link>
          </div>
        </div>

        {/* Stats row — pinned to bottom of full-viewport hero */}
        <div className="relative z-10 py-8 md:py-10 px-5">
          <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center md:justify-between gap-y-6 gap-x-8">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-cowling font-bold text-[32px] md:text-[44px] leading-none text-secondary mb-1">
                  {stat.value}
                </span>
                <span className="block font-sans font-bold text-base leading-tight tracking-[0.2em] text-white uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. TRUST BAR  (partner badges — mirrors homepage)
      ══════════════════════════════════════ */}
      <section className="py-10 md:py-12 px-5 xl:px-0 bg-white">
        <div className="max-w-screen-2xl mx-auto px-[20px] md:px-0">
          <div className="w-full flex flex-row flex-wrap justify-center gap-y-12 md:gap-2 items-center">
            {[
              { src: `${BASE}images/badges/narpm.png`, alt: "National Association of REALTORS\u00ae member", height: 44 },
              { src: `${BASE}images/badges/bbb.png`, alt: "NARPM \u2014 National Association of Residential Property Managers member", height: 80 },
              { src: `${BASE}images/badges/naa.png`, alt: "National Apartment Association member", height: 46 },
              { src: `${BASE}images/badges/oh-best-pm-2025.png`, alt: "Ohio Best Property Management Company 2025 award", height: 100 },
              { src: `${BASE}images/badges/google-reviews.png`, alt: "Google Reviews — verified client ratings for EquityTeam Property Management", height: 44, rating: "4.3" },
              { src: `${BASE}images/badges/expertise-award.png`, alt: "Cincinnati property management industry recognition award", height: 54 },
            ].map((logo, i) => (
              <div key={i} className="max-h-[100px] h-full px-6 flex flex-col justify-center items-center gap-1">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: logo.height, width: "auto", maxHeight: logo.height }}
                  className="object-contain"
                />
                {logo.rating && (
                  <span className="flex items-center gap-1 font-sans font-semibold text-base tracking-[0.06em] text-[#121212]">
                    <span style={{ color: "#FBBC04" }}>★★★★★</span>
                    <span>{logo.rating}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. PROBLEM STATEMENT
      ══════════════════════════════════════ */}
      <section className="bg-primary section-pad">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-heading text-white mb-6">
            A Higher Standard<br />of Shared Living Management
          </h2>
          <p className="font-sans text-lg text-white/80 leading-relaxed mb-4">
            Investors want performance and transparency.<br />
            Self-managing owners want their time back.<br />
            Residents want compatible housemates and well-kept common spaces.
          </p>
          <p className="font-sans text-lg text-white/80 leading-relaxed mb-4">
            Shared living properties offer strong returns — but only when they&rsquo;re managed with precision. Individual leases, shared common areas, and higher resident turnover demand a dedicated operator with the right systems.
          </p>
          <p className="font-sans text-lg text-white/80 leading-relaxed">
            EquityTeam manages shared living properties the way an asset manager would — disciplined systems, experienced people, and advanced technology applied to a property type that demands tighter coordination.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-black">The Shared Living Lifecycle</h2>
          </div>

          {/* ── Shared SVG marker defs (page-unique IDs) ── */}
          <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden="true">
            <defs>
              <marker id="clm-down" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                <polygon points="0 0, 8 0, 4 8" fill="#B4975A" fillOpacity="0.85" />
              </marker>
              <marker id="clm-right" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 0, 0 8, 8 4" fill="#B4975A" fillOpacity="0.85" />
              </marker>
              <marker id="clm-up" markerWidth="8" markerHeight="8" refX="4" refY="1" orient="auto">
                <polygon points="0 8, 8 8, 4 0" fill="#B4975A" fillOpacity="0.85" />
              </marker>
            </defs>
          </svg>

          {/* ── Desktop: horizontal linear flow ── */}
          <div className="hidden md:block">

            {/* Row A — Onboarding above first card */}
            <div className="flex items-end mb-6">
              <div className="w-1/3">
                <LifecycleStandaloneCard item={LIFECYCLE_TOP} />
              </div>
              <div className="flex-1" />
            </div>

            {/* Row B — 4 cycle cards with right-arrows between */}
            <div className="flex items-stretch">
              <div className="flex-1 min-w-0"><LifecycleCircleCard item={LIFECYCLE_CIRCLE[0]} /></div>
              <div className="w-10 flex items-center justify-center flex-shrink-0">
                <svg width="36" height="14" fill="none" aria-hidden="true">
                  <line x1="0" y1="7" x2="31" y2="7" stroke="#B4975A" strokeWidth="1.5" strokeOpacity="0.85" markerEnd="url(#clm-right)" />
                </svg>
              </div>
              <div className="flex-1 min-w-0"><LifecycleCircleCard item={LIFECYCLE_CIRCLE[1]} /></div>
              <div className="w-10 flex items-center justify-center flex-shrink-0">
                <svg width="36" height="14" fill="none" aria-hidden="true">
                  <line x1="0" y1="7" x2="31" y2="7" stroke="#B4975A" strokeWidth="1.5" strokeOpacity="0.85" markerEnd="url(#clm-right)" />
                </svg>
              </div>
              <div className="flex-1 min-w-0"><LifecycleCircleCard item={LIFECYCLE_CIRCLE[2]} /></div>
              <div className="w-10 flex items-center justify-center flex-shrink-0">
                <svg width="36" height="14" fill="none" aria-hidden="true">
                  <line x1="0" y1="7" x2="31" y2="7" stroke="#B4975A" strokeWidth="1.5" strokeOpacity="0.85" markerEnd="url(#clm-right)" />
                </svg>
              </div>
              <div className="flex-1 min-w-0"><LifecycleCircleCard item={LIFECYCLE_CIRCLE[3]} /></div>
            </div>

            {/* Row C — Loop arc: Turn & Re-lease curves back to Prepare Rooms. */}
            <div className="relative w-full">
              <svg
                viewBox="0 0 1000 52"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: 52, display: 'block' }}
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 875,4 C 780,56 220,56 125,4"
                  stroke="#B4975A"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                  markerEnd="url(#clm-right)"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className="block text-center font-sans text-base uppercase tracking-[0.16em] text-secondary/45 select-none mt-1">
                repeat
              </span>
            </div>

            {/* Row D — Offboarding below last card */}
            <div className="flex items-start">
              <div className="flex-1" />
              <div className="w-1/3">
                <LifecycleStandaloneCard item={LIFECYCLE_BOTTOM} />
              </div>
            </div>

          </div>

          {/* ── Mobile: numbered vertical list ── */}
          <div className="md:hidden flex flex-col items-center gap-0">

            {/* Onboarding — entry */}
            <LifecycleMobileCard item={LIFECYCLE_TOP} standalone />

            {/* Entry connector */}
            <div className="w-px h-6 bg-secondary/40" />

            {/* Numbered cycle steps */}
            {LIFECYCLE_CIRCLE.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-center w-full">
                  <div className="w-full max-w-sm border border-[#d8d3ca] bg-white px-6 py-5 text-center relative">
                    <span className="absolute top-3 right-3 font-sans font-bold text-xs tracking-[0.12em] text-secondary/50 uppercase">
                      Step {i + 1}
                    </span>
                    <Icon size={22} weight="thin" className="text-secondary mx-auto mb-2" />
                    <h3 className="font-sans font-bold text-base uppercase tracking-[0.06em] text-black mb-2">{item.title}</h3>
                    <p className="font-sans text-base text-black/60 leading-relaxed">{item.body}</p>
                  </div>
                  {i < LIFECYCLE_CIRCLE.length - 1 && (
                    <div className="w-px h-6 bg-secondary/40" />
                  )}
                </div>
              );
            })}

            {/* Loop-back note */}
            <p className="font-sans text-sm text-black/40 tracking-[0.06em] uppercase mt-3 mb-1">↺ Cycle repeats</p>

            {/* Exit connector */}
            <div className="w-px h-6 bg-secondary/40" />

            {/* Offboarding — exit */}
            <LifecycleMobileCard item={LIFECYCLE_BOTTOM} standalone />

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          5. WHAT'S INCLUDED
      ══════════════════════════════════════ */}
      <section id="whats-included" className="bg-primary section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white">
              What's Included
            </h2>
            <p className="font-sans text-white/70 text-base mt-4 max-w-2xl mx-auto">
              We handle everything — individual leasing, common area care, maintenance, and financials — fully managed by your dedicated team.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-col sm:flex-row border border-secondary/30 mb-0">
            {(["owners", "residents"] as const).map((tab, i) => (
              <button
                key={tab}
                onClick={() => setServicesTab(tab)}
                className={[
                  "flex-1 py-4 px-8 font-sans font-semibold text-base uppercase tracking-[0.15em] transition-colors text-center",
                  i > 0 ? "border-t sm:border-t-0 sm:border-l border-secondary/30" : "",
                  servicesTab === tab
                    ? "bg-secondary text-primary"
                    : "bg-transparent text-secondary/60 hover:text-secondary hover:bg-secondary/10",
                ].join(" ")}
              >
                {tab === "owners" ? "For Property Owners" : "For Residents"}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="border border-t-0 border-secondary/30 p-8 md:p-10">
            {servicesTab === "owners" ? (
              <div className="flex flex-col gap-7">
                {OWNER_SERVICES_GROUPED.map((group) => (
                  <div key={group.heading}>
                    <p className="font-sans font-semibold text-base uppercase tracking-[0.12em] text-secondary/70 mb-3">
                      {group.heading}
                    </p>
                    <ul className="space-y-2.5 text-white/80">
                      {group.items.map((item, idx) => (
                        <CheckItem key={idx}>{item}</CheckItem>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="mb-8 font-sans text-base text-white/50 leading-relaxed border-b border-white/10 pb-6">
                  Happy, respected residents renew their leases. Our resident experience protocols are designed to reduce turnover — which directly protects your bottom line as an owner.
                </p>
                <div className="flex flex-col gap-7">
                  {RESIDENT_SERVICES_GROUPED.map((group) => (
                    <div key={group.heading}>
                      <p className="font-sans font-semibold text-base uppercase tracking-[0.12em] text-secondary/70 mb-3">
                        {group.heading}
                      </p>
                      <ul className="space-y-2.5 text-white/80">
                        {group.items.map((item, idx) => (
                          <CheckItem key={idx}>{item}</CheckItem>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. CLIENT REVIEWS — FULL CAROUSEL
      ══════════════════════════════════════ */}
      <section className="bg-primary section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white">
              What Our Clients Are Saying
            </h2>
          </div>

          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex items-start transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slideIndex * itemPct}%)` }}
            >
              {REVIEWS.map((r, i) => (
                <div key={i} className="flex-shrink-0 px-3" style={{ width: `${itemPct}%` }}>
                  <div className="border border-white/15 hover:border-secondary transition-colors duration-200 px-6 py-10 text-center bg-white/5">
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: r.stars }).map((_, si) => <StarIcon key={si} />)}
                    </div>
                    <p className="font-sans text-base leading-relaxed text-white/80 mb-6">"{r.text}"</p>
                    <p className="font-sans font-bold text-xl text-white">{r.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-10 gap-4">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(Math.min(i, maxSlide))}
                aria-label={`Go to review ${i + 1}`}
                style={{
                  width: 10, height: 10,
                  borderRadius: 0, border: "none", padding: 0,
                  cursor: "pointer",
                  backgroundColor: i === slideIndex ? GOLD : "rgba(255,255,255,0.2)",
                  transition: "background-color 0.2s",
                }}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-3 sm:gap-8">
            <button
              onClick={() => setIsPaused(p => !p)}
              className="font-sans font-semibold text-base tracking-[0.18em] uppercase text-white/50 hover:text-secondary transition-colors px-3 py-2"
            >
              {isPaused ? "▶  Resume" : "❚❚  Pause"}
            </button>
            <a
              href="https://www.google.com/search?q=EquityTeam+Cincinnati+OH+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-semibold text-base tracking-[0.18em] uppercase text-secondary hover:text-white transition-colors px-3 py-2"
            >
              Read All Google Reviews <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. FAQ
      ══════════════════════════════════════ */}
      <section className="bg-white section-pad" aria-label="Frequently asked questions">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="section-heading text-black">
              Shared Living Management FAQ
            </h2>
          </div>
          <FaqAccordion items={COLIVING_FAQS} variant="light" />
          <div className="text-center mt-12">
            <Link href="/faq" className="cta-secondary text-black hover:text-secondary">
              See All FAQs <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. OWNER RESOURCES
      ══════════════════════════════════════ */}
      <section className="bg-primary section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4">
              Owner Resources
            </h2>
            <p className="font-sans text-white/70 text-base max-w-2xl mx-auto">
              Free decision tools, neighborhood research, and ongoing education — built for owners and investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {OWNER_RESOURCE_GROUPS.map((group) => (
              <div key={group.kicker} className="border border-white/15 p-8 hover:border-secondary transition-colors duration-200">
                <p className="font-sans font-semibold text-sm tracking-[0.18em] text-secondary uppercase mb-6">{group.kicker}</p>
                <ul className="list-none p-0 m-0 space-y-3">
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="group flex items-baseline gap-2 font-sans text-base text-white hover:text-secondary transition-colors"
                      >
                        <span className="border-b border-transparent group-hover:border-secondary">{l.label}</span>
                        <span aria-hidden="true" className="text-secondary">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. AREAS SERVED
      ══════════════════════════════════════ */}
      <section className="bg-white pt-16 md:pt-20 pb-16 md:pb-20">
        {/* Cincinnati */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          <div className="mx-5 lg:mx-0 w-full lg:max-w-[604px] pt-11 lg:pt-15 justify-self-center flex order-1 lg:justify-self-end px-8 lg:pl-18 lg:pr-0">
            <div className="w-full lg:max-w-[530px] pl-5 lg:pl-0">
              <h2 className="section-heading text-black mb-6 lg:mb-8">Greater Cincinnati</h2>
              <p className="text-black/70 font-sans text-base leading-relaxed mb-8">
                From Hyde Park, Oakley, and Mount Lookout to Clifton, Norwood, and Over-the-Rhine — our Cincinnati office manages shared living rentals across Greater Cincinnati neighborhoods.
              </p>
              <ul className="text-black list-none p-0 m-0">
                {CINCINNATI_AREAS.map(({ name, href }) => (
                  <li key={name} className="inline-block">
                    <Link
                      href={href}
                      className="px-4 py-3 border-1 border-transparent font-medium text-base leading-tight tracking-[0.08em] text-black inline-block uppercase hover:border-secondary transition-all duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:max-w-[720px] mt-20 lg:mt-0 order-2 pl-0 lg:pl-22">
            <img
              src={`${BASE}images/cincinnati-skyline.jpg`}
              alt="Cincinnati, Ohio downtown skyline at dusk"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Dayton */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-15 lg:mt-25">
          <div className="mx-5 lg:mx-0 w-full lg:max-w-[604px] pt-11 lg:pt-15 justify-self-center flex order-1 lg:order-2 lg:justify-self-start pl-12 pr-12 lg:pl-26 lg:pr-18">
            <div className="w-full lg:max-w-[530px] pl-5 lg:pl-0">
              <h2 className="section-heading text-black mb-6 lg:mb-8">Greater Dayton</h2>
              <p className="text-black/70 font-sans text-base leading-relaxed mb-8">
                From Centerville, Kettering, and Beavercreek to Oakwood, Springboro, and Huber Heights — our Dayton office serves owners and residents across Greater Dayton communities.
              </p>
              <ul className="text-black list-none p-0 m-0">
                {DAYTON_AREAS.map(({ name, href }) => (
                  <li key={name} className="inline-block">
                    <Link
                      href={href}
                      className="px-4 py-3 border-1 border-transparent font-medium text-base leading-tight tracking-[0.08em] text-black inline-block uppercase hover:border-secondary transition-all duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:max-w-[720px] mt-20 lg:mt-0 order-2 lg:order-1 justify-self-end">
            <img
              src={`${BASE}images/dayton-skyline.jpg`}
              alt="Dayton, Ohio skyline at sunset"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          10. FINAL CTA
      ══════════════════════════════════════ */}
      <GoldBorderCTA
        title="Managing a shared living property? Trust your asset management to EquityTeam."
        btnLabel="Contact Us"
        btnHref="/contact-us"
        buttonPosition="left"
      />

    </PageLayout>
  );
}
