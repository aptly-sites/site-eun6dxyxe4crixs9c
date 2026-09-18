import type { MarketInsight } from "@/data/communityData";

export interface MarketInsightsSource {
  label: string;
  href: string;
}

const DEFAULT_SOURCES: MarketInsightsSource[] = [
  { label: "U.S. Census Bureau", href: "https://data.census.gov" },
  { label: "Zillow", href: "https://www.zillow.com" },
  { label: "GreatSchools.org", href: "https://www.greatschools.org" },
];

interface MarketInsightsGridProps {
  cards: MarketInsight[];
  dataAccessedDate: string;
  sources?: MarketInsightsSource[];
  note?: string;
  variant?: "light" | "dark";
}

export function MarketInsightsGrid({
  cards,
  dataAccessedDate,
  sources = DEFAULT_SOURCES,
  note,
  variant = "light",
}: MarketInsightsGridProps) {
  const isDark = variant === "dark";
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((m) => (
          <div
            key={m.label}
            className={`border p-8 hover:border-secondary transition-colors duration-200 ${isDark ? "border-white/15" : "border-primary/15"}`}
          >
            <m.icon size={32} weight="thin" className="text-secondary mb-5" />
            <div className={`font-sans font-semibold text-sm tracking-[0.12em] uppercase mb-2 ${isDark ? "text-white/50" : "text-primary/50"}`}>
              {m.label}
            </div>
            {Array.isArray(m.value) ? (
              <ul className="list-none p-0 m-0 space-y-1">
                {m.value.map((line, i) => (
                  <li
                    key={i}
                    className={`font-sans font-bold text-lg leading-snug ${isDark ? "text-white" : "text-primary"}`}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <div className={`font-sans font-bold text-lg leading-snug ${isDark ? "text-white" : "text-primary"}`}>{m.value}</div>
            )}
          </div>
        ))}
      </div>

      {note && (
        <p className={`mt-8 font-sans text-base italic leading-relaxed ${isDark ? "text-white/55" : "text-primary/60"}`}>
          {note}
        </p>
      )}

      <p className={`${note ? "mt-3" : "mt-8"} font-sans text-base italic leading-relaxed ${isDark ? "text-white/45" : "text-primary/45"}`}>
        <em>
          Sources:{" "}
          {sources.map((s, i) => (
            <span key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline transition-colors duration-150 ${isDark ? "text-white/35 hover:text-white/55" : "text-primary/35 hover:text-primary/55"}`}
              >
                {s.label}
              </a>
              {i < sources.length - 1 ? ", " : ""}
            </span>
          ))}
          {"."}
        </em>
      </p>
    </>
  );
}

