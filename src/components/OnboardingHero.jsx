import React from 'react';
import { TanzaniaFlag, UKFlag } from './Flags';

export function OnboardingHero({ lang, setLang, t, onGetStarted }) {
  const isEn = lang === 'en';

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-[#FEF3EF] select-none">
      {/* Top Section: Anchored near top, illustration starts at the top */}
      <div className="w-full flex-1 flex items-start justify-center pt-2 sm:pt-4 px-2">
        <img
          src="/hero-illustration.jpg"
          alt="HaloPesa"
          className="w-full max-w-[420px] max-h-[46vh] sm:max-h-[50vh] object-contain object-top pointer-events-none select-none block"
        />
      </div>

      {/* Bottom White Card: All tabs and Get Started button fully visible */}
      <div className="w-full shrink-0 bg-white px-5 sm:px-6 pt-4 pb-6 sm:pb-8 flex flex-col gap-2.5 sm:gap-3.5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-10">
        {/* Title & Subtitle */}
        <div className="space-y-1 text-left">
          <h1 className="text-[17px] sm:text-[20px] font-bold text-stone-900 leading-snug tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-[11px] sm:text-[12.5px] text-stone-600 leading-snug sm:leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Language Tabs */}
        <div className="space-y-1 text-left pt-0.5">
          <label className="text-[11px] sm:text-[12px] font-medium text-stone-800 block">
            {t.languageLabel}
          </label>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {/* English Button */}
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`flex items-center justify-center gap-2 h-10 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isEn
                  ? 'border-[#EE5220] bg-[#FFF6F2] text-stone-900 ring-1 ring-[#EE5220]'
                  : 'border-stone-200 bg-[#F7F7F8] text-stone-600 hover:bg-stone-100'
              }`}
            >
              <UKFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
              <span>English</span>
            </button>

            {/* Swahili Button */}
            <button
              type="button"
              onClick={() => setLang('sw')}
              className={`flex items-center justify-center gap-2 h-10 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                !isEn
                  ? 'border-[#EE5220] bg-[#FFF6F2] text-stone-900 ring-1 ring-[#EE5220]'
                  : 'border-stone-200 bg-[#F7F7F8] text-stone-600 hover:bg-stone-100'
              }`}
            >
              <TanzaniaFlag className="w-4 h-3 sm:w-5 sm:h-3.5" />
              <span>Swahili</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onGetStarted}
          className="w-full h-11 sm:h-12 rounded-lg bg-[#EE5220] hover:bg-[#D8450E] active:scale-[0.99] text-white font-bold text-sm sm:text-[15px] transition-all cursor-pointer flex items-center justify-center mt-0.5 shadow-md shadow-orange-500/20"
        >
          {t.getStarted}
        </button>
      </div>
    </div>
  );
}
