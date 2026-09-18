import { Link } from "wouter";

function CtaShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary p-8 mt-12 mb-10">
      {children}
    </div>
  );
}

export function RentalAnalysisCta() {
  return (
    <CtaShell>
      <h2 className="font-cowling font-bold text-xl text-white mb-2">
        Want to know what your property could earn?
      </h2>
      <p className="text-white/60 mb-5 text-base leading-relaxed">
        Get a free rental analysis from EquityTeam. We help people and properties prosper across Cincinnati, Dayton, and Norris Lake (via Deerfield Vacation Rentals).
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/free-rental-analysis" className="inline-block bg-secondary text-black font-bold text-base px-6 py-3 hover:bg-secondary/90 transition-colors">
          Get My Free Rental Analysis
        </Link>
        <Link href="/contact-us" className="inline-block border border-secondary text-white font-bold text-base px-6 py-3 hover:bg-secondary hover:text-black transition-colors">
          Contact Us
        </Link>
      </div>
    </CtaShell>
  );
}

export function FindAHomeCta() {
  return (
    <CtaShell>
      <h2 className="font-cowling font-bold text-xl text-white mb-2">
        Looking for your next home?
      </h2>
      <p className="text-white/60 mb-5 text-base leading-relaxed">
        Browse professionally managed rentals in Greater Cincinnati and Dayton. Self-tour most homes on your schedule.
      </p>
      <Link href="/for-rent" className="inline-block bg-secondary text-black font-bold text-base px-6 py-3 hover:bg-secondary/90 transition-colors">
        Browse Homes for Rent →
      </Link>
    </CtaShell>
  );
}

export function StrAnalysisCta() {
  return (
    <CtaShell>
      <h2 className="font-cowling font-bold text-xl text-white mb-2">
        Considering a vacation rental at Norris Lake?
      </h2>
      <p className="text-white/60 mb-5 text-base leading-relaxed">
        Find out what your Norris Lake property could earn as a managed vacation rental. We manage, clean, and service properties across the north side of the lake.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/vacation-rental-management" className="inline-block bg-secondary text-black font-bold text-base px-6 py-3 hover:bg-secondary/90 transition-colors">
          Get My Free STR Analysis
        </Link>
        <Link href="/contact-us" className="inline-block border border-secondary text-white font-bold text-base px-6 py-3 hover:bg-secondary hover:text-black transition-colors">
          Contact Us
        </Link>
      </div>
    </CtaShell>
  );
}

export function BookAStayCta() {
  return (
    <CtaShell>
      <h2 className="font-cowling font-bold text-xl text-white mb-2">
        Plan your Norris Lake getaway
      </h2>
      <p className="text-white/60 mb-5 text-base leading-relaxed">
        Browse vacation rentals on the north side of Norris Lake, Tennessee — managed by Deerfield Vacation Rentals (an EquityTeam brand).
      </p>
      <Link href="/vacation-rental-management" className="inline-block bg-secondary text-black font-bold text-base px-6 py-3 hover:bg-secondary/90 transition-colors">
        Browse Norris Lake Rentals →
      </Link>
    </CtaShell>
  );
}

export function ContactCta() {
  return (
    <CtaShell>
      <h2 className="font-cowling font-bold text-xl text-white mb-2">
        Get in touch with EquityTeam
      </h2>
      <p className="text-white/60 mb-5 text-base leading-relaxed">
        Questions about our vendor program or property services? We'd love to connect.
      </p>
      <Link href="/contact-us" className="inline-block bg-secondary text-black font-bold text-base px-6 py-3 hover:bg-secondary/90 transition-colors">
        Contact Us →
      </Link>
    </CtaShell>
  );
}

const CTA_MAP: Record<string, React.FC> = {
  "rental-analysis": RentalAnalysisCta,
  "free-analysis":   RentalAnalysisCta,
  "find-a-home":     FindAHomeCta,
  "browse-rentals":  FindAHomeCta,
  "str-analysis":    StrAnalysisCta,
  "book-a-stay":     BookAStayCta,
  "contact":         ContactCta,
};

export function BlogCta({ name }: { name?: string }) {
  const Cta = name ? CTA_MAP[name] : undefined;
  if (Cta) return <Cta />;
  return <RentalAnalysisCta />;
}
