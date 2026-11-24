import React from 'react';
import { BiasharaSectors } from '../BiasharaSectors';
import { ArrowRight, Store, Wheat, Truck, Scissors, UtensilsCrossed, Building2 } from 'lucide-react';

export function BiasharaSectorsPage({ onSelectSectorAndApply }) {
  return (
    <div className="py-12 sm:py-16 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3.5 py-1 rounded-full mb-3">
            Supported Industries / Sekta Zinazofadhiliwa
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Funding Built for Every Enterprise
            <span className="block text-2xl sm:text-3xl font-bold text-[#F05A22] mt-2">
              / Mikopo ya Biashara kwa Kila Sekta
            </span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            From neighbourhood retail shops and agribusiness to transport operators and food vendors, find tailored funding for your daily needs.
            <span className="block text-xs sm:text-sm text-stone-500 italic mt-0.5">
              / Kuanzia maduka ya reja reja na kilimo hadi waendesha bodaboda na mama ntilie, pata mtaji unaofaa biashara yako.
            </span>
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-stone-200/90 shadow-sm">
          <BiasharaSectors onSelectSectorAndApply={onSelectSectorAndApply} />
        </div>

      </div>
    </div>
  );
}
