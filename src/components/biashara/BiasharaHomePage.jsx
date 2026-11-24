import React from 'react';
import { BiasharaHero } from './BiasharaHero';
import { BiasharaFeatures } from './BiasharaFeatures';
import { BiasharaCalculator } from './BiasharaCalculator';
import { BiasharaHowItWorks } from './BiasharaHowItWorks';
import { ArrowRight, Store, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function BiasharaHomePage({
  onNavigateToApply,
  onNavigatePage,
  onNavigateToHaloPesa,
  onApplyWithParams
}) {
  const handleApplyWithAmount = ({ amount, durationMonths, salaryRange }) => {
    if (onApplyWithParams) {
      onApplyWithParams({ amount, durationMonths, salaryRange });
    } else {
      onNavigateToApply();
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section (Includes the single authentic African photo mosaic) */}
      <BiasharaHero
        onNavigateToApply={onNavigateToApply}
        onNavigatePage={onNavigatePage}
        onNavigateToHaloPesa={onNavigateToHaloPesa}
      />

      {/* 2. Why Choose Us & Trust Stats */}
      <BiasharaFeatures />

      {/* 3. Interactive Loan Calculator (With Salary Bracket constraints) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F05A22]">
              Repayment & Salary Tiers / Kikokotoo na Mishahara
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-0.5">
              Calculate Loan by Monthly Income
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Eligible borrowing brackets dynamically scale with your monthly revenue.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigatePage('calculator')}
            className="text-xs sm:text-sm font-bold text-[#F05A22] hover:text-[#D8450E] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Dedicated Calculator / Fungua Kikokotoo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <BiasharaCalculator onApplyWithAmount={handleApplyWithAmount} />
      </div>

      {/* 4. Supported Sectors Showcase Link Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              6 Tailored Industry Sectors / Sekta 6 Zinazofadhiliwa
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Explore Our Dedicated Business Credit Programs
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Specialized financing for Retail Duka, Agriculture & Livestock, Transport Operators, Salons, Food Vendors, and Wholesale Trade.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigatePage('sectors')}
            className="shrink-0 px-6 py-3.5 rounded-xl font-extrabold text-stone-900 bg-white hover:bg-stone-100 flex items-center gap-2 transition-colors cursor-pointer text-xs sm:text-sm"
          >
            <Store className="w-4 h-4 text-[#F05A22]" />
            <span>Explore Sectors / Tazama Sekta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. 3-Step Process Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#009A44]">
              Process / Hatua 3 Rahisi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-0.5">
              How To Apply in 3 Easy Steps
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigatePage('how-it-works')}
            className="text-xs sm:text-sm font-bold text-[#F05A22] hover:text-[#D8450E] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Learn More / Soma Maelezo Kamili</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <BiasharaHowItWorks onNavigateToApply={onNavigateToApply} />
      </div>
    </div>
  );
}
