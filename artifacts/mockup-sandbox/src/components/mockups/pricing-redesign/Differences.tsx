import "./_group.css";
import { Check, Minus, Info } from "lucide-react";

type Cell = { text: string; emphasis?: boolean } | { check: true } | { dash: true };

const ROWS: Array<{ label: string; tip?: string; sf: Cell; mf: Cell; et: Cell }> = [
  {
    label: "Management Fee",
    sf: { text: "5.9%", emphasis: true },
    mf: { text: "8.9%", emphasis: true },
    et: { text: "+$59/mo", emphasis: true },
  },
  {
    label: "Leasing Fee",
    tip: "Covers full tenant placement — marketing, showings, screening, lease, move-in inspection.",
    sf: { text: "59% of 1st month\n($699 min)" },
    mf: { text: "69% of 1st month\n($699 min)" },
    et: { text: "−5% on leasing fees" },
  },
  {
    label: "Lease Renewals",
    sf: { text: "$199 / renewal" },
    mf: { text: "$199 / renewal" },
    et: { text: "−$50 on renewals" },
  },
  {
    label: "Late Fees",
    sf: { text: "100% to manager" },
    mf: { text: "100% to manager" },
    et: { text: "50 / 50 with owner" },
  },
  {
    label: "Pet Damage Coverage",
    tip: "Covers up to $1,000 in pet-related damage above and beyond the security deposit.",
    sf: { text: "Up to $1,000" },
    mf: { text: "Up to $1,000" },
    et: { text: "+ Service & companion animals" },
  },
  {
    label: "Property Protection",
    sf: { dash: true },
    mf: { dash: true },
    et: { text: "Up to $35K malicious damage\n$15K theft" },
  },
  {
    label: "Rent Guarantee",
    sf: { dash: true },
    mf: { dash: true },
    et: { text: "Up to 25 weeks\n(capped $3K / mo)" },
  },
  {
    label: "Eviction Protection",
    sf: { text: "Coordination included" },
    mf: { text: "Coordination included" },
    et: { text: "+ Costs refunded up to $6,000" },
  },
];

function CellView({ cell, accent }: { cell: Cell; accent?: boolean }) {
  if ("check" in cell) {
    return <Check className="w-5 h-5 mx-auto" style={{ color: "#B4975A" }} />;
  }
  if ("dash" in cell) {
    return <Minus className="w-4 h-4 mx-auto text-neutral-300" />;
  }
  return (
    <span
      className={`whitespace-pre-line text-center block ${
        cell.emphasis ? "text-xl tracking-tight" : "text-sm"
      } ${accent ? "font-semibold" : ""}`}
      style={{ color: accent ? "#B4975A" : "#121212" }}
    >
      {cell.text}
    </span>
  );
}

export function Differences() {
  return (
    <div className="fee-cards-container min-h-screen px-6 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "#B4975A" }}
          >
            Simple, Transparent Pricing
          </p>
          <h2 className="font-heading text-4xl md:text-5xl leading-tight mb-4">
            What you'll actually pay
          </h2>
          <p className="text-base text-neutral-600 max-w-xl mx-auto">
            Everything below covers what differs by property type or what ET+ adds.
            Everything else — onboarding, accounting, inspections, guarantees, the full
            service menu — is included for every client.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] bg-neutral-50 border-b border-neutral-200">
            <div className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Item
            </div>
            <div className="px-3 py-4 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Single Family
              </div>
            </div>
            <div className="px-3 py-4 text-center border-l border-neutral-200">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Multi-Family
              </div>
            </div>
            <div
              className="px-3 py-4 text-center border-l"
              style={{ background: "#121212", borderColor: "#121212" }}
            >
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#B4975A" }}
              >
                ET+ Add-On
              </div>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1.2fr] items-center ${
                i % 2 === 1 ? "bg-neutral-50/40" : "bg-white"
              } border-b border-neutral-100 last:border-b-0`}
            >
              <div className="px-5 py-5 flex items-start gap-2">
                <span className="text-[15px] font-medium leading-snug">
                  {row.label}
                </span>
                {row.tip && (
                  <span title={row.tip} className="text-neutral-400 cursor-help mt-0.5">
                    <Info className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="px-3 py-5">
                <CellView cell={row.sf} />
              </div>
              <div className="px-3 py-5 border-l border-neutral-100">
                <CellView cell={row.mf} />
              </div>
              <div
                className="px-3 py-5 border-l"
                style={{
                  background: "rgba(18,18,18,0.97)",
                  borderColor: "rgba(180,151,90,0.25)",
                }}
              >
                <CellView cell={row.et} accent />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-500 mt-6">
          No long-term contract · Free onboarding · Discounts available for
          military / first responders and multi-unit portfolios
        </p>
      </div>
    </div>
  );
}
