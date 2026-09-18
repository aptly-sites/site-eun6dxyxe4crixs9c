import { useState, useMemo, useId } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { ConsultationLeadDialog } from "@/features/leads/ConsultationLeadDialog";
import { VerifiedAddressField, type VerifiedAddress } from "@/features/leads/VerifiedAddressField";
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

export default function VacancyCost() {
  const [propertyAddress, setPropertyAddress] = useState<VerifiedAddress | null>(null);
  const [monthlyRent, setMonthlyRent] = useState(1800);
  const [numUnits, setNumUnits] = useState(1);
  const [avgVacancyDaysSelf, setAvgVacancyDaysSelf] = useState(45);
  const [avgVacancyDaysPm, setAvgVacancyDaysPm] = useState(21);
  const [mortgage, setMortgage] = useState(1400);
  const [taxes, setTaxes] = useState(300);
  const [insurance, setInsurance] = useState(150);
  const [utilities, setUtilities] = useState(100);
  const [marketingCostSelf, setMarketingCostSelf] = useState(300);
  const [marketingCostPm, setMarketingCostPm] = useState(0);
  const [showingTimeHours, setShowingTimeHours] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [pmFee, setPmFee] = useState(8.9);

  const results = useMemo(() => {
    const dailyRent = monthlyRent / 30;
    const monthlyHoldingCosts = mortgage + taxes + insurance + utilities;
    const dailyHoldingCosts = monthlyHoldingCosts / 30;

    const annualVacancySelf = avgVacancyDaysSelf * numUnits;
    const annualVacancyPm = avgVacancyDaysPm * numUnits;

    const lostRentSelf = dailyRent * annualVacancySelf;
    const holdingCostsDuringSelf = dailyHoldingCosts * annualVacancySelf;
    const marketingSelf = marketingCostSelf * numUnits;
    const timeCostSelf = showingTimeHours * hourlyRate * numUnits;
    const totalCostSelf = lostRentSelf + holdingCostsDuringSelf + marketingSelf + timeCostSelf;

    const annualRent = monthlyRent * 12 * numUnits;
    const lostRentPm = dailyRent * annualVacancyPm;
    const holdingCostsDuringPm = dailyHoldingCosts * annualVacancyPm;
    const annualPmFee = annualRent * (pmFee / 100) * (1 - avgVacancyDaysPm / 365);
    const totalCostPm = lostRentPm + holdingCostsDuringPm + annualPmFee;

    const annualSavingsWithPm = totalCostSelf - totalCostPm;
    const daysReduced = avgVacancyDaysSelf - avgVacancyDaysPm;

    return {
      dailyRent,
      lostRentSelf, holdingCostsDuringSelf, marketingSelf, timeCostSelf, totalCostSelf,
      lostRentPm, holdingCostsDuringPm, annualPmFee, totalCostPm,
      annualSavingsWithPm, daysReduced,
      annualVacancySelf, annualVacancyPm,
    };
  }, [monthlyRent, numUnits, avgVacancyDaysSelf, avgVacancyDaysPm, mortgage, taxes, insurance, utilities, marketingCostSelf, marketingCostPm, showingTimeHours, hourlyRate, pmFee]);

  const consultationSummary = useMemo(() => [
    `Number of units: ${numUnits}`,
    `Monthly rent per unit: ${fmt(monthlyRent)}`,
    `Average vacancy days when self-managed: ${avgVacancyDaysSelf}`,
    `Average vacancy days with professional management: ${avgVacancyDaysPm}`,
    `Estimated annual self-managed cost: ${fmt(results.totalCostSelf)}`,
    `Estimated annual professionally managed cost: ${fmt(results.totalCostPm)}`,
    `Estimated annual savings with professional management: ${fmt(results.annualSavingsWithPm)}`,
    `Vacancy days reduced per unit: ${results.daysReduced}`,
    `Daily vacancy cost: ${fmt(results.dailyRent + (mortgage + taxes + insurance + utilities) / 30)}`,
    `Management fee used: ${pmFee}%`,
  ].join("\n"), [numUnits, monthlyRent, avgVacancyDaysSelf, avgVacancyDaysPm, results, mortgage, taxes, insurance, utilities, pmFee]);

  return (
    <PageLayout>
      <SEO
        title="Vacancy Cost Calculator | EquityTeam"
        description="Calculate the true cost of rental vacancy — including lost rent, holding costs, marketing, and your time. Compare self-managed vs. professional management."
        canonical="/tools/vacancy-cost"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Vacancy Cost Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "EquityTeam Property Management", "url": "https://www.equityteam.com" },
        }}
      />

      <section className="bg-black pt-32 pb-16 px-5 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] mx-auto">
            Vacancy Cost Calculator
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Vacancy is your biggest hidden expense. Calculate what it really costs you per year — and how much faster professional management fills your unit.
          </p>
        </div>
      </section>

      <section className="bg-black pb-24 px-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Inputs */}
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Property Basics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <VerifiedAddressField value={propertyAddress} onChange={setPropertyAddress} />
                  <InputField label="Number of Units" value={numUnits} onChange={setNumUnits} min={1} />
                  <InputField label="Monthly Rent (per unit)" value={monthlyRent} onChange={setMonthlyRent} prefix="$" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Vacancy Duration</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Avg Days Vacant (Self-Managed)" value={avgVacancyDaysSelf} onChange={setAvgVacancyDaysSelf} help="Cincinnati avg: 45–60 days" />
                  <InputField label="Avg Days Vacant (With PM)" value={avgVacancyDaysPm} onChange={setAvgVacancyDaysPm} help="EquityTeam avg: 21 days" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Monthly Holding Costs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Mortgage Payment" value={mortgage} onChange={setMortgage} prefix="$" />
                  <InputField label="Property Taxes / mo" value={taxes} onChange={setTaxes} prefix="$" />
                  <InputField label="Insurance / mo" value={insurance} onChange={setInsurance} prefix="$" />
                  <InputField label="Utilities / mo" value={utilities} onChange={setUtilities} prefix="$" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Self-Managed Costs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Marketing / Listing Costs" value={marketingCostSelf} onChange={setMarketingCostSelf} prefix="$" />
                  <InputField label="Hours for Showings & Screening" value={showingTimeHours} onChange={setShowingTimeHours} />
                  <InputField label="Your Hourly Rate" value={hourlyRate} onChange={setHourlyRate} prefix="$" />
                  <InputField label="PM Fee %" value={pmFee} onChange={setPmFee} suffix="%" step={0.1} />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-6">
              {/* Hero comparison */}
              <div className="bg-[#B4975A]/10 border border-[#B4975A]/40 rounded-lg p-8 text-center">
                <p className="text-base font-bold tracking-[0.12em] uppercase mb-3 text-white/60">Annual Savings With Professional Management</p>
                <p className={`font-bold text-[28px] sm:text-5xl mb-2 ${results.annualSavingsWithPm >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {results.annualSavingsWithPm >= 0 ? "+" : ""}{fmt(results.annualSavingsWithPm)}
                </p>
                <p className="text-white/60 text-base">{results.daysReduced} fewer vacancy days per year (per unit)</p>
              </div>

              {/* Side by side breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-base font-bold tracking-[0.1em] uppercase text-white/40 mb-3 text-center">Self-Managed</p>
                  {[
                    { label: "Lost Rent", value: results.lostRentSelf },
                    { label: "Holding Costs", value: results.holdingCostsDuringSelf },
                    { label: "Marketing", value: results.marketingSelf },
                    { label: "Your Time", value: results.timeCostSelf },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-1.5 border-b border-white/5 text-base">
                      <span className="text-white/60">{label}</span>
                      <span className="text-red-400 font-semibold">{fmt(value)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 mt-1 font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-red-400">{fmt(results.totalCostSelf)}</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-[#B4975A]/30 rounded-lg p-4">
                  <p className="text-base font-bold tracking-[0.1em] uppercase mb-3 text-center" style={{ color: GOLD }}>With PM</p>
                  {[
                    { label: "Lost Rent", value: results.lostRentPm },
                    { label: "Holding Costs", value: results.holdingCostsDuringPm },
                    { label: "PM Fee", value: results.annualPmFee },
                    { label: "Your Time", value: 0 },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-1.5 border-b border-white/5 text-base">
                      <span className="text-white/60">{label}</span>
                      <span className="text-white/80 font-semibold">{fmt(value)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 mt-1 font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-green-400">{fmt(results.totalCostPm)}</span>
                  </div>
                </div>
              </div>

              {/* Daily cost clock */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
                <p className="text-white/50 text-base uppercase tracking-[0.15em] mb-2">Every Day Your Unit Sits Vacant Costs You</p>
                <p className="font-bold text-[28px] sm:text-4xl text-white">{fmt(results.dailyRent + (mortgage + taxes + insurance + utilities) / 30)}</p>
                <p className="text-white/40 text-base mt-1">Lost rent + holding costs per day</p>
              </div>

              {/* EquityTeam guarantee */}
              <div className="bg-[#B4975A]/10 border border-[#B4975A]/30 rounded-lg p-6">
                <p className="font-bold mb-2" style={{ color: GOLD }}>EquityTeam's 21-Day Lease Guarantee</p>
                <p className="text-white/70 text-base leading-relaxed">
                  We guarantee to have your unit under application within 21 days of listing, or we waive our first month's management fee. Our proven marketing system, professional photography, and prescreened tenant database make faster placements standard practice — not the exception.
                </p>
              </div>
              <ConsultationLeadDialog
                summary={consultationSummary}
                source="Vacancy Cost Calculator – Consultation Request"
                address={propertyAddress}
                requireAddress
              />
            </div>
          </div>

          <p className="mt-8 text-white/30 text-base text-center">These calculators provide estimates for informational purposes only. Actual results vary by market conditions and property.</p>
        </div>
      </section>

      <section className="py-16 bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-5 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 p-5 md:p-10 md:px-20" style={{ border: `4px solid ${GOLD}` }}>
            <span className="font-bold text-3xl md:text-4xl text-white text-center">Stop Losing Money to Vacancy</span>
            <Link href="/free-rental-analysis" className="btn-solid-secondary whitespace-nowrap">Get a Free Analysis</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
