import React, { useState } from 'react';
import { BiasharaLogo } from './BiasharaLogo';
import { Wallet, ArrowRight, Menu, X } from 'lucide-react';

export function BiasharaNavbar({
  activePage = 'home',
  onNavigatePage,
  onNavigateToApply,
  onNavigateToHaloPesa
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home / Nyumbani', id: 'home' },
    { label: 'How It Works / Hatua', id: 'how-it-works' },
    { label: 'Calculator / Kikokotoo', id: 'calculator' },
    { label: 'Sectors / Sekta', id: 'sectors' },
    { label: 'Track Loan / Fuatilia', id: 'track' },
    { label: 'FAQs / Maswali', id: 'faqs' },
    { label: 'Support / Msaada', id: 'support' }
  ];

  const handleNavClick = (pageId) => {
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage(pageId);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo & Name: Pure Biashara Loans */}
          <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
            <BiasharaLogo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-50 text-[#F05A22] border border-orange-200 shadow-xs'
                      : 'text-stone-700 hover:text-[#F05A22] hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">

            {/* Direct Switch to HaloPesa Project Dashboard */}
            <button
              type="button"
              onClick={onNavigateToHaloPesa}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                activePage === 'dashboard'
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'text-stone-700 bg-stone-100 hover:bg-stone-200 border-stone-200'
              }`}
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
          <div className="flex items-center gap-2 xl:hidden">
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
        <div className="xl:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-orange-50 text-[#F05A22] border border-orange-200'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#F05A22]"></span>}
                </button>
              );
            })}
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
