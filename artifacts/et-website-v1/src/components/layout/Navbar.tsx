import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { REGION_SLUGS, toDisplayName, buildLocationUrl } from "@/data/locationRegistry";

const GOLD = "#B4975A";

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const PROPERTIES_SECTIONS = [
  {
    heading: "Homes for Rent",
    links: [
      { label: "Single-Family & Apartment Rentals — Cincinnati & Dayton", href: "/for-rent", external: false },
    ],
  },
  {
    heading: "Vacation Rentals",
    links: [
      { label: "Norris Lake via Deerfield Vacation Rentals", href: "https://deerfieldvacationrentals.com", external: true },
    ],
  },
];

const PROPERTIES_LINKS = PROPERTIES_SECTIONS.flatMap((s) => s.links);

type ServiceLink = { label: string; href: string; subLinks?: { label: string; href: string }[] };
type ServiceSection = { heading: string; links: ServiceLink[] };

const SERVICES_SECTIONS: ServiceSection[] = [
  {
    heading: "",
    links: [
      {
        label: "Residential Property Mgmt",
        href: "/residential-property-management",
        subLinks: [
          { label: "Pricing",              href: "/residential-property-management#pricing" },
          { label: "Guarantees",           href: "/residential-property-management#guarantees" },
          { label: "Free Rental Analysis", href: "/free-rental-analysis" },
          { label: "Decision Tools",       href: "/resources/residential-owners" },
        ],
      },
    ],
  },
  {
    heading: "",
    links: [
      { label: "Vacation Rental Mgmt", href: "/vacation-rental-management" },
      {
        label: "Commercial Property Mgmt",
        href: "/commercial-property-management",
      },
      {
        label: "HOA Management",
        href: "/hoa-management",
      },
    ],
  },
  {
    heading: "",
    links: [
      {
        label: "Property Services\n(Maintenance & Projects)",
        href: "/property-services",
      },
      {
        label: "Real Estate Brokerage",
        href: "/real-estate-brokerage",
      },
    ],
  },
];

const SERVICES_LINKS_FLAT = SERVICES_SECTIONS.flatMap((s) =>
  s.links.flatMap((l) => [l, ...(l.subLinks ?? [])])
);

type ResourceSection = { heading: string; links: { label: string; href: string; external?: boolean }[] };

const RESOURCES_SECTIONS: ResourceSection[] = [
  {
    heading: "Owners & Investors",
    links: [
      { label: "Residential Owners",     href: "/resources/residential-owners" },
      { label: "Commercial Owners",      href: "/resources/commercial-owners" },
      { label: "Vacation Rental Owners", href: "/resources/vacation-rental-owners" },
      { label: "HOA Boards",             href: "/resources/hoa-boards" },
      { label: "Property Services",      href: "/resources/property-services" },
    ],
  },
  {
    heading: "Residents & Guests",
    links: [
      { label: "Residential Tenants",    href: "/resources/residential-tenants" },
      { label: "Commercial Tenants",     href: "/resources/commercial-tenants" },
      { label: "Vacation Rental Guests", href: "/resources/vacation-rental-guests" },
      { label: "HOA Homeowners",         href: "/resources/hoa-homeowners" },
    ],
  },
  {
    heading: "Decision Tools",
    links: [
      { label: "Free Rental Analysis",    href: "/free-rental-analysis" },
      { label: "Rent vs. Sell Calculator", href: "/tools/rent-vs-sell" },
          { label: "Rent Affordability Calculator", href: "/tools/rent-affordability" },
      { label: "Management Fee ROI",       href: "/tools/pm-fee-roi" },
      { label: "1031 Exchange Calculator", href: "/tools/1031-exchange" },
      { label: "Eviction Cost Calculator", href: "/tools/eviction-cost" },
      { label: "Vacancy Cost Calculator",  href: "/tools/vacancy-cost" },
      { label: "Short-Term vs. Long-Term", href: "/tools/str-vs-ltr" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Resource Center", href: "/resources" },
      { label: "Vendors",  href: "/vendors" },
      { label: "Realtors", href: "/realtor-referral-program" },
      { label: "Blog",     href: "/blog" },
    ],
  },
];

const RESOURCES_LINKS_FLAT = RESOURCES_SECTIONS.flatMap((s) => s.links);

const COMPANY_LINKS = [
  { label: "About Us",       href: "/about-us" },
  { label: "Our Team",       href: "/about-us#team" },
  { label: "Areas We Serve", href: "/areas-we-serve" },
  { label: "Careers",        href: "/careers" },
  { label: "Contact Us",     href: "/contact-us" },
];

function isActive(links: { href: string }[], path: string) {
  return links.some((l) => {
    const base = l.href.split("#")[0];
    return base === path;
  });
}

function ChevronDown() {
  return (
    <svg
      width="10" height="6" viewBox="0 0 10 6"
      fill="currentColor" xmlns="http://www.w3.org/2000/svg"
      className="ml-2 inline-block text-inherit"
    >
      <path d="M5 5.5L0 0.5H10L5 5.5Z" fill="currentColor" />
    </svg>
  );
}

function DesktopDropdownPanel({
  links,
  onClose,
  currentPath,
}: {
  links: { label: string; href: string }[];
  onClose: () => void;
  currentPath: string;
}) {
  return (
    <div className="border-t border-[#B4975A]/30" style={{ backgroundColor: "#121212" }}>
      <div className="max-w-screen-xl mx-auto px-5 py-4 flex flex-col gap-1">
        {links.map((link) => {
          if (link.href.startsWith("http")) {
            return (
              <a
                key={link.href}
                href={link.href}
                className="desktop-dropdown-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                {link.label}
              </a>
            );
          }

          const hashIdx = link.href.indexOf("#");
          const basePath = hashIdx >= 0 ? link.href.slice(0, hashIdx) : link.href;
          const hash = hashIdx >= 0 ? link.href.slice(hashIdx + 1) : null;
          const active = hash === null && basePath === currentPath;
          const isSamePageHash = hash !== null && basePath === currentPath;

          if (isSamePageHash) {
            return (
              <a
                key={link.href}
                href={link.href}
                className={`desktop-dropdown-link${active ? " active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  const el = document.getElementById(hash!);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`desktop-dropdown-link${active ? " active" : ""}`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MegaLink({
  href,
  label,
  currentPath,
  onClose,
  className,
  external,
}: {
  href: string;
  label: string;
  currentPath: string;
  onClose: () => void;
  className?: string;
  external?: boolean;
}) {
  const isExternal = external || href.startsWith("http");
  const hashIdx = href.indexOf("#");
  const basePath = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
  const hash = hashIdx >= 0 ? href.slice(hashIdx + 1) : null;
  const active = !isExternal && hash === null ? basePath === currentPath : false;
  const cls = className ?? `desktop-dropdown-link${active ? " active" : ""}`;

  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClose}>
        {label}
      </a>
    );
  }

  if (hash !== null) {
    return (
      <a
        href={href}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          onClose();
          if (basePath !== currentPath) {
            window.location.href = href;
          } else {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClose}>
      {label}
    </Link>
  );
}

function ServicesMegaPanel({
  onClose,
  currentPath,
}: {
  onClose: () => void;
  currentPath: string;
}) {
  return (
    <div className="border-t border-[#B4975A]/30" style={{ backgroundColor: "#121212" }}>
      <div className="max-w-screen-xl mx-auto px-5 py-5 flex gap-10">
        {SERVICES_SECTIONS.map((section, si) => (
          <div
            key={si}
            className={`flex-1 ${si > 0 ? "border-l border-[#B4975A]/20 pl-10" : ""}`}
          >
            {section.heading && (
              <p
                className="text-base font-semibold tracking-[0.12em] uppercase mb-3"
                style={{ color: GOLD }}
              >
                {section.heading}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.links.map((link) => (
                <div key={link.href}>
                  <MegaLink
                    href={link.href}
                    label={link.label}
                    currentPath={currentPath}
                    onClose={onClose}
                  />
                  {link.subLinks && link.subLinks.length > 0 && (
                    <div className="flex flex-col gap-0.5 mt-0.5 mb-1.5 ml-3 pl-3 border-l border-[#B4975A]/20">
                      {link.subLinks.map((sub) => (
                        <MegaLink
                          key={sub.href}
                          href={sub.href}
                          label={sub.label}
                          currentPath={currentPath}
                          onClose={onClose}
                          className="desktop-dropdown-link sublink opacity-80 hover:opacity-100"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesMegaPanel({
  onClose,
  currentPath,
}: {
  onClose: () => void;
  currentPath: string;
}) {
  const cols: ResourceSection[][] = RESOURCES_SECTIONS.map((s) => [s]);
  return (
    <div className="border-t border-[#B4975A]/30" style={{ backgroundColor: "#121212" }}>
      <div className="max-w-screen-xl mx-auto px-5 py-5 grid grid-cols-4 gap-0">
        {cols.map((pair, ci) => (
          <div
            key={ci}
            className={`flex flex-col gap-5 ${ci > 0 ? "border-l border-[#B4975A]/20 pl-8" : ""} ${ci < cols.length - 1 ? "pr-8" : ""}`}
          >
            {pair.map((section) => (
              <div key={section.heading}>
                <p
                  className="text-base font-semibold tracking-[0.12em] uppercase mb-2"
                  style={{ color: GOLD }}
                >
                  {section.heading}
                </p>
                <div className="flex flex-col gap-0.5">
                  {section.links.map((link) => (
                    <MegaLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      external={link.external}
                      currentPath={currentPath}
                      onClose={onClose}
                      className="desktop-dropdown-link sublink"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PropertiesMegaPanel({
  onClose,
  currentPath,
}: {
  onClose: () => void;
  currentPath: string;
}) {
  return (
    <div className="border-t border-[#B4975A]/30" style={{ backgroundColor: "#121212" }}>
      <div className="max-w-screen-xl mx-auto px-5 py-5 flex gap-10">
        {PROPERTIES_SECTIONS.map((section, si) => (
          <div
            key={section.heading}
            className={`flex-1 ${si > 0 ? "border-l border-[#B4975A]/20 pl-10" : ""}`}
          >
            <p
              className="text-base font-semibold tracking-[0.12em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              {section.heading}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.links.map((link) => (
                <MegaLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  external={link.external}
                  currentPath={currentPath}
                  onClose={onClose}
                  className="desktop-dropdown-link sublink"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type SearchEntry = { label: string; href: string; group: string };

const isInternal = (href: string) => href.startsWith("/");

function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const seen = new Set<string>();
  const add = (e: SearchEntry) => {
    if (!isInternal(e.href)) return;
    const key = `${e.href}|${e.label}`;
    if (seen.has(key)) return;
    seen.add(key);
    entries.push(e);
  };

  PROPERTIES_LINKS.forEach((l) => add({ label: l.label, href: l.href, group: "Properties" }));
  SERVICES_LINKS_FLAT.forEach((l) => add({ label: l.label, href: l.href, group: "Services" }));
  RESOURCES_SECTIONS.forEach((section) =>
    section.links.forEach((l) => {
      if (l.external) return;
      add({ label: l.label, href: l.href, group: section.heading });
    })
  );
  COMPANY_LINKS.forEach((l) => add({ label: l.label, href: l.href, group: "Company" }));
  REGION_SLUGS.cincinnati.forEach((slug) =>
    add({
      label: `${toDisplayName(slug)} — Cincinnati`,
      href: buildLocationUrl(slug),
      group: "Cincinnati Locations",
    })
  );
  REGION_SLUGS.dayton.forEach((slug) =>
    add({
      label: `${toDisplayName(slug)} — Dayton`,
      href: buildLocationUrl(slug),
      group: "Dayton Locations",
    })
  );
  return entries;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildSearchIndex, []);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((e) => e.label.toLowerCase().includes(q) || e.group.toLowerCase().includes(q))
      .slice(0, 30);
  }, [index, query]);

  return (
    <div className="border-t border-[#B4975A]/30" style={{ backgroundColor: "#121212" }}>
      <div className="max-w-screen-xl mx-auto px-5 py-5">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, services, and locations..."
            className="w-full bg-[#1a1a1a] border border-[#B4975A]/30 text-white placeholder-white/40 pl-11 pr-4 py-3 font-sans text-base focus:outline-none focus:border-[#B4975A] transition-colors"
          />
        </div>

        {query.trim() && (
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-white/60 font-sans text-sm py-3 px-1">
                No results for &ldquo;{query}&rdquo;
              </p>
            ) : (
              <ul className="flex flex-col">
                {results.map((r, i) => {
                  const cls =
                    "block w-full text-left px-3 py-2 text-white hover:bg-[#B4975A]/15 hover:text-secondary transition-colors font-sans text-sm";
                  return (
                    <li key={`${r.href}-${i}`} className="border-b border-white/5 last:border-b-0">
                      <Link href={r.href} className={cls} onClick={onClose}>
                        <span>{r.label}</span>
                        <span className="ml-2 text-xs uppercase tracking-wider text-white/40">
                          {r.group}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {!query.trim() && (
          <p className="text-white/50 font-sans text-sm mt-3 px-1">
            Try searching for a service (e.g. &ldquo;HOA&rdquo;), a neighborhood (e.g. &ldquo;Hyde Park&rdquo;), or a page (e.g. &ldquo;Careers&rdquo;).
          </p>
        )}
      </div>
    </div>
  );
}

function MobileLinkItem({
  link,
  currentPath,
  onClose,
  className,
}: {
  link: { label: string; href: string };
  currentPath: string;
  onClose: () => void;
  className?: string;
}) {
  if (link.href.startsWith("http")) {
    const cls = className ?? "nav-item-link block";
    return (
      <a href={link.href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClose}>
        {link.label}
      </a>
    );
  }

  const hashIdx = link.href.indexOf("#");
  const basePath = hashIdx >= 0 ? link.href.slice(0, hashIdx) : link.href;
  const hash = hashIdx >= 0 ? link.href.slice(hashIdx + 1) : null;
  const active = hash === null && basePath === currentPath;
  const isSamePageHash = hash !== null && basePath === currentPath;
  const cls = className ?? `nav-item-link block${active ? " active" : ""}`;

  if (isSamePageHash) {
    return (
      <a
        href={link.href}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          onClose();
          const el = document.getElementById(hash!);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls} onClick={onClose}>
      {link.label}
    </Link>
  );
}

function MobilePanel({ onClose, currentPath }: { onClose: () => void; currentPath: string }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setOpenSection((prev) => (prev === label ? null : label));
  };

  const renderDropdown = (label: string, links: { label: string; href: string }[]) => {
    const sectionActive = isActive(links, currentPath);
    const isOpen = openSection === label;
    return (
      <div key={label} className="relative mx-3 mb-6 md:mb-2 lg:mt-4 lg:mb-4">
        <span
          className={`nav-item-link flex items-center hover:cursor-pointer${sectionActive ? " active" : ""}`}
          onClick={() => toggleSection(label)}
        >
          {label}
          <svg
            width="10" height="6" viewBox="0 0 10 6"
            fill="currentColor"
            className="ml-2 inline-block text-inherit"
          >
            <path d="M5 5.5L0 0.5H10L5 5.5Z" fill="currentColor" />
          </svg>
        </span>
        {isOpen && (
          <ul className="mt-4 px-3">
            {links.map((link) => (
              <li key={link.href} className="mx-3 mb-6 md:mb-2 lg:mb-4">
                <MobileLinkItem link={link} currentPath={currentPath} onClose={onClose} className="nav-item-link block normal-case" />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderPropertiesMobile = () => {
    const sectionActive = isActive(PROPERTIES_LINKS, currentPath);
    const isOpen = openSection === "Properties";
    return (
      <div className="relative mx-3 mb-6 md:mb-2 lg:mt-4 lg:mb-4">
        <span
          className={`nav-item-link flex items-center hover:cursor-pointer${sectionActive ? " active" : ""}`}
          onClick={() => toggleSection("Properties")}
        >
          Properties
          <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" className="ml-2 inline-block text-inherit">
            <path d="M5 5.5L0 0.5H10L5 5.5Z" fill="currentColor" />
          </svg>
        </span>
        {isOpen && (
          <div className="mt-4 px-3 flex flex-col gap-5">
            {PROPERTIES_SECTIONS.map((section) => (
              <div key={section.heading}>
                <p className="text-base font-semibold tracking-[0.12em] uppercase mb-2 ml-3" style={{ color: GOLD }}>
                  {section.heading}
                </p>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.href} className="mx-3 mb-3">
                      {link.external || link.href.startsWith("http") ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="nav-item-link block normal-case" onClick={onClose}>
                          {link.label}
                        </a>
                      ) : (
                        <MobileLinkItem link={link} currentPath={currentPath} onClose={onClose} className="nav-item-link block normal-case" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderServicesMobile = () => {
    const sectionActive = isActive(SERVICES_LINKS_FLAT, currentPath);
    const isOpen = openSection === "Services";
    return (
      <div className="relative mx-3 mb-6 md:mb-2 lg:mt-4 lg:mb-4">
        <span
          className={`nav-item-link flex items-center hover:cursor-pointer${sectionActive ? " active" : ""}`}
          onClick={() => toggleSection("Services")}
        >
          Services
          <svg
            width="10" height="6" viewBox="0 0 10 6"
            fill="currentColor"
            className="ml-2 inline-block text-inherit"
          >
            <path d="M5 5.5L0 0.5H10L5 5.5Z" fill="currentColor" />
          </svg>
        </span>
        {isOpen && (
          <div className="mt-4 px-3 flex flex-col gap-5">
            {SERVICES_SECTIONS.map((section, si) => (
              <div key={si}>
                {section.heading && (
                  <p
                    className="text-base font-semibold tracking-[0.12em] uppercase mb-2 ml-3"
                    style={{ color: GOLD }}
                  >
                    {section.heading}
                  </p>
                )}
                <ul>
                  {section.links.map((link) => (
                    <li key={link.href} className="mx-3 mb-3">
                      <MobileLinkItem link={link} currentPath={currentPath} onClose={onClose} />
                      {link.subLinks && link.subLinks.length > 0 && (
                        <ul className="mt-2 ml-3 pl-3 border-l border-[#B4975A]/20 flex flex-col gap-2">
                          {link.subLinks.map((sub) => (
                            <li key={sub.href}>
                              <MobileLinkItem
                                link={sub}
                                currentPath={currentPath}
                                onClose={onClose}
                                className="nav-item-link block text-base opacity-75 normal-case"
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderResourcesMobile = () => {
    const sectionActive = isActive(RESOURCES_LINKS_FLAT, currentPath);
    const isOpen = openSection === "Resources";
    return (
      <div className="relative mx-3 mb-6 md:mb-2 lg:mt-4 lg:mb-4">
        <span
          className={`nav-item-link flex items-center hover:cursor-pointer${sectionActive ? " active" : ""}`}
          onClick={() => toggleSection("Resources")}
        >
          Resources
          <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" className="ml-2 inline-block text-inherit">
            <path d="M5 5.5L0 0.5H10L5 5.5Z" fill="currentColor" />
          </svg>
        </span>
        {isOpen && (
          <div className="mt-4 px-3 flex flex-col gap-5">
            {RESOURCES_SECTIONS.map((section) => (
              <div key={section.heading}>
                <p className="text-base font-semibold tracking-[0.12em] uppercase mb-2 ml-3" style={{ color: GOLD }}>
                  {section.heading}
                </p>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.label} className="mx-3 mb-3">
                      {link.external || link.href.startsWith("http") ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="nav-item-link block normal-case" onClick={onClose}>
                          {link.label}
                        </a>
                      ) : (
                        <MobileLinkItem link={link} currentPath={currentPath} onClose={onClose} className="nav-item-link block normal-case" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-primary px-4 pb-4 pt-8 font-medium flex flex-col uppercase">
      {renderPropertiesMobile()}
      {renderServicesMobile()}
      {renderResourcesMobile()}
      {renderDropdown("Company", COMPANY_LINKS)}
      <div className="hidden lg:block">
        <Link href="/contact-us" className="btn-outline-secondary bg-primary block text-center" onClick={onClose}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => setOpenDropdown(null);

  const desktopDropdownLinks = (() => {
    if (openDropdown === "company") return COMPANY_LINKS;
    return null;
  })();

  const propertiesActive = isActive(PROPERTIES_LINKS, location);
  const servicesActive   = isActive(SERVICES_LINKS_FLAT, location);
  const resourcesActive  = isActive(RESOURCES_LINKS_FLAT, location);
  const aboutActive      = isActive(COMPANY_LINKS, location);
  const blogActive       = location === "/blog";

  return (
    <header
      ref={navRef as React.RefObject<HTMLElement>}
      className="fixed top-0 left-0 right-0 z-50 border-t-[2px] transition-all duration-300"
      style={{
        borderTopColor: GOLD,
        backgroundColor: "#121212",
        boxShadow: "none",
      }}
    >
      {/* ── Mobile bar ── */}
      <div className="xl:hidden grid px-4 py-3" style={{ gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "0.5rem" }}>
        {/* Hamburger */}
        <button
          className="text-secondary p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        {/* Logo — centred within its own column */}
        <Link href="/" className="flex justify-center" onClick={() => { closeDropdown(); window.scrollTo(0, 0); }}>
          <img
            src={`${import.meta.env.BASE_URL}images/logo/equityteam-logo.webp`}
            alt="EquityTeam Property Management"
            className="h-7 sm:h-9 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (sib) sib.style.display = "block";
            }}
          />
          <span className="hidden font-bold text-xl text-white tracking-tight">
            Equity<span style={{ color: GOLD }}>Team</span>
          </span>
        </Link>

        {/* Contact Us — compact on mobile */}
        <Link
          href="/contact-us"
          onClick={closeDropdown}
          className="btn-outline-secondary"
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.75rem", letterSpacing: "0.12em", whiteSpace: "nowrap" }}
        >
          Contact Us
        </Link>
      </div>

      {/* ── Desktop bar ── */}
      <div className="hidden xl:flex max-w-screen-xl mx-auto px-5 items-center justify-between xl:py-[22px]">
        <Link href="/" className="flex-shrink-0" onClick={() => { closeDropdown(); window.scrollTo(0, 0); }}>
          <img
            src={`${import.meta.env.BASE_URL}images/logo/equityteam-logo.webp`}
            alt="EquityTeam Property Management"
            className="h-11 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (sib) sib.style.display = "block";
            }}
          />
          <span className="hidden font-bold text-2xl text-white tracking-tight">
            Equity<span style={{ color: GOLD }}>Team</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">

          {/* Properties */}
          <div className="dropdown-parent">
            <span
              className={`nav-item-link flex items-center hover:cursor-pointer${propertiesActive ? " active" : ""}${openDropdown === "properties" ? " text-secondary" : ""}`}
              onClick={() => toggle("properties")}
            >
              Properties <ChevronDown />
            </span>
          </div>

          {/* Services */}
          <div className="dropdown-parent">
            <span
              className={`nav-item-link flex items-center hover:cursor-pointer${servicesActive ? " active" : ""}${openDropdown === "services" ? " text-secondary" : ""}`}
              onClick={() => toggle("services")}
            >
              Services <ChevronDown />
            </span>
          </div>

          {/* Resources */}
          <div className="dropdown-parent">
            <span
              className={`nav-item-link flex items-center hover:cursor-pointer${resourcesActive ? " active" : ""}${openDropdown === "resources" ? " text-secondary" : ""}`}
              onClick={() => toggle("resources")}
            >
              Resources <ChevronDown />
            </span>
          </div>

          {/* Company */}
          <div className="dropdown-parent">
            <span
              className={`nav-item-link flex items-center hover:cursor-pointer${aboutActive ? " active" : ""}${openDropdown === "company" ? " text-secondary" : ""}`}
              onClick={() => toggle("company")}
            >
              Company <ChevronDown />
            </span>
          </div>

          {/* Search */}
          <button
            type="button"
            className={`nav-item-link flex items-center hover:cursor-pointer p-1${openDropdown === "search" ? " text-secondary" : ""}`}
            onClick={() => toggle("search")}
            aria-label="Search the site"
            aria-expanded={openDropdown === "search"}
          >
            <SearchIcon />
          </button>

          {/* CTA */}
          <Link href="/contact-us" className="btn-outline-secondary ml-1" onClick={closeDropdown}>
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Desktop dropdown — mega panels for Services + Resources, standard for others */}
      {openDropdown === "properties" && (
        <PropertiesMegaPanel onClose={closeDropdown} currentPath={location} />
      )}
      {openDropdown === "services" && (
        <ServicesMegaPanel onClose={closeDropdown} currentPath={location} />
      )}
      {openDropdown === "resources" && (
        <ResourcesMegaPanel onClose={closeDropdown} currentPath={location} />
      )}
      {openDropdown === "search" && (
        <SearchPanel onClose={closeDropdown} />
      )}
      {desktopDropdownLinks && (
        <DesktopDropdownPanel
          links={desktopDropdownLinks}
          onClose={closeDropdown}
          currentPath={location}
        />
      )}

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="xl:hidden max-h-[80vh] overflow-y-auto">
          <MobilePanel onClose={() => setMobileOpen(false)} currentPath={location} />
        </div>
      )}
    </header>
  );
}
