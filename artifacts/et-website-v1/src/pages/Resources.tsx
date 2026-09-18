import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { GoldBorderCTA } from "@/components/GoldBorderCTA";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/siteUrl";
import { RESOURCE_HUBS, GROUP_LABELS, type ResourceGroup } from "@/data/resourceHubs";

const PARTNER_HEADING = "More";
const PARTNER_LINKS = [
  { label: "Vendors", href: "/vendors" },
  { label: "Realtors", href: "/realtor-referral-program" },
  { label: "Blog", href: "/blog" },
];

const GROUP_ORDER: ResourceGroup[] = ["owners", "residents"];

interface SearchEntry { label: string; href: string; context: string; external?: boolean }

function buildIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  const seen = new Set<string>();
  const add = (e: SearchEntry) => {
    const k = `${e.label}|${e.href}`;
    if (!seen.has(k)) { seen.add(k); out.push(e); }
  };
  for (const hub of RESOURCE_HUBS) {
    add({ label: hub.title, href: `/resources/${hub.slug}`, context: GROUP_LABELS[hub.group] });
    for (const s of hub.sections) for (const l of s.links) add({ label: l.label, href: l.href, context: hub.title, external: l.external });
    if (hub.faqs) for (const f of hub.faqs) add({ label: f.question, href: `/resources/${hub.slug}#faq`, context: `${hub.title} · FAQ` });
  }
  for (const p of PARTNER_LINKS) add({ label: p.label, href: p.href, context: PARTNER_HEADING });
  return out;
}

const Arrow = () => <span aria-hidden="true" className="text-secondary">→</span>;

export default function Resources() {
  const [q, setQ] = useState("");
  const index = useMemo(buildIndex, []);
  const query = q.trim().toLowerCase();
  const results = query
    ? index.filter((e) => e.label.toLowerCase().includes(query) || e.context.toLowerCase().includes(query))
    : [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Resource Center",
    description: "EquityTeam's Resource Center — resources, portals, tools, and support organized by audience.",
    url: `${SITE_URL}/resources`,
    isPartOf: { "@type": "WebSite", name: "EquityTeam", url: SITE_URL },
  };

  return (
    <PageLayout>
      <SEO
        title="Resource Center | EquityTeam"
        description="EquityTeam's Resource Center — portals, tools, terms, tutorials, and support organized by who you are: owners, investors, tenants, guests, and partners."
        canonical="/resources"
        schemas={[schema]}
      />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-14 md:pt-40 md:pb-16 px-5">
        <div className="max-w-screen-md mx-auto text-center">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] md:max-w-[960px] mx-auto">Resource Center</h1>
          <p className="font-sans text-lg text-white/75 leading-relaxed">
            Portals, tools, terms, tutorials, and support — organized by audience so you go straight to what applies to you.
          </p>
        </div>
      </section>

      {/* Search + directory */}
      <section className="bg-white section-pad">
        <div className="max-w-screen-xl mx-auto">
          {/* Search */}
          <div className="max-w-xl mx-auto mb-12 md:mb-16">
            <label htmlFor="resource-search" className="sr-only">Search resources</label>
            <div className="flex items-center gap-3 border border-black/20 focus-within:border-secondary transition-colors px-4 py-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-shrink-0 text-secondary">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                id="resource-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the Resource Center — pay rent, application terms, calculators…"
                className="w-full bg-transparent outline-none font-sans text-base text-black placeholder:text-black/40"
              />
              {q && (
                <button type="button" onClick={() => setQ("")} className="font-sans text-sm text-black/50 hover:text-secondary" aria-label="Clear search">
                  Clear
                </button>
              )}
            </div>
          </div>

          {query ? (
            /* Search results */
            <div className="max-w-2xl mx-auto">
              <p className="font-sans text-sm uppercase tracking-[0.12em] text-black/50 mb-5">
                {results.length} result{results.length === 1 ? "" : "s"} for “{q.trim()}”
              </p>
              {results.length === 0 ? (
                <p className="font-sans text-base text-black/60">
                  Nothing matched. Try a different term, or <Link href="/contact-us" className="text-secondary underline underline-offset-2">contact our team</Link>.
                </p>
              ) : (
                <ul className="list-none p-0 m-0 divide-y divide-black/10 border-t border-b border-black/10">
                  {results.map((e, i) =>
                    e.external ? (
                      <li key={i}>
                        <a href={e.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4 hover:text-secondary transition-colors">
                          <span className="font-sans text-base text-black group-hover:text-secondary">{e.label}</span>
                          <span className="font-sans text-xs uppercase tracking-[0.1em] text-black/40 whitespace-nowrap">{e.context} ↗</span>
                        </a>
                      </li>
                    ) : (
                      <li key={i}>
                        <Link href={e.href} className="group flex items-center justify-between gap-4 py-4 hover:text-secondary transition-colors">
                          <span className="font-sans text-base text-black group-hover:text-secondary">{e.label}</span>
                          <span className="font-sans text-xs uppercase tracking-[0.1em] text-black/40 whitespace-nowrap">{e.context}</span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          ) : (
            /* Directory */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {GROUP_ORDER.map((group) => (
                <div key={group}>
                  <h2 className="font-sans font-bold text-base uppercase tracking-[0.1em] text-secondary mb-5 pb-3 border-b border-black/10">
                    {GROUP_LABELS[group]}
                  </h2>
                  <ul className="list-none p-0 m-0 space-y-3">
                    {RESOURCE_HUBS.filter((h) => h.group === group).map((hub) => (
                      <li key={hub.slug}>
                        <Link href={`/resources/${hub.slug}`} className="group flex items-baseline gap-2 font-sans text-lg text-black hover:text-secondary transition-colors">
                          <span className="border-b border-transparent group-hover:border-secondary">{hub.title}</span>
                          <Arrow />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h2 className="font-sans font-bold text-base uppercase tracking-[0.1em] text-secondary mb-5 pb-3 border-b border-black/10">
                  {PARTNER_HEADING}
                </h2>
                <ul className="list-none p-0 m-0 space-y-3">
                  {PARTNER_LINKS.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="group flex items-baseline gap-2 font-sans text-lg text-black hover:text-secondary transition-colors">
                        <span className="border-b border-transparent group-hover:border-secondary">{l.label}</span>
                        <Arrow />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <GoldBorderCTA title="Not sure where to start?" btnLabel="Contact Us" btnHref="/contact-us" />
    </PageLayout>
  );
}
