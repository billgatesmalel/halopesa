import React from 'react';
import { TanzaniaFlag, UKFlag } from './Flags';

export function OnboardingHero({ lang, setLang, t, onGetStarted }) {
  const isEn = lang === 'en';

  return (
    <div className="w-full min-h-screen sm:h-screen sm:max-h-[100dvh] bg-[#FEF3EF] flex flex-col justify-between select-none overflow-y-auto sm:overflow-hidden">
      {/* Top Section: Flexible characters illustration, never cut out on any screen size */}
      <div className="flex-1 min-h-0 w-full flex items-end justify-center bg-[#FEF3EF] overflow-hidden px-2 pt-1 pb-0">
        <img
          src="/hero-illustration.jpg"
          alt="HaloPesa"
          className="w-full max-w-[460px] h-auto max-h-[58vh] sm:max-h-[62vh] object-contain pointer-events-none select-none block mx-auto"
        />
      </div>

      {/* Bottom Section: Always complete and fully visible */}
      <div className="w-full shrink-0 bg-white px-5 sm:px-6 pt-4 pb-5 sm:pb-6 flex flex-col gap-2.5 sm:gap-3.5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-10">
        {/* Title & Subtitle */}
        <div className="space-y-1 text-left">
          <h1 className="text-[17px] sm:text-[20px] font-bold text-stone-900 leading-tight tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-[11px] sm:text-[12.5px] text-stone-600 leading-snug sm:leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Language Selector */}
        <div className="space-y-1 text-left pt-0.5">
          <label className="text-[11px] sm:text-[12px] font-medium text-stone-800 block">
            {t.languageLabel}
          </label>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {/* English Button */}
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`flex items-center justify-center gap-2 h-9 sm:h-10 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
              className={`flex items-center justify-center gap-2 h-9 sm:h-10 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
          className="w-full h-11 sm:h-12 rounded-lg bg-[#EE5220] hover:bg-[#D8450E] active:scale-[0.99] text-white font-bold text-sm sm:text-[15px] transition-all cursor-pointer flex items-center justify-center mt-0.5"
        >
          {t.getStarted}
        </button>
      </div>
    </div>
  );
}
