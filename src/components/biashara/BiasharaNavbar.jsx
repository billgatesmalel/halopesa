import React, { useState } from 'react';
import { HaloPesaLogo } from '../BrandLogo';
import { Wallet, ArrowRight, Menu, X } from 'lucide-react';

export function BiasharaNavbar({ onNavigateToApply, onNavigateToHaloPesa, onScrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home / Nyumbani', id: 'hero' },
    { label: 'How It Works / Jinsi Inavyofanya Kazi', id: 'how-it-works' },
    { label: 'Calculator / Kikokotoo', id: 'calculator' },
    { label: 'Why Choose Us / Faida', id: 'features' },
    { label: 'FAQs / Maswali', id: 'faqs' }
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (onScrollToSection) {
      onScrollToSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <HaloPesaLogo className="h-8" />
            <div className="h-6 w-px bg-stone-300 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-stone-900 leading-none">
                Biashara<span className="text-[#F05A22]">Loans</span>
              </span>
              <span className="text-[10px] text-stone-500 font-semibold tracking-wide uppercase mt-0.5">
                Mikopo ya Biashara
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="text-xs xl:text-sm font-semibold text-stone-700 hover:text-[#F05A22] transition-colors cursor-pointer py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct Switch to HaloPesa Project Dashboard */}
            <button
              type="button"
              onClick={onNavigateToHaloPesa}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-all cursor-pointer"
              title="Open HaloPesa App / Fungua Pochi ya HaloPesa"
            >
              <Wallet className="w-4 h-4 text-[#F05A22]" />
              <span>HaloPesa Wallet / Pochi</span>
            </button>

            {/* Apply Now CTA */}
            <button
              type="button"
              onClick={onNavigateToApply}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <span>Apply Now / Omba Sasa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onNavigateToApply}
              className="inline-flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#F05A22] cursor-pointer"
            >
              <span>Apply / Omba</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="text-left px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToHaloPesa();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer"
            >
              <Wallet className="w-4 h-4 text-[#F05A22]" />
              <span>HaloPesa Wallet / Pochi ya HaloPesa</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToApply();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold text-white bg-[#F05A22] hover:bg-[#D8450E] transition-colors cursor-pointer"
            >
              <span>Apply Now / Omba Sasa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
