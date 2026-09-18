import { useState, useMemo, useId } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { ConsultationLeadDialog } from "@/features/leads/ConsultationLeadDialog";
import { Link } from "wouter";

const GOLD = "#B4975A";

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString();
}

function InputField({
  label, value, onChange, prefix, suffix, step = 1, min = 0, help
}: {
  label: string; value: number; onChange: (v: number) => void;
  prefix?: string; suffix?: string; step?: number; min?: number; help?: string;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-col">
      <label htmlFor={id} className="mb-2 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.05em] text-white/60 xl:text-xs">{label}</label>
      <div className="flex items-center bg-white/5 border border-white/15 rounded px-3 py-2.5 focus-within:border-[#B4975A] transition-colors">
        {prefix && <span className="text-white/50 mr-1">{prefix}</span>}
        <input
          id={id}
          type="number" value={value} min={min} step={step}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 bg-transparent text-white font-semibold outline-none min-w-0"
        />
        {suffix && <span className="text-white/50 ml-1">{suffix}</span>}
      </div>
      <div className="min-h-7 pt-2">
        {help && <p className="text-sm leading-5 text-white/45">{help}</p>}
      </div>
    </div>
  );
}

interface CostItem { label: string; value: number; category: string; }

export default function EvictionCost() {
  const [monthlyRent, setMonthlyRent] = useState(1800);
  const [monthsNoPayment, setMonthsNoPayment] = useState(2);
  const [courtFilingFee, setCourtFilingFee] = useState(225);
  const [processFee, setProcessFee] = useState(75);
  const [attorneyFee, setAttorneyFee] = useState(1200);
  const [courtDate, setCourtDate] = useState(1);
  const [lockoutFee, setLockoutFee] = useState(200);
  const [storageCosts, setStorageCosts] = useState(150);
  const [cleaningCost, setCleaningCost] = useState(450);
  const [repairCost, setRepairCost] = useState(800);
  const [repaintCost, setRepaintCost] = useState(600);
  const [cargoRemoval, setCargoRemoval] = useState(0);
  const [marketingCost, setMarketingCost] = useState(200);
  const [vacancyDays, setVacancyDays] = useState(30);
  const [yourTimeHours, setYourTimeHours] = useState(20);
  const [yourHourlyRate, setYourHourlyRate] = useState(75);

  const results = useMemo(() => {
    const lostRent = monthlyRent * monthsNoPayment;
    const vacancyLoss = (monthlyRent / 30) * vacancyDays;
    const legalCosts = courtFilingFee + processFee + attorneyFee + (courtDate * 150);
    const moveCosts = lockoutFee + storageCosts + cargoRemoval;
    const repairCosts = cleaningCost + repairCost + repaintCost;
    const relisting = marketingCost;
    const timeCost = yourTimeHours * yourHourlyRate;

    const items: CostItem[] = [
      { label: "Unpaid Rent (while in unit)", value: lostRent, category: "Lost Income" },
      { label: "Vacancy Loss (re-renting period)", value: vacancyLoss, category: "Lost Income" },
      { label: "Court Filing Fee", value: courtFilingFee, category: "Legal" },
      { label: "Process Server Fee", value: processFee, category: "Legal" },
      { label: "Attorney Fees", value: attorneyFee, category: "Legal" },
      { label: "Court Appearance(s)", value: courtDate * 150, category: "Legal" },
      { label: "Lockout / Sheriff Fee", value: lockoutFee, category: "Move-Out" },
      { label: "Storage / Abandoned Items", value: storageCosts + cargoRemoval, category: "Move-Out" },
      { label: "Cleaning", value: cleaningCost, category: "Repairs" },
      { label: "Repairs", value: repairCost, category: "Repairs" },
      { label: "Repainting", value: repaintCost, category: "Repairs" },
      { label: "Marketing / Re-listing", value: relisting, category: "Re-Leasing" },
      { label: "Your Time Cost", value: timeCost, category: "Your Time" },
    ];

    const total = items.reduce((s, i) => s + i.value, 0);
    const categories = [...new Set(items.map(i => i.category))];

    return { items, total, lostRent, vacancyLoss, legalCosts, moveCosts, repairCosts, relisting, timeCost, categories };
  }, [monthlyRent, monthsNoPayment, courtFilingFee, processFee, attorneyFee, courtDate, lockoutFee, storageCosts, cleaningCost, repairCost, repaintCost, cargoRemoval, marketingCost, vacancyDays, yourTimeHours, yourHourlyRate]);

  const monthsOfRent = results.total / monthlyRent;

  const consultationSummary = useMemo(() => [
    `Estimated total eviction cost: ${fmt(results.total)}`,
    `Equivalent months of rent: ${monthsOfRent.toFixed(1)}`,
    `Monthly rent: ${fmt(monthlyRent)}`,
    `Months of unpaid rent: ${monthsNoPayment}`,
    `Days of vacancy after eviction: ${vacancyDays}`,
    `Lost rent: ${fmt(results.lostRent)}`,
    `Vacancy loss: ${fmt(results.vacancyLoss)}`,
    `Legal costs: ${fmt(results.legalCosts)}`,
    `Move-out costs: ${fmt(results.moveCosts)}`,
    `Repair costs: ${fmt(results.repairCosts)}`,
    `Re-listing costs: ${fmt(results.relisting)}`,
    `Owner time cost: ${fmt(results.timeCost)}`,
  ].join("\n"), [results, monthsOfRent, monthlyRent, monthsNoPayment, vacancyDays]);

  const categoryColors: Record<string, string> = {
    "Lost Income": "text-red-400",
    "Legal": "text-orange-400",
    "Move-Out": "text-yellow-400",
    "Repairs": "text-blue-400",
    "Re-Leasing": "text-purple-400",
    "Your Time": "text-pink-400",
  };

  return (
    <PageLayout>
      <SEO
        title="Eviction Cost Calculator | EquityTeam"
        description="Calculate the true total cost of an eviction — including lost rent, legal fees, repairs, and your time. See why prevention is always cheaper."
        canonical="/tools/eviction-cost"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Eviction Cost Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "EquityTeam Property Management", "url": "https://www.equityteam.com" },
        }}
      />

      <section className="bg-black pt-32 pb-16 px-5 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] mx-auto">
            Eviction Cost Calculator
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Evictions are far more expensive than most owners realize. Calculate the true all-in cost and understand why quality tenant screening is your best investment.
          </p>
        </div>
      </section>

      <section className="bg-black pb-24 px-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Inputs */}
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Lost Income</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} prefix="$" />
                  <InputField label="Months of Unpaid Rent" value={monthsNoPayment} onChange={setMonthsNoPayment} min={0} step={0.5} help="While eviction plays out" />
                  <InputField label="Days of Vacancy After Eviction" value={vacancyDays} onChange={setVacancyDays} min={0} help="Time to re-rent the unit" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Legal Costs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Court Filing Fee" value={courtFilingFee} onChange={setCourtFilingFee} prefix="$" />
                  <InputField label="Process Server Fee" value={processFee} onChange={setProcessFee} prefix="$" />
                  <InputField label="Attorney / Legal Fees" value={attorneyFee} onChange={setAttorneyFee} prefix="$" />
                  <InputField label="Court Appearances" value={courtDate} onChange={setCourtDate} min={0} />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Move-Out & Repairs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Lockout / Sheriff Fee" value={lockoutFee} onChange={setLockoutFee} prefix="$" />
                  <InputField label="Abandoned Items / Storage" value={storageCosts} onChange={setStorageCosts} prefix="$" />
                  <InputField label="Cleaning Cost" value={cleaningCost} onChange={setCleaningCost} prefix="$" />
                  <InputField label="Repairs" value={repairCost} onChange={setRepairCost} prefix="$" />
                  <InputField label="Repainting" value={repaintCost} onChange={setRepaintCost} prefix="$" />
                  <InputField label="Marketing / Re-listing" value={marketingCost} onChange={setMarketingCost} prefix="$" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Your Time</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Hours You'll Spend" value={yourTimeHours} onChange={setYourTimeHours} min={0} />
                  <InputField label="Your Hourly Rate" value={yourHourlyRate} onChange={setYourHourlyRate} prefix="$" />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-6">
              {/* Total */}
              <div className="bg-red-900/10 border border-red-500/40 rounded-lg p-8 text-center">
                <p className="text-base font-bold tracking-[0.12em] uppercase mb-3 text-white/60">Estimated Total Eviction Cost</p>
                <p className="font-bold text-[28px] sm:text-5xl text-red-400 mb-2">{fmt(results.total)}</p>
                <p className="text-white/60 text-base">≈ {monthsOfRent.toFixed(1)} months of rent</p>
              </div>

              {/* Cost breakdown by category */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4">Cost Breakdown</h3>
                <div className="space-y-1">
                  {results.items.filter(i => i.value > 0).map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${categoryColors[item.category] || "text-white/60"}`}>
                          [{item.category}]
                        </span>
                        <span className="text-white/70 text-base">{item.label}</span>
                      </div>
                      <span className="font-semibold text-white text-base">{fmt(item.value)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 mt-2">
                    <span className="font-bold text-red-400">TOTAL</span>
                    <span className="font-bold text-red-400 text-xl">{fmt(results.total)}</span>
                  </div>
                </div>
              </div>

              {/* Prevention message */}
              <div className="bg-[#B4975A]/10 border border-[#B4975A]/30 rounded-lg p-6">
                <h3 className="font-bold text-white mb-3" style={{ color: GOLD }}>Prevention is Always Cheaper</h3>
                <p className="text-white/70 text-base leading-relaxed mb-4">
                  Professional tenant screening — credit checks, income verification, rental history, and background checks — typically costs $35–75 per application but can save you {fmt(results.total)} or more per avoided eviction.
                </p>
                <p className="text-white/70 text-base leading-relaxed">
                  EquityTeam's professional management includes rigorous tenant screening, documented lease enforcement, and Ohio eviction process expertise — protecting your investment before a problem ever starts.
                </p>
              </div>
              <ConsultationLeadDialog summary={consultationSummary} source="Eviction Cost Calculator – Consultation Request" />
            </div>
          </div>

          <p className="mt-8 text-white/30 text-base text-center">These estimates are averages for the Greater Cincinnati area. Actual costs vary by county, attorney, and property condition. Not legal advice.</p>
        </div>
      </section>

      <section className="py-16 bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-5 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 p-5 md:p-10 md:px-20" style={{ border: `4px solid ${GOLD}` }}>
            <span className="font-bold text-3xl md:text-4xl text-white text-center">Protect Your Investment</span>
            <Link href="/free-rental-analysis" className="btn-solid-secondary whitespace-nowrap">Get a Free Rental Analysis</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
