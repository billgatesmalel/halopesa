import React from 'react';
import { TanzaniaFlag, UKFlag } from './Flags';

export function OnboardingHero({ lang, setLang, t, onGetStarted }) {
  const isEn = lang === 'en';

  return (
    <div className="w-full min-h-screen bg-[#FEF3EF] flex flex-col justify-between select-none">
      {/* Top Half: Characters Illustration with floating gold coins and HaloPesa logo */}
      <div className="flex-1 w-full flex items-end justify-center bg-[#FEF3EF] overflow-hidden pt-2">
        <div className="w-full max-w-[460px] flex items-end justify-center">
          <img
            src="/hero-illustration.jpg"
            alt="HaloPesa"
            className="w-full h-auto max-h-[60vh] object-contain object-bottom pointer-events-none select-none block"
          />
        </div>
      </div>

      {/* Bottom Half: Full-width White Container */}
      <div className="w-full bg-white px-5 sm:px-6 pt-5 pb-6 sm:pb-8 flex flex-col gap-4">
        {/* Title & Subtitle */}
        <div className="space-y-2 text-left">
          <h1 className="text-[19px] sm:text-[22px] font-bold text-stone-900 leading-snug tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-[12px] sm:text-[13px] text-stone-600 leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Language Selector */}
        <div className="space-y-1.5 text-left pt-1">
          <label className="text-[12px] font-medium text-stone-800 block">
            {t.languageLabel}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* English Button */}
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`flex items-center justify-center gap-2.5 h-11 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isEn
                  ? 'border-[#EE5220] bg-[#FFF6F2] text-stone-900 ring-1 ring-[#EE5220]'
                  : 'border-stone-200 bg-[#F7F7F8] text-stone-600 hover:bg-stone-100'
              }`}
            >
              <UKFlag className="w-5 h-3.5" />
              <span>English</span>
            </button>

            {/* Swahili Button */}
            <button
              type="button"
              onClick={() => setLang('sw')}
              className={`flex items-center justify-center gap-2.5 h-11 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                !isEn
                  ? 'border-[#EE5220] bg-[#FFF6F2] text-stone-900 ring-1 ring-[#EE5220]'
                  : 'border-stone-200 bg-[#F7F7F8] text-stone-600 hover:bg-stone-100'
              }`}
            >
              <TanzaniaFlag className="w-5 h-3.5" />
              <span>Swahili</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onGetStarted}
          className="w-full h-12 rounded-lg bg-[#EE5220] hover:bg-[#D8450E] active:scale-[0.99] text-white font-bold text-[15px] transition-all cursor-pointer flex items-center justify-center mt-1"
        >
          {t.getStarted}
        </button>
      </div>
    </div>
  );
}
