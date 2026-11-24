import React from 'react';
import { BiasharaNavbar } from './BiasharaNavbar';
import { BiasharaHero } from './BiasharaHero';
import { BiasharaFeatures } from './BiasharaFeatures';
import { BiasharaSectors } from './BiasharaSectors';
import { BiasharaCalculator } from './BiasharaCalculator';
import { BiasharaHowItWorks } from './BiasharaHowItWorks';
import { BiasharaFAQ } from './BiasharaFAQ';
import { BiasharaFooter } from './BiasharaFooter';

export function BiasharaHomePage({
  onNavigateToApply,
  onNavigateToHaloPesa,
  onApplyWithParams
}) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Sticky Navigation */}
      <BiasharaNavbar
        onNavigateToApply={onNavigateToApply}
        onNavigateToHaloPesa={onNavigateToHaloPesa}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <BiasharaHero
          onNavigateToApply={onNavigateToApply}
          onScrollToSection={scrollToSection}
          onNavigateToHaloPesa={onNavigateToHaloPesa}
        />

        {/* Why Choose Us & Trust Stats */}
        <BiasharaFeatures />

        {/* Business Sectors Grid */}
        <BiasharaSectors
          onSelectSectorAndApply={handleSelectSectorAndApply}
        />

        {/* Interactive Loan Calculator */}
        <BiasharaCalculator
          onApplyWithAmount={handleApplyWithAmount}
        />

        {/* 3-Step Process */}
        <BiasharaHowItWorks
          onNavigateToApply={onNavigateToApply}
        />

        {/* FAQ Accordions */}
        <BiasharaFAQ />
      </main>

      {/* Footer */}
      <BiasharaFooter
        onNavigateToHaloPesa={onNavigateToHaloPesa}
        onNavigateToApply={onNavigateToApply}
        onScrollToSection={scrollToSection}
      />
    </div>
  );
}
