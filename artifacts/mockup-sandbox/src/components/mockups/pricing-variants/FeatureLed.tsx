import React from 'react';
import { Check, Info, ArrowRight } from 'lucide-react';

export function FeatureLed() {
  return (
    <div className="w-full flex flex-col font-['Raleway'] text-neutral-800">
      
      {/* 1. Opening Headline & 2. Hero Row (Dark section) */}
      <section className="bg-[#121212] text-white py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Bodoni_Moda'] text-[#B4975A] mb-8 leading-tight">
            What's Your Property<br />Actually Worth Protecting?
          </h2>
          <p className="max-w-2xl text-lg md:text-xl text-neutral-300 mb-20 leading-relaxed font-light">
            Most owners are dangerously underprotected. A single bad eviction or malicious tenant can wipe out years of cash flow. We built ET+ to eliminate that risk entirely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
            <div className="flex flex-col items-center text-center border-t border-[#B4975A]/30 pt-8">
              <div className="text-5xl md:text-6xl font-['Bodoni_Moda'] text-[#B4975A] mb-4">$35,000</div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-3">Property Protection</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">Coverage for malicious tenant damage, including theft up to $15,000.</p>
            </div>
            <div className="flex flex-col items-center text-center border-t border-[#B4975A]/30 pt-8">
              <div className="text-5xl md:text-6xl font-['Bodoni_Moda'] text-[#B4975A] mb-4">25 Weeks</div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-3">Rent Guarantee</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">Protection against lease breaks, evictions, and death (up to $3k/mo).</p>
            </div>
            <div className="flex flex-col items-center text-center border-t border-[#B4975A]/30 pt-8">
              <div className="text-5xl md:text-6xl font-['Bodoni_Moda'] text-[#B4975A] mb-4">$6,000</div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-3">Eviction Protection</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">Covers filing fees, legal defense, sheriff costs, and rekeying.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pricing Reveal (Cream section) */}
      <section className="bg-[#fdf9f3] py-24 px-6 md:px-12 lg:px-24 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-['Bodoni_Moda'] text-[#121212] mb-6">Simple, Transparent Pricing</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">Choose your base plan, then add ET+ for ultimate peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Base Plans */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 flex flex-col justify-between h-full">
                <div>
                  <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Base Plan</div>
                  <h3 className="text-2xl font-['Bodoni_Moda'] text-[#121212] mb-6">Single-Family</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-[#121212]">5.9%</span>
                    <span className="text-neutral-500 ml-2">of collected rent</span>
                  </div>
                  <div className="text-sm text-neutral-500 mb-8">Minimum $99/unit/month</div>
                </div>
                <div className="border-t border-neutral-100 pt-6">
                  <div className="text-sm text-neutral-600 flex items-center"><Check className="w-4 h-4 text-[#B4975A] mr-2" /> Full-Service Management</div>
                  <div className="text-sm text-neutral-600 flex items-center mt-2"><Check className="w-4 h-4 text-[#B4975A] mr-2" /> 90-Day Risk-Free Guarantee</div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 flex flex-col justify-between h-full">
                <div>
                  <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Base Plan</div>
                  <h3 className="text-2xl font-['Bodoni_Moda'] text-[#121212] mb-6">Multi-Family</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-[#121212]">8.9%</span>
                    <span className="text-neutral-500 ml-2">of collected rent</span>
                  </div>
                  <div className="text-sm text-neutral-500 mb-8">Minimum $79/unit/month</div>
                </div>
                <div className="border-t border-neutral-100 pt-6">
                  <div className="text-sm text-neutral-600 flex items-center"><Check className="w-4 h-4 text-[#B4975A] mr-2" /> Full-Service Management</div>
                  <div className="text-sm text-neutral-600 flex items-center mt-2"><Check className="w-4 h-4 text-[#B4975A] mr-2" /> 90-Day Risk-Free Guarantee</div>
                </div>
              </div>
            </div>

            {/* ET+ Add-on */}
            <div className="lg:col-span-4 bg-[#121212] text-white p-8 rounded-xl shadow-xl relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4975A]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10 text-center">
                <div className="text-sm font-bold text-[#B4975A] uppercase tracking-wider mb-2">The Shield</div>
                <h3 className="text-3xl font-['Bodoni_Moda'] mb-6">ET+ Add-On</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-2xl text-neutral-300 font-light">+</span>
                  <span className="text-5xl font-bold text-white mx-2">$59</span>
                  <span className="text-neutral-400">/mo</span>
                </div>
                <div className="text-xs text-neutral-400 mb-6 uppercase tracking-wider">Per Unit</div>
                <p className="text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-6">
                  Add the $35k property protection, 25-week rent guarantee, and $6k eviction coverage to either base plan.
                </p>
                <div className="text-xs text-neutral-500 mt-4 italic">*For units renting $1,000+/mo</div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-neutral-200/60">
            <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest text-center mb-6">Volume & Service Discounts</div>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-neutral-700 shadow-sm border border-neutral-100">Military Veterans: 5% Off</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-neutral-700 shadow-sm border border-neutral-100">First Responders: 5% Off</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-neutral-700 shadow-sm border border-neutral-100">3–9 Units: 5% Off</span>
              <span className="px-4 py-2 bg-[#121212] rounded-full text-sm font-medium text-[#B4975A] shadow-sm">10–19 Units: 10% Off</span>
              <span className="px-4 py-2 bg-[#B4975A] rounded-full text-sm font-bold text-white shadow-sm">20+ Units: 15% Off</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature Comparison (White section) */}
      <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-['Bodoni_Moda'] text-[#121212] mb-6">Compare Your Coverage</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">See the difference ET+ makes in your daily operations and long-term security.</p>
          </div>

          <div className="space-y-16">
            
            {/* Category: Financial Protection */}
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-[#B4975A] border-b-2 border-neutral-100 pb-4 mb-8">Financial Protection</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {/* Standard */}
                <div>
                  <h4 className="text-sm font-bold text-neutral-400 uppercase mb-4">Standard Plan</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start text-neutral-600">
                      <span className="text-[#121212] font-medium w-32 shrink-0">Late Fees</span>
                      <span>100% to Manager</span>
                    </li>
                    <li className="flex items-start text-neutral-600">
                      <span className="text-[#121212] font-medium w-32 shrink-0">Property Damage</span>
                      <span className="text-neutral-400 italic">Not covered</span>
                    </li>
                    <li className="flex items-start text-neutral-600">
                      <span className="text-[#121212] font-medium w-32 shrink-0">Lost Rent</span>
                      <span className="text-neutral-400 italic">Not covered</span>
                    </li>
                    <li className="flex items-start text-neutral-600">
                      <span className="text-[#121212] font-medium w-32 shrink-0">Eviction Costs</span>
                      <span className="text-neutral-400 italic">Owner pays all costs</span>
                    </li>
                  </ul>
                </div>
                {/* ET+ */}
                <div className="bg-[#fdf9f3] p-6 rounded-lg border border-[#B4975A]/20">
                  <h4 className="text-sm font-bold text-[#B4975A] uppercase mb-4 flex items-center">With ET+ <StarIcon className="w-4 h-4 ml-2" /></h4>
                  <ul className="space-y-4">
                    <li className="flex items-start text-[#121212]">
                      <span className="font-bold w-32 shrink-0">Late Fees</span>
                      <span className="font-medium text-[#B4975A]">50/50 Split with Owner</span>
                    </li>
                    <li className="flex items-start text-[#121212]">
                      <span className="font-bold w-32 shrink-0">Property Damage</span>
                      <span className="font-medium text-[#B4975A]">Up to $35,000 coverage</span>
                    </li>
                    <li className="flex items-start text-[#121212]">
                      <span className="font-bold w-32 shrink-0">Lost Rent</span>
                      <span className="font-medium text-[#B4975A]">Up to 25 weeks paid</span>
                    </li>
                    <li className="flex items-start text-[#121212]">
                      <span className="font-bold w-32 shrink-0">Eviction Costs</span>
                      <span className="font-medium text-[#B4975A]">Up to $6,000 refunded</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Category: Leasing & Guarantees */}
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-[#B4975A] border-b-2 border-neutral-100 pb-4 mb-8">Leasing & Fees</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {/* Standard */}
                <div>
                  <h4 className="text-sm font-bold text-neutral-400 uppercase mb-4">Standard Plan</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start text-neutral-600">
                      <span className="text-[#121212] font-medium w-40 shrink-0">Leasing Fee</span>
                      <span>59% SF / 69% MF (min $699)</span>
                    </li>
                    <li className="flex items-start text-neutral-600">
                      <span className="text-[#121212] font-medium w-40 shrink-0">Lease Renewals</span>
                      <span>$199 each</span>
                    </li>
                    <li className="flex items-start text-neutral-600">
                      <span className="text-[#121212] font-medium w-40 shrink-0">Pet Damage</span>
                      <span>Up to $1,000 (Standard pets)</span>
                    </li>
                    <li className="flex items-start text-neutral-600">
                      <span className="text-[#121212] font-medium w-40 shrink-0">21-Day Guarantee</span>
                      <span>Included</span>
                    </li>
                  </ul>
                </div>
                {/* ET+ */}
                <div className="bg-[#fdf9f3] p-6 rounded-lg border border-[#B4975A]/20">
                  <h4 className="text-sm font-bold text-[#B4975A] uppercase mb-4 flex items-center">With ET+ <StarIcon className="w-4 h-4 ml-2" /></h4>
                  <ul className="space-y-4">
                    <li className="flex items-start text-[#121212]">
                      <span className="font-bold w-40 shrink-0">Leasing Fee</span>
                      <span className="font-medium text-[#B4975A]">5% Additional Discount</span>
                    </li>
                    <li className="flex items-start text-[#121212]">
                      <span className="font-bold w-40 shrink-0">Lease Renewals</span>
                      <span className="font-medium text-[#B4975A]">$149 each ($50 off)</span>
                    </li>
                    <li className="flex items-start text-[#121212]">
                      <span className="font-bold w-40 shrink-0">Pet Damage</span>
                      <span className="font-medium text-[#B4975A]">Includes service/companion</span>
                    </li>
                    <li className="flex items-start text-[#121212]">
                      <span className="font-bold w-40 shrink-0">21-Day Guarantee</span>
                      <span className="font-medium">Included</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Core Features - Shared */}
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-neutral-400 border-b-2 border-neutral-100 pb-4 mb-8">Included in All Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-neutral-700 bg-neutral-50 p-4 rounded-md">
                  <Check className="w-5 h-5 text-[#B4975A] mr-3 shrink-0" />
                  <span>White-Glove, Full-Service Management</span>
                </div>
                <div className="flex items-center text-neutral-700 bg-neutral-50 p-4 rounded-md">
                  <Check className="w-5 h-5 text-[#B4975A] mr-3 shrink-0" />
                  <span>Dedicated Experienced Property Manager</span>
                </div>
                <div className="flex items-center text-neutral-700 bg-neutral-50 p-4 rounded-md">
                  <Check className="w-5 h-5 text-[#B4975A] mr-3 shrink-0" />
                  <span>Friday Owner Distributions (Same Week)</span>
                </div>
                <div className="flex items-center text-neutral-700 bg-neutral-50 p-4 rounded-md">
                  <Check className="w-5 h-5 text-[#B4975A] mr-3 shrink-0" />
                  <span>Reduced Repairs Guarantee (10% below retail)</span>
                </div>
                <div className="flex items-center text-neutral-700 bg-neutral-50 p-4 rounded-md">
                  <Check className="w-5 h-5 text-[#B4975A] mr-3 shrink-0" />
                  <span>30+ Platform Listing Syndication</span>
                </div>
                <div className="flex items-center text-neutral-700 bg-neutral-50 p-4 rounded-md">
                  <Check className="w-5 h-5 text-[#B4975A] mr-3 shrink-0" />
                  <span>Professional Photos + Virtual Tour</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA Bar */}
      <section className="bg-[#121212] py-20 px-6 text-center border-t border-[#B4975A]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-['Bodoni_Moda'] text-white mb-8">Ready to protect your property?</h2>
          <button className="bg-[#B4975A] hover:bg-[#967d4a] text-white px-8 py-4 rounded-md text-lg font-bold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center mx-auto group">
            Schedule a Free Consultation
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}
