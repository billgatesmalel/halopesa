import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, Zap, Wallet, ArrowUpRight } from 'lucide-react';

export function BiasharaHero({ onNavigateToApply, onNavigatePage, onNavigateToHaloPesa }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-stone-50/50 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#F05A22] text-xs font-bold mb-5 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#F05A22] animate-pulse"></span>
              <span>Trusted Business Loans Across Tanzania / Mikopo Inayoaminika Tanzania</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.18] mb-5">
              Grow Your Business with Fast, Collateral-Free Funding
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F05A22] mt-2">
                / Kukuza Biashara Yako kwa Mkopo wa Haraka Bila Dhamana
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
              Get flexible capital from <strong className="text-stone-900 font-semibold">TZS 50,000 to TZS 5,000,000</strong>. Apply entirely online in under 5 minutes and receive cash directly into your <strong className="text-[#F05A22]">HaloPesa</strong> account.
              <span className="block text-xs sm:text-sm text-stone-500 mt-1 italic">
                / Pata mtaji wa uhakika wa kuanzia TZS 50,000 hadi TZS 5,000,000 moja kwa moja kwenye simu yako ya HaloPesa bila foleni wala dhamana za mali.
              </span>
            </p>

            {/* CTA Group */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                type="button"
                onClick={onNavigateToApply}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-white text-sm sm:text-base bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
              >
                <span>Apply Now / Omba Sasa</span>
                <ArrowRight className="w-5 h-5 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigatePage('calculator')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-stone-800 text-sm sm:text-base bg-white hover:bg-stone-50 border border-stone-200 shadow-xs transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#F05A22]" />
                <span>Loan Calculator / Kikokotoo</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToHaloPesa}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold text-stone-600 text-xs sm:text-sm bg-orange-50/60 hover:bg-orange-100/60 border border-orange-200/60 transition-all cursor-pointer"
                title="Go to HaloPesa Mobile App / Nenda Kwenye HaloPesa"
              >
                <Wallet className="w-4 h-4 text-[#F05A22]" />
                <span>HaloPesa Wallet / Pochi</span>
              </button>
            </div>

            {/* Trust Checkmarks */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#009A44] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">
                  No Guarantors / Bila Wadhamini
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#009A44] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">
                  Instant Payout / Malipo ya Dakika 5
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#009A44] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">
                  100% Mobile / Moja kwa Moja Simuni
                </span>
              </div>
            </div>

          </div>

          {/* Right Hero Mosaic Grid */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 cursor-pointer" onClick={() => onNavigatePage('sectors')}>
              
              {/* Column 1 */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Retail & Small Shops */}
                <div className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200 aspect-[4/5]">
                  <img
                    src="/images/retail_shop.jpg"
                    alt="Retail & small shops / Maduka"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-xs">
                      Retail Shops / Maduka
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white opacity-80" />
                  </div>
                </div>

                {/* Wholesale & Distribution */}
                <div className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200 aspect-square">
                  <img
                    src="/images/wholesale.jpg"
                    alt="Wholesale / Biashara za Jumla"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-xs">
                      Wholesale / Jumla
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white opacity-80" />
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-6">
                {/* Agriculture & Farming */}
                <div className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200 aspect-square">
                  <img
                    src="/images/agriculture.jpg"
                    alt="Agriculture / Kilimo & Ufugaji"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-xs">
                      Agriculture / Kilimo
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white opacity-80" />
                  </div>
                </div>

                {/* Transport & Bodaboda */}
                <div className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200 aspect-[4/5]">
                  <img
                    src="/images/transport.jpg"
                    alt="Transport / Usafiri & Bodaboda"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-xs">
                      Transport / Usafiri
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white opacity-80" />
                  </div>
                </div>
              </div>

            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-stone-200 p-3 sm:p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#F05A22]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-stone-900 leading-tight">
                  Disbursed in &lt; 5 Minutes / Dakika 5
                </p>
                <p className="text-[11px] text-stone-500">
                  Straight to HaloPesa / Moja kwa moja HaloPesa
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
