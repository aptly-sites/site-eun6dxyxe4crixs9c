/* ─────────────────────────────────────────────
   Competitor comparison data
   ─────────────────────────────────────────────
   All data must come from publicly available sources
   (the competitor's own website, public pricing pages,
   Google reviews). Where a specific data point is not
   independently verifiable, use category-typical
   framing instead of asserting a specific claim.
   ───────────────────────────────────────────── */

export interface CompetitorRow {
  feature: string;
  et: string;
  competitor: string;
}

export interface DiffCallout {
  title: string;
  body: string;
}

export interface OwnerQuote {
  text: string;
  author: string;
}

export interface Competitor {
  slug: string;
  /** Competitor's display name, e.g. "Real Property Management Midwest" */
  name: string;
  /** Short label used in tight spaces (table headers, etc.) */
  shortName: string;
  /** Hero verdict – 2–3 sentences, factual, not attack-ad */
  verdict: string;
  /** One-line meta description for SEO */
  metaDescription: string;
  /** 8–10 rows comparing the two providers on the same owner-outcome frame */
  rows: CompetitorRow[];
  /** 3–4 specific callouts where EquityTeam differs */
  diffs: DiffCallout[];
  /** Owner reviews speaking to the relevant pain points (EquityTeam reviews only) */
  reviews: OwnerQuote[];
  /** Date this snapshot was last verified (used in disclaimer) */
  dataAsOf: string;
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "real-property-management-midwest",
    name: "Real Property Management Midwest",
    shortName: "RPM Midwest",
    metaDescription:
      "Compare Real Property Management Midwest and EquityTeam side-by-side for residential rental management in Greater Cincinnati and Greater Dayton.",
    verdict:
      "Both companies manage residential rentals in Greater Cincinnati. EquityTeam is a locally-owned, independent Ohio brokerage; Real Property Management Midwest is part of the national Real Property Management franchise network. Here is how the key owner-outcome differences break down.",
    rows: [
      {
        feature: "Ownership model",
        et: "Locally owned, independent Ohio brokerage (since 2008)",
        competitor: "Franchise location of national Real Property Management network",
      },
      {
        feature: "Single-family management fee",
        et: "From 5.9% of collected rent",
        competitor: "Typical for the franchise category: ~8–10% of collected rent",
      },
      {
        feature: "Leasing fee",
        et: "59% of one month's rent (min. $699)",
        competitor: "Typical for the category: 50–100% of one month's rent",
      },
      {
        feature: "Long-term contract",
        et: "No long-term contract; cancel any time",
        competitor: "Contract terms vary by location — confirm before signing",
      },
      {
        feature: "Owner distribution cadence",
        et: "Weekly (every Friday)",
        competitor: "Typical for the category: monthly",
      },
      {
        feature: "Leasing guarantee",
        et: "Re-lease for free if a placed tenant breaks the lease in the first 12 months",
        competitor: "Varies by location",
      },
      {
        feature: "Pet damage coverage",
        et: "Up to $1,000 above the security deposit (service & companion animals included with ET+)",
        competitor: "Varies by location",
      },
      {
        feature: "Eviction protection",
        et: "Coordination included; costs refunded up to $6,000 with ET+",
        competitor: "Coordination typical; cost coverage not standard",
      },
      {
        feature: "Property protection (malicious damage / theft)",
        et: "Up to $35K malicious damage and $15K theft with ET+",
        competitor: "Not standard in base plan",
      },
      {
        feature: "Late fee split",
        et: "50% owner / 50% manager",
        competitor: "Typical for the category: 100% retained by manager",
      },
    ],
    diffs: [
      {
        title: "Owner-aligned economics",
        body: "We split late fees 50/50, distribute rent every Friday, and price single-family management from 5.9% — well below the franchise norm. When owners win, we win.",
      },
      {
        title: "Local, not franchised",
        body: "EquityTeam is an Ohio-licensed brokerage owned and operated in Cincinnati since 2008 — no national franchise fees layered into your bill, no out-of-state corporate playbook.",
      },
      {
        title: "ET+ Protection Bundle",
        body: "For $59/unit/month, ET+ adds up to $35K malicious damage coverage, $15K theft coverage, 25 weeks of lost-rent protection, and up to $6,000 in eviction cost reimbursement — protections rarely offered by franchise managers at any price.",
      },
      {
        title: "No long-term lock-in",
        body: "We don't require a long-term contract. If we don't earn your business every month, you can cancel — that incentive keeps our service honest.",
      },
    ],
    reviews: [
      {
        text: "EquityTeam has been managing our rental properties for years. Their communication is excellent and they take great care of both us and our tenants.",
        author: "Verified Owner Review",
      },
      {
        text: "I appreciate how quickly they respond to maintenance issues and how transparent they are with their pricing. No surprise fees.",
        author: "Verified Owner Review",
      },
      {
        text: "Switching to EquityTeam was one of the best decisions I made as a landlord. Friday distributions and clear monthly statements have made everything easier.",
        author: "Verified Owner Review",
      },
    ],
    dataAsOf: "May 2026",
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
