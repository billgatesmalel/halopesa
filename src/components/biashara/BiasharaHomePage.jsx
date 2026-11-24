import React from 'react';
import { BiasharaHero } from './BiasharaHero';
import { BiasharaFeatures } from './BiasharaFeatures';
import { BiasharaSectors } from './BiasharaSectors';
import { BiasharaCalculator } from './BiasharaCalculator';
import { BiasharaHowItWorks } from './BiasharaHowItWorks';
import { ArrowRight } from 'lucide-react';

export function BiasharaHomePage({
  onNavigateToApply,
  onNavigatePage,
  onNavigateToHaloPesa,
  onApplyWithParams
}) {
  const handleApplyWithAmount = ({ amount, durationMonths }) => {
    if (onApplyWithParams) {
      onApplyWithParams({ amount, durationMonths });
    } else {
      onNavigateToApply();
    }
  };

  const handleSelectSectorAndApply = (sectorName) => {
    if (onApplyWithParams) {
      onApplyWithParams({ businessCategory: sectorName });
    } else {
      onNavigateToApply();
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <BiasharaHero
        onNavigateToApply={onNavigateToApply}
        onNavigatePage={onNavigatePage}
        onNavigateToHaloPesa={onNavigateToHaloPesa}
      />

      {/* Why Choose Us & Trust Stats */}
      <BiasharaFeatures />

      {/* Supported Sectors Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F05A22]">
              Sectors / Sekta
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-0.5">
              Business Sectors We Fund
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigatePage('sectors')}
            className="text-xs sm:text-sm font-bold text-[#F05A22] hover:text-[#D8450E] flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Sectors / Tazama Zote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <BiasharaSectors onSelectSectorAndApply={handleSelectSectorAndApply} />
      </div>

      {/* Interactive Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F05A22]">
              Repayment / Kikokotoo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-0.5">
              Calculate Your Loan & Installments
            </h2>
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

      {/* 3-Step Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#009A44]">
              Process / Hatua
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
