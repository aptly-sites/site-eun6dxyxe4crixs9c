import { useState, useMemo, useId } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { CalculatorReportDialog } from "@/features/leads/CalculatorReportDialog";
import { VerifiedAddressField, type VerifiedAddress } from "@/features/leads/VerifiedAddressField";
import { Link } from "wouter";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

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

function MetricBox({ label, value, sub, color = "text-white" }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-5 text-center">
      <p className="text-white/50 text-base uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-bold text-2xl ${color}`}>{value}</p>
      {sub && <p className="text-white/40 text-base mt-1">{sub}</p>}
    </div>
  );
}

export default function StrVsLtr() {
  const [propertyAddress, setPropertyAddress] = useState<VerifiedAddress | null>(null);
  // STR inputs
  const [strNightlyRate, setStrNightlyRate] = useState(185);
  const [strOccupancy, setStrOccupancy] = useState(65);
  const [strMgmtFee, setStrMgmtFee] = useState(25);
  const [strCleaning, setStrCleaning] = useState(85);
  const [strTurnoverDays, setStrTurnoverDays] = useState(2.5);
  const [strFurnishing, setStrFurnishing] = useState(300);
  const [strUtilities, setStrUtilities] = useState(250);
  const [strInsurance, setStrInsurance] = useState(200);
  const [strMaintenance, setStrMaintenance] = useState(200);

  // LTR inputs
  const [ltrMonthlyRent, setLtrMonthlyRent] = useState(1800);
  const [ltrVacancy, setLtrVacancy] = useState(5);
  const [ltrMgmtFee, setLtrMgmtFee] = useState(8.9);
  const [ltrMaintenance, setLtrMaintenance] = useState(150);
  const [ltrInsurance, setLtrInsurance] = useState(100);
  const [ltrUtilities, setLtrUtilities] = useState(0);

  const [activeTab, setActiveTab] = useState<"annual" | "monthly">("annual");

  const results = useMemo(() => {
    // STR annual calculation
    const strOccupiedNights = 365 * (strOccupancy / 100);
    const strTurnovers = strOccupiedNights / strTurnoverDays;
    const strGrossRevenue = strNightlyRate * strOccupiedNights;
    const strMgmtCost = strGrossRevenue * (strMgmtFee / 100);
    const strCleaningCost = strCleaning * strTurnovers;
    const strAnnualExpenses = strMgmtCost + strCleaningCost + (strFurnishing * 12) + (strUtilities * 12) + (strInsurance * 12) + (strMaintenance * 12);
    const strNetIncome = strGrossRevenue - strAnnualExpenses;

    // LTR annual calculation
    const ltrGrossRevenue = ltrMonthlyRent * 12 * (1 - ltrVacancy / 100);
    const ltrMgmtCost = ltrGrossRevenue * (ltrMgmtFee / 100);
    const ltrAnnualExpenses = ltrMgmtCost + (ltrMaintenance * 12) + (ltrInsurance * 12) + (ltrUtilities * 12);
    const ltrNetIncome = ltrGrossRevenue - ltrAnnualExpenses;

    const difference = strNetIncome - ltrNetIncome;
    const strWins = strNetIncome > ltrNetIncome;

    const monthlyData = [
      { month: "Jan", STR: Math.round(strNetIncome / 12 * 0.6), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Feb", STR: Math.round(strNetIncome / 12 * 0.65), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Mar", STR: Math.round(strNetIncome / 12 * 0.85), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Apr", STR: Math.round(strNetIncome / 12 * 0.95), LTR: Math.round(ltrNetIncome / 12) },
      { month: "May", STR: Math.round(strNetIncome / 12 * 1.15), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Jun", STR: Math.round(strNetIncome / 12 * 1.4), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Jul", STR: Math.round(strNetIncome / 12 * 1.5), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Aug", STR: Math.round(strNetIncome / 12 * 1.35), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Sep", STR: Math.round(strNetIncome / 12 * 1.1), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Oct", STR: Math.round(strNetIncome / 12 * 0.9), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Nov", STR: Math.round(strNetIncome / 12 * 0.7), LTR: Math.round(ltrNetIncome / 12) },
      { month: "Dec", STR: Math.round(strNetIncome / 12 * 0.8), LTR: Math.round(ltrNetIncome / 12) },
    ];

    return {
      strGrossRevenue, strAnnualExpenses, strNetIncome, strOccupiedNights,
      ltrGrossRevenue, ltrAnnualExpenses, ltrNetIncome,
      difference, strWins, monthlyData,
    };
  }, [strNightlyRate, strOccupancy, strMgmtFee, strCleaning, strTurnoverDays, strFurnishing, strUtilities, strInsurance, strMaintenance,
    ltrMonthlyRent, ltrVacancy, ltrMgmtFee, ltrMaintenance, ltrInsurance, ltrUtilities]);

  const reportSummary = useMemo(() => [
    `Recommended strategy: ${results.strWins ? "Short-term rental" : "Long-term rental"}`,
    `STR annual gross revenue: ${fmt(results.strGrossRevenue)}`,
    `STR annual expenses: ${fmt(results.strAnnualExpenses)}`,
    `STR annual net income: ${fmt(results.strNetIncome)}`,
    `STR occupied nights: ${Math.round(results.strOccupiedNights)}`,
    `LTR annual gross revenue: ${fmt(results.ltrGrossRevenue)}`,
    `LTR annual expenses: ${fmt(results.ltrAnnualExpenses)}`,
    `LTR annual net income: ${fmt(results.ltrNetIncome)}`,
    `${results.strWins ? "STR" : "LTR"} annual advantage: ${fmt(Math.abs(results.difference))}`,
    `STR nightly rate: ${fmt(strNightlyRate)}`,
    `STR occupancy rate: ${strOccupancy}%`,
    `LTR monthly rent: ${fmt(ltrMonthlyRent)}`,
    `LTR vacancy rate: ${ltrVacancy}%`,
  ].join("\n"), [results, strNightlyRate, strOccupancy, ltrMonthlyRent, ltrVacancy]);

  return (
    <PageLayout>
      <SEO
        title="STR vs. LTR Calculator | EquityTeam"
        description="Should you operate your rental as a short-term (Airbnb) or long-term rental? Compare net income, stability, and management complexity side by side."
        canonical="/tools/str-vs-ltr"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "STR vs. LTR Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "EquityTeam Property Management", "url": "https://www.equityteam.com" },
        }}
      />

      <section className="bg-black pt-32 pb-16 px-5 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] mx-auto">
            STR vs. LTR Calculator
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Short-term rental or long-term rental — which strategy puts more money in your pocket? Compare net income, stability, and management intensity side by side.
          </p>
        </div>
      </section>

      <section className="bg-black pb-24 px-5">
        <div className="max-w-screen-xl mx-auto">

          <div className="mb-6 bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
            <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Rental Property Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <VerifiedAddressField value={propertyAddress} onChange={setPropertyAddress} />
            </div>
            <CalculatorReportDialog
              address={propertyAddress}
              summary={reportSummary}
              source="STR vs. LTR Calculator – Email Report"
              buttonLabel="Send me a copy of this report"
              title="Email my STR vs. LTR report"
            />
          </div>

          {/* Inputs — Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* STR */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-white font-bold text-xl mb-5 pb-3 border-b border-white/10 flex items-center gap-2">
                <span className="text-base px-2 py-1 rounded font-bold tracking-wider" style={{ backgroundColor: GOLD, color: "#121212" }}>STR</span>
                Vacation Rental
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField label="Avg Nightly Rate" value={strNightlyRate} onChange={setStrNightlyRate} prefix="$" />
                <InputField label="Occupancy Rate" value={strOccupancy} onChange={setStrOccupancy} suffix="%" step={1} />
                <InputField label="Management Fee" value={strMgmtFee} onChange={setStrMgmtFee} suffix="%" help="Platform + manager" />
                <InputField label="Cleaning Fee / turnover" value={strCleaning} onChange={setStrCleaning} prefix="$" />
                <InputField label="Avg Stay (days)" value={strTurnoverDays} onChange={setStrTurnoverDays} step={0.5} min={1} />
                <InputField label="Furnishing Costs / mo" value={strFurnishing} onChange={setStrFurnishing} prefix="$" />
                <InputField label="Utilities / mo" value={strUtilities} onChange={setStrUtilities} prefix="$" />
                <InputField label="Insurance / mo" value={strInsurance} onChange={setStrInsurance} prefix="$" />
                <InputField label="Maintenance / mo" value={strMaintenance} onChange={setStrMaintenance} prefix="$" />
              </div>
            </div>

            {/* LTR */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-white font-bold text-xl mb-5 pb-3 border-b border-white/10 flex items-center gap-2">
                <span className="text-base px-2 py-1 rounded font-bold tracking-wider bg-white/20 text-white">LTR</span>
                Long-Term Rental
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField label="Monthly Rent" value={ltrMonthlyRent} onChange={setLtrMonthlyRent} prefix="$" />
                <InputField label="Vacancy Rate" value={ltrVacancy} onChange={setLtrVacancy} suffix="%" step={0.5} />
                <InputField label="Management Fee" value={ltrMgmtFee} onChange={setLtrMgmtFee} suffix="%" step={0.1} />
                <InputField label="Maintenance / mo" value={ltrMaintenance} onChange={setLtrMaintenance} prefix="$" />
                <InputField label="Insurance / mo" value={ltrInsurance} onChange={setLtrInsurance} prefix="$" />
                <InputField label="Utilities / mo" value={ltrUtilities} onChange={setLtrUtilities} prefix="$" help="Usually $0 (tenant pays)" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <MetricBox
              label="STR Annual Net Income"
              value={fmt(results.strNetIncome)}
              sub={`${Math.round(results.strOccupiedNights)} occupied nights`}
              color={results.strWins ? "text-green-400" : "text-white"}
            />
            <MetricBox
              label="LTR Annual Net Income"
              value={fmt(results.ltrNetIncome)}
              sub="stable monthly income"
              color={!results.strWins ? "text-green-400" : "text-white"}
            />
            <div className={`rounded-lg p-5 text-center border ${results.strWins ? "border-[#B4975A]/40 bg-[#B4975A]/10" : "border-white/10 bg-white/5"}`}>
              <p className="text-white/50 text-base uppercase tracking-wider mb-1">
                {results.strWins ? "STR Advantage" : "LTR Advantage"}
              </p>
              <p className={`font-bold text-2xl ${results.strWins ? "text-[#B4975A]" : "text-green-400"}`}>
                +{fmt(Math.abs(results.difference))}
              </p>
              <p className="text-white/40 text-base mt-1">per year</p>
            </div>
          </div>

          {/* Detailed breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="text-base px-2 py-1 rounded font-bold" style={{ backgroundColor: GOLD, color: "#121212" }}>STR</span> Income Breakdown
              </h3>
              {[
                { label: "Gross Revenue", value: fmt(results.strGrossRevenue), positive: true },
                { label: "Total Expenses", value: `-${fmt(results.strAnnualExpenses)}`, positive: false },
                { label: "Net Income", value: fmt(results.strNetIncome), highlight: true },
              ].map(({ label, value, positive, highlight }) => (
                <div key={label} className={`flex justify-between py-2.5 border-b border-white/5 ${highlight ? "pt-3 mt-1 border-t border-white/10" : ""}`}>
                  <span className={`text-base ${highlight ? "font-bold text-white" : "text-white/70"}`}>{label}</span>
                  <span className={`font-semibold text-base ${highlight ? "text-white" : positive ? "text-green-400" : "text-red-400"}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="text-base px-2 py-1 rounded font-bold bg-white/20">LTR</span> Income Breakdown
              </h3>
              {[
                { label: "Gross Revenue", value: fmt(results.ltrGrossRevenue), positive: true },
                { label: "Total Expenses", value: `-${fmt(results.ltrAnnualExpenses)}`, positive: false },
                { label: "Net Income", value: fmt(results.ltrNetIncome), highlight: true },
              ].map(({ label, value, positive, highlight }) => (
                <div key={label} className={`flex justify-between py-2.5 border-b border-white/5 ${highlight ? "pt-3 mt-1 border-t border-white/10" : ""}`}>
                  <span className={`text-base ${highlight ? "font-bold text-white" : "text-white/70"}`}>{label}</span>
                  <span className={`font-semibold text-base ${highlight ? "text-white" : positive ? "text-green-400" : "text-red-400"}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly chart (seasonal) */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-white text-lg mb-4">Monthly Net Income (Seasonal Estimate)</h3>
            <p className="text-white/40 text-base mb-4">STR income shows seasonal variation; LTR income is stable year-round.</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={results.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#ffffff40" tick={{ fill: "#ffffff60", fontSize: 11 }} />
                <YAxis stroke="#ffffff40" tick={{ fill: "#ffffff60", fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", border: "1px solid #B4975A" }}
                  formatter={(v: number) => fmt(v)}
                />
                <Legend wrapperStyle={{ color: "#ffffff80", fontSize: 12 }} />
                <Bar dataKey="STR" fill={GOLD} radius={[3, 3, 0, 0]} />
                <Bar dataKey="LTR" fill="#555" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Qualitative comparison */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-white text-lg mb-4">Beyond the Numbers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-base min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/40 font-bold uppercase tracking-wider text-base">Factor</th>
                    <th className="text-center py-2 font-bold uppercase tracking-wider text-base" style={{ color: GOLD }}>STR</th>
                    <th className="text-center py-2 text-white/60 font-bold uppercase tracking-wider text-base">LTR</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: "Income Stability", str: "Seasonal / Variable", ltr: "Predictable Monthly" },
                    { factor: "Management Time", str: "High (daily ops)", ltr: "Low (monthly check-in)" },
                    { factor: "Regulatory Risk", str: "High (local laws vary)", ltr: "Low" },
                    { factor: "Wear & Tear", str: "High (frequent turnover)", ltr: "Low (single tenant)" },
                    { factor: "Upfront Investment", str: "High (furnishing)", ltr: "Low" },
                    { factor: "Tenant Screening", str: "Platform-based", ltr: "Deep background check" },
                    { factor: "Tax Complexity", str: "High (Schedule C)", ltr: "Moderate (Schedule E)" },
                  ].map(({ factor, str, ltr }) => (
                    <tr key={factor} className="border-b border-white/5">
                      <td className="py-2.5 text-white/70">{factor}</td>
                      <td className="py-2.5 text-center text-white/70">{str}</td>
                      <td className="py-2.5 text-center text-white/70">{ltr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-white/30 text-base text-center">These calculators provide estimates for informational purposes only. STR regulations vary by municipality. Not tax or legal advice.</p>
        </div>
      </section>

      <section className="py-16 bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-5 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 p-5 md:p-10 md:px-20" style={{ border: `4px solid ${GOLD}` }}>
            <span className="font-bold text-3xl md:text-4xl text-white text-center">Let Us Run the Numbers for Your Property</span>
            <Link href="/free-rental-analysis" className="btn-solid-secondary whitespace-nowrap">Get a Free Analysis</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
