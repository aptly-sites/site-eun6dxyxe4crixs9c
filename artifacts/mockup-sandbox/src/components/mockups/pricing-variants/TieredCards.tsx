import React from 'react';
import { Check, Shield, Star, ShieldCheck, Zap, Award } from 'lucide-react';

export function TieredCards() {
  return (
    <section className="bg-[#121212] text-white py-24 px-4 sm:px-6 lg:px-8 font-['Raleway']">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-['Bodoni_Moda'] text-[#B4975A] mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the management plan that fits your portfolio, and add ET+ for ultimate peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">
          
          {/* Single-Family Card */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 flex flex-col h-full shadow-xl">
            <h3 className="text-2xl font-['Bodoni_Moda'] text-white mb-2">Single-Family</h3>
            <p className="text-gray-400 mb-6 min-h-[48px]">Full-service management for individual properties.</p>
            
            <div className="mb-8 pb-8 border-b border-gray-800">
              <span className="text-5xl font-light text-[#B4975A]">5.9%</span>
              <span className="text-gray-400 block mt-2">of collected rent</span>
              <span className="text-sm text-gray-500 mt-1 block">Min $99/unit/month</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "White-Glove, Full-Service Management",
                "Experienced Property Manager",
                "Friday Owner Distributions",
                "90-Day Risk-Free Guarantee",
                "21-Day Leasing Guarantee",
                "30+ platform listing syndication",
                "Professional photos & virtual tour",
                "Reduced Repairs Guarantee"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B4975A] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-gray-800 text-sm text-gray-400 space-y-2">
              <p>Leasing Fee: 59% (min $699)</p>
              <p>Lease Renewals: $199</p>
            </div>
          </div>

          {/* Multi-Family Card */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 flex flex-col h-full shadow-xl">
            <h3 className="text-2xl font-['Bodoni_Moda'] text-white mb-2">Multi-Family</h3>
            <p className="text-gray-400 mb-6 min-h-[48px]">Optimized operations for apartment buildings.</p>
            
            <div className="mb-8 pb-8 border-b border-gray-800">
              <span className="text-5xl font-light text-[#B4975A]">8.9%</span>
              <span className="text-gray-400 block mt-2">of collected rent</span>
              <span className="text-sm text-gray-500 mt-1 block">Min $79/unit/month</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "White-Glove, Full-Service Management",
                "Experienced Property Manager",
                "Friday Owner Distributions",
                "90-Day Risk-Free Guarantee",
                "21-Day Leasing Guarantee",
                "Annual Inspections",
                "Maintenance Coordination",
                "Pet Damage Guarantee (Up to $1k)"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B4975A] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-gray-800 text-sm text-gray-400 space-y-2">
              <p>Leasing Fee: 69%</p>
              <p>Lease Renewals: $199</p>
            </div>
          </div>

          {/* ET+ Add-on Card */}
          <div className="bg-[#fdf9f3] border-2 border-[#B4975A] rounded-2xl p-8 flex flex-col relative shadow-2xl transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#B4975A] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              Most Protected
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-8 h-8 text-[#B4975A]" />
              <h3 className="text-3xl font-['Bodoni_Moda'] text-[#121212]">ET+ Add-On</h3>
            </div>
            <p className="text-gray-600 mb-6 min-h-[48px]">Ultimate protection against the unexpected.</p>
            
            <div className="mb-8 pb-8 border-b border-[#E6D5B8]">
              <span className="text-5xl font-bold text-[#121212]">$59</span>
              <span className="text-gray-600 block mt-2">per unit / month</span>
              <span className="text-sm text-gray-500 mt-1 block">For units renting $1,000+/mo</span>
            </div>

            <div className="space-y-6 mb-8 flex-grow">
              <div>
                <h4 className="font-bold text-[#121212] flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-[#B4975A]" /> Property Protection
                </h4>
                <p className="text-2xl text-[#B4975A] font-['Bodoni_Moda'] mb-1">Up to $35,000</p>
                <p className="text-sm text-gray-600">Covers malicious tenant damage & theft up to $15K.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#121212] flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-[#B4975A]" /> Rent Guarantee
                </h4>
                <p className="text-2xl text-[#B4975A] font-['Bodoni_Moda'] mb-1">Up to 25 Weeks</p>
                <p className="text-sm text-gray-600">Covers lease breaks, evictions, death (capped at $3K/mo).</p>
              </div>

              <div>
                <h4 className="font-bold text-[#121212] flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-[#B4975A]" /> Eviction Protection
                </h4>
                <p className="text-2xl text-[#B4975A] font-['Bodoni_Moda'] mb-1">Up to $6,000</p>
                <p className="text-sm text-gray-600">Filing fees, legal defense, sheriff costs, rekeying.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6D5B8] mb-8">
              <h4 className="font-bold text-[#121212] mb-3 text-sm uppercase tracking-wider">Bonus Perks</h4>
              <ul className="space-y-2">
                {[
                  "5% discount off leasing fees",
                  "$50 discount on lease renewals",
                  "Late fees split 50/50 with owner",
                  "Pet damage covers service animals"
                ].map((perk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#B4975A] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full bg-[#121212] hover:bg-[#2A2A2A] text-white font-bold py-4 px-6 rounded-lg transition-colors mt-auto">
              Add ET+ Protection
            </button>
          </div>

        </div>

        {/* Discount Bar */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#B4975A]/10 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#B4975A]" />
            </div>
            <div>
              <h4 className="text-white font-['Bodoni_Moda'] text-xl mb-1">Volume & Service Discounts</h4>
              <p className="text-gray-400 text-sm">Stackable discounts on base management fees</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-end text-sm">
            <div className="bg-[#121212] px-4 py-2 rounded-lg border border-gray-800 text-gray-300">
              <span className="text-white font-bold mr-2">5% OFF:</span> Military & 1st Responders
            </div>
            <div className="bg-[#121212] px-4 py-2 rounded-lg border border-gray-800 text-gray-300">
              <span className="text-white font-bold mr-2">5% OFF:</span> 3-9 Units
            </div>
            <div className="bg-[#121212] px-4 py-2 rounded-lg border border-gray-800 text-gray-300">
              <span className="text-white font-bold mr-2">10% OFF:</span> 10-19 Units
            </div>
            <div className="bg-[#121212] px-4 py-2 rounded-lg border border-gray-800 text-gray-300 border-[#B4975A]/30">
              <span className="text-[#B4975A] font-bold mr-2">15% OFF:</span> 20+ Units
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TieredCards;
