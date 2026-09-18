import { useState, FormEvent } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Link } from "wouter";
import {
  Buildings,
  Key,
  HouseLine,
  Users,
  Storefront,
  UserPlus,
  FileText,
  MapPin,
  Phone,
  EnvelopeSimple,
  Clock,
  ArrowRight,
  Warning,
} from "@phosphor-icons/react";
import { SITE_URL } from "@/lib/siteUrl";

const BASE = import.meta.env.BASE_URL;
const GOLD = "#B4975A";

/* ─────────────────────────── Data ─────────────────────────── */

const AUDIENCE_CARDS = [
  {
    icon: Buildings,
    label: "Prospective Property Owners",
    desc: "Get a free management consultation with our team.",
    cta: "Schedule a Free Consultation",
    href: "#consultation",
    external: false,
  },
  {
    icon: Key,
    label: "Current Tenants",
    desc: "Pay rent, request maintenance, and access your portal.",
    cta: "Tenant Portal",
    href: "/tenant-portal",
    external: false,
  },
  {
    icon: FileText,
    label: "Current Owners",
    desc: "Access statements, reports, and your owner dashboard.",
    cta: "Owner Portal",
    href: "/owner-portal",
    external: false,
  },
  {
    icon: HouseLine,
    label: "Vacation Rental Guests (Tennessee)",
    desc: "Book a stay or manage a reservation at Norris Lake.",
    cta: "Visit Deerfield Vacation Rentals",
    href: "https://deerfieldvacationrentals.com",
    external: true,
  },
  {
    icon: Users,
    label: "HOA Boards",
    desc: "Request a proposal for your homeowners association.",
    cta: "HOA Management",
    href: "/hoa-management",
    external: false,
  },
  {
    icon: Storefront,
    label: "Commercial Clients",
    desc: "Discuss commercial property management services.",
    cta: "Commercial Management",
    href: "/commercial-property-management",
    external: false,
  },
  {
    icon: UserPlus,
    label: "Vendors & Careers",
    desc: "Apply to be a preferred vendor or join our team.",
    cta: "View Opportunities",
    href: "/careers",
    external: false,
  },
];

const OFFICE_BLOCKS = [
  {
    city: "Cincinnati",
    label: "Headquarters",
    address: "11427 Reed Hartman Hwy, Cincinnati, OH 45241",
    phone: "(513) 444-4010",
    email: "cincinnati@equityteam.com",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM EST",
    services: ["Residential", "Vacation Rental", "Shared Living", "HOA", "Commercial", "Property Services"],
    mapQuery: "11427+Reed+Hartman+Hwy+Cincinnati+OH+45241",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=11427+Reed+Hartman+Hwy+Cincinnati+OH+45241",
  },
  {
    city: "Tennessee",
    label: "Deerfield Vacation Rentals",
    address: "Norris Lake, TN and surrounding areas",
    phone: "(513) 444-4010",
    email: "tn@equityteam.com",
    hours: "7 days a week — guest services",
    services: ["Vacation Rental Management", "Property Services"],
    mapQuery: "Norris+Lake+TN",
    directionsUrl: null,
    note: "Operated as our Tennessee sub-brand, Deerfield Vacation Rentals. Visit deerfieldvacationrentals.com to book a stay or learn more about owner services.",
    externalUrl: "https://deerfieldvacationrentals.com/contact",
  },
];

const CONTACT_FAQS = [
  {
    question: "How do I contact EquityTeam?",
    answer:
      "You can reach EquityTeam by calling our Cincinnati headquarters at (513) 444-4010, emailing info@equityteam.com, scheduling a free consultation through our online calendar, or completing the contact form on this page. We respond to all inquiries promptly during Monday through Friday business hours.",
  },
  {
    question: "What areas does EquityTeam serve?",
    answer:
      "EquityTeam provides property management services in Cincinnati, Ohio and Norris Lake, Tennessee. In Cincinnati we offer residential, vacation rental, shared living, HOA, commercial, and property services. In Tennessee we operate as Deerfield Vacation Rentals, specializing in vacation rental management at Norris Lake.",
  },
  {
    question: "How quickly does EquityTeam respond to inquiries?",
    answer:
      "We respond to all contact form submissions and emails promptly during Monday through Friday, 9:00 AM to 5:00 PM EST. Maintenance emergencies for current tenants are handled 24/7 through our emergency maintenance line.",
  },
  {
    question: "What markets does EquityTeam currently serve?",
    answer:
      "EquityTeam's primary market is Greater Cincinnati, Ohio, where we offer residential, vacation rental, HOA, commercial, shared living, and property services. Call us at (513) 444-4010 to discuss your specific needs.",
  },
  {
    question: "Does EquityTeam manage vacation rentals in Tennessee?",
    answer:
      "Yes. EquityTeam operates Deerfield Vacation Rentals, providing full-service vacation rental management at Norris Lake, Tennessee and surrounding areas. Property owners can learn about management services and guests can book stays at deerfieldvacationrentals.com.",
  },
  {
    question: "How do I report a maintenance emergency as a current tenant?",
    answer:
      "Current tenants should report maintenance emergencies through the tenant portal at the link in our menu, or call our emergency maintenance line. For non-emergencies, log into the tenant portal to submit a request.",
  },
  {
    question: "How do I schedule a free property management consultation?",
    answer:
      'Click the "Schedule a Free Consultation" button on this page to choose a time on our calendar. Consultations take approximately 30 minutes and include a walkthrough of our services, transparent pricing, and answers to your specific questions — at no cost and with no obligation.',
  },
  {
    question: "Is EquityTeam a licensed real estate broker?",
    answer:
      "Yes. EquityTeam is a licensed Ohio real estate broker, license number REC.2012001994. We have been operating since 2008 and are headquartered in Cincinnati, Ohio.",
  },
];

/*
 * FORM EMAIL ROUTING
 * When wiring up a form backend (Formspree, API route, etc.), use this map
 * to determine the destination address based on the selected location.
 * Dayton has no separate inbox — route to Cincinnati.
 */
export const LOCATION_EMAIL_ROUTING: Record<string, string> = {
  Cincinnati: "cincinnati@equityteam.com",
  Dayton: "cincinnati@equityteam.com",
  Tennessee: "tn@equityteam.com",
  Other: "info@equityteam.com",
};

const SERVICE_LINKS = [
  { label: "Residential Property Management", href: "/residential-property-management" },
  { label: "Vacation Rental Management", href: "/vacation-rental-management" },
  { label: "HOA Management", href: "/hoa-management" },
  { label: "Commercial Property Management", href: "/commercial-property-management" },
  { label: "Property Services", href: "/property-services" },
];

/* ─────────────────────────── Schemas ─────────────────────────── */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": CONTACT_FAQS.map((f) => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer },
  })),
};

const localBusinessCincinnati = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EquityTeam Property Management — Cincinnati",
  "legalName": "EquityTeam, LLC",
  "url": SITE_URL,
  "image": `${SITE_URL}/opengraph.jpg`,
  "priceRange": "$$",
  "telephone": "+15134444010",
  "email": "cincinnati@equityteam.com",
  "foundingDate": "2008",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11427 Reed Hartman Hwy",
    "addressLocality": "Cincinnati",
    "addressRegion": "OH",
    "postalCode": "45241",
    "addressCountry": "US",
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:00" },
  ],
  "areaServed": [{ "@type": "City", "name": "Cincinnati" }, { "@type": "City", "name": "Dayton" }],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "license",
    "name": "Ohio Real Estate Broker License REC.2012001994",
  },
};

const localBusinessTN = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Deerfield Vacation Rentals — Norris Lake, TN",
  "parentOrganization": { "@type": "Organization", "name": "EquityTeam, LLC" },
  "url": "https://deerfieldvacationrentals.com",
  "image": `${SITE_URL}/opengraph.jpg`,
  "priceRange": "$$",
  "telephone": "+15134444010",
  "email": "tn@equityteam.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Norris Lake",
    "addressRegion": "TN",
    "addressCountry": "US",
  },
  "areaServed": [{ "@type": "State", "name": "Tennessee" }],
};

/* ─────────────────────────── Sub-components ─────────────────────────── */

function AudienceCard({ card }: { card: (typeof AUDIENCE_CARDS)[0] }) {
  const Icon = card.icon;
  const inner = (
    <div className="group border border-[#e0e0e0] hover:border-secondary transition-colors duration-200 p-6 flex flex-col h-full">
      <Icon size={36} weight="thin" style={{ color: GOLD }} className="mb-4 flex-shrink-0" />
      <h3 className="font-sans font-semibold text-base uppercase tracking-[0.06em] text-black mb-2 leading-snug">
        {card.label}
      </h3>
      <p className="font-sans text-sm text-black/60 leading-relaxed mb-4 flex-1">{card.desc}</p>
      <span className="cta-secondary text-xs">
        {card.cta} <span className="cta-arrow">→</span>
      </span>
    </div>
  );

  if (card.external) {
    return (
      <a href={card.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  if (card.href.startsWith("#")) {
    return (
      <a href={card.href} className="block h-full">
        {inner}
      </a>
    );
  }
  return (
    <Link href={card.href} className="block h-full">
      {inner}
    </Link>
  );
}

function OfficeBlock({ block }: { block: (typeof OFFICE_BLOCKS)[0] }) {
  return (
    <div className="border border-[#e0e0e0] flex flex-col">
      {/* Map */}
      <div className="w-full h-48 bg-[#f5f0e8] flex items-center justify-center overflow-hidden">
        {block.mapQuery ? (
          <iframe
            title={`${block.city} office map`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${block.mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          />
        ) : (
          <p className="text-black/40 text-sm font-sans text-center px-4">
            Contact us to confirm the Dayton office address
          </p>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-1 md:min-h-[3.5rem]">
          <span className="block font-sans text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: GOLD }}>
            {block.label}
          </span>
          <h3 className="font-cowling font-bold text-xl uppercase leading-none text-black mt-1">{block.city}</h3>
        </div>

        <div className="border-t border-[#e0e0e0] mt-4 pt-4 space-y-3 text-sm font-sans">
          <div className="flex items-start gap-2 md:min-h-[3.5rem]">
            <MapPin size={16} weight="thin" style={{ color: GOLD }} className="flex-shrink-0 mt-0.5" />
            <span className="text-black/70 leading-relaxed">{block.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} weight="thin" style={{ color: GOLD }} className="flex-shrink-0" />
            <a href={`tel:+1${block.phone.replace(/\D/g, "")}`} className="link-text">{block.phone}</a>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeSimple size={16} weight="thin" style={{ color: GOLD }} className="flex-shrink-0" />
            <a href={`mailto:${block.email}`} className="link-text">{block.email}</a>
          </div>
          <div className="flex items-start gap-2 md:min-h-[2.75rem]">
            <Clock size={16} weight="thin" style={{ color: GOLD }} className="flex-shrink-0 mt-0.5" />
            <span className="text-black/70">{block.hours}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#e0e0e0]">
          <p className="text-xs text-black/50 font-sans uppercase tracking-[0.1em] mb-1.5">Services</p>
          <p className="text-sm text-black/70 font-sans leading-relaxed">{block.services.join(" · ")}</p>
        </div>

        {"note" in block && block.note && (
          <p className="mt-4 text-xs text-black/50 font-sans leading-relaxed italic">{block.note}</p>
        )}

        <div className="mt-auto pt-6">
          {"externalUrl" in block && block.externalUrl && (
            <a
              href={block.externalUrl as string}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary text-xs inline-flex"
            >
              Contact Deerfield <span className="cta-arrow">→</span>
            </a>
          )}

          {block.directionsUrl && (
            <a
              href={block.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary text-xs inline-flex"
            >
              Get Directions <span className="cta-arrow">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    iAm: "",
    location: "",
    message: "",
    honeypot: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setSending(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.fname,
          lastName: formData.lname,
          phone: formData.phone,
          email: formData.email,
          department: formData.iAm,
          location: formData.location,
          message: formData.message,
          website: formData.honeypot,
          pageTitle: document.title,
          pageUrl: location.origin + location.pathname + location.search,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please try again, or call us at (513) 444-4010.",
      );
    } finally {
      setSending(false);
    }
  };

  const field = (key: keyof typeof formData) => ({
    value: formData[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFormData({ ...formData, [key]: e.target.value }),
  });

  return (
    <PageLayout>
      <SEO
        title="Contact EquityTeam | Cincinnati &amp; Dayton Property Management"
        description="Contact EquityTeam for property management in Cincinnati, Dayton &amp; Tennessee — (513) 444-4010. Free consultations for every property type."
        canonical="/contact-us"
        schemas={[faqSchema, localBusinessCincinnati, localBusinessTN]}
        speakableSelectors={["h1", "h2"]}
      />

      {/* ── Header ── */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-12 md:pt-45 md:pb-24 bg-[#121212]">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-4 text-[40px] md:text-[56px] md:max-w-[960px] mx-auto">
            Contact Us
          </h1>
          <p className="font-marseille text-white text-xl md:text-[26px] leading-snug max-w-2xl mx-auto">
            How can we help you and your property?
          </p>
        </div>
      </section>

      <main className="bg-white">

        {/* ── Section 4: Leave Us a Message ── */}
        <section id="contact-form" className="py-16 md:py-20 bg-[#faf8f5] px-5 xl:px-0">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                  <h2 className="font-cowling font-bold uppercase text-[28px] md:text-[36px] leading-none text-black mb-4">
                  Leave Us a Message
                </h2>
                <p className="font-sans text-black/60 text-base leading-relaxed">
                  Get in touch with our team — we'll respond promptly during business hours, Monday–Friday.
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center border border-secondary">
                  <p className="text-lg font-sans font-semibold text-secondary mb-2">Message received.</p>
                  <p className="text-sm text-black/60 font-sans">We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-group space-y-6">
                  {/* Honeypot — hidden from humans */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    {...field("honeypot")}
                  />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-xs font-sans uppercase tracking-[0.14em] text-black/60 mb-2">
                        First Name <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        className="contact-input-field"
                        placeholder="First name"
                        required
                        {...field("fname")}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-sans uppercase tracking-[0.14em] text-black/60 mb-2">
                        Last Name <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        className="contact-input-field"
                        placeholder="Last name"
                        required
                        {...field("lname")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-xs font-sans uppercase tracking-[0.14em] text-black/60 mb-2">
                        Phone Number <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="tel"
                        className="contact-input-field"
                        placeholder="(513) 000-0000"
                        required
                        {...field("phone")}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-sans uppercase tracking-[0.14em] text-black/60 mb-2">
                        Email Address <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="email"
                        className="contact-input-field"
                        placeholder="you@example.com"
                        required
                        {...field("email")}
                      />
                    </div>
                  </div>

                  {/* Reason for contact */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-[0.14em] text-black/60 mb-2">
                      Reason for Contacting Us <span className="text-secondary">*</span>
                    </label>
                    <select className="contact-input-field" required {...field("iAm")}>
                      <option value="">Select a reason</option>
                      <option>Property owner exploring management services</option>
                      <option>Current owner with a question</option>
                      <option>Current tenant</option>
                      <option>Vacation rental guest</option>
                      <option>HOA board inquiry</option>
                      <option>Commercial property inquiry</option>
                      <option>Repairs, maintenance, or renovation</option>
                      <option>Vendor / service provider</option>
                      <option>Job applicant</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Property Location */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-[0.14em] text-black/60 mb-2">
                      Property Location
                    </label>
                    <select className="contact-input-field" {...field("location")}>
                      <option value="">Select a market</option>
                      <option value="Cincinnati">Cincinnati, OH</option>
                      <option value="Dayton">Dayton, OH</option>
                      <option value="Tennessee">Tennessee</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-[0.14em] text-black/60 mb-2">
                      Message <span className="text-secondary">*</span>
                    </label>
                    <textarea
                      className="contact-input-field"
                      placeholder="Tell us about your property or question..."
                      rows={5}
                      required
                      {...(field("message") as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-black/40 font-sans leading-relaxed">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy-policy" className="link-text">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-solid-secondary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? "Sending…" : "Send Message"}
                    </button>
                  </div>
                  {submitError && (
                    <p className="text-sm font-sans text-red-600 mt-2" role="alert">
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Section 1: How Can We Help You ── */}
        <section className="py-16 md:py-20 px-5 xl:px-0">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-cowling font-bold uppercase text-[28px] md:text-[36px] leading-none text-black mb-4">
                How Can We Help You?
              </h2>
              <p className="font-sans text-black/60 text-base max-w-xl mx-auto leading-relaxed">
                Choose your path below to reach the right team or resource.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {AUDIENCE_CARDS.map((card) => (
                <AudienceCard key={card.label} card={card} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Schedule a Free Consultation ── */}
        <section id="consultation" className="py-16 md:py-20 bg-[#121212] px-5 xl:px-0">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-cowling font-bold uppercase text-[28px] md:text-[36px] leading-none text-white mb-6">
                Schedule a Free Consultation
              </h2>
              <p className="font-sans text-white/70 text-base leading-relaxed mb-10">
                In 30 minutes, we'll learn about your property, walk you through our management approach, and give you a transparent breakdown of pricing and services — no obligation.
              </p>
              <a
                href="https://calendly.com/et-mark-t"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid-secondary inline-flex items-center gap-2"
              >
                Schedule Your Free Consultation
                <ArrowRight size={16} weight="thin" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Section 3: Our Offices ── */}
        <section className="py-16 md:py-20 px-5 xl:px-0">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-cowling font-bold uppercase text-[28px] md:text-[36px] leading-none text-black mb-4">
                Our Offices
              </h2>
              <p className="font-sans text-black/60 text-base max-w-xl mx-auto leading-relaxed">
                We serve Greater Cincinnati and Norris Lake, Tennessee.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {OFFICE_BLOCKS.map((block) => (
                <OfficeBlock key={block.city} block={block} />
              ))}
            </div>
          </div>
        </section>


        {/* ── Section 5: FAQs ── */}
        <section className="py-16 md:py-20 px-5 xl:px-0">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-cowling font-bold uppercase text-[28px] md:text-[36px] leading-none text-black mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <FaqAccordion items={CONTACT_FAQS} variant="light" />
            </div>
          </div>
        </section>

        {/* ── Section 6: Emergency Maintenance ── */}
        <section className="py-10 bg-[#fff8ed] border-y border-secondary/30 px-5 xl:px-0">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <Warning size={32} weight="thin" style={{ color: GOLD }} className="flex-shrink-0" />
              <div>
                <h2 className="font-sans font-bold text-base uppercase tracking-[0.12em] text-black mb-1">
                  Emergency Maintenance — Current Tenants
                </h2>
                <p className="font-sans text-black/60 text-sm leading-relaxed">
                  Experiencing a maintenance emergency? Call our 24/7 emergency line at{" "}
                  <a href="tel:+15134444010" className="link-text font-semibold">(513) 444-4010</a>{" "}
                  or submit a request through the{" "}
                  <Link href="/tenant-portal" className="link-text">tenant portal</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 7: Internal Linking ── */}
        <section className="py-16 md:py-20 bg-[#121212] px-5 xl:px-0">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-cowling font-bold uppercase text-[28px] md:text-[36px] leading-none text-white mb-4">
                Looking for a Specific Service?
              </h2>
              <p className="font-sans text-white/60 text-base max-w-xl mx-auto leading-relaxed">
                Explore our full range of property management services across Ohio and Tennessee.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group border border-white/20 hover:border-secondary transition-colors duration-200 p-6 flex items-center justify-between"
                >
                  <span className="font-sans font-semibold text-sm uppercase tracking-[0.08em] text-white group-hover:text-secondary transition-colors duration-200">
                    {item.label}
                  </span>
                  <ArrowRight size={16} weight="thin" style={{ color: GOLD }} className="flex-shrink-0 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </PageLayout>
  );
}
