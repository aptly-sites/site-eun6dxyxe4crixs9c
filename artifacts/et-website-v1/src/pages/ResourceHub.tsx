import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";
import { getResourceHub } from "@/data/resourceHubs";
import { FaqAccordion } from "@/components/FaqAccordion";
import NotFound from "@/pages/not-found";

const ArrowExternal = () => (
  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="inline-block ml-1 -translate-y-px">
    <path d="M1 12L12 1M12 1H4.5M12 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ResourceHub({ slug }: { slug: string }) {
  const hub = getResourceHub(slug);
  if (!hub) return <NotFound />;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.pageTitle,
    description: hub.seoDescription,
    url: `${SITE_URL}/resources/${hub.slug}`,
    isPartOf: { "@type": "WebSite", name: "EquityTeam", url: SITE_URL },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Resources", item: `${SITE_URL}/resources` },
        { "@type": "ListItem", position: 2, name: hub.title, item: `${SITE_URL}/resources/${hub.slug}` },
      ],
    },
  };

  const faqSchema =
    hub.faqs && hub.faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hub.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <PageLayout>
      <SEO
        title={hub.seoTitle}
        description={hub.seoDescription}
        canonical={`/resources/${hub.slug}`}
        schemas={faqSchema ? [schema, faqSchema] : [schema]}
      />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20 px-5">
        <div className="max-w-screen-md mx-auto text-center">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] md:max-w-[960px] mx-auto">{hub.pageTitle}</h1>
          <p className="font-sans text-lg text-white/75 leading-relaxed">{hub.intro}</p>
        </div>
      </section>

      {/* Sections of links */}
      <section className="bg-white section-pad">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {hub.sections.map((section) => (
            <div key={section.heading} className="border border-black/15 p-7">
              <h2 className="font-sans font-bold text-base uppercase tracking-[0.08em] text-secondary mb-4">{section.heading}</h2>
              <ul className="list-none p-0 m-0 space-y-2.5">
                {section.links.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-2 font-sans text-base text-black hover:text-secondary transition-colors">
                        <span className="border-b border-transparent group-hover:border-secondary">{link.label}</span>
                        <ArrowExternal />
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link href={link.href} className="group flex items-baseline gap-2 font-sans text-base text-black hover:text-secondary transition-colors">
                        <span className="border-b border-transparent group-hover:border-secondary">{link.label}</span>
                        <span aria-hidden="true" className="text-secondary">→</span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center font-sans text-base text-black/45 mt-12 max-w-xl mx-auto">
          More resources on the way — calculators, step-by-step tutorials, terms &amp; documents, and answers to your questions.
        </p>
      </section>

      {hub.faqs && hub.faqs.length > 0 && (
        <section id="faq" className="bg-primary section-pad" aria-label="Frequently asked questions">
          <div className="max-w-screen-md mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="section-heading text-white">{hub.title} FAQ</h2>
            </div>
            <FaqAccordion items={hub.faqs} variant="dark" />
          </div>
        </section>
      )}

      <GoldBorderCTA
        title="Can't find what you need?"
        btnLabel="Contact Us"
        btnHref="/contact-us"
        subtitle="Our team is here to help — Greater Cincinnati &amp; Dayton"
      />
    </PageLayout>
  );
}
