import { Link } from "wouter";

interface StatItem {
  label: string;
  value: string;
}

interface CommunityHeroProps {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  imageZoom?: number;
  headline: string;
  subhead: string;
  quote: string;
  quoteAttribution?: string;
  stats: StatItem[];
}

export function CommunityHero({
  image,
  imageAlt,
  imagePosition = "object-center",
  imageZoom,
  headline,
  subhead,
  quote,
  quoteAttribution,
  stats,
}: CommunityHeroProps) {
  return (
    <section className="relative z-10 md:overflow-hidden min-h-screen flex flex-col">
      {/* Full-section background image + bottom-up gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className={`w-full h-full object-cover ${imagePosition}`}
          style={imageZoom !== undefined ? { transform: `scale(${imageZoom / 100})` } : undefined}
          loading="eager"
          fetchPriority="high"
          width={2400}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-[#121212]/40 to-[#121212]/10" />
      </div>

      {/* Hero text — centered */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 pt-28 md:pt-56 pb-6 text-center">
        <h1
          className="uppercase font-cowling font-bold leading-none text-white mb-6 text-[28px] md:text-[72px] md:max-w-[960px] mx-auto"
          style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
        >
          {headline}
        </h1>
        <p
          className="block font-marseille text-white text-[20px] md:text-[26px] tracking-[0.04em] font-normal normal-case mb-8"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
        >
          {subhead}
        </p>
        <blockquote
          className="text-white font-display font-normal italic text-[24px] md:text-[32px] leading-snug md:max-w-screen-md mx-auto border-l-0 pl-0"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
        {quoteAttribution && (
          <span
            className="block text-white text-base leading-normal mt-5 font-sans font-semibold uppercase tracking-[0.2em]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
          >
            — {quoteAttribution}
          </span>
        )}
        <div className="text-center mt-10">
          <Link href="/contact-us" className="btn-solid-secondary uppercase">
            Schedule a Consult
          </Link>
        </div>
      </div>

      {/* Trust banner stats — inside hero gradient, pinned to bottom */}
      <div className="overlay-gradient pb-8 md:pb-10 pt-8 md:pt-14 px-5 xl:px-0 z-10 relative mt-auto">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="md:flex md:justify-between gap-16">
            {stats.map((stat) => (
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
  );
}
