import React, { useState } from "react";
import "./_group.css";

/* ── Tiny helpers ── */

function Check() {
  return <span className="text-[#B4975A] font-bold text-base">✓</span>;
}
function Dash() {
  return <span className="text-white/20 text-lg leading-none">—</span>;
}

function Tip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex align-middle ml-1">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-[14px] h-[14px] rounded-full border border-[#B4975A]/50 text-[#B4975A] text-[9px] font-bold flex items-center justify-center hover:border-[#B4975A] transition-colors leading-none"
        style={{ lineHeight: 1 }}
      >
        i
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-[#1c1c1c] border border-[#B4975A]/30 text-white/80 text-xs leading-relaxed p-3 z-50 pointer-events-none shadow-xl">
          {text}
        </span>
      )}
    </span>
  );
}

type Cell =
  | { type: "check" }
  | { type: "dash" }
  | { type: "text"; value: string; sub?: string; gold?: boolean };

interface Row {
  feature: string;
  tip?: string;
  sf: Cell;
  mf: Cell;
  et: Cell;
}

const check: Cell = { type: "check" };
const dash: Cell = { type: "dash" };
const t = (value: string, sub?: string): Cell => ({ type: "text", value, sub });
const g = (value: string, sub?: string): Cell => ({ type: "text", value, sub, gold: true });

const ROWS: Row[] = [
  {
    feature: "Management Fee",
    sf: t("5.9% of collected rent"),
    mf: t("8.9% of collected rent"),
    et: check,
  },
  {
    feature: "Minimum Fee",
    sf: t("$99 / unit / month"),
    mf: t("$79 / unit / month"),
    et: check,
  },
  {
    feature: "Leasing Fee",
    tip: "Covers entire tenant placement — marketing, showings, screening, lease execution, and move-in inspection.",
    sf: t("59% of one month's rent", "Min. $699"),
    mf: t("69% of one month's rent", "Min. $699"),
    et: g("−5% discount"),
  },
  {
    feature: "Lease Renewal",
    sf: t("$199 / renewal"),
    mf: t("$199 / renewal"),
    et: g("−$50 per renewal"),
  },
  {
    feature: "Late Fees",
    sf: t("100% to manager"),
    mf: t("100% to manager"),
    et: g("50% manager / 50% owner"),
  },
  {
    feature: "Pet Damage",
    tip: "Covers pet-related damage above and beyond the security deposit.",
    sf: t('Up to $1,000 for "pets"'),
    mf: t('Up to $1,000 for "pets"'),
    et: g("Service & companion animals also covered"),
  },
  {
    feature: "Property Protection",
    sf: dash,
    mf: dash,
    et: g("Up to $35,000", "Malicious damage + $15K theft"),
  },
  {
    feature: "Rent Guarantee",
    sf: dash,
    mf: dash,
    et: g("Up to 25 weeks", "Capped at $3,000 / month"),
  },
  {
    feature: "Eviction Coverage",
    sf: t("Coordination included"),
    mf: t("Coordination included"),
    et: g("Up to $6,000 refunded"),
  },
];

function renderCell(cell: Cell) {
  if (cell.type === "check") return <Check />;
  if (cell.type === "dash") return <Dash />;
  return (
    <span className={`font-body text-sm leading-snug ${cell.gold ? "text-[#B4975A]" : "text-white/80"}`}>
      {cell.value}
      {cell.sub && (
        <span className="block text-xs text-white/35 mt-0.5">{cell.sub}</span>
      )}
    </span>
  );
}

const ET_GUARANTEES = [
  {
    title: "Property Protection",
    amount: "Up to $35,000",
    body: "Covers malicious tenant damage up to $35,000, plus theft or theft damage up to $15,000.",
  },
  {
    title: "Rent Guarantee",
    amount: "Up to 25 Weeks",
    body: "Covers lost rent for up to 25 weeks due to lease breaks, evictions, death, or other qualifying events — capped at $3,000/month.",
  },
  {
    title: "Eviction Protection",
    amount: "Up to $6,000",
    body: "Eviction-related expenses refunded up to $6,000 — covering filing fees, legal defense, sheriff costs, and rekeying.",
  },
];

const ET_PERKS = [
  "5% discount off leasing fees on top of base rate",
  "Pet damage coverage extended to service and companion animals",
  "$50 discount on each lease renewal fee",
  "Late fees split 50/50 with owner instead of 100% to manager",
];

/* ── Main component ── */

export function DiffTable() {
  return (
    <div className="bg-[#121212] font-body text-white selection:bg-[#B4975A]/40">

      {/* ── PRICING SECTION ── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Headline */}
          <div className="mb-12">
            <h2 className="font-heading text-5xl text-white mb-4 tracking-tight">
              Transparent Pricing
            </h2>
            <p className="font-body text-base text-white/55 leading-relaxed max-w-2xl">
              All plans include full-service residential property management. The table below shows{" "}
              <a
                href="#whats-included"
                className="text-[#B4975A] underline underline-offset-2 hover:text-[#8a7142] transition-colors"
              >
                what varies by plan
              </a>
              .
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-white/10">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#B4975A]/30">
                  <th className="p-5 text-left text-xs tracking-[0.18em] uppercase text-white/30 font-semibold w-[34%]">
                    Feature
                  </th>
                  <th className="p-5 text-left text-xs tracking-[0.18em] uppercase text-white/70 font-semibold w-[22%]">
                    Single-Family
                  </th>
                  <th className="p-5 text-left text-xs tracking-[0.18em] uppercase text-white/70 font-semibold w-[22%]">
                    Multi-Family
                  </th>
                  <th className="p-5 text-left text-xs tracking-[0.18em] uppercase text-[#B4975A] font-semibold w-[22%]">
                    ET+
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/8 ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}
                  >
                    <td className="p-5 pr-8">
                      <span className="font-body text-sm text-white/70 leading-snug inline-flex items-baseline flex-wrap gap-x-0.5">
                        {row.feature}
                        {row.tip && <Tip text={row.tip} />}
                      </span>
                    </td>
                    <td className="p-5">{renderCell(row.sf)}</td>
                    <td className="p-5">{renderCell(row.mf)}</td>
                    <td className="p-5 border-l border-[#B4975A]/15">{renderCell(row.et)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Discounts */}
          <div className="mt-8 border-t border-white/8 pt-6 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8">
            <p className="font-body text-xs tracking-[0.15em] uppercase text-white/30 font-semibold shrink-0 mt-0.5">
              Volume Discounts
            </p>
            <p className="font-body text-sm text-white/45 leading-relaxed">
              Military / First Responders 5%&nbsp;&nbsp;·&nbsp;&nbsp;
              3–9 Units 5%&nbsp;&nbsp;·&nbsp;&nbsp;
              10–19 Units 10%&nbsp;&nbsp;·&nbsp;&nbsp;
              20+ Units 15%
            </p>
          </div>
        </div>
      </section>

      {/* ── ET+ BANNER ── */}
      <div className="w-full bg-[#B4975A]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">

          {/* Left: headline + subline + price */}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-4xl md:text-5xl text-[#121212] leading-tight mb-2">
              ET+ Protection Bundle
            </h3>
            <p className="font-body text-[#121212]/60 text-base italic mb-6">
              Used by EquityTeam principals on their own properties
            </p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-heading text-[52px] leading-none text-[#121212]">$59</span>
              <span className="font-body text-[#121212]/55 text-base">/unit/month</span>
            </div>
          </div>

          {/* Center: coverages */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Property Protection", value: "Up to $35,000" },
                { label: "Rent Guarantee", value: "Up to 25 weeks" },
                { label: "Eviction Coverage", value: "Up to $6,000" },
              ].map((item) => (
                <div key={item.label} className="border border-[#121212]/20 px-4 py-4 text-center">
                  <div className="font-heading text-2xl text-[#121212] mb-1">{item.value}</div>
                  <div className="font-body text-xs tracking-[0.12em] uppercase text-[#121212]/55 font-semibold">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div className="shrink-0">
            <a
              href="#et-plus"
              className="inline-block font-body font-semibold text-sm tracking-[0.18em] uppercase bg-[#121212] text-[#B4975A] px-8 py-4 hover:bg-[#1e1e1e] transition-colors"
            >
              Learn More About ET+ →
            </a>
          </div>
        </div>
      </div>

      {/* ── ET+ DETAIL SECTION ── */}
      <section id="et-plus" className="bg-white py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <span className="inline-block font-body font-semibold text-xs tracking-[0.2em] text-[#B4975A] uppercase border border-[#B4975A]/40 px-4 py-1.5 mb-5">
              Exclusive Add-On
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-[#121212] mb-4">
              ET+ Protection Bundle
            </h2>
            <p className="font-body text-[#121212]/65 text-base max-w-2xl mx-auto leading-relaxed">
              ET+ is an exclusive EquityTeam add-on that layers three major financial protections on top of your standard management plan. Available for units renting at $1,000 or more per month.
            </p>
          </div>

          <div className="border-4 border-[#121212] max-w-4xl mx-auto">
            {/* Price header */}
            <div className="bg-[#121212] px-8 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-2xl text-white uppercase tracking-[0.08em]">ET+ Add-On</h3>
                <p className="font-body text-white/55 text-sm mt-1">Added on top of your standard management rate</p>
              </div>
              <div className="text-center md:text-right">
                <span className="block font-heading text-[52px] leading-none text-[#B4975A]">$59</span>
                <span className="block font-body text-white/55 text-sm">per unit · per month</span>
              </div>
            </div>

            {/* Guarantee cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e0e0e0]">
              {ET_GUARANTEES.map((g) => (
                <div key={g.title} className="bg-white p-8 text-center">
                  <div className="font-body font-bold text-sm tracking-[0.12em] text-[#B4975A] uppercase mb-1">
                    {g.amount}
                  </div>
                  <h4 className="font-body font-bold text-base text-[#121212] mb-3">{g.title}</h4>
                  <p className="font-body text-sm text-[#121212]/65 leading-relaxed">{g.body}</p>
                </div>
              ))}
            </div>

            {/* Perks */}
            <div className="bg-white border-t border-[#e0e0e0] px-8 md:px-12 py-8">
              <p className="font-body font-semibold text-xs tracking-[0.18em] text-[#B4975A] uppercase mb-5">
                Also Included with ET+
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ET_PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <span className="text-[#B4975A] font-bold text-base leading-5 shrink-0">✓</span>
                    <span className="font-body text-sm text-[#121212]/75 leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <a
                  href="#contact"
                  className="inline-block font-body font-semibold text-sm tracking-[0.18em] uppercase border border-[#121212] text-[#121212] px-8 py-4 hover:bg-[#121212] hover:text-white transition-colors"
                >
                  Ask About ET+ When You Schedule a Consult
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
