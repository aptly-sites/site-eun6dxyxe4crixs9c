import { useState, useMemo } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { CalculatorReportDialog } from "@/features/leads/CalculatorReportDialog";
import { VerifiedAddressField, type VerifiedAddress } from "@/features/leads/VerifiedAddressField";

const GOLD = "#B4975A";

function fmt(n: number, decimals = 0) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
function fmtPct(n: number) { return n.toFixed(1) + "%"; }

function InputField({
  label, value, onChange, prefix, suffix, step = 1, min = 0, max
}: {
  label: string; value: number; onChange: (v: number) => void;
  prefix?: string; suffix?: string; step?: number; min?: number; max?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-bold tracking-[0.08em] uppercase text-white/60">{label}</label>
      <div className="flex items-center bg-white/5 border border-white/15 rounded px-3 py-2.5 focus-within:border-[#B4975A] transition-colors">
        {prefix && <span className="text-white/50 mr-1">{prefix}</span>}
        <input
          type="number" value={value} min={min} max={max} step={step}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 bg-transparent text-white font-semibold outline-none min-w-0"
        />
        {suffix && <span className="text-white/50 ml-1">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultRow({ label, value, highlight = false, positive = true }: { label: string; value: string; highlight?: boolean; positive?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-3 border-b border-white/10 ${highlight ? "bg-white/5 px-3 -mx-3 rounded" : ""}`}>
      <span className={`text-base ${highlight ? "font-bold text-white" : "text-white/70"}`}>{label}</span>
      <span className={`font-bold text-base ${highlight ? (positive ? "text-green-400" : "text-red-400") : "text-white"}`}>{value}</span>
    </div>
  );
}

export default function PmiFeeRoi() {
  const [propertyAddress, setPropertyAddress] = useState<VerifiedAddress | null>(null);
  const [monthlyRent, setMonthlyRent] = useState(2400);
  const [pmFee, setPmFee] = useState(8.9);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [hoursPerMonth, setHoursPerMonth] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [maintenanceSavings, setMaintenanceSavings] = useState(150);
  const [vacancyDaysSelf, setVacancyDaysSelf] = useState(45);
  const [vacancyDaysPm, setVacancyDaysPm] = useState(21);
  const [numUnits, setNumUnits] = useState(1);

  const results = useMemo(() => {
    const annualRent = monthlyRent * 12 * numUnits;
    const annualPmFee = annualRent * (pmFee / 100) * (1 - vacancyRate / 100);
    const annualTimeCost = hoursPerMonth * hourlyRate * 12 * numUnits;
    const annualMaintenanceSavings = maintenanceSavings * 12 * numUnits;

    const vacancyLossSelf = (monthlyRent / 30) * vacancyDaysSelf * numUnits;
    const vacancyLossPm = (monthlyRent / 30) * vacancyDaysPm * numUnits;
    const vacancyDifference = vacancyLossSelf - vacancyLossPm;

    const totalBenefitOfPm = annualTimeCost + annualMaintenanceSavings + vacancyDifference;
    const netRoi = totalBenefitOfPm - annualPmFee;
    const roiPct = annualPmFee > 0 ? (netRoi / annualPmFee) * 100 : 0;
    const breakEvenMonths = netRoi >= 0 ? 0 : Math.abs(netRoi / (totalBenefitOfPm / 12 - annualPmFee / 12));

    return {
      annualRent,
      annualPmFee,
      annualTimeCost,
      annualMaintenanceSavings,
      vacancyDifference,
      totalBenefitOfPm,
      netRoi,
      roiPct,
      breakEvenMonths,
    };
  }, [monthlyRent, pmFee, vacancyRate, hoursPerMonth, hourlyRate, maintenanceSavings, vacancyDaysSelf, vacancyDaysPm, numUnits]);

  const isPositive = results.netRoi >= 0;
  const reportSummary = useMemo(() => [
    `Property: ${propertyAddress?.address || "Not provided"}`,
    `Portfolio: ${numUnits} unit${numUnits === 1 ? "" : "s"} at ${fmt(monthlyRent)} monthly rent per unit`,
    `Management assumptions: ${fmtPct(pmFee)} fee and ${fmtPct(vacancyRate)} vacancy`,
    `Owner time: ${hoursPerMonth} hours per month valued at ${fmt(hourlyRate)} per hour`,
    `Estimated maintenance savings: ${fmt(maintenanceSavings)} per month per unit`,
    `Vacancy assumption: ${vacancyDaysSelf} self-managed days versus ${vacancyDaysPm} days with professional management`,
    `Estimated annual management fee: ${fmt(results.annualPmFee)}`,
    `Estimated annual time savings: ${fmt(results.annualTimeCost)}`,
    `Estimated annual maintenance savings: ${fmt(results.annualMaintenanceSavings)}`,
    `Estimated vacancy reduction value: ${fmt(results.vacancyDifference)}`,
    `Estimated total annual benefit: ${fmt(results.totalBenefitOfPm)}`,
    `Estimated annual net ROI: ${fmt(results.netRoi)} (${fmtPct(results.roiPct)} return on the management fee)`,
  ].join("\n"), [propertyAddress, numUnits, monthlyRent, pmFee, vacancyRate, hoursPerMonth, hourlyRate, maintenanceSavings, vacancyDaysSelf, vacancyDaysPm, results]);

  return (
    <PageLayout>
      <SEO
        title="Property Management Fee ROI Calculator | EquityTeam"
        description="Is hiring a property manager worth it? Calculate your true ROI from professional property management vs. self-managing."
        canonical="/tools/pm-fee-roi"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Property Management Fee ROI Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "EquityTeam Property Management", "url": "https://www.equityteam.com" },
        }}
      />

      <section className="bg-black pt-32 pb-16 px-5 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] mx-auto">
            PM Fee ROI Calculator
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Is professional property management worth the fee? Calculate the true return on your management investment — including your time, vacancy savings, and maintenance value.
          </p>
        </div>
      </section>

      <section className="bg-black pb-24 px-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Inputs */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
              <h2 className="text-white font-bold text-xl mb-6 pb-4 border-b border-white/10">Your Property Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VerifiedAddressField value={propertyAddress} onChange={setPropertyAddress} />
                <InputField label="Number of Units" value={numUnits} onChange={setNumUnits} min={1} />
                <InputField label="Monthly Rent (per unit)" value={monthlyRent} onChange={setMonthlyRent} prefix="$" />
                <InputField label="PM Fee %" value={pmFee} onChange={setPmFee} suffix="%" step={0.1} />
                <InputField label="Vacancy Rate" value={vacancyRate} onChange={setVacancyRate} suffix="%" step={0.5} />
              </div>

              <h2 className="text-white font-bold text-xl mt-8 mb-4 pb-4 border-b border-white/10">Your Time Value</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Hours / Month Managing Yourself" value={hoursPerMonth} onChange={setHoursPerMonth} />
                <InputField label="Your Hourly Rate ($/hr)" value={hourlyRate} onChange={setHourlyRate} prefix="$" />
              </div>

              <h2 className="text-white font-bold text-xl mt-8 mb-4 pb-4 border-b border-white/10">PM Advantages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Monthly Maintenance Savings" value={maintenanceSavings} onChange={setMaintenanceSavings} prefix="$" />
                <div />
                <InputField label="Avg Vacancy Days (Self-Managed)" value={vacancyDaysSelf} onChange={setVacancyDaysSelf} min={0} />
                <InputField label="Avg Vacancy Days (With PM)" value={vacancyDaysPm} onChange={setVacancyDaysPm} min={0} />
              </div>
              <CalculatorReportDialog address={propertyAddress} summary={reportSummary} source="PM Fee ROI Calculator – Email Report" buttonLabel="Send me a copy of this report" title="Email my ROI report" />
            </div>

            {/* Results */}
            <div className="flex flex-col gap-6">
              {/* Net ROI Hero */}
              <div className={`rounded-lg p-8 text-center border ${isPositive ? "border-green-500/30 bg-green-900/10" : "border-red-500/30 bg-red-900/10"}`}>
                <p className="text-base font-bold tracking-[0.12em] uppercase mb-3 text-white/60">Annual Net ROI of Hiring a PM</p>
                <p className={`font-bold text-[28px] sm:text-5xl mb-2 ${isPositive ? "text-green-400" : "text-red-400"}`}>
                  {isPositive ? "+" : ""}{fmt(results.netRoi)}
                </p>
                <p className="text-white/60 text-base">
                  {isPositive
                    ? `Property management pays for itself and then some — ${fmtPct(results.roiPct)} ROI on the fee`
                    : "Consider the non-financial benefits: peace of mind, legal protection, and tenant quality"}
                </p>
              </div>

              {/* Breakdown */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4">Annual Cost–Benefit Breakdown</h3>

                <div className="mb-4">
                  <p className="text-base font-bold tracking-[0.1em] uppercase text-white/40 mb-2">Annual PM Fee (Cost)</p>
                  <ResultRow label="Property Management Fee" value={`-${fmt(results.annualPmFee)}`} />
                </div>

                <div>
                  <p className="text-base font-bold tracking-[0.1em] uppercase text-white/40 mb-2">Benefits of Hiring a PM</p>
                  <ResultRow label="Time Savings (your hours × hourly rate)" value={fmt(results.annualTimeCost)} />
                  <ResultRow label="Maintenance Cost Savings" value={fmt(results.annualMaintenanceSavings)} />
                  <ResultRow label="Vacancy Reduction Value" value={fmt(results.vacancyDifference)} positive={results.vacancyDifference >= 0} />
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <ResultRow label="Total Annual Benefit" value={fmt(results.totalBenefitOfPm)} highlight positive />
                    <ResultRow label="Net ROI (Benefit – Fee)" value={`${isPositive ? "+" : ""}${fmt(results.netRoi)}`} highlight positive={isPositive} />
                  </div>
                </div>
              </div>

              {/* Additional context */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <p className="text-white/50 text-base leading-relaxed">
                  <strong className="text-white/70">Note:</strong> This calculator values your time at your specified hourly rate. Beyond dollars, professional management also provides legal protection, vetted tenant screening, coordinated maintenance, and peace of mind — benefits that are difficult to quantify.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-white/30 text-base text-center">These calculators provide estimates for informational purposes only. Not financial or legal advice.</p>
        </div>
      </section>

      <section className="py-16 bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-5 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 p-5 md:p-10 md:px-20" style={{ border: `4px solid ${GOLD}` }}>
            <span className="font-bold text-3xl md:text-4xl text-white text-center">See What We Charge</span>
            <Link href="/residential-property-management#pricing" className="btn-solid-secondary whitespace-nowrap">View Our Pricing</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
