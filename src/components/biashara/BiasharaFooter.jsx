import React from 'react';
import { HaloPesaLogo } from '../BrandLogo';
import { ShieldCheck, PhoneCall, Wallet } from 'lucide-react';

export function BiasharaFooter({ onNavigateToHaloPesa, onNavigateToApply, onScrollToSection }) {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <HaloPesaLogo className="h-8" variant="white" />
              <div className="h-6 w-px bg-stone-700"></div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Biashara<span className="text-[#F05A22]">Loans</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Empowering Tanzanian micro, small, and medium businesses with fast, collateral-free credit disbursed directly via HaloPesa.
            </p>
            <p className="text-xs text-stone-500 italic">
              / Kuwawezesha wajasiriamali na wafanyabiashara wadogo na wa kati kupitia mikopo ya haraka isiyo na dhamana kwa HaloPesa.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-[#009A44]" />
              <span>Regulated Digital Credit / Inayosimamiwa na Benki Kuu ya Tanzania (BOT)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links / Viungo vya Haraka
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home / Nyumbani
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Loan Calculator / Kikokotoo cha Mkopo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works / Jinsi Inavyofanya Kazi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs / Maswali na Majibu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateToApply}
                  className="text-[#F05A22] font-bold hover:underline cursor-pointer"
                >
                  Apply for Loan / Omba Mkopo Sasa
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Direct HaloPesa Link */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Customer Support / Huduma kwa Wateja
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-stone-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#F05A22]" />
                <span>Helpline: <strong>100</strong> (Toll Free / Bure) au <strong>0622 100 100</strong></span>
              </div>
              <p className="text-stone-500 text-xs">
                Hours: 24 Hours / Saa 24 kila siku
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateToHaloPesa}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors cursor-pointer"
              >
                <Wallet className="w-4 h-4 text-[#F05A22]" />
                <span>Switch to HaloPesa Wallet / Fungua Pochi ya HaloPesa</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} HaloPesa Biashara Loans. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern React & Tailwind CSS for Tanzania
          </p>
        </div>
      </div>
    </footer>
  );
}
