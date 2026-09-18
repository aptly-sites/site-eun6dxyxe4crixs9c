import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { Buildings, Key, ChartLineUp, HouseLine } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SITE_URL } from "@/lib/siteUrl";
import { buildLocationUrl } from "@/data/locationRegistry";

const GOLD = "#B4975A";
const BASE = import.meta.env.BASE_URL;

/* ── Star rating ── */
function Stars({ count = 5 }: { count?: number }) {
  return (
    <ul className="mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="star !mr-1" />
      ))}
    </ul>
  );
}

/* ── Vintage separator ── */
function VintageSeparator({ className = "" }: { className?: string }) {
  return <div className={`vintage-separator mb-5 mx-auto ${className}`} />;
}

const cincinnatiAreas = [
  "Amberley Village", "Anderson Township", "Blue Ash", "Camp Washington",
  "Cincinnati", "Clifton", "College Hill", "Columbia-Tusculum", "Covedale",
  "Deer Park", "Delhi", "Downtown", "East Walnut Hills", "Evanston",
  "Forest Park", "Green Township", "Hamilton", "Harrison", "Hyde Park",
  "Indian Hill", "Kennedy Heights", "Kenwood", "Lebanon", "Liberty Township",
  "Loveland", "Madeira", "Madisonville", "Mariemont", "Mason", "Middletown",
  "Milford", "Monfort Heights", "Montgomery", "Mount Auburn", "Mount Healthy",
  "Mount Lookout", "Mount Washington", "Mt. Adams", "Northside", "Norwood",
  "Oakley", "Over-the-Rhine", "Pleasant Ridge", "Sayler Park", "Sharonville",
  "Springdale", "Sycamore", "Terrace Park", "Walnut Hills", "West Chester",
  "Western Hills", "Westwood", "White Oak", "Winton Place", "Wyoming",
];

const daytonAreas = [
  "Beavercreek", "Centerville", "Clayton", "Dayton", "Eaton", "Englewood",
  "Fairborn", "Franklin", "Germantown", "Greenville", "Harrison Township",
  "Huber Heights", "Kettering", "Miami Township", "Miamisburg", "Oakwood",
  "Piqua", "Riverside", "Springboro", "Sugarcreek Township",
  "Tipp City", "Trotwood", "Troy", "Union", "Vandalia", "Washington Township",
  "Waynesville", "West Carrollton", "Xenia", "Yellow Springs",
];

const homepageFaqs = [
  {
    question: "What does EquityTeam do?",
    answer: "EquityTeam is a full-service property management and property services company. We manage residential rentals, vacation rentals, shared living properties, HOAs, and commercial properties — and provide professional property services for all property types. One company, one standard, across every market and property type we serve.",
  },
  {
    question: "What types of properties does EquityTeam manage?",
    answer: "EquityTeam manages single-family homes, multi-family buildings, vacation rentals, shared living properties, HOAs, and commercial properties. We also offer Home Property Services for homeowners who want a trusted team to care for their property. If you own it, we can manage it.",
  },
  {
    question: "Where does EquityTeam operate?",
    answer: "EquityTeam currently serves Greater Cincinnati and Dayton, Ohio for residential, shared living, HOA, and commercial management, and Norris Lake, Tennessee for vacation rental management. We are actively expanding into new markets.",
  },
  {
    question: "How much does property management cost?",
    answer: "Our fees vary by service line and property type, and are always published transparently — no hidden fees. Full pricing for each service is available on the respective service page. Every service line has its own fee structure built around what that property type actually requires.",
  },
  {
    question: "What makes EquityTeam different?",
    answer: "Most property managers do one thing in one market. EquityTeam manages across every major property type under one professional platform — with a dedicated team for every owner, real performance guarantees, and a standard that doesn't change based on property size or type. No long-term contract required.",
  },
  {
    question: "How do I get started?",
    answer: "Contact us and tell us about your property. We'll match you to the right service line, walk you through pricing and expectations, and get you onboarded — typically within days. We offer a 90-day risk-free guarantee on all new management agreements.",
  },
];

const testimonials = [
  {
    name: "Ida G.", stars: 5,
    text: "Very reliable, responsive, transparent, and professional. I simply could not ask for more. Maintenance is great, reports are thorough and on time. I have had previous experience with another management company and the difference is night and day. I have also recommended EquityTeam to many other friends and owners who are very happy with their choice to work with ET. Start with the customer – find out what they want and give it to them."
  },
  {
    name: "Mike M.", stars: 5,
    text: "I had a property I couldn't sell and 'tried' to be a landlord. I wish I would have turned the property over to the EquityTeam years ago. They are professional, honest, and quick to answer any questions you have. It was hard for me to turn such a big investment over to someone else, but they have done a wonderful job with my property. They found me a great tenant in 7 days after listing it! The burden off of me allows me to focus on my family, and I feel confident that my property is in good hands."
  },
  {
    name: "Doug Z.", stars: 5,
    text: "I tried unsuccessfully renting my property from afar. I contacted 3 different property managers and I NAILED IT. They have a thorough process and solid resources for repairs/remodel/touch-ups. My duplex needed some serious rehab and turned out far better than I thought, and got a tenant for better value than I anticipated. I like details and good communication (and good tenants) – I got that with EquityTeam."
  },
  {
    name: "Esteban M.", stars: 5,
    text: "I am incredibly grateful for the exceptional service provided by John Walko from Equity Team. They went above and beyond to share real estate insights and recommendations, ensuring I made informed decisions. Beyond investment advice, John has also provided exceptional property management services. They have been attentive, responsive, and proactive in addressing any issues that have arisen."
  },
  {
    name: "Colby", stars: 5,
    text: "Been using Equity Team for a couple of years to manage two of my properties. Compared to other companies I've used previously, they are very professional and strive to not only provide the tenant with a great home but also the owners with great tenants."
  },
  {
    name: "James S.", stars: 5,
    text: "In first vetting property management teams, Equity Team had presented itself head and shoulders above everyone else. John is committed in protecting my investment. He's such a nice guy, and always makes time for me. No regrets at all going with him. Thank you, John."
  },
  {
    name: "Dave B.", stars: 5,
    text: "EquityTeam has managed my property for over a decade. The property has been vacant for less than a month in that time, which is outstanding. They do a great job of managing the tenant relationship while also taking great care of my property. A good property management company is really necessary to drive maximum value from a rental property, and ET is one of the best in the area."
  },
];

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Origin OWL Carousel responsive: 0→1 item, 768→2 items, 1240→3 items
  const calcPerPage = () => window.innerWidth >= 1240 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    setPerPage(calcPerPage());
    const onResize = () => {
      const next = calcPerPage();
      setPerPage(prev => {
        if (prev !== next) setSlideIndex(i => Math.min(i, testimonials.length - next));
        return next;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxSlide = testimonials.length - perPage;
  const itemPct = 100 / perPage;

  // Auto-rotate testimonials every 6s; pause on hover
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused || maxSlide <= 0) return;
    const id = window.setInterval(() => {
      setSlideIndex(i => (i >= maxSlide ? 0 : i + 1));
    }, 6000);
    return () => window.clearInterval(id);
  }, [isPaused, maxSlide]);

  const partnerLogos: { src: string; alt: string; height: number; rating?: string }[] = [
    { src: `${import.meta.env.BASE_URL}images/badges/narpm.png`, alt: "National Association of REALTORS® member", height: 44 },
    { src: `${import.meta.env.BASE_URL}images/badges/ohio-realtors.png`, alt: "Ohio REALTORS association member", height: 56 },
    { src: `${import.meta.env.BASE_URL}images/badges/bbb.png`, alt: "NARPM — National Association of Residential Property Managers member", height: 80 },
    { src: `${import.meta.env.BASE_URL}images/badges/oh-best-pm-2025.png`, alt: "Ohio Best Property Management Company 2025 award", height: 100 },
    { src: `${import.meta.env.BASE_URL}images/badges/home-depot-pro.png`, alt: "Home Depot Pro partner", height: 50 },
    { src: `${import.meta.env.BASE_URL}images/badges/lowes-pro.png`, alt: "Lowe's Pro partner", height: 62 },
    { src: `${import.meta.env.BASE_URL}images/badges/google-reviews.png`, alt: "Google Reviews — verified client ratings for EquityTeam Property Management", height: 44, rating: "4.3" },
  ];

  return (
    <PageLayout>
      <SEO
        title="Property Management in Cincinnati & Dayton, Ohio | EquityTeam"
        description="Top-rated property management in Cincinnati &amp; Dayton since 2008 — residential, multi-family &amp; vacation rentals, backed by a 21-day lease guarantee."
        canonical="/"
        ogImage={`${SITE_URL}/images/property-management.jpg`}
        speakableSelectors={["h1", "#home-introduction"]}
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "RealEstateAgent"],
            "@id": `${SITE_URL}/#organization`,
            "name": "EquityTeam Property Management",
            "alternateName": "EquityTeam",
            "foundingDate": "2008",
            "description": "Ohio's highest-rated residential property management company. Serving Greater Cincinnati and Dayton since 2008.",
            "telephone": "+15134444010",
            "url": SITE_URL,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "11427 Reed Hartman Hwy",
              "addressLocality": "Cincinnati",
              "addressRegion": "OH",
              "postalCode": "45241",
              "addressCountry": "US",
            },
            "areaServed": [
              { "@type": "City", "name": "Cincinnati", "sameAs": "https://en.wikipedia.org/wiki/Cincinnati" },
              { "@type": "City", "name": "Dayton", "sameAs": "https://en.wikipedia.org/wiki/Dayton,_Ohio" },
            ],
            "sameAs": [
              "https://www.facebook.com/equityteam",
              "https://www.linkedin.com/company/equityteam",
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.3",
              "reviewCount": "200",
              "bestRating": "5",
            },
            "review": testimonials.map(t => ({
              "@type": "Review",
              "author": { "@type": "Person", "name": t.name },
              "reviewRating": { "@type": "Rating", "ratingValue": t.stars, "bestRating": 5 },
              "reviewBody": t.text,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": homepageFaqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            "name": "EquityTeam Property Management",
            "url": SITE_URL,
            "publisher": { "@id": `${SITE_URL}/#organization` },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${SITE_URL}/for-rent?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      {/* ══════════════════════════════════════
          1. HERO
          ══════════════════════════════════════ */}
      <section className="relative z-10 pt-36 md:pt-56 md:overflow-hidden min-h-screen flex flex-col justify-between">
        {/* background: art-directed Cincinnati home still — bottom gradient only, no flat scrim */}
        <div className="absolute inset-0">
          <img
            src={`${BASE}images/home-hero-bg.jpg`}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-bottom"
          />
          {/* bottom-up gradient: transparent → onyx, darkens only the lower third where text/stats sit */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-[#121212]/40 to-[#121212]/10" />
        </div>

        {/* hero text — centered. Single H1 holds the full keyword phrase
            ("Expert Property Management in Cincinnati & Dayton, Ohio")
            with nested spans preserving the original three-line visual treatment. */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 text-center w-full">
          <h1 className="text-white mb-0">
            <span
              className="block font-sans font-semibold text-base leading-tight tracking-[0.3em] text-white mb-3 mx-auto uppercase"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.55)' }}
            >
              Expert
            </span>
            <span
              className="block uppercase font-cowling font-bold leading-none text-white mb-4 text-[44px] md:text-[72px] md:max-w-[960px] mx-auto"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}
            >
              Property Management
            </span>
            <span
              className="block font-marseille text-white text-[18px] md:text-[22px] tracking-[0.06em] normal-case font-normal mb-4"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}
            >
              and
            </span>
            <span
              className="block uppercase font-cowling font-bold leading-none text-white mb-6 text-[44px] md:text-[72px] md:max-w-[960px] mx-auto"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}
            >
              Property Services
            </span>
            <span
              className="block font-marseille text-white text-[20px] md:text-[24px] tracking-[0.06em] normal-case font-normal"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}
            >
              <span className="sr-only">in </span>Cincinnati &amp; Dayton, Ohio | Norris Lake, Tennessee
            </span>
          </h1>
          <div className="mt-4" aria-hidden="true" />
          <blockquote
            className="text-white font-display font-normal italic text-[24px] md:text-[32px] leading-snug md:max-w-screen-md mx-auto border-l-0 pl-0"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}
          >
            &ldquo;We&rsquo;ll treat your property like it&rsquo;s our own.&rdquo;
          </blockquote>
        </div>

        {/* Stats inside hero — gradient overlay */}
        <div className="overlay-gradient pb-8 md:pb-10 pt-8 md:pt-14 px-5 xl:px-0 z-10 relative">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="md:flex md:justify-between gap-16">
              {[
                { label: "Since", value: "2008" },
                { label: "Transactions", value: "3000+" },
                { label: "Customer Satisfaction", value: "98%" },
                { label: "Assets Managed", value: "$100M+" },
              ].map((stat, i) => (
                <div key={i} className="text-center mb-10 md:mb-0 last:mb-0">
                  <span className="block font-sans font-bold text-base leading-tight tracking-[0.18em] text-white uppercase mb-4">
                    {stat.label}
                  </span>
                  <span
                    className="block font-cowling font-bold text-[40px] md:text-[56px] leading-none text-secondary"
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. PARTNER LOGOS (trust banner)
          (moved directly under hero to reinforce credibility
          before any service messaging)
          ══════════════════════════════════════ */}
      <section id="trust-bar" className="py-10 md:py-12 px-5 xl:px-0 bg-white" style={{ scrollMarginTop: 120 }}>
        <div className="max-w-screen-2xl mx-auto px-[20px] md:px-0">
          <div className="w-full flex flex-row flex-wrap justify-center gap-y-12 md:gap-2 items-center">
            {partnerLogos.map((logo, i) => (
              <div key={i} className="max-h-[100px] h-full px-6 flex flex-col justify-center items-center gap-1">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: logo.height, width: "auto", maxHeight: logo.height, filter: "brightness(0)" }}
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
          3. COMPANY SUMMARY STRIP
          (white breakpoint between trust band and dark services band;
          carries the entity-definition sentence AI/answer engines quote
          when summarizing the brand — kept deliberately tight, single
          sentence, no sales language; deeper E-E-A-T prose lives in the
          About section lower on the page)
          ══════════════════════════════════════ */}
      <section className="bg-primary pt-10 pb-10 md:pt-14 md:pb-14 px-5">
        <div className="max-w-5xl mx-auto text-center">
          <p id="home-introduction" className="font-display text-white text-[22px] md:text-[26px] leading-snug">
            EquityTeam is a full-service property management and property services company. Whatever your property type — residential, commercial, vacation rental, or HOA — we manage and care for it with a dedicated team focused on protecting your asset as if it were our own.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. PROPERTY MANAGEMENT
          ══════════════════════════════════════ */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white">
        {/* PM block */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2">
          {/* Left: text (order-1 desktop) */}
          <div className="w-full lg:max-w-[604px] pt-11 md:pt-0 justify-self-center flex order-2 md:order-1 lg:justify-self-start pl-12 pr-12 md:pl-26 md:pr-18">
            <div className="w-full lg:max-w-[530px]">
              <h2 className="section-heading text-black mb-8 md:mb-10">
                Property Management
              </h2>
              <div className="text-black mb-8 space-y-4">
                <p>EquityTeam delivers professional property management — from long-term residential rentals in Cincinnati and Dayton to short-term vacation rentals at Norris Lake, Tennessee (via Deerfield Vacation Rentals).</p>
                <p>Whatever the property type, we bring the same standard: transparency, integrity, and owner-aligned management focused on protecting your investment and maximizing your return.</p>
              </div>

              <ul className="space-y-3 list-none">
                <li>
                  <Link href="/residential-property-management" className="cta-secondary">
                    Residential Property Management <span className="cta-arrow">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/commercial-property-management" className="cta-secondary">
                    Commercial Property Management <span className="cta-arrow">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/vacation-rental-management" className="cta-secondary">
                    Vacation Rental Management <span className="cta-arrow">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/hoa-management" className="cta-secondary">
                    HOA Management <span className="cta-arrow">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Right: image (order-2 desktop) */}
          <div className="w-full md:max-w-[720px] mt-20 md:mt-0 order-1 md:order-2 justify-self-end">
            <img
              src={`${BASE}images/property-management.jpg`}
              alt="Licensed EquityTeam property manager walking up to a brick Cincinnati two-story home with a clipboard at golden hour"
              className="w-full max-w-[720px] mx-auto md:ml-auto aspect-[4/3] object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. PROPERTY SERVICES
          ══════════════════════════════════════ */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2">
          {/* Left: text with TR corner border (order-2 on desktop) */}
          <div className="w-full lg:max-w-[604px] pt-11 md:pt-0 justify-self-center flex order-1 md:order-2 lg:justify-self-start pl-12 pr-12 md:pl-26 md:pr-18">
            <div className="w-full lg:max-w-[530px]">
              <h2 className="section-heading text-black mb-8 md:mb-15">
                Property Services
              </h2>
              <div className="text-black">
                <p>EquityTeam's Property Services team handles everything your property needs — so you never have to hassle with contractors yourself.</p>
                <p>Our Property Service Managers provide expert oversight on every repair and project, with one priority: what's best for your property. Backed by skilled in-house craftsmen and a carefully vetted vendor network, we bring the right expertise to every job — from routine maintenance and seasonal upkeep to emergency repairs, turnovers, inspections, and full renovations.</p>
              </div>
              <ul className="space-y-3 list-none mt-8 relative z-10">
                <li>
                  <Link href="/property-services" className="cta-secondary">
                    Learn More About Property Services <span className="cta-arrow">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/vendors" className="cta-secondary">
                    Vendors: Become a Preferred Vendor Partner <span className="cta-arrow">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Right: image (order-1 on desktop) */}
          <div className="w-full md:max-w-[720px] mt-20 md:mt-0 order-2 md:order-1 justify-self-end">
            <img
              src={`${BASE}images/property-services.jpg`}
              alt="EquityTeam property service manager smiling and speaking with a homeowner while a maintenance worker repairs the exterior of the home in the background"
              className="w-full max-w-[720px] mx-auto md:ml-auto aspect-[4/3] object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. PROPERTIES
          (last of the three service blocks; renter / guest audience)
          ══════════════════════════════════════ */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-2">
          {/* Left: text (order-1 desktop) — continues alternating pattern */}
          <div className="w-full lg:max-w-[604px] pt-11 md:pt-0 justify-self-center flex order-2 md:order-1 lg:justify-self-start pl-12 pr-12 md:pl-26 md:pr-18">
            <div className="w-full lg:max-w-[530px]">
              <h2 className="section-heading text-black mb-8 md:mb-10">
                Properties
              </h2>
              <div className="text-black mb-8">
                <p>Whether you're looking for a place to call home, a lakeside getaway, or your next investment opportunity — EquityTeam has a property for you.</p>
                <p>Browse homes and apartments for rent in Cincinnati and Dayton, Ohio, vacation rentals at Norris Lake in Tennessee (via Deerfield Vacation Rentals), and investment properties available for acquisition. Every EquityTeam property is competitively priced according to current market conditions.</p>
              </div>

              <ul className="space-y-3 list-none">
                <li>
                  <Link href="/search-rentals" className="cta-secondary">
                    Properties for Rent in Cincinnati and Dayton, Ohio <span className="cta-arrow">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/vacation-rental-management" className="cta-secondary">
                    Vacation Rentals at Norris Lake, TN (via Deerfield Vacation Rentals) <span className="cta-arrow">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Right: image (order-2 desktop) */}
          <div className="w-full md:max-w-[720px] mt-20 md:mt-0 order-1 md:order-2 justify-self-end">
            <img
              src={`${BASE}images/find-a-rental.jpg`}
              alt="Smiling young couple standing on the front porch of an EquityTeam rental property in Cincinnati, Ohio"
              className="w-full max-w-[720px] mx-auto md:ml-auto aspect-[4/3] object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. TESTIMONIALS
          ══════════════════════════════════════ */}
      <section id="testimonials" className="relative pt-16 md:pt-20 pb-16 md:pb-20 bg-primary" aria-label="Client testimonials">
        <div className="max-w-screen-xl mx-auto text-center px-5">
          <h2
            className="section-heading font-normal text-[40px] md:text-5xl leading-normal text-white mb-15"
          >
            What Our Clients Are Saying
          </h2>
        </div>

        <div
          className="max-w-screen-xl text-center mx-auto relative px-5 xl:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials, auto-rotating every 6 seconds"
        >
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex items-start transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${slideIndex * itemPct}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-shrink-0 px-[10px]" style={{ width: `${itemPct}%` }}>
                    <div
                      className="px-6 py-[40px] text-center"
                      style={{ border: "1px solid #B4975A" }}
                    >
                      <Stars count={t.stars} />
                      <p className="font-sans font-normal text-base leading-normal text-white my-[20px]">"{t.text}"</p>
                      <p className="font-sans font-bold text-2xl leading-normal text-white mb-0">{t.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center mt-16 md:mt-18 gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(Math.min(i, maxSlide))}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 0,
                    border: "none",
                    padding: 0,
                    margin: "0 1rem",
                    cursor: "pointer",
                    backgroundColor: i === slideIndex ? GOLD : "rgba(255,255,255,0.3)",
                    transition: "background-color 0.2s",
                  }}
                  aria-label={`Go to testimonial ${i + 1} of ${testimonials.length}`}
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-3 sm:gap-8">
              <button
                onClick={() => setIsPaused(p => !p)}
                aria-label={isPaused ? "Resume testimonial rotation" : "Pause testimonial rotation"}
                aria-pressed={isPaused}
                className="font-sans font-semibold text-base tracking-[0.18em] uppercase text-white/60 hover:text-secondary transition-colors px-3 py-2"
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
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. CTA — Schedule a Call
          ══════════════════════════════════════ */}
      <GoldBorderCTA title="Let's talk about your property" btnLabel="Schedule a Consult" btnHref="/contact-us" variant="light" />

      {/* ══════════════════════════════════════
          10. BLOG
          ══════════════════════════════════════ */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-primary text-center">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0">
          <h2 className="font-display font-normal text-[40px] md:text-5xl leading-none text-white mb-12">
            Property Management Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 text-left">
            {[
              {
                title: "How to Avoid Water Damage in Your Rental Property",
                img: `${import.meta.env.BASE_URL}images/general/maintenance-gutter.png`,
                href: "/blog/water-damage",
              },
              {
                title: "How to Keep Renters Happy",
                img: `${import.meta.env.BASE_URL}images/general/consulting-office.png`,
                href: "/blog/keeping-tenants-happy",
              },
              {
                title: "Top 8 Amenities Renters Can't Resist in Cincinnati, Ohio",
                img: `${import.meta.env.BASE_URL}images/general/living-room.jpg`,
                href: "/blog/rental-amenities",
              },
            ].map((post, i) => (
              <Link key={i} href={post.href} className="group block border border-white/15 hover:border-secondary transition-colors duration-200">
                <div className="aspect-video w-full overflow-hidden bg-white/5">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-normal text-[22px] leading-snug text-white mb-4">
                    {post.title}
                  </h3>
                  <span className="cta-secondary">Read more <span className="cta-arrow">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          10.5 FAQ — homepage-level company questions
          (service-specific FAQs live on each service page)
          ══════════════════════════════════════ */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white" aria-label="Frequently asked questions">
        <div className="max-w-screen-md mx-auto px-5 xl:px-0">
          <h2 className="section-heading text-black text-center mb-12 md:mb-16">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={homepageFaqs} variant="light" />
          <div className="text-center mt-12">
            <Link href="/faq" className="cta-secondary">
              See All FAQs <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          11. ABOUT EQUITYTEAM
          ══════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Text */}
          <div className="flex flex-col justify-center px-5 md:px-12 lg:px-16">
            <h2 className="section-heading text-white mb-6">
              About EquityTeam
            </h2>
            <p className="font-sans text-base text-white/80 leading-relaxed mb-5">
              EquityTeam is a full-service property management and property services company — managing residential, vacation rental, shared living, HOA, and commercial properties across Greater Cincinnati, Dayton, and Norris Lake, Tennessee (via Deerfield Vacation Rentals).
            </p>
            <p className="font-sans text-base text-white/80 leading-relaxed">
              We help people and properties prosper — whether you're an owner, resident, guest, or vendor, we're focused on a long-term relationship where everyone wins.
            </p>
          </div>

          {/* Google Maps — zoomed to show interstates; lazy-loaded */}
          <div className="w-full h-[380px] lg:h-auto min-h-[380px]">
            <iframe
              src="https://maps.google.com/maps?q=EquityTeam+11427+Reed+Hartman+Hwy+Cincinnati+OH&t=&z=11&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "380px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EquityTeam Cincinnati Office Location — 11427 Reed Hartman Hwy, Cincinnati, OH 45241"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          12. CINCINNATI & DAYTON OFFICES
          (single white section, two grids — anchors the page above the footer)
          ══════════════════════════════════════ */}
      <section id="offices" className="pt-16 md:pt-20 pb-16 md:pb-20 bg-white justify-center">
        {/* Cincinnati grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 px-0">
          {/* Left: text */}
          <div className="mx-5 lg:mx-0 w-full lg:max-w-[604px] pt-11 lg:pt-15 justify-self-center flex order-1 lg:justify-self-end px-8 lg:pl-18 lg:pr-0">
            <div className="w-full lg:max-w-[530px] pl-5 lg:pl-0">
              <h2 className="section-heading text-black mb-6 lg:mb-8">
                Greater Cincinnati
              </h2>
              <p className="text-black/70 font-sans text-base leading-relaxed mb-8 lg:mb-10">
                From Hyde Park, Oakley, and Mount Lookout to Clifton, Norwood, and Over-the-Rhine, our Cincinnati office manages residential rentals across Greater Cincinnati neighborhoods.
              </p>
              <ul className="text-black list-none p-0 m-0">
                {cincinnatiAreas.map((name) => (
                  <li key={name} className="inline-block">
                    <Link
                      href={buildLocationUrl(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}
                      className="px-4 py-3 border-1 border-transparent font-medium text-base leading-tight tracking-[0.08em] text-black inline-block uppercase hover:border-[#B4975A] transition-all duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right: image */}
          <div className="w-full lg:max-w-[720px] mt-20 lg:mt-0 order-2 pl-0 lg:pl-22">
            <img
              src={`${BASE}images/cincinnati-skyline.jpg`}
              alt="Cincinnati, Ohio downtown skyline at dusk reflecting in the Ohio River, with the John A. Roebling Suspension Bridge illuminated in the foreground"
              className="w-full h-full object-cover lg:mb-0"
            />
          </div>
        </div>

        {/* Dayton grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-15 lg:mt-25">
          {/* Left: text (order-2 on desktop) */}
          <div className="mx-5 lg:mx-0 w-full lg:max-w-[604px] pt-11 lg:pt-15 justify-self-center flex order-1 lg:order-2 lg:justify-self-start pl-12 pr-12 lg:pl-26 lg:pr-18">
            <div className="w-full lg:max-w-[530px] pl-5 lg:pl-0">
              <h2 className="section-heading text-black mb-6 lg:mb-8">
                Greater Dayton
              </h2>
              <p className="text-black/70 font-sans text-base leading-relaxed mb-8 lg:mb-10">
                From Centerville, Kettering, and Beavercreek to Oakwood, Springboro, and Huber Heights, our Dayton office serves owners and residents across Greater Dayton communities.
              </p>
              <ul className="text-black list-none p-0 m-0">
                {daytonAreas.map((name) => (
                  <li key={name} className="inline-block">
                    <Link
                      href={buildLocationUrl(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}
                      className="px-4 py-3 border-1 border-transparent font-medium text-base leading-tight tracking-[0.08em] text-black inline-block uppercase hover:border-[#B4975A] transition-all duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Left: image (order-1 on desktop) */}
          <div className="w-full lg:max-w-[720px] mt-20 lg:mt-0 order-2 lg:order-1 justify-self-end">
            <img
              src={`${BASE}images/dayton-skyline.jpg`}
              alt="Dayton, Ohio skyline at sunset"
              className="w-full h-full object-cover lg:mb-0"
            />
          </div>
        </div>

        {/* ── DVR Callout Banner ── */}
        {/* Norris Lake grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-15 lg:mt-25">
          {/* Left: text */}
          <div className="mx-5 lg:mx-0 w-full lg:max-w-[604px] pt-11 lg:pt-15 justify-self-center flex order-1 lg:justify-self-end px-8 lg:pl-18 lg:pr-0">
            <div className="w-full lg:max-w-[530px] pl-5 lg:pl-0">
              <h2 className="section-heading text-black mb-6 lg:mb-8">
                Norris Lake, Tennessee
              </h2>
              <p className="text-black/70 font-sans text-base leading-relaxed mb-8 lg:mb-10">
                Our Tennessee vacation rental operations are run under our sub-brand, Deerfield Vacation Rentals — a dedicated vacation rental management company serving owners around Deerfield Resort and the northern Norris Lake communities.
              </p>
              <ul className="text-black list-none p-0 m-0 mb-8">
                {["Alder Springs", "Big Creek", "Deerfield Resort", "Lakeside Estates", "Shanghai", "Springs Dock", "Sugar Hollow", "The Peninsula"].map((name) => (
                  <li key={name} className="inline-block">
                    <span className="px-4 py-3 border-1 border-transparent font-medium text-base leading-tight tracking-[0.08em] text-black inline-block uppercase">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="https://deerfieldvacationrentals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans font-semibold text-[13px] tracking-[0.14em] uppercase text-primary bg-secondary px-7 py-3 hover:opacity-90 transition"
              >
                Visit deerfieldvacationrentals.com
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M1 12L12 1M12 1H4.5M12 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
          {/* Right: image */}
          <div className="w-full lg:max-w-[720px] mt-20 lg:mt-0 order-2 pl-0 lg:pl-22">
            <img
              src={`${BASE}images/norris-lake.jpg`}
              alt="Norris Lake, Tennessee"
              className="w-full h-full object-cover lg:mb-0"
            />
          </div>
        </div>
      </section>


    </PageLayout>
  );
}
