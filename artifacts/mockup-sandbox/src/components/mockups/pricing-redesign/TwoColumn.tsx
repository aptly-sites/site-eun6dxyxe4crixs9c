import React from 'react';
import './_group.css';
import { Check, Shield, Plus, AlertCircle, Dog, Building2, Home } from 'lucide-react';

export function TwoColumn() {
  return (
    <section className="bg-et-primary text-white min-h-screen py-24 px-6 md:px-12 lg:px-24 font-['Raleway',sans-serif]">
      {/* Non-blocking fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet" media="print" onLoad={(e) => { (e.target as any).media = 'all'; }} />

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-et-gold tracking-[0.2em] uppercase text-sm font-semibold">Investment Management</p>
          <h2 className="font-cowling text-4xl md:text-6xl text-white">Transparent Pricing</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg mt-6 font-light">
            Simple, performance-based rates. Upgrade to ET+ for unmatched protections and reduced fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Base Plan */}
          <div className="border border-white/10 p-8 md:p-12 flex flex-col relative bg-[#181818]">
            <div className="mb-8 border-b border-white/10 pb-8">
              <h3 className="font-cowling text-3xl mb-2 text-white/90">Base Plan</h3>
              <p className="text-white/50 text-sm mb-6">Essential full-service management.</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Home className="w-4 h-4 text-white/40" />
                    <span className="text-xl font-medium tracking-wide">5.9%</span>
                  </div>
                  <p className="text-white/50 text-xs uppercase tracking-widest pl-7">Single-Family <span className="lowercase normal-case tracking-normal opacity-70">(min $99/mo)</span></p>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-1">
                    <Building2 className="w-4 h-4 text-white/40" />
                    <span className="text-xl font-medium tracking-wide">8.9%</span>
                  </div>
                  <p className="text-white/50 text-xs uppercase tracking-widest pl-7">Multi-Family <span className="lowercase normal-case tracking-normal opacity-70">(min $79/mo)</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="flex gap-4 items-start opacity-70">
                <div className="mt-1 w-5 flex-shrink-0 flex justify-center"><Check className="w-4 h-4" /></div>
                <div>
                  <p className="font-medium text-sm">Leasing Fee</p>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">59% SF / 69% MF of one month's rent (min $699)</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start opacity-70">
                <div className="mt-1 w-5 flex-shrink-0 flex justify-center"><Check className="w-4 h-4" /></div>
                <div>
                  <p className="font-medium text-sm">Lease Renewals</p>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">$199 per renewal</p>
                </div>
              </div>

              <div className="flex gap-4 items-start opacity-70">
                <div className="mt-1 w-5 flex-shrink-0 flex justify-center"><AlertCircle className="w-4 h-4" /></div>
                <div>
                  <p className="font-medium text-sm">Late Fees</p>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">100% retained by manager</p>
                </div>
              </div>

              <div className="flex gap-4 items-start opacity-70">
                <div className="mt-1 w-5 flex-shrink-0 flex justify-center"><Dog className="w-4 h-4" /></div>
                <div>
                  <p className="font-medium text-sm">Pet Damage</p>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">Covered up to $1,000</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
               {/* No CTA needed here per design brief, or just standard transparent one */}
               <span className="text-white/40 text-sm uppercase tracking-widest">Standard Included</span>
            </div>
          </div>

          {/* ET+ Plan */}
          <div className="border border-[var(--et-gold)] p-8 md:p-12 flex flex-col relative bg-[#1c1a17] transform md:-translate-y-4 shadow-2xl shadow-black/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--et-gold)]"></div>
            
            <div className="mb-8 border-b border-[var(--et-gold)]/20 pb-8">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-cowling text-3xl text-[var(--et-gold)]">ET+ Plan</h3>
                <span className="bg-[var(--et-gold)] text-black text-xs font-bold px-2 py-1 uppercase tracking-widest">Recommended</span>
              </div>
              <p className="text-white/70 text-sm mb-6">Maximum protection & discounted fees.</p>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-medium tracking-wide text-white">+$59</span>
                <span className="text-white/50 text-sm uppercase tracking-widest">/unit/mo</span>
              </div>
              <p className="text-[var(--et-gold)]/70 text-xs mt-2 italic">*For units renting $1,000+/mo</p>
            </div>

            {/* Exclusive Protections */}
            <div className="mb-8 bg-black/40 p-6 border border-[var(--et-gold)]/10">
              <h4 className="text-[var(--et-gold)] text-xs uppercase tracking-widest mb-4 font-semibold">Exclusive Protections</h4>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <Shield className="w-5 h-5 text-[var(--et-gold)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-white">Property Protection</p>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">Malicious damage up to $35K + theft up to $15K</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Shield className="w-5 h-5 text-[var(--et-gold)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-white">Rent Guarantee</p>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">Lost rent covered up to 25 weeks (cap $3K/mo)</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Shield className="w-5 h-5 text-[var(--et-gold)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-white">Eviction Protection</p>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">Up to $6,000 in costs refunded</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="flex gap-4 items-start">
                <div className="mt-1 w-5 flex-shrink-0 flex justify-center"><Plus className="w-4 h-4 text-[var(--et-gold)]" /></div>
                <div>
                  <p className="font-medium text-sm text-white">Discounted Leasing Fee</p>
                  <p className="text-xs text-[var(--et-gold)] mt-1 font-medium">-5% discount</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="mt-1 w-5 flex-shrink-0 flex justify-center"><Plus className="w-4 h-4 text-[var(--et-gold)]" /></div>
                <div>
                  <p className="font-medium text-sm text-white">Discounted Renewals</p>
                  <p className="text-xs text-[var(--et-gold)] mt-1 font-medium">-$50 per renewal</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 w-5 flex-shrink-0 flex justify-center"><Plus className="w-4 h-4 text-[var(--et-gold)]" /></div>
                <div>
                  <p className="font-medium text-sm text-white">Split Late Fees</p>
                  <p className="text-xs text-[var(--et-gold)] mt-1 font-medium">50% Manager / 50% Owner</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 w-5 flex-shrink-0 flex justify-center"><Plus className="w-4 h-4 text-[var(--et-gold)]" /></div>
                <div>
                  <p className="font-medium text-sm text-white">Expanded Animal Coverage</p>
                  <p className="text-xs text-[var(--et-gold)] mt-1 font-medium">Service & companion animals included</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 flex justify-center">
               <button className="et-btn et-btn-solid w-full bg-[var(--et-gold)] text-[var(--et-primary)] border border-[var(--et-gold)] hover:bg-transparent hover:text-[var(--et-gold)] transition-colors py-4 uppercase tracking-[0.2em] text-sm font-bold flex items-center justify-center gap-2">
                 Ask About ET+ <span className="ml-2">→</span>
               </button>
            </div>
          </div>

        </div>

        {/* Volume Discounts */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center">
          <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-4">Volume & Special Discounts</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-white/60">
            <span className="flex items-center gap-2"><span className="text-[var(--et-gold)]">5%</span> Military/First Responders</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="flex items-center gap-2"><span className="text-[var(--et-gold)]">5%</span> 3-9 Units</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="flex items-center gap-2"><span className="text-[var(--et-gold)]">10%</span> 10-19 Units</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="flex items-center gap-2"><span className="text-[var(--et-gold)]">15%</span> 20+ Units</span>
          </div>
        </div>

      </div>
    </section>
  );
}
