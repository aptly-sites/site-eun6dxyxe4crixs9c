import { useState, useEffect, type ReactNode } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";
import {
  ShieldCheck,
  Clock,
  Key,
  Wrench,
  FileText,
  CurrencyDollar,
  House,
  PawPrint,
  Calculator,
  CheckSquare,
  Buildings,
  HouseLine,
  ChartLineUp,
  Briefcase,
  Users,
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

/* ── Gold border CTA band ── */

/* ── Checkmark list item ── */
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base leading-relaxed">
      <CheckSquare size={18} weight="thin" className="text-secondary flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

/* ── Info tooltip ── */
function InfoTooltip({ tip }: { tip: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center align-middle ml-1.5">
      <button
        type="button"
        className="inline-flex items-center justify-center w-5 h-5 border border-secondary/60 text-secondary text-sm font-bold leading-none cursor-pointer hover:border-secondary hover:bg-secondary/10 transition-colors flex-shrink-0 font-sans"
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label="More information"
      >
        i
      </button>
      {open && (
        <span
          className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-white border border-secondary/40 shadow-xl px-4 py-3 pointer-events-none"
          role="tooltip"
        >
          <span className="font-sans text-base text-black/80 leading-relaxed block whitespace-normal">{tip}</span>
          <span className="absolute top-full left-3 border-[5px] border-transparent border-t-secondary/40" />
        </span>
      )}
    </span>
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

const OWNER_SERVICES_GROUPED = [
  {
    heading: "Your Team",
    items: [
      "Your primary point of contact is an experienced property manager who, along with their assistant PM and PM coordinator, works as a dedicated team on your property — not a call center",
      { text: "90-Day Risk-Free Guarantee", href: "#guarantees" },
      { text: "48-Hour Response Guarantee", href: "#guarantees" },
    ],
  },
  {
    heading: "Protection",
    items: [
      "Master GL policy — protects owner & manager",
      { text: "Property Protection Guarantee", href: "#guarantees", etPlus: true },
      { text: "Rent Guarantee", href: "#guarantees", etPlus: true },
      { text: "Eviction Protection Guarantee", href: "#guarantees", etPlus: true },
    ],
  },
  {
    heading: "Marketing",
    items: [
      "Vacancy marketing across 30+ channels",
      "Quality photos, video, and virtual tours — professional photography available upon request",
      "Weekly listing activity report while your property is on market",
    ],
  },
  {
    heading: "Leasing & Tenancy",
    items: [
      "Multi-level tenant screening — credit, criminal background, eviction history, income verification, bank statement review, employment verification, and past landlord references",
      "Pet screening performed on all animals and pets",
      { text: "Leasing Guarantee", href: "#guarantees" },
      { text: "Pet Damage Guarantee", href: "#guarantees" },
      "Lease drafting and execution",
      "Move-in and move-out inspections with detailed photo documentation",
      "Firm but fair lease enforcement",
      "Proactive lease renewals",
      "Collections and evictions as needed",
    ],
  },
  {
    heading: "Financials",
    items: [
      "Rent collection with multiple payment options",
      "Owner distributions every Friday via direct deposit",
      "Monthly statements delivered by the 15th for the prior month",
      "Annual 1099, Schedule E, and year-end tax reports",
      "Transparent monthly income and expense reports",
      "24/7 Owner Portal with live ledger",
      { text: "Accounting Accuracy Guarantee", href: "#guarantees" },
    ],
  },
  {
    heading: "Property Care",
    items: [
      "Dedicated property service manager overseeing every repair and project",
      "Asset management approach to every decision — protecting long-term property value, not just resolving today's issue.",
      { prefix: "Projects and maintenance available through our ", linkText: "property services team", href: "/property-services" },
      { text: "Reduced Repairs Guarantee", href: "#guarantees" },
      "24/7 emergency maintenance coverage",
    ],
  },
];

const RESIDENT_SERVICES_GROUPED = [
  {
    heading: "Flexible Payments",
    items: [
      "Online rent payment — free ePayments and retail pay locations",
      "Multiple security deposit options — upfront, payment plan, or credit line",
    ],
  },
  {
    heading: "Tenant Benefit Package",
    items: [
      "$100,000 property liability coverage + $10,000 personal property coverage",
      "On-time rent payments reported to all three credit bureaus",
      "Free ACH rent payments",
      "Quarterly HVAC filter delivery to your door",
      "Utility concierge — help setting up electric, gas, water, internet, and trash at move-in",
      "24/7 emergency maintenance coverage",
    ],
  },
  {
    heading: "Portal & Maintenance",
    items: [
      "Live tenant ledger",
      "24/7 work order submissions via Tenant Portal",
      "Avg resolution for high priority = 3 days or less; for normal priority = 7 days or less",
    ],
  },
];

const ET_PLUS_PERKS = [
  "5% discount off leasing fees on top of base rate",
  "Pet damage coverage extended to service and companion animals (up to $1,000)",
  "$50 discount on each lease renewal fee",
  "Late fees split 50/50 with owner instead of 100% to manager",
];

const OWNER_RESOURCE_GROUPS: {
  kicker: string;
  links: { label: string; href: string }[];
}[] = [
  {
    kicker: "Pricing & Guarantees",
    links: [
      { label: "Pricing", href: "/residential-property-management#pricing" },
      { label: "Service Guarantees", href: "/residential-property-management#guarantees" },
      { label: "ET+ Protection Bundle", href: "/residential-property-management#et-plus" },
      { label: "Compare to Industry", href: "/residential-property-management#compare" },
      { label: "Free Rental Analysis", href: "/free-rental-analysis" },
    ],
  },
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
      { label: "Ohio Smoke & CO Detector Compliance Guide", href: "/blog/smoke-co-detector-compliance-ohio" },
      { label: "Realtor Referral Program", href: "/realtor-referral-program" },
      { label: "Areas We Serve", href: "/areas-we-serve" },
      { label: "Property Services", href: "/property-services" },
      { label: "Owner Portal Login", href: "/portal-logins" },
      { label: "Talk to Our Team", href: "/contact-us" },
    ],
  },
];

const ET_PLUS_GUARANTEES = [
  {
    icon: House,
    title: "Property Protection",
    amount: "Up to $35,000",
    body: "Covers malicious tenant damage up to $35,000, plus theft or theft damage up to $15,000.",
  },
  {
    icon: CurrencyDollar,
    title: "Rent Guarantee",
    amount: "Up to 25 Weeks",
    body: "Covers lost rent for up to 25 weeks due to lease breaks, evictions, death, or other qualifying events — capped at $3,000/month.",
  },
  {
    icon: ShieldCheck,
    title: "Eviction Protection",
    amount: "Up to $6,000",
    body: "Eviction-related expenses refunded up to $6,000 — covering filing fees, legal defense, sheriff costs, and rekeying.",
  },
];

type PCell = { check?: true; text?: string };
const ck: PCell = { check: true };
const tx = (t: string): PCell => ({ text: t });

const PRICING_ROWS: Array<{ title: string; tip?: string; sf: PCell; mf: PCell; et: PCell }> = [
  { title: "Leasing Fee", tip: "Covers entire tenant placement — marketing, showings, screening, lease execution, move-in inspection.", sf: tx("59% of one month's rent\n(Min. $699)"), mf: tx("69% of one month's rent\n(Min. $699)"), et: tx("−5% on Leasing Fees") },
  { title: "Lease Renewals", sf: tx("$199 / renewal"), mf: tx("$199 / renewal"), et: tx("−$50 on Renewals") },
  { title: "Late Fees", sf: tx("100% Manager"), mf: tx("100% Manager"), et: tx("50% Manager / 50% Owner") },
  { title: "Pet Damage Coverage", sf: tx("Up to $1,000"), mf: tx("Up to $1,000"), et: tx("+ Service & companion animals") },
  { title: "Property Protection", sf: {}, mf: {}, et: tx("Up to $35K malicious damage\n$15K theft") },
  { title: "Rent Guarantee", sf: {}, mf: {}, et: tx("Up to 25 weeks\n(capped $3K / mo)") },
  { title: "Eviction Protection", sf: tx("Coordination included"), mf: tx("Coordination included"), et: tx("+ Costs refunded up to $6,000") },
];

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "90-Day Risk-Free Guarantee",
    body: "Cancel within the first 90 days and we'll refund all paid management charges — no questions asked.",
    etPlus: false,
  },
  {
    icon: Clock,
    title: "48-Hour Response Guarantee",
    body: "We'll return your call or email within 48 business hours or credit your account $20.",
    etPlus: false,
  },
  {
    icon: Calculator,
    title: "Accounting Accuracy Guarantee",
    body: "If you find an accounting error, we'll fix it and credit you 10% of the difference.",
    etPlus: false,
  },
  {
    icon: Key,
    title: "Leasing Guarantee",
    body: "Signed lease within 21 days of your unit being rent-ready, or management fees are credited until leased. Tenants we place are guaranteed for 12 months — if they leave early, we prorate a credit toward the next leasing fee.",
    etPlus: false,
  },
  {
    icon: PawPrint,
    title: "Pet Damage Guarantee",
    body: "We collect pet rent and cover up to $1,000 in pet-related damage above and beyond the security deposit. Service and companion animals are also covered with ET+.",
    etPlus: false,
  },
  {
    icon: Wrench,
    title: "Reduced Repairs Guarantee",
    body: "Our labor rates are guaranteed to be 10% below retail — or we credit you the difference, plus 10% of the difference amount.",
    etPlus: false,
  },
  {
    icon: House,
    title: "Property Protection Guarantee",
    body: "Covers malicious tenant damage up to $35,000 and theft damage up to $15,000.",
    etPlus: true,
  },
  {
    icon: CurrencyDollar,
    title: "Rent Guarantee",
    body: "Covers lost rent for up to 25 weeks due to lease breaks, evictions, death, or other qualifying events — capped at $3,000/month.",
    etPlus: true,
  },
  {
    icon: FileText,
    title: "Eviction Protection Guarantee",
    body: "Eviction-related expenses refunded up to $6,000 — covering filing fees, legal defense, sheriff costs, and rekeying.",
    etPlus: true,
  },
];

interface CompetitorRow {
  feature: string;
  et: string;
  etPlus?: string;
  std: string;
}

/* Linkify "ET+" → #et-plus and any "guarantee" mention → #guarantees */
function linkifyCompareCell(text: string): ReactNode {
  const parts = text.split(/(ET\+|[Gg]uarantee[ds]?)/g);
  return parts.map((p, i) => {
    if (p === "ET+") {
      return (
        <a key={i} href="#et-plus" className="underline underline-offset-2 hover:opacity-75 transition-opacity">
          ET+
        </a>
      );
    }
    if (/^[Gg]uarantee[ds]?$/.test(p)) {
      return (
        <a key={i} href="#guarantees" className="underline underline-offset-2 hover:opacity-75 transition-opacity">
          {p}
        </a>
      );
    }
    return p;
  });
}

const COMPETITOR_ROWS: CompetitorRow[] = [
  {
    feature: "Vacancy & leasing speed",
    et: "21-day leasing guarantee or fees credited. 12-month tenant retention guarantee.",
    std: "No standard; no guarantee",
  },
  {
    feature: "Tenant quality & fraud prevention",
    et: "AI-powered screening detects fake documents, income fraud, and identity misrepresentation. 7-point verification: credit, criminal, eviction history, income, bank statements, employment, landlord references.",
    std: "Credit check only at most companies; manual review; fraud easily missed",
  },
  {
    feature: "Lease strength & enforcement",
    et: "Proprietary lease — owner-optimized, fewer loopholes, stronger enforcement language than industry boilerplate. Firm enforcement, proactive renewals, collections and evictions managed start to finish.",
    std: "Standard boilerplate lease; not owner-optimized; enforcement inconsistent and often reactive",
  },
  {
    feature: "Getting paid",
    et: "Every Friday via direct deposit",
    std: "15th–20th of the following month",
  },
  {
    feature: "Repairs, quality & oversight",
    et: "Internal technicians handle most maintenance. Dedicated Property Service Manager oversees every repair, turn, and project — acting in the property's best interest, not just owner or tenant requests. Vendors on turns managed to scope, timeline, and budget. Guaranteed 10%+ below retail or we credit the difference. Asset management approach — every decision evaluated for long-term property value, not just lowest immediate cost.",
    std: "Most PM's use external vendors only, leading to quality, timeline, and budget concerns.",
  },
  {
    feature: "Who handles your property",
    et: "Dedicated PM + assistant PM + coordinator — not a call center. Deep property knowledge accessible instantly through integrated systems.",
    std: "Shared pool; whoever answers; no centralized property knowledge",
  },
  {
    feature: "Technology & information access",
    et: "Open API tech stack — all systems communicate in real time. Integrated owner data, maintenance history, financials, and tenant records power faster decisions, better service, and deeper reporting.",
    std: "Closed or no API systems; siloed data; manual workarounds; slower response",
  },
  {
    feature: "Transparency & financials",
    et: "Pricing published online. 24/7 owner portal with live ledger. Monthly statements by the 15th.",
    std: "Quote required; monthly statements only; fees often opaque",
  },
  {
    feature: "Contract & cancellation",
    et: "Cancel anytime. 90-day risk-free guarantee — full refund of management fees if cancelled in first 90 days.",
    std: "Typically locked in 1 year; penalties to exit",
  },
  {
    feature: "Eviction cost & risk",
    et: "Coordination included; legal process fully managed.",
    etPlus: "Full eviction costs refunded up to $6,000.",
    std: "Full cost to owner: $3,500–$7,000+",
  },
  {
    feature: "Catastrophic loss",
    et: "Master GL policy covers owner and manager.",
    etPlus: "Up to $35K malicious damage + $15K theft + rent guarantee up to 25 weeks, capped at $3K/month.",
    std: "Owner's insurance only; no rent protection",
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

const RPM_FAQS = [
  {
    question: "How much does EquityTeam charge for property management in Cincinnati?",
    answer: "EquityTeam charges 5.9% of collected rent for single-family properties (minimum $99 per unit per month) and 8.9% of collected rent for multi-family properties (minimum $79 per unit per month). All pricing is published online with no hidden fees. Leasing fees are 59% of one month's rent for single-family and 69% for multi-family, with a $699 minimum. Lease renewals are $199.",
  },
  {
    question: "What does EquityTeam's residential property management fee include?",
    answer: "EquityTeam's management fee includes full-service property management: tenant screening, leasing, rent collection, maintenance coordination, lease enforcement, monthly financial statements, year-end tax reporting, and 24/7 owner portal access. Owners also receive six service guarantees at no extra cost, including a 21-day leasing guarantee, 12-month tenant retention guarantee, and 48-hour response guarantee. Optional ET+ protection ($59/unit/month) adds rent guarantee, property protection, and eviction protection.",
  },
  {
    question: "Is there a long-term contract with EquityTeam? What if I want to cancel?",
    answer: "No, EquityTeam does not require a long-term contract. Owners can cancel at any time with no penalty. New clients are also protected by a 90-day risk-free guarantee — if you cancel within the first 90 days, EquityTeam refunds all management fees paid, no questions asked. This is unusual in the property management industry, where 1-year minimum contracts are standard.",
  },
  {
    question: "How long does it take EquityTeam to lease a property?",
    answer: "EquityTeam's average days on market is 13 days, backed by a 21-day Leasing Guarantee. If a rent-ready property is not leased within 21 days, EquityTeam credits management fees until it is leased. Placed tenants are guaranteed for 12 months — if they leave early, the next leasing fee is prorated as a credit.",
  },
  {
    question: "When do I receive my owner distribution?",
    answer: "EquityTeam pays owner distributions every Friday via direct deposit. Most property management companies distribute funds between the 15th and 20th of the following month, which can mean a 4-6 week delay. Weekly distributions improve cash flow predictability for owners.",
  },
  {
    question: "How does EquityTeam's tenant screening process work?",
    answer: "EquityTeam uses a 7-point tenant screening process: credit check, criminal background, eviction history, income verification, bank statement review, employment verification, and past landlord references. AI-powered document screening detects fake pay stubs, identity misrepresentation, and income fraud — protections most companies don't offer. Pet screening is also performed on all animals.",
  },
  {
    question: "How does EquityTeam handle maintenance and repairs?",
    answer: "EquityTeam handles most maintenance with internal technicians, which improves quality control and accountability. A dedicated Property Service Manager oversees every repair, turn, and project, acting in the property's best long-term interest — not just executing whatever the owner or tenant requests. Labor rates are guaranteed to be 10% below retail or EquityTeam credits the difference plus 10% of the difference. Vendors used on larger projects are managed to scope, timeline, and budget.",
  },
  {
    question: "What happens if a tenant stops paying rent?",
    answer: "If a tenant stops paying rent, EquityTeam initiates collections immediately, followed by the eviction process if necessary. Owners enrolled in ET+ protection are covered by a Rent Guarantee that pays up to 25 weeks of lost rent (capped at $3,000/month) for qualifying events including lease breaks, evictions, and death. Owners not enrolled in ET+ still receive full eviction coordination and lease enforcement, but bear the cost of lost rent themselves.",
  },
  {
    question: "How do evictions work with EquityTeam, and who pays for them?",
    answer: "EquityTeam manages the entire eviction process from start to finish, including filing, legal coordination, sheriff coordination, and re-keying. Without ET+, the owner pays the actual eviction costs, which typically range from $3,500 to $7,000 in Ohio. With ET+, EquityTeam refunds eviction-related expenses up to $6,000, effectively eliminating most owner exposure.",
  },
  {
    question: "What is ET+ and what does it cover?",
    answer: "ET+ is EquityTeam's optional protection bundle that adds three major financial protections on top of standard management: up to $35,000 in malicious tenant damage coverage (plus $15,000 in theft coverage), up to 25 weeks of rent guarantee (capped at $3,000/month), and up to $6,000 in eviction cost coverage. ET+ costs $59 per unit per month and is available for units renting at $1,000 or more per month. ET+ also includes a 5% discount on leasing fees, $50 off lease renewals, and a 50/50 late fee split with the tenant.",
  },
  {
    question: "How much does EquityTeam charge for lease renewals?",
    answer: "EquityTeam charges $199 per lease renewal. Owners enrolled in ET+ receive a $50 discount on each renewal, bringing the cost to $149. Lease renewals are handled proactively — EquityTeam initiates renewal conversations with tenants well before lease expiration to minimize vacancy risk.",
  },
  {
    question: "Do you manage properties that already have existing tenants?",
    answer: "Yes, EquityTeam regularly takes on properties with existing tenants. The onboarding process includes reviewing the current lease, completing a Rent Ready inspection, formally introducing EquityTeam to the tenant, transitioning rent collection, and documenting the property's current condition. There is no penalty or transition fee, and EquityTeam's 90-day risk-free guarantee still applies.",
  },
  {
    question: "What areas does EquityTeam serve?",
    answer: "EquityTeam serves Greater Cincinnati and Greater Dayton in Ohio for residential property management, including neighborhoods like Hyde Park, Oakley, Mount Lookout, Clifton, Over-the-Rhine, Norwood, Kettering, Centerville, Beavercreek, and Oakwood. EquityTeam also manages vacation rentals at Norris Lake, Tennessee through Deerfield Vacation Rentals. EquityTeam is an Ohio licensed real estate broker (REC.2012001994).",
  },
  {
    question: "Does EquityTeam work with real estate investors and rental portfolios?",
    answer: "Yes, EquityTeam is built for real estate investors and portfolio owners who want a true asset management partner. EquityTeam's open API technology stack, dedicated Property Manager teams, Property Service Managers, transparent reporting, and performance guarantees are designed to scale with growing portfolios. Investors managing multiple doors benefit from consolidated reporting, weekly distributions, and an asset-management approach to maintenance and capital decisions.",
  },
  {
    question: "How does EquityTeam compare to other property management companies in Cincinnati?",
    answer: "EquityTeam differs from most Cincinnati property management companies in several measurable ways: nine guarantees vs. zero or one industry standard, weekly owner distributions vs. monthly, 10%+ below-retail repair pricing vs. 10-20% markups, no long-term contract vs. 1-year minimums, internal maintenance technicians vs. third-party vendors, and AI-powered tenant screening vs. credit-check-only. EquityTeam also offers ET+ protection — a $59/unit/month bundle providing rent guarantee, property protection, and eviction protection — coverage rarely offered by competitors.",
  },
  {
    question: "Is EquityTeam licensed?",
    answer: "Yes, EquityTeam is an Ohio licensed real estate broker, license number REC.2012001994. EquityTeam is also a member of the National Association of Realtors (NAR), National Association of Residential Property Managers (NARPM), and National Apartment Association (NAA), and was named one of the Best Property Management Companies in Cincinnati by Expertise.com in 2025.",
  },
];

const CINCINNATI_AREAS = [
  { name: "Blue Ash", href: "/locations/cincinnati/blue-ash" },
  { name: "Camp Washington", href: "/locations/cincinnati/camp-washington" },
  { name: "Cincinnati", href: "/" },
  { name: "Clifton", href: "/locations/cincinnati/clifton" },
  { name: "College Hill", href: "/locations/cincinnati/college-hill" },
  { name: "Columbia-Tusculum", href: "/locations/cincinnati/columbia-tusculum" },
  { name: "Deer Park", href: "/locations/cincinnati/deer-park" },
  { name: "Delhi", href: "/locations/cincinnati/delhi" },
  { name: "Downtown", href: "/locations/cincinnati/downtown" },
  { name: "East Walnut Hills", href: "/locations/cincinnati/east-walnut-hills" },
  { name: "Evanston", href: "/locations/cincinnati/evanston" },
  { name: "Forest Park", href: "/locations/cincinnati/forest-park" },
  { name: "Hamilton", href: "/locations/cincinnati/hamilton" },
  { name: "Harrison", href: "/locations/cincinnati/harrison" },
  { name: "Hyde Park", href: "/locations/cincinnati/hyde-park" },
  { name: "Indian Hill", href: "/locations/cincinnati/indian-hill" },
  { name: "Kennedy Heights", href: "/locations/cincinnati/kennedy-heights" },
  { name: "Kenwood", href: "/locations/cincinnati/kenwood" },
  { name: "Loveland", href: "/locations/cincinnati/loveland" },
  { name: "Madisonville", href: "/locations/cincinnati/madisonville" },
  { name: "Mariemont", href: "/locations/cincinnati/mariemont" },
  { name: "Middletown", href: "/locations/cincinnati/middletown" },
  { name: "Montgomery", href: "/locations/cincinnati/montgomery" },
  { name: "Mount Auburn", href: "/locations/cincinnati/mount-auburn" },
  { name: "Mount Lookout", href: "/locations/cincinnati/mount-lookout" },
  { name: "Mount Washington", href: "/locations/cincinnati/mount-washington" },
  { name: "Mt. Adams", href: "/locations/cincinnati/mt-adams" },
  { name: "Northside", href: "/locations/cincinnati/northside" },
  { name: "Norwood", href: "/locations/cincinnati/norwood" },
  { name: "Oakley", href: "/locations/cincinnati/oakley" },
  { name: "Over-the-Rhine", href: "/locations/cincinnati/over-the-rhine" },
  { name: "Pleasant Ridge", href: "/locations/cincinnati/pleasant-ridge" },
  { name: "Sayler Park", href: "/locations/cincinnati/sayler-park" },
  { name: "Sycamore", href: "/locations/cincinnati/sycamore" },
  { name: "Terrace Park", href: "/locations/cincinnati/terrace-park" },
  { name: "Walnut Hills", href: "/locations/cincinnati/walnut-hills" },
  { name: "Western Hills", href: "/locations/cincinnati/western-hills" },
  { name: "Westwood", href: "/locations/cincinnati/westwood" },
  { name: "Winton Place", href: "/locations/cincinnati/winton-place" },
];

const DAYTON_AREAS = [
  { name: "Beavercreek", href: "/locations/dayton/beavercreek" },
  { name: "Centerville", href: "/locations/dayton/centerville" },
  { name: "Clayton", href: "/locations/dayton/clayton" },
  { name: "Dayton", href: "/dayton-property-management" },
  { name: "Englewood", href: "/locations/dayton/englewood" },
  { name: "Fairborn", href: "/locations/dayton/fairborn" },
  { name: "Franklin", href: "/locations/dayton/franklin" },
  { name: "Germantown", href: "/locations/dayton/germantown" },
  { name: "Harrison Township", href: "/locations/dayton/harrison-township" },
  { name: "Huber Heights", href: "/locations/dayton/huber-heights" },
  { name: "Kettering", href: "/locations/dayton/kettering" },
  { name: "Miami Township", href: "/locations/dayton/miami-township" },
  { name: "Miamisburg", href: "/locations/dayton/miamisburg" },
  { name: "Oakwood", href: "/locations/dayton/oakwood" },
  { name: "Riverside", href: "/locations/dayton/riverside" },
  { name: "Springboro", href: "/locations/dayton/springboro" },
  { name: "Trotwood", href: "/locations/dayton/trotwood" },
  { name: "Vandalia", href: "/locations/dayton/vandalia" },
  { name: "Washington Township", href: "/locations/dayton/washington-township" },
  { name: "West Carrollton", href: "/locations/dayton/west-carrollton" },
  { name: "Xenia", href: "/locations/dayton/xenia" },
];

/* ── Pricing cell renderer ── */
function PricingCell({ cell }: { cell: PCell }) {
  if (cell.check) {
    return (
      <span className="w-5 md:w-7 h-5 md:h-7 block mx-auto text-secondary">
        <svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <path fillRule="evenodd" clipRule="evenodd" d="M27.7359 0.799805H4.93588C2.8367 0.799805 1.13428 2.50221 1.13428 4.5982V27.4014C1.13428 29.4974 2.8367 31.1998 4.93588 31.1998H27.7359C29.8319 31.1998 31.5343 29.4974 31.5343 27.4014V4.5982C31.5343 2.50221 29.8319 0.799805 27.7359 0.799805ZM25.7711 11.6446C21.7071 15.7214 18.7535 19.0398 14.6095 23.1934L13.3583 24.4446L12.0111 23.3022L7.00627 19.0686L5.53748 17.8174L8.01428 14.8798L9.48311 16.1214L13.1279 19.1998C16.5519 15.7086 19.3679 12.6206 23.0543 8.92461L24.4143 7.5582L27.1311 10.275L25.7711 11.6446Z" fill="currentColor" />
        </svg>
      </span>
    );
  }
  if (cell.text) {
    return (
      <p className="text-black/80 mb-0 text-base leading-snug">
        {cell.text.split("\n").map((line, i, arr) => (
          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
        ))}
      </p>
    );
  }
  return <span className="block text-black/30 text-base">—</span>;
}

/* ══════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════ */

export default function ResidentialPropertyManagement() {
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
        title="Residential Property Management Cincinnati | EquityTeam"
        description="Property management for Cincinnati &amp; Dayton rentals. Single- &amp; multi-family with exclusive guarantees, advanced technology, and a trusted local team."
        canonical="/residential-property-management"
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": RPM_FAQS.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Residential Property Management",
            "provider": {
              "@type": "LocalBusiness",
              "name": "EquityTeam Property Management",
              "telephone": "+15134444010",
              "url": SITE_URL,
            },
            "areaServed": [
              { "@type": "City", "name": "Cincinnati" },
              { "@type": "City", "name": "Dayton" },
            ],
            "offers": [
              { "@type": "Offer", "name": "Single-Family Management", "price": "5.9", "priceCurrency": "USD" },
              { "@type": "Offer", "name": "Multi-Family Management", "price": "8.9", "priceCurrency": "USD" },
            ],
          },
        ]}
        speakableSelectors={["h1", "h2"]}
      />

      {/* ══════════════════════════════════════
          1. HERO  (stats pinned to bottom, always above the fold)
      ══════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col pt-28 md:pt-40 pb-0 md:overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${BASE}images/property-management.jpg`}
            alt="Property manager standing in front of a brick ranch-style investment property at golden hour"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/55 to-[#121212]/20" />
        </div>

        {/* Main headline + CTAs — grows to push stats to bottom */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-screen-xl mx-auto px-5 text-center pb-10 md:pb-14 w-full">
          <h1
            className="block uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[68px] md:max-w-[960px] mx-auto"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
          >
            Residential<br />Property Management
          </h1>
          <p
            className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal mb-3 md:max-w-[820px] mx-auto"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            Professional asset management for single-family and multi-family rental<br />properties in Greater Cincinnati &amp; Greater Dayton
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
            <Link href="/contact-us" className="btn-solid-secondary uppercase">
              Schedule a Free Consult
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8">
            <a href="#guarantees" className="cta-secondary text-white hover:text-secondary">
              Exclusive Guarantees <span className="cta-arrow">→</span>
            </a>
            <a href="#pricing" className="cta-secondary text-white hover:text-secondary">
              Pricing <span className="cta-arrow">→</span>
            </a>
            <a href="#compare" className="cta-secondary text-white hover:text-secondary">
              Compare to Industry <span className="cta-arrow">→</span>
            </a>
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
          4. PROBLEM STATEMENT
      ══════════════════════════════════════ */}
      <section className="bg-primary section-pad">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-heading text-white mb-6">
            A Higher Standard<br />of Property Management
          </h2>
          <p className="font-sans text-lg text-white/80 leading-relaxed mb-4">
            Investors want performance and transparency.<br />
            Self-managing owners want their time back.<br />
            Newer landlords want expert guidance they can trust.
          </p>
          <p className="font-sans text-lg text-white/80 leading-relaxed mb-4">
            EquityTeam provides solutions. We manage your property the way an asset manager would — disciplined systems, experienced people, advanced technology, and guarantees other managers can&rsquo;t match.
          </p>
          <p className="font-sans text-lg text-white/80 leading-relaxed">
            This is what exceptional property management looks like.
          </p>
        </div>
      </section>

      {/* ═════════════════════
          4. HOW IT WORKS
      ═════════════════════ */}
      <section className="bg-[#f8f5ef] py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-[1728px] mx-auto">
          <h2 className="sr-only">The Property Management Lifecycle</h2>
          <a
            href={`${BASE}images/property-management-lifecycle-clean.jpg`}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the Property Management Lifecycle graphic at full size"
            className="block"
          >
            <img
              src={`${BASE}images/property-management-lifecycle-clean.jpg`}
              alt="EquityTeam property management lifecycle from onboarding through market preparation, leasing, tenancy and renewals, move-out, and offboarding"
              width={1728}
              height={910}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </a>
          <p className="mt-3 text-center font-sans text-sm text-black/60 md:hidden">Tap the lifecycle graphic to view it at full size.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. WHAT'S INCLUDED
      ══════════════════════════════════════ */}
      <section id="whats-included" className="bg-primary section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white">
              What's Included
            </h2>
            <p className="font-sans text-white/70 text-base mt-4 max-w-2xl mx-auto">
              We handle everything — leasing, maintenance, financials, tenants — fully managed by your dedicated team.
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
                {tab === "owners" ? "For Property Owners" : "For Tenants"}
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
                        <CheckItem key={idx}>
                          {typeof item === "string" ? item : "linkText" in item ? (
                            <>{item.prefix}<a href={item.href} className="text-secondary hover:text-secondary/80 underline underline-offset-2 transition-colors">{item.linkText}</a></>
                          ) : (
                            <>
                              <a href={item.href} className="text-secondary hover:text-secondary/80 underline underline-offset-2 transition-colors">
                                {item.text}
                              </a>
                              {"etPlus" in item && item.etPlus ? <span className="text-white/50 ml-1">(ET+ Only)</span> : null}
                            </>
                          )}
                        </CheckItem>
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
          7. GUARANTEES
      ══════════════════════════════════════ */}
      <section id="guarantees" className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-black mb-4">
              Service Guarantees
            </h2>
            <p className="font-sans text-black/70 text-base max-w-2xl mx-auto">
              We align our services with our Owners' interests — and offer guarantees you won't find anywhere else.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {GUARANTEES.filter((g) => !g.etPlus).map((g) => (
              <div
                key={g.title}
                className="border border-black/15 p-8 relative hover:border-secondary transition-colors duration-200"
              >
                <g.icon size={32} weight="thin" className="text-secondary mb-5" />
                <h3 className="font-sans font-bold text-base text-black mb-3">{g.title}</h3>
                <p className="font-sans text-base text-black/70 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 md:mt-16 text-center font-sans text-base md:text-lg text-secondary">
            Want more protection and guarantees?{" "}
            <a href="#et-plus" className="underline hover:no-underline">
              Check out ET+, exclusively at EquityTeam
            </a>
            .
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. ET+ PROTECTION BUNDLE
      ══════════════════════════════════════ */}
      <section id="et-plus" className="bg-primary section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block font-sans font-semibold text-base tracking-[0.2em] text-secondary uppercase border border-secondary/40 px-4 py-1.5 mb-5">
              Exclusive Add-On
            </span>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="font-cowling font-bold text-[52px] leading-none text-secondary">$59</span>
              <span className="font-sans text-white/60 text-base">per unit · per month</span>
            </div>
            <h2 className="section-heading text-white mb-4">
              ET+ Protection Bundle
            </h2>
            <p className="font-sans text-white/70 text-base max-w-2xl mx-auto">
              ET+ is an exclusive EquityTeam add-on that layers three major financial protections on top of your standard management plan. Available for units renting at $1,000 or more per month.
            </p>
          </div>

          <div className="border-4 border-secondary max-w-4xl mx-auto">
            {/* Three guarantee cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e0e0e0]">
              {ET_PLUS_GUARANTEES.map((g) => (
                <div key={g.title} className="bg-white p-8 text-center">
                  <g.icon size={36} weight="thin" className="text-secondary mx-auto mb-4" />
                  <div className="font-sans font-bold text-base tracking-[0.12em] text-secondary uppercase mb-1">{g.amount}</div>
                  <h4 className="font-sans font-bold text-base text-black mb-3">{g.title}</h4>
                  <p className="font-sans text-base text-black/70 leading-relaxed">{g.body}</p>
                </div>
              ))}
            </div>

            {/* Additional perks */}
            <div className="bg-white border-t border-[#e0e0e0] px-8 md:px-12 py-6">
              <p className="font-sans font-semibold text-base tracking-[0.15em] text-secondary uppercase mb-4">Also Included with ET+</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ET_PLUS_PERKS.map((perk) => (
                  <CheckItem key={perk}>
                    <span className="text-black/80">{perk}</span>
                  </CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. PRICING
      ══════════════════════════════════════ */}
      <section id="pricing" className="bg-white section-pad">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading text-black mb-0">
              Pricing
            </h2>
          </div>

          {/* Rate cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-secondary/20 border border-secondary/20 mb-8">
            <div className="bg-white text-center px-6 py-8">
              <p className="font-sans font-semibold text-base tracking-[0.18em] text-black/50 uppercase mb-3">Single-Family</p>
              <p className="font-cowling font-bold text-[52px] leading-none text-secondary mb-1">5.9%</p>
              <p className="font-sans text-base text-black/60">of collected rent</p>
              <p className="font-sans text-base text-black/50 mt-1">Min $99 / unit / month</p>
            </div>
            <div className="bg-white text-center px-6 py-8">
              <p className="font-sans font-semibold text-base tracking-[0.18em] text-black/50 uppercase mb-3">Multi-Family</p>
              <p className="font-cowling font-bold text-[52px] leading-none text-secondary mb-1">8.9%</p>
              <p className="font-sans text-base text-black/60">of collected rent</p>
              <p className="font-sans text-base text-black/50 mt-1">Min $79 / unit / month</p>
            </div>
            <div className="bg-white text-center px-6 py-8 border-t border-secondary/20 md:border-t-0 md:border-l border-secondary/20">
              <p className="font-sans font-semibold text-base tracking-[0.18em] text-secondary uppercase mb-3">ET+ Add-On</p>
              <p className="font-cowling font-bold text-[52px] leading-none text-black mb-1">$59</p>
              <p className="font-sans text-base text-black/60">per unit · per month</p>
              <p className="font-sans text-base text-secondary/80 mt-1">For units renting $1,000+/mo</p>
            </div>
          </div>

          {/* Full feature table */}
          <div className="flex flex-col gap-0">
            {/* Header */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 border-b border-secondary/30 pb-3 mb-1">
              <div className="hidden md:block" />
              {["Single-Family", "Multi-Family", "ET+"].map((col) => (
                <div key={col} className="text-center">
                  <span className="font-sans font-bold text-base tracking-[0.12em] text-secondary uppercase">{col}</span>
                </div>
              ))}
            </div>

            {PRICING_ROWS.map((row, i) => (
              <div
                key={i}
                className="py-3 md:py-4 grid grid-cols-3 md:grid-cols-4 gap-4 items-center border-b border-black/10"
              >
                <div className="col-span-3 md:col-span-1">
                  <span className="font-sans text-base text-black/80 leading-snug inline-flex items-center flex-wrap gap-x-0.5">
                    {row.title}
                    {row.tip && <InfoTooltip tip={row.tip} />}
                  </span>
                </div>
                <div className="text-center"><PricingCell cell={row.sf} /></div>
                <div className="text-center"><PricingCell cell={row.mf} /></div>
                <div className="text-center"><PricingCell cell={row.et} /></div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          10. MID-PAGE CTA BAR
      ══════════════════════════════════════ */}
      <GoldBorderCTA
        title={<>Ready to own <em className="italic underline">without</em> operating your rental?</>}
        btnLabel="Schedule a Consult"
        btnHref="/contact-us"
      />

      {/* ══════════════════════════════════════
          11. COMPETITOR COMPARISON
      ══════════════════════════════════════ */}
      <section id="compare" className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-black mb-4">
              EquityTeam vs. Industry Standard
            </h2>
            <p className="font-sans text-black/70 text-base max-w-2xl mx-auto">
              Most property managers charge similar fees but offer far less. Here's how the typical experience compares.
            </p>
          </div>

          <div className="max-w-4xl mx-auto border border-secondary/40">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-primary border-b border-secondary/40">
              <div className="px-4 md:px-6 py-4 col-span-1">
                <span className="font-sans font-bold text-base tracking-[0.12em] text-white/70 uppercase">What owners care about</span>
              </div>
              <div className="px-4 md:px-6 py-4 text-center border-l border-secondary/40">
                <span className="font-sans font-bold text-base tracking-[0.12em] text-secondary uppercase">EquityTeam</span>
              </div>
              <div className="px-4 md:px-6 py-4 text-center border-l border-secondary/40">
                <span className="font-sans font-bold text-base tracking-[0.12em] text-white/70 uppercase">Industry Standard</span>
              </div>
            </div>

            {COMPETITOR_ROWS.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-black/10 last:border-b-0"
              >
                <div className="px-4 md:px-6 py-4">
                  <p className="font-sans font-semibold text-base text-black/80 leading-snug m-0">{row.feature}</p>
                </div>
                <div className="px-3 md:px-6 py-4 border-l border-black/10">
                  <p className="font-sans text-base text-secondary font-semibold leading-snug m-0">{linkifyCompareCell(row.et)}</p>
                  {row.etPlus && (
                    <p className="font-sans italic text-sm text-secondary/90 leading-snug m-0 mt-2">
                      *{" "}
                      <a href="#et-plus" className="underline underline-offset-2 hover:opacity-75 transition-opacity">
                        ET+
                      </a>
                      : {linkifyCompareCell(row.etPlus)}
                    </p>
                  )}
                </div>
                <div className="px-3 md:px-6 py-4 border-l border-black/10">
                  <p className="font-sans text-base text-black/50 leading-snug m-0">{linkifyCompareCell(row.std)}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 font-sans text-base text-black/40">
            Specific competitor comparisons available — contact us to discuss how we stack up against your current manager.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          12. CLIENT REVIEWS — FULL CAROUSEL
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
          13. FAQ
      ══════════════════════════════════════ */}
      <section className="bg-white section-pad" aria-label="Frequently asked questions">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="section-heading text-black">
              Residential Property Management FAQ
            </h2>
          </div>
          <FaqAccordion items={RPM_FAQS} variant="light" />
          <div className="text-center mt-12">
            <Link href="/faq" className="cta-secondary text-black hover:text-secondary">
              See All FAQs <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          14. OWNER RESOURCES
      ══════════════════════════════════════ */}
      <section className="bg-primary section-pad">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-heading text-white mb-4">
              Owner Resources
            </h2>
            <p className="font-sans text-white/70 text-base max-w-2xl mx-auto">
              Pricing, free decision tools, neighborhood research, and ongoing education — built for owners and investors.
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
          15. AREAS SERVED
      ══════════════════════════════════════ */}
      <section className="bg-white pt-16 md:pt-20 pb-16 md:pb-20">
        {/* Cincinnati */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          <div className="mx-5 lg:mx-0 w-full lg:max-w-[604px] pt-11 lg:pt-15 justify-self-center flex order-1 lg:justify-self-end px-8 lg:pl-18 lg:pr-0">
            <div className="w-full lg:max-w-[530px] pl-5 lg:pl-0">
              <h2 className="section-heading text-black mb-6 lg:mb-8">Greater Cincinnati</h2>
              <p className="text-black/70 font-sans text-base leading-relaxed mb-8">
                From Hyde Park, Oakley, and Mount Lookout to Clifton, Norwood, and Over-the-Rhine — our Cincinnati office manages residential rentals across Greater Cincinnati neighborhoods.
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
          16. FINAL CTA
      ══════════════════════════════════════ */}
      <GoldBorderCTA
        title="Managing a portfolio? Trust your asset management to EquityTeam."
        btnLabel="Contact Us"
        btnHref="/contact-us"
        buttonPosition="left"
      />

    </PageLayout>
  );
}
