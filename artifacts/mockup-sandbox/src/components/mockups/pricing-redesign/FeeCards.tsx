import React, { useEffect } from 'react';
import './_group.css';

export function FeeCards() {
  useEffect(() => {
    // Inject Raleway font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section className="fee-cards-container w-full min-h-screen py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cowling mb-4 uppercase tracking-wider">Management Rates</h2>
          <div className="w-16 h-px bg-[#B4975A] mx-auto"></div>
        </div>

        {/* Top 3 Rate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-et-primary p-10 flex flex-col items-center text-center">
            <h3 className="text-white text-xl uppercase tracking-widest font-light mb-6">Single-Family</h3>
            <div className="text-et-gold text-5xl font-cowling mb-2">5.9%</div>
            <p className="text-gray-400 text-sm tracking-wide">of collected rent</p>
            <div className="mt-8 pt-6 border-t border-[#333] w-full">
              <p className="text-white text-sm">Min $99 / unit / month</p>
            </div>
          </div>

          <div className="bg-et-primary p-10 flex flex-col items-center text-center">
            <h3 className="text-white text-xl uppercase tracking-widest font-light mb-6">Multi-Family</h3>
            <div className="text-et-gold text-5xl font-cowling mb-2">8.9%</div>
            <p className="text-gray-400 text-sm tracking-wide">of collected rent</p>
            <div className="mt-8 pt-6 border-t border-[#333] w-full">
              <p className="text-white text-sm">Min $79 / unit / month</p>
            </div>
          </div>

          <div className="bg-et-primary p-10 flex flex-col items-center text-center hairline-border-gold relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#B4975A] text-[#121212] text-xs font-bold px-3 py-1 uppercase tracking-widest">Optional</div>
            <h3 className="text-white text-xl uppercase tracking-widest font-light mb-6">ET+ Add-On</h3>
            <div className="text-et-gold text-5xl font-cowling mb-2">$59</div>
            <p className="text-gray-400 text-sm tracking-wide">per unit / month</p>
            <div className="mt-8 pt-6 border-t border-[#333] w-full">
              <p className="text-white text-sm">For units renting $1,000+/mo</p>
            </div>
          </div>
        </div>

        {/* Header for Fee Cards */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-cowling mb-4 uppercase tracking-wider">Fee Schedule</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Transparent pricing for standard operational events. See how our rates adapt for single-family versus multi-family properties.
          </p>
        </div>

        {/* 2-Column Fee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Leasing Fee */}
          <div className="hairline-border p-8 relative">
            <h4 className="text-2xl font-cowling mb-6">Leasing Fee</h4>
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-4">
              <span className="uppercase tracking-widest text-sm text-gray-500">Single-Family</span>
              <span className="font-medium text-lg">59% of one month</span>
            </div>
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6">
              <span className="uppercase tracking-widest text-sm text-gray-500">Multi-Family</span>
              <span className="font-medium text-lg">69% of one month</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 italic">Minimum $699 applies to both</p>
            
            <div className="bg-gray-50 p-4 border border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="bg-[#121212] text-[#B4975A] font-cowling px-2 py-1 text-xs">ET+</span>
                <span className="text-sm font-medium">Upgrade Benefit</span>
              </div>
              <span className="text-[#B4975A] font-bold">-5% Discount</span>
            </div>
          </div>

          {/* Lease Renewals */}
          <div className="hairline-border p-8 relative">
            <h4 className="text-2xl font-cowling mb-6">Lease Renewals</h4>
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-4">
              <span className="uppercase tracking-widest text-sm text-gray-500">Standard Rate</span>
              <span className="font-medium text-lg">$199 / renewal</span>
            </div>
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6 opacity-0">
              <span className="uppercase tracking-widest text-sm text-gray-500">-</span>
              <span className="font-medium text-lg">-</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 italic">Flat fee upon successful lease renewal</p>
            
            <div className="bg-gray-50 p-4 border border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="bg-[#121212] text-[#B4975A] font-cowling px-2 py-1 text-xs">ET+</span>
                <span className="text-sm font-medium">Upgrade Benefit</span>
              </div>
              <span className="text-[#B4975A] font-bold">-$50 per renewal</span>
            </div>
          </div>

          {/* Late Fees */}
          <div className="hairline-border p-8 relative">
            <h4 className="text-2xl font-cowling mb-6">Late Fees</h4>
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-4">
              <span className="uppercase tracking-widest text-sm text-gray-500">Standard Rate</span>
              <span className="font-medium text-lg">100% to manager</span>
            </div>
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6 opacity-0">
              <span className="uppercase tracking-widest text-sm text-gray-500">-</span>
              <span className="font-medium text-lg">-</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 italic">Manager retains late fees to cover collection efforts</p>
            
            <div className="bg-gray-50 p-4 border border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="bg-[#121212] text-[#B4975A] font-cowling px-2 py-1 text-xs">ET+</span>
                <span className="text-sm font-medium">Upgrade Benefit</span>
              </div>
              <span className="text-[#B4975A] font-bold">50% to owner</span>
            </div>
          </div>

          {/* Pet Damage */}
          <div className="hairline-border p-8 relative">
            <h4 className="text-2xl font-cowling mb-6">Pet Damage Protection</h4>
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-4">
              <span className="uppercase tracking-widest text-sm text-gray-500">Standard Coverage</span>
              <span className="font-medium text-lg">Up to $1,000</span>
            </div>
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6 opacity-0">
              <span className="uppercase tracking-widest text-sm text-gray-500">-</span>
              <span className="font-medium text-lg">-</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 italic">Applies to approved pets only</p>
            
            <div className="bg-gray-50 p-4 border border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="bg-[#121212] text-[#B4975A] font-cowling px-2 py-1 text-xs">ET+</span>
                <span className="text-sm font-medium">Upgrade Benefit</span>
              </div>
              <span className="text-[#B4975A] font-bold text-right">Service & companion<br/>animals covered</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom ET+ Banner */}
      <div className="w-full bg-et-primary py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-[#B4975A] font-cowling text-2xl mb-3 uppercase tracking-widest">The ET+ Advantage</h3>
            <p className="text-gray-300 font-light text-lg leading-relaxed">
              ET+ adds <span className="text-white font-medium">$35K property protection</span>, <span className="text-white font-medium">25-week rent coverage</span>, and up to <span className="text-white font-medium">$6,000 in eviction refunds</span> for $59/unit/month.
            </p>
          </div>
          <div>
            <button className="et-btn whitespace-nowrap">Learn More &rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
