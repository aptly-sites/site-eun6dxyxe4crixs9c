import { CalculatorReportDialog } from "@/features/leads/CalculatorReportDialog";
import { VerifiedAddressField, type VerifiedAddress } from "@/features/leads/VerifiedAddressField";
import { rentVsSell } from "@/features/calculators/math";
import { useState, useMemo, useId } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const GOLD = "#B4975A";

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString();
}

function InputField({
  label, value, onChange, prefix, suffix, step = 1, min = 0, max = 100000000
}: {
  label: string; value: number; onChange: (v: number) => void;
  prefix?: string; suffix?: string; step?: number; min?: number; max?: number;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-base font-bold tracking-[0.1em] uppercase text-white/60">{label}</label>
      <div className="flex items-center bg-white/5 border border-white/15 rounded px-3 py-2.5 focus-within:border-[#B4975A] transition-colors">
        {prefix && <span className="text-white/50 mr-1">{prefix}</span>}
        <input
          id={id}
          type="number"
          max={max}
          value={value}
          min={min}
          step={step}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
          className="flex-1 bg-transparent text-white font-semibold outline-none min-w-0"
        />
        {suffix && <span className="text-white/50 ml-1">{suffix}</span>}
      </div>
    </div>
  );
}

export default function RentVsSell() {
  const [propertyAddress, setPropertyAddress] = useState<VerifiedAddress | null>(null);
  const [homeValue, setHomeValue] = useState(800000);
  const [mortgageBalance, setMortgageBalance] = useState(580000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [monthlyPayment, setMonthlyPayment] = useState(3006);
  const [taxesInsurance, setTaxesInsurance] = useState(700);
  const [monthlyRent, setMonthlyRent] = useState(2880);
  const [appreciationRate, setAppreciationRate] = useState(5);
  const [yearsToHold, setYearsToHold] = useState(5);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [maintenanceRate, setMaintenanceRate] = useState(1);
  const [pmFeeRate, setPmFeeRate] = useState(8);
  const [investmentReturn, setInvestmentReturn] = useState(6);
  const [sellingCosts, setSellingCosts] = useState(7);
  const [rentGrowth, setRentGrowth] = useState(3);
  const [costInflation, setCostInflation] = useState(3);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [lockedYear, setLockedYear] = useState<number | null>(null);

  const data = useMemo(() => rentVsSell({homeValue, mortgageBalance, interestRate, monthlyPayment, taxesInsurance, monthlyRent, appreciationRate, yearsToHold, vacancyRate, maintenanceRate, pmFeeRate, investmentReturn, sellingCosts, rentGrowth, costInflation}), [homeValue, mortgageBalance, interestRate, monthlyPayment, taxesInsurance, monthlyRent, appreciationRate, yearsToHold, vacancyRate, maintenanceRate, pmFeeRate, investmentReturn, sellingCosts, rentGrowth, costInflation]);

  const activeYear = lockedYear ?? hoveredYear ?? yearsToHold;
  const activeRow = data.find(d => d.year === activeYear) ?? data[data.length - 1];
  const finalRow = data[data.length - 1];
  const rentWins = finalRow && finalRow.difference > 0;
  const reportSummary = useMemo(() => [
    `Property: ${propertyAddress?.address || "Not provided"}`,
    `Comparison period: ${yearsToHold} years`,
    `Current home value: ${fmt(homeValue)}`,
    `Mortgage balance: ${fmt(mortgageBalance)}`,
    `Mortgage rate: ${interestRate}%`,
    `Monthly principal and interest payment: ${fmt(monthlyPayment)}`,
    `Expected monthly rent: ${fmt(monthlyRent)}`,
    `Monthly taxes, insurance and HOA: ${fmt(taxesInsurance)}`,
    `Annual appreciation: ${appreciationRate}%`,
    `Annual rent growth: ${rentGrowth}%`,
    `Annual operating cost growth: ${costInflation}%`,
    `Vacancy: ${vacancyRate}%`,
    `Maintenance: ${maintenanceRate}% of property value annually`,
    `Property management: ${pmFeeRate}% of collected rent`,
    `Selling costs: ${sellingCosts}%`,
    `Alternative investment return: ${investmentReturn}%`,
    `Estimated wealth if rented out: ${fmt(finalRow.wealthRentOut)}`,
    `Estimated wealth if sold now: ${fmt(finalRow.wealthSellNow)}`,
    `Estimated before-tax difference: ${fmt(finalRow.difference)}`,
  ].join("\n"), [propertyAddress, yearsToHold, homeValue, mortgageBalance, interestRate, monthlyPayment, monthlyRent, taxesInsurance, appreciationRate, rentGrowth, costInflation, vacancyRate, maintenanceRate, pmFeeRate, sellingCosts, investmentReturn, finalRow]);

  return (
    <PageLayout>
      <SEO
        title="Rent vs. Sell Calculator | EquityTeam"
        description="Should you rent out or sell your property? Use our free Rent vs. Sell calculator to compare wealth outcomes over time."
        canonical="/tools/rent-vs-sell"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Rent vs. Sell Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "EquityTeam Property Management", "url": "https://www.equityteam.com" },
        }}
      />

      {/* Hero */}
      <section className="bg-black pt-32 pb-16 px-5 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] mx-auto">
            Rent vs. Sell Calculator
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Should you rent out your property or sell it now? Compare your wealth 5+ years into the future.
          </p>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="bg-black pb-24 px-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Inputs */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
              <h2 className="text-white font-bold text-xl mb-6 pb-4 border-b border-white/10">Your Property Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VerifiedAddressField value={propertyAddress} onChange={setPropertyAddress} />
                <InputField label="Home Value" value={homeValue} onChange={setHomeValue} prefix="$" />
                <InputField label="Mortgage Balance" value={mortgageBalance} onChange={setMortgageBalance} prefix="$" />
                <InputField label="Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" max={100} step={0.1} />
                <InputField label="Monthly Mortgage Payment" value={monthlyPayment} onChange={setMonthlyPayment} prefix="$" />
                <InputField label="Taxes, Ins, HOA / mo" value={taxesInsurance} onChange={setTaxesInsurance} prefix="$" />
                <InputField label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} prefix="$" />
                <InputField label="Appreciation Rate" value={appreciationRate} onChange={setAppreciationRate} suffix="%" max={100} step={0.5} />
                <div className="sm:col-span-2">
                  <label className="text-base font-bold tracking-[0.1em] uppercase text-white/60">Years to Hold: {yearsToHold}</label>
                  <input
                    aria-label="Years to hold" type="range" min={1} max={20} value={yearsToHold}
                    onChange={e => setYearsToHold(parseInt(e.target.value))}
                    className="w-full mt-2 accent-[#B4975A]"
                  />
                  <div className="flex justify-between text-white/40 text-base mt-1"><span>1</span><span>20</span></div>
                </div>

              </div>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="mt-4 text-base font-semibold transition-colors"
                style={{ color: GOLD }}
              >
                {showAdvanced ? "▲ Hide Advanced Inputs" : "▼ Advanced Inputs"}
              </button>

              {showAdvanced && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                  <InputField label="Selling costs (% of sale price)" value={sellingCosts} onChange={setSellingCosts} suffix="%" max={100} step={0.5} />
                  <InputField label="Annual rent growth" value={rentGrowth} onChange={setRentGrowth} suffix="%" min={-20} max={100} step={0.5} />
                  <InputField label="Annual operating cost growth" value={costInflation} onChange={setCostInflation} suffix="%" max={100} step={0.5} />
                  <InputField label="Vacancy Rate" value={vacancyRate} onChange={setVacancyRate} suffix="%" max={100} step={0.5} />
                  <InputField label="Maintenance (% of value/yr)" value={maintenanceRate} onChange={setMaintenanceRate} suffix="%" max={100} step={0.25} />
                  <InputField label="PM Fee %" value={pmFeeRate} onChange={setPmFeeRate} suffix="%" max={100} step={0.5} />
                  <InputField label="Investment Return (if sold)" value={investmentReturn} onChange={setInvestmentReturn} suffix="%" max={100} step={0.5} />
                </div>
              )}
              <CalculatorReportDialog address={propertyAddress} summary={reportSummary} source="Rent vs. Sell Calculator – Personalized Rental Analysis" buttonLabel="Send me the results" title="Email my Rent vs. Sell results" />
            </div>

            {/* Results */}
            <div className="flex flex-col gap-6">
              {finalRow && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 text-center">
                  <p className="text-base font-bold tracking-[0.12em] uppercase mb-3" style={{ color: GOLD }}>
                    In {yearsToHold} Year{yearsToHold !== 1 ? "s" : ""}, If You RENT OUT…
                  </p>
                  <p className="text-white text-3xl md:text-4xl font-bold mb-2">
                    Estimated {' '}
                    <span style={{ color: GOLD }}>
                      {fmt(Math.abs(finalRow.difference))} {rentWins ? "MORE" : "LESS"}
                    </span>
                  </p>
                  <p className="text-white/60 text-base">difference before taxes compared to selling now</p>
                </div>
              )}

              {/* Chart */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
                <p className="text-white/60 text-base text-center mb-3">Hover or click years to explore · Click to lock</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={data}
                    onMouseMove={(e) => { if (e.activePayload) setHoveredYear(e.activePayload[0]?.payload?.year); }}
                    onMouseLeave={() => setHoveredYear(null)}
                    onClick={(e) => {
                      if (e.activePayload) {
                        const yr = e.activePayload[0]?.payload?.year;
                        setLockedYear(lockedYear === yr ? null : yr);
                      }
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" stroke="#ffffff40" tick={{ fill: "#ffffff60", fontSize: 11 }} label={{ value: "Year", position: "insideBottom", offset: -2, fill: "#ffffff40", fontSize: 11 }} />
                    <YAxis stroke="#ffffff40" tick={{ fill: "#ffffff60", fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111", border: "1px solid #B4975A", borderRadius: 6 }}
                      labelStyle={{ color: GOLD, fontWeight: "bold" }}
                      itemStyle={{ color: "#fff" }}
                      formatter={(v: number) => fmt(v)}
                      labelFormatter={l => `Year ${l}`}
                    />
                    <Legend wrapperStyle={{ color: "#ffffff80", fontSize: 12 }} />
                    <Line type="monotone" dataKey="wealthRentOut" name="Rent Out" stroke={GOLD} strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="wealthSellNow" name="Sell Now" stroke="#888" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>

                {activeRow && (
                  <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                    {[
                      { label: "Year", val: `${activeRow.year}` },
                      { label: "Rent Out", val: fmt(activeRow.wealthRentOut) },
                      { label: "Sell Now", val: fmt(activeRow.wealthSellNow) },
                    ].map(({ label, val }) => (
                      <div key={label} className="bg-black/30 rounded p-2">
                        <p className="text-white/50 text-base uppercase tracking-[0.15em]">{label}</p>
                        <p className="text-white font-bold text-base">{val}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Year-by-year table */}
          {data.length > 0 && (
            <div className="mt-10 overflow-x-auto">
              <h3 className="text-white font-bold text-lg mb-4">Year-by-Year Breakdown</h3>
              <table className="w-full text-base text-white/80 border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Year","Rental Income","Mortgage","Other Costs","Net Cash Flow","House Value","Equity","Wealth (Rent)","Wealth (Sell)","Difference"].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-base font-bold tracking-wider text-white/40 uppercase whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.year} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-2 px-3 font-bold" style={{ color: GOLD }}>{row.year}</td>
                      <td className="py-2 px-3">{fmt(row.rentalIncome)}</td>
                      <td className="py-2 px-3 text-red-400">{fmt(row.mortgageExpense)}</td>
                      <td className="py-2 px-3 text-red-400">{fmt(row.otherCosts)}</td>
                      <td className={`py-2 px-3 font-semibold ${row.netCashFlow >= 0 ? "text-green-400" : "text-red-400"}`}>{fmt(row.netCashFlow)}</td>
                      <td className="py-2 px-3">{fmt(row.houseValue)}</td>
                      <td className="py-2 px-3">{fmt(row.houseEquity)}</td>
                      <td className="py-2 px-3 font-semibold text-white">{fmt(row.wealthRentOut)}</td>
                      <td className="py-2 px-3 text-white/60">{fmt(row.wealthSellNow)}</td>
                      <td className={`py-2 px-3 font-bold ${row.difference >= 0 ? "text-green-400" : "text-red-400"}`}>{fmt(row.difference)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 text-white/80 text-base space-y-3">
            <h3 className="font-bold text-xl">How this estimate works</h3>
            <p>Rent out: future sale value minus selling costs and remaining mortgage, plus cumulative rental cash flow. Sell now: current sale proceeds after selling costs and mortgage payoff, grown at your investment return.</p>
            <p>Rent is reduced for vacancy and management fees. Costs include monthly mortgage principal and interest, taxes/insurance/HOA, and annual maintenance as a percentage of property value. Mortgage payments stop at payoff; payments below interest increase the balance. Rental cash flow is not reinvested.</p>
            <p>Default assumptions: {sellingCosts}% selling costs, {rentGrowth}% annual rent growth, and {costInflation}% annual operating cost growth. Change these in Advanced Inputs. Both outcomes exclude income taxes, capital gains, depreciation, and extraordinary repairs. Inputs remain in your browser.</p>
            <Link href="/tools/rent-affordability" className="underline">Looking for a home? Estimate your rent budget.</Link>
          </div>
          {/* Disclaimer */}
          <p className="mt-8 text-white/30 text-base text-center">These calculators provide estimates for informational purposes only. Not financial or tax advice.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-5 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 p-5 md:p-10 md:px-20" style={{ border: `4px solid ${GOLD}` }}>
            <span className="font-bold text-3xl md:text-4xl text-white text-center">Ready to Make Your Move?</span>
            <Link href="/free-rental-analysis" className="btn-solid-secondary whitespace-nowrap">Get a Free Rental Analysis</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
