import React, { useState } from 'react';
import { BiasharaLogo } from './BiasharaLogo';
import { Wallet, ArrowRight, Menu, X, Home, Activity, Store, FileText, Headphones } from 'lucide-react';

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

      {/* Right-Side Mobile Slide-Over Drawer (does not cover full screen) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex justify-end">
          {/* Dimmed backdrop leaving left side visible */}
          <div
            className="fixed inset-0 bg-stone-950/35 backdrop-blur-[1px]"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="relative z-10 w-72 max-w-[82vw] bg-white h-full shadow-2xl border-l border-stone-200 flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-stone-100">
                <span className="text-sm font-extrabold text-stone-900">Navigation</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Vertical Navigation Links */}
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-orange-50 text-[#F05A22]'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F05A22]"></span>}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToHaloPesa();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-[#F05A22] bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
                >
                  <Wallet className="w-4 h-4" />
                  <span>HaloPesa Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToApply();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold text-white bg-[#F05A22] hover:bg-[#D8450E] shadow-md shadow-orange-500/20 transition-colors cursor-pointer"
                >
                  <span>Apply Now / Omba Sasa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Support Pill */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => handleNavClick('support')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold text-white bg-[#F05A22] hover:bg-[#D8450E] shadow-md transition-colors cursor-pointer"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Support Centre</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

export function BiasharaMobileBottomNav({
  activePage = 'home',
  onNavigatePage,
  onNavigateToApply,
  onNavigateToHaloPesa
}) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 px-2 pb-1.5 pt-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-end max-w-md mx-auto">
        <button
          type="button"
          onClick={() => onNavigatePage('home')}
          className={`flex flex-col items-center justify-center py-1 gap-0.5 text-[10px] font-bold cursor-pointer ${
            activePage === 'home' ? 'text-[#F05A22]' : 'text-stone-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigatePage('track')}
          className={`flex flex-col items-center justify-center py-1 gap-0.5 text-[10px] font-bold cursor-pointer ${
            activePage === 'track' ? 'text-[#F05A22]' : 'text-stone-500'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span>Track Loan</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToApply}
          className="flex flex-col items-center justify-center -mt-5 gap-1 cursor-pointer"
        >
          <span className="w-12 h-12 rounded-full bg-[#F05A22] text-white flex items-center justify-center shadow-lg shadow-orange-500/30 border-4 border-white">
            <FileText className="w-5 h-5" />
          </span>
          <span className="text-[10px] font-extrabold text-[#F05A22]">Apply</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigatePage('sectors')}
          className={`flex flex-col items-center justify-center py-1 gap-0.5 text-[10px] font-bold cursor-pointer ${
            activePage === 'sectors' ? 'text-[#F05A22]' : 'text-stone-500'
          }`}
        >
          <Store className="w-5 h-5" />
          <span>Sectors</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToHaloPesa}
          className={`flex flex-col items-center justify-center py-1 gap-0.5 text-[10px] font-bold cursor-pointer ${
            activePage === 'dashboard' ? 'text-[#F05A22]' : 'text-stone-500'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>Wallet</span>
        </button>
      </div>
    </nav>
  );
}
