import React from 'react';
import { Check, Shield, TrendingDown, Clock, Home, Award } from 'lucide-react';

export function ComparisonTable() {
  return (
    <div className="w-full flex flex-col font-['Raleway'] antialiased">
      {/* Main Pricing Area - Dark Theme */}
      <div className="bg-[#121212] text-white py-20 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-16 max-w-3xl">
            <h2 className="font-['Bodoni_Moda'] text-[#B4975A] text-sm tracking-[0.2em] uppercase mb-4 font-bold">Transparent Pricing</h2>
            <h3 className="font-['Bodoni_Moda'] text-4xl lg:text-5xl font-medium mb-6 leading-tight">
              Premium management, <br/>predictable costs.
            </h3>
            <p className="text-zinc-400 text-lg">
              No hidden fees. Choose the tier that matches your portfolio and add EquityTeam+ for ultimate peace of mind.
            </p>
          </div>

          {/* Rate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {/* Single-Family */}
            <div className="border border-zinc-800 bg-zinc-900/50 p-8 rounded-sm relative overflow-hidden flex flex-col">
              <div className="mb-6">
                <h4 className="font-['Bodoni_Moda'] text-2xl text-zinc-100 mb-1">Single-Family</h4>
                <p className="text-zinc-500 text-sm">For individual homes & condos</p>
              </div>
              <div className="mb-6 flex-grow">
                <div className="flex items-baseline mb-1">
                  <span className="text-5xl font-['Bodoni_Moda'] font-medium text-white">5.9<span className="text-3xl">%</span></span>
                </div>
                <p className="text-zinc-400 text-sm">of collected rent</p>
              </div>
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-500 text-sm">Minimum fee</span>
                <span className="text-zinc-200 font-medium">$99/unit/mo</span>
              </div>
            </div>

            {/* Multi-Family */}
            <div className="border border-zinc-800 bg-zinc-900/50 p-8 rounded-sm relative overflow-hidden flex flex-col">
              <div className="mb-6">
                <h4 className="font-['Bodoni_Moda'] text-2xl text-zinc-100 mb-1">Multi-Family</h4>
                <p className="text-zinc-500 text-sm">For 2+ units in one building</p>
              </div>
              <div className="mb-6 flex-grow">
                <div className="flex items-baseline mb-1">
                  <span className="text-5xl font-['Bodoni_Moda'] font-medium text-white">8.9<span className="text-3xl">%</span></span>
                </div>
                <p className="text-zinc-400 text-sm">of collected rent</p>
              </div>
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-500 text-sm">Minimum fee</span>
                <span className="text-zinc-200 font-medium">$79/unit/mo</span>
              </div>
            </div>

            {/* ET+ Add-On */}
            <div className="border border-[#B4975A]/40 bg-[#B4975A]/5 p-8 rounded-sm relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B4975A] to-[#D4B77A]"></div>
              <div className="absolute top-4 right-4">
                <span className="bg-[#B4975A]/20 text-[#B4975A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Add-On</span>
              </div>
              <div className="mb-6">
                <h4 className="font-['Bodoni_Moda'] text-2xl text-[#B4975A] mb-1">EquityTeam+</h4>
                <p className="text-zinc-400 text-sm">Ultimate financial protection</p>
              </div>
              <div className="mb-6 flex-grow">
                <div className="flex items-baseline mb-1">
                  <span className="text-5xl font-['Bodoni_Moda'] font-medium text-white"><span className="text-3xl text-[#B4975A] mr-1">$</span>59</span>
                </div>
                <p className="text-[#B4975A]/80 text-sm">per unit / month</p>
              </div>
              <div className="pt-6 border-t border-[#B4975A]/20 flex items-center justify-between">
                <span className="text-zinc-400 text-sm text-center w-full">Available for units renting $1,000+/mo</span>
              </div>
            </div>
          </div>

          {/* Volume Discounts Pill Row */}
          <div className="w-full max-w-5xl mb-20 border border-zinc-800 bg-zinc-900/30 rounded-full py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <span className="text-zinc-400 text-sm uppercase tracking-wider font-bold shrink-0">Discounts</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#B4975A] font-medium">5% Off</span>
                <span className="text-zinc-300 text-sm">Military / First Responders</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-zinc-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-[#B4975A] font-medium">5% Off</span>
                <span className="text-zinc-300 text-sm">3–9 Units</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-zinc-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-[#B4975A] font-medium">10% Off</span>
                <span className="text-zinc-300 text-sm">10–19 Units</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-zinc-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-[#B4975A] font-medium">15% Off</span>
                <span className="text-zinc-300 text-sm">20+ Units</span>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="w-full border border-zinc-800 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="bg-zinc-950 p-6 border-b border-zinc-800 w-[40%] text-zinc-400 font-normal uppercase tracking-wider text-xs">Features & Services</th>
                    <th className="bg-zinc-900 p-6 border-b border-l border-zinc-800 w-[20%] text-center">
                      <span className="font-['Bodoni_Moda'] text-xl text-white">Single-Family</span>
                    </th>
                    <th className="bg-zinc-900 p-6 border-b border-l border-zinc-800 w-[20%] text-center">
                      <span className="font-['Bodoni_Moda'] text-xl text-white">Multi-Family</span>
                    </th>
                    <th className="bg-[#B4975A]/10 p-6 border-b border-l border-[#B4975A]/20 w-[20%] text-center relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#B4975A]"></div>
                      <span className="font-['Bodoni_Moda'] text-xl text-[#B4975A]">EquityTeam+</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {/* Core Services */}
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">White-Glove, Full-Service Management</td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center"><Check className="w-5 h-5 mx-auto text-[#B4975A]" /></td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Experienced Property Manager</td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center"><Check className="w-5 h-5 mx-auto text-[#B4975A]" /></td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Friday Owner Distributions <span className="text-zinc-500 text-xs ml-2">(Same week)</span></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center"><Check className="w-5 h-5 mx-auto text-[#B4975A]" /></td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">90-Day Risk-Free Guarantee</td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center"><Check className="w-5 h-5 mx-auto text-[#B4975A]" /></td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">21-Day Leasing Guarantee</td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center"><Check className="w-5 h-5 mx-auto text-[#B4975A]" /></td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Leasing Fee</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-400">59% <span className="block text-xs text-zinc-500">Min $699</span></td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-400">69%</td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center font-medium text-[#B4975A]">-5% Discount</td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Lease Renewals</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-400">$199</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-400">$199</td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center font-medium text-[#B4975A]">-$50 Discount</td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Pet Damage Guarantee <span className="text-zinc-500 text-xs ml-2">(Up to $1,000)</span></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center text-[#B4975A] text-xs font-medium">Includes Service/Companion</td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Property Protection</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-600 text-xs">—</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-600 text-xs">—</td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center font-medium text-[#B4975A]">Up to $35,000</td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Rent Guarantee</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-600 text-xs">—</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-600 text-xs">—</td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center font-medium text-[#B4975A]">Up to 25 Weeks</td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Eviction Coordination</td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-zinc-800 text-center"><Check className="w-5 h-5 mx-auto text-white/50" /></td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center font-medium text-[#B4975A]">Refunds up to $6,000</td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Late Fees</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-400">100% Manager</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-400">100% Manager</td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center font-medium text-[#B4975A]">50/50 Split</td>
                  </tr>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-5 text-zinc-300">Reduced Repairs Guarantee</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-400">10% Below Retail</td>
                    <td className="p-5 border-l border-zinc-800 text-center text-zinc-400">10% Below Retail</td>
                    <td className="p-5 border-l border-[#B4975A]/20 bg-[#B4975A]/5 text-center"><Check className="w-5 h-5 mx-auto text-[#B4975A]" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>

      {/* ET+ Deep Dive Expansion - Light Theme */}
      <div className="bg-white text-zinc-900 py-24 px-6 lg:px-12 w-full relative border-t border-[#B4975A]/30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-[#B4975A]/30"></div>
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-20 max-w-3xl mx-auto pt-8">
            <h2 className="font-['Bodoni_Moda'] text-[#B4975A] text-sm tracking-[0.2em] uppercase mb-4 font-bold">EquityTeam+</h2>
            <h3 className="font-['Bodoni_Moda'] text-4xl lg:text-5xl font-medium mb-6 text-zinc-900">
              Institutional-grade protection for independent owners.
            </h3>
            <p className="text-zinc-600 text-lg">
              For $59/month, eliminate the three biggest financial risks of property ownership.
            </p>
          </div>

          {/* Three Core Protections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#B4975A]/10 flex items-center justify-center mb-6 text-[#B4975A]">
                <Home className="w-8 h-8" />
              </div>
              <h4 className="font-['Bodoni_Moda'] text-5xl text-[#B4975A] mb-4">$35k</h4>
              <h5 className="font-bold text-lg mb-3">Property Protection</h5>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Coverage for malicious tenant damage, plus up to $15,000 for theft of property. We safeguard your physical asset.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#B4975A]/10 flex items-center justify-center mb-6 text-[#B4975A]">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="font-['Bodoni_Moda'] text-5xl text-[#B4975A] mb-4">25 Wks</h4>
              <h5 className="font-bold text-lg mb-3">Rent Guarantee</h5>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Reimbursement for lost rent due to lease breaks, evictions, or tenant death. Capped at $3,000 per month.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#B4975A]/10 flex items-center justify-center mb-6 text-[#B4975A]">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-['Bodoni_Moda'] text-5xl text-[#B4975A] mb-4">$6k</h4>
              <h5 className="font-bold text-lg mb-3">Eviction Protection</h5>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Coverage for filing fees, legal defense, sheriff costs, and rekeying if an eviction becomes necessary.
              </p>
            </div>
          </div>

          {/* Bonus Perks Checklist */}
          <div className="bg-zinc-50 border border-zinc-200 p-10 md:p-12 rounded-sm max-w-4xl mx-auto">
            <h4 className="font-['Bodoni_Moda'] text-2xl text-center mb-10">Plus Additional Perks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#B4975A]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#B4975A]" />
                </div>
                <div>
                  <h6 className="font-bold text-sm mb-1">5% Leasing Fee Discount</h6>
                  <p className="text-zinc-500 text-xs">Applied on top of your base property management rate.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#B4975A]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#B4975A]" />
                </div>
                <div>
                  <h6 className="font-bold text-sm mb-1">$50 Lease Renewal Discount</h6>
                  <p className="text-zinc-500 text-xs">Save on every lease renewal transaction.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#B4975A]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#B4975A]" />
                </div>
                <div>
                  <h6 className="font-bold text-sm mb-1">50/50 Late Fee Split</h6>
                  <p className="text-zinc-500 text-xs">You keep half of any late fees collected from tenants.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#B4975A]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#B4975A]" />
                </div>
                <div>
                  <h6 className="font-bold text-sm mb-1">Service Animal Coverage</h6>
                  <p className="text-zinc-500 text-xs">Pet damage guarantee extended to service and companion animals.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
