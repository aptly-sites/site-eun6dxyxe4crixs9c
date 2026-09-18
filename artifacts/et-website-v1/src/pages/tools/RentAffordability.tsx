import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { useRentalData } from '@/features/rentals/RentalData';
import { APTLY_WIDGET_URL, dollars, isAvailableNow } from '@/features/rentals/lib/aptly';
import { listingPath, fullAddress } from '@/features/rentals/lib/seo';
import { affordability, withinBudget } from '@/features/calculators/math';
export default function RentAffordability() {
  const [income,setIncome]=useState('');
  const budget=affordability(income);
  const {data,loading}=useRentalData('/for-rent');
  const matches=budget === null ? [] : (data?.listings || []).filter(l=>withinBudget(l.marketRent?.amount, budget) && isAvailableNow(l.availableDate, data?.asOf)).sort((a,b)=>(a.marketRent?.amount || 0)-(b.marketRent?.amount || 0));
  return <PageLayout><SEO title="Rent Affordability Calculator | EquityTeam" description="Estimate your monthly rent budget using EquityTeam’s income guidelines and find available homes within your budget." canonical="/tools/rent-affordability" />
    <main className="bg-black text-white pt-36 pb-24 px-5"><div className="max-w-5xl mx-auto space-y-8">
      <h1 className="font-cowling text-4xl md:text-6xl">Rent Affordability Calculator</h1>
      <p className="text-lg">Estimate your rent budget and explore available homes in Cincinnati and Dayton.</p>
      <div className="grid md:grid-cols-2 gap-8 border border-white/20 rounded-lg p-6">
        <div><label htmlFor="household-income" className="block text-lg font-bold mb-3">Household net monthly income ($)</label><input id="household-income" type="number" inputMode="decimal" min="0" max="10000000" step="0.01" value={income} onChange={e=>setIncome(e.target.value)} className="w-full rounded bg-white text-black p-4 text-lg" aria-describedby="income-help" /><p id="income-help" className="mt-3 text-base text-white/80">Use combined take-home income. Your income stays in this browser and is not submitted.</p>{income && budget===null && <p role="alert">Enter an amount between $0 and $10,000,000.</p>}</div>
        <div aria-live="polite"><p className="text-lg">Estimated maximum monthly base rent</p><p className="text-4xl font-bold text-secondary my-4">{budget===null?'Enter your income':dollars(Math.floor(budget)*100)}</p><p>Net monthly income ÷ 2.5. This follows EquityTeam’s published income guideline; it is not an approval or a personal spending recommendation. Utilities, fees, and other expenses are extra.</p></div>
      </div>
      <p className="text-base">Full screening criteria and verification control eligibility. <a className="underline" href="/for-rent">Review the rental application requirements.</a></p>
      {budget!==null && <section className="space-y-5"><h2 className="text-2xl font-bold">Available homes within your estimate</h2>{loading?<p role="status">Loading current homes…</p>:data?.error?<p role="status">Listings are temporarily unavailable. <a className="underline" href={APTLY_WIDGET_URL}>Browse the Aptly rental portal.</a></p>:matches.length===0?<p>No currently available homes at or below this estimate. <a className="underline" href="/for-rent">Browse all homes</a> or adjust your income above.</p>:<><p>{matches.length} matching homes. Availability and pricing can change.</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{matches.map(l=><a key={l._id} href={listingPath(l)} className="block border border-white/25 rounded overflow-hidden hover:border-secondary">{(l.marketingFiles?.[0] || l.photo?.[0]) && <img src={l.marketingFiles?.[0] || l.photo?.[0]} alt={fullAddress(l)} className="w-full h-48 object-cover" loading="lazy" />}<div className="p-5 space-y-2"><h3 className="text-xl font-bold">{dollars(l.marketRent?.amount)} / month</h3><p>{fullAddress(l)}</p><span className="block text-base font-bold text-secondary">View details →</span></div></a>)}</div></>}</section>}
      <p><a className="underline" href="/tools/rent-vs-sell">Own a property? Compare renting it out with selling.</a></p>
    </div></main></PageLayout>;
}
