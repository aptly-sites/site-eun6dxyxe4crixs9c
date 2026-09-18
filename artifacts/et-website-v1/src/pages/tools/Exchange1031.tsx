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

function MetricBox({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg p-5 text-center ${accent ? "bg-[#B4975A]/15 border border-[#B4975A]/40" : "bg-white/5 border border-white/10"}`}>
      <p className="text-white/50 text-base uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-bold text-2xl ${accent ? "text-[#B4975A]" : "text-white"}`}>{value}</p>
      {sub && <p className="text-white/40 text-base mt-1">{sub}</p>}
    </div>
  );
}

export default function Exchange1031() {
  const [propertyAddress, setPropertyAddress] = useState<VerifiedAddress | null>(null);
  const [salePrice, setSalePrice] = useState(600000);
  const [adjustedBasis, setAdjustedBasis] = useState(200000);
  const [depreciationTaken, setDepreciationTaken] = useState(60000);
  const [sellingCosts, setSellingCosts] = useState(42000);
  const [federalCapGainsRate, setFederalCapGainsRate] = useState(15);
  const [stateCapGainsRate, setStateCapGainsRate] = useState(5);
  const [depreciationRecaptureRate] = useState(25);
  const [newPropertyValue, setNewPropertyValue] = useState(800000);
  const [newPropertyAppreciation, setNewPropertyAppreciation] = useState(5);
  const [holdYears, setHoldYears] = useState(10);

  const results = useMemo(() => {
    const netSaleProceeds = salePrice - sellingCosts;
    const totalGain = salePrice - adjustedBasis - sellingCosts;
    const depreciationRecapture = Math.min(depreciationTaken, totalGain);
    const capitalGain = Math.max(0, totalGain - depreciationRecapture);

    const taxOnRecapture = depreciationRecapture * (depreciationRecaptureRate / 100);
    const taxOnCapGains = capitalGain * ((federalCapGainsRate + stateCapGainsRate) / 100);
    const totalTaxWithout1031 = taxOnRecapture + taxOnCapGains;
    const netAfterTax = netSaleProceeds - totalTaxWithout1031;

    const deferredTax = totalTaxWithout1031;
    const capitalDeployed1031 = netSaleProceeds;
    const capitalDeployedWithout = netAfterTax;

    const futureValue1031 = capitalDeployed1031 * Math.pow(1 + newPropertyAppreciation / 100, holdYears);
    const futureValueWithout = capitalDeployedWithout * Math.pow(1 + newPropertyAppreciation / 100, holdYears);
    const additionalGrowth = futureValue1031 - futureValueWithout;

    const requiredReinvestment = netSaleProceeds;
    const deadline45Days = 45;
    const deadline180Days = 180;

    return {
      totalGain,
      depreciationRecapture,
      capitalGain,
      taxOnRecapture,
      taxOnCapGains,
      totalTaxWithout1031,
      netAfterTax,
      netSaleProceeds,
      deferredTax,
      capitalDeployed1031,
      futureValue1031,
      futureValueWithout,
      additionalGrowth,
      requiredReinvestment,
      deadline45Days,
      deadline180Days,
    };
  }, [salePrice, adjustedBasis, depreciationTaken, sellingCosts, federalCapGainsRate, stateCapGainsRate, depreciationRecaptureRate, newPropertyValue, newPropertyAppreciation, holdYears]);

  const consultationSummary = useMemo(() => [
    `Sale price: ${fmt(salePrice)}`,
    `Selling costs: ${fmt(sellingCosts)}`,
    `Adjusted basis: ${fmt(adjustedBasis)}`,
    `Depreciation taken: ${fmt(depreciationTaken)}`,
    `Federal capital gains rate: ${federalCapGainsRate}%`,
    `State capital gains rate: ${stateCapGainsRate}%`,
    `Estimated tax deferred: ${fmt(results.totalTaxWithout1031)}`,
    `Net sale proceeds: ${fmt(results.netSaleProceeds)}`,
    `Required reinvestment: ${fmt(results.requiredReinvestment)}`,
    `Future value with 1031: ${fmt(results.futureValue1031)}`,
    `Future value without 1031: ${fmt(results.futureValueWithout)}`,
    `Additional projected growth: ${fmt(results.additionalGrowth)}`,
    `Projection period: ${holdYears} years at ${newPropertyAppreciation}% annual appreciation`,
  ].join("\n"), [salePrice, sellingCosts, adjustedBasis, depreciationTaken, federalCapGainsRate, stateCapGainsRate, results, holdYears, newPropertyAppreciation]);

  return (
    <PageLayout>
      <SEO
        title="1031 Exchange Calculator | EquityTeam"
        description="Calculate your tax savings and deferred gains from a 1031 like-kind exchange. See how much more capital you can deploy for your next investment."
        canonical="/tools/1031-exchange"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "1031 Exchange Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "EquityTeam Property Management", "url": "https://www.equityteam.com" },
        }}
      />

      <section className="bg-black pt-32 pb-16 px-5 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[40px] md:text-[56px] mx-auto">
            1031 Exchange Calculator
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Calculate how much capital gains tax you can defer — and how much more wealth you build by reinvesting pre-tax dollars into your next investment property.
          </p>
        </div>
      </section>

      <section className="bg-black pb-24 px-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Inputs */}
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Property You're Selling</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <VerifiedAddressField value={propertyAddress} onChange={setPropertyAddress} />
                  <InputField label="Sale Price" value={salePrice} onChange={setSalePrice} prefix="$" />
                  <InputField label="Selling Costs" value={sellingCosts} onChange={setSellingCosts} prefix="$" help="Agent fees, closing costs, etc." />
                  <InputField label="Adjusted Basis" value={adjustedBasis} onChange={setAdjustedBasis} prefix="$" help="Original cost + improvements" />
                  <InputField label="Depreciation Taken" value={depreciationTaken} onChange={setDepreciationTaken} prefix="$" help="Total depreciation deducted" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Tax Rates</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Federal Capital Gains Rate" value={federalCapGainsRate} onChange={setFederalCapGainsRate} suffix="%" step={1} />
                  <InputField label="State Capital Gains Rate" value={stateCapGainsRate} onChange={setStateCapGainsRate} suffix="%" step={0.5} />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <h2 className="text-white font-bold text-xl mb-5 pb-4 border-b border-white/10">Future Growth Projection</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Annual Appreciation Rate" value={newPropertyAppreciation} onChange={setNewPropertyAppreciation} suffix="%" step={0.5} />
                  <InputField label="Years to Hold" value={holdYears} onChange={setHoldYears} min={1} />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Tax deferred hero */}
              <div className="bg-[#B4975A]/10 border border-[#B4975A]/40 rounded-lg p-8 text-center">
                <p className="text-base font-bold tracking-[0.12em] uppercase mb-3 text-white/60">Total Tax Deferred via 1031</p>
                <p className="font-bold text-[28px] sm:text-5xl mb-2" style={{ color: GOLD }}>{fmt(results.totalTaxWithout1031)}</p>
                <p className="text-white/60 text-base">stays invested and working for you instead of going to the government</p>
              </div>

              {/* Tax breakdown */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4">Tax Liability Without 1031</h3>
                <div className="space-y-2">
                  {[
                    { label: "Total Gain on Sale", value: fmt(results.totalGain) },
                    { label: "Depreciation Recapture (25%)", value: fmt(results.taxOnRecapture), note: fmt(results.depreciationRecapture) + " subject" },
                    { label: `Capital Gains Tax (${federalCapGainsRate + stateCapGainsRate}%)`, value: fmt(results.taxOnCapGains), note: fmt(results.capitalGain) + " subject" },
                  ].map(({ label, value, note }) => (
                    <div key={label} className="flex justify-between items-start py-2 border-b border-white/10">
                      <div>
                        <p className="text-white/70 text-base">{label}</p>
                        {note && <p className="text-white/30 text-base">{note}</p>}
                      </div>
                      <span className="font-bold text-white text-base">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3">
                    <span className="font-bold text-red-400">Total Tax Owed</span>
                    <span className="font-bold text-red-400 text-lg">{fmt(results.totalTaxWithout1031)}</span>
                  </div>
                </div>
              </div>

              {/* Growth comparison */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4">Growth Comparison ({holdYears}yr @ {newPropertyAppreciation}%/yr)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MetricBox label="With 1031" value={fmt(results.futureValue1031)} sub={fmt(results.netSaleProceeds) + " deployed"} accent />
                  <MetricBox label="Without 1031" value={fmt(results.futureValueWithout)} sub={fmt(results.netAfterTax) + " deployed"} />
                </div>
                <div className="mt-4 p-4 bg-green-900/10 border border-green-500/30 rounded text-center">
                  <p className="text-white/60 text-base">Additional wealth from 1031 exchange</p>
                  <p className="text-green-400 font-bold text-2xl mt-1">+{fmt(results.additionalGrowth)}</p>
                </div>
              </div>

              {/* Key deadlines */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-3">Key 1031 Rules</h3>
                <div className="space-y-2 text-base text-white/70">
                  <div className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">45 days</span><span>Identify replacement property after sale closes</span></div>
                  <div className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">180 days</span><span>Complete the purchase of replacement property</span></div>
                  <div className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">{fmt(results.requiredReinvestment)}+</span><span>Minimum reinvestment to defer all taxes</span></div>
                  <div className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">Like-kind</span><span>Replacement property must be investment real estate</span></div>
                </div>
              </div>
              <ConsultationLeadDialog
                summary={consultationSummary}
                source="1031 Exchange Calculator – Consultation Request"
                address={propertyAddress}
                requireAddress
              />
            </div>
          </div>

          <p className="mt-8 text-white/30 text-base text-center">This calculator provides estimates for informational purposes only. Consult a qualified tax professional before executing a 1031 exchange.</p>
        </div>
      </section>

      <section className="py-16 bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-5 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 p-5 md:p-10 md:px-20" style={{ border: `4px solid ${GOLD}` }}>
            <span className="font-bold text-3xl md:text-4xl text-white text-center">Ready to Invest in Your Next Property?</span>
            <Link href="/for-sale" className="btn-solid-secondary whitespace-nowrap">Investment Services</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
