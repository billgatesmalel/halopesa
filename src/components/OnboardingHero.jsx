import React from 'react';
import { TanzaniaFlag, UKFlag } from './Flags';
import { HaloPesaLogo, GoldCoin, PlusSymbol } from './BrandLogo';

export function OnboardingHero({ lang, setLang, t, onGetStarted, inFrame = false }) {
  const isEn = lang === 'en';

  return (
    <div className={`relative flex flex-col justify-between overflow-hidden bg-[#FFFBF7] select-none ${
      inFrame ? 'min-h-[720px] h-full' : 'w-full rounded-2xl shadow-xl border border-stone-200/80 my-4'
    }`}>
      {/* Background Subtle Gradient & Pattern Dots */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF7] via-[#FFF9F2] to-[#FFFFFF] pointer-events-none" />

      {/* Floating Accent Coin Elements */}
      <div className="absolute top-6 left-12 animate-pulse opacity-90 hidden sm:block">
        <GoldCoin className="w-8 h-5" rotation={-15} />
      </div>
      <div className="absolute top-16 right-16 animate-bounce opacity-85 hidden sm:block">
        <GoldCoin className="w-10 h-6" rotation={35} />
      </div>
      <div className="absolute top-28 left-8 opacity-75">
        <PlusSymbol size="14px" color="#F5A623" />
      </div>
      <div className="absolute top-44 right-10 opacity-75">
        <PlusSymbol size="14px" color="#F5A623" />
      </div>

      {/* Top Brand Header Area */}
      <div className="relative z-10 pt-6 pb-2 px-6 flex flex-col items-center">
        {/* Floating Coin near top center */}
        <div className="mb-2">
          <GoldCoin className="w-7 h-5" rotation={10} />
        </div>

        {/* HaloPesa Brand Logo */}
        <div className="flex items-center gap-2 mb-2">
          <HaloPesaLogo className="h-9" />
        </div>

        {/* Central Plus Sign */}
        <div className="text-amber-500 opacity-80 my-1">
          <PlusSymbol size="12px" color="#F5A623" />
        </div>
      </div>

      {/* Character Illustration Area */}
      <div className="relative z-10 w-full flex justify-center items-end px-2 overflow-hidden">
        <div className="relative w-full max-w-[420px] h-[280px] sm:h-[340px] flex items-center justify-center">
          {/* Authentic HaloPesa illustration image cropped smoothly to characters */}
          <div className="relative w-full h-full rounded-t-xl overflow-hidden">
            <img
              src={isEn ? "/halopesa-en.jpg" : "/halopesa-sw.jpg"}
              alt="HaloPesa East African Community Financial Inclusion"
              className="w-full h-full object-cover object-[center_36%] transition-transform duration-500 hover:scale-105"
            />
            {/* Subtle bottom gradient to merge into white content card */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom Content Card - Matches screenshot bottom card */}
      <div className="relative z-20 bg-white rounded-t-3xl sm:rounded-t-[32px] px-6 sm:px-8 pt-7 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] border-t border-stone-100 flex flex-col gap-5">
        {/* Title */}
        <div className="text-left space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Language Selector */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-medium text-stone-700 block">
            {t.languageLabel}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* English Button */}
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isEn
                  ? 'border-[#F05A22] bg-[#FFF5F0] text-stone-900 shadow-xs'
                  : 'border-stone-200 bg-stone-50/80 text-stone-600 hover:bg-stone-100 hover:border-stone-300'
              }`}
            >
              <UKFlag className="w-5 h-3.5" />
              <span>English</span>
            </button>

            {/* Swahili Button */}
            <button
              type="button"
              onClick={() => setLang('sw')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                !isEn
                  ? 'border-[#F05A22] bg-[#FFF5F0] text-stone-900 shadow-xs'
                  : 'border-stone-200 bg-stone-50/80 text-stone-600 hover:bg-stone-100 hover:border-stone-300'
              }`}
            >
              <TanzaniaFlag className="w-5 h-3.5" />
              <span>Swahili</span>
            </button>
          </div>
        </div>

        {/* Call to Action Button */}
        <button
          type="button"
          onClick={onGetStarted}
          className="w-full py-3.5 px-6 rounded-xl bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.99] text-white font-bold text-base transition-all duration-200 shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{t.getStarted}</span>
          <svg className="w-4 h-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
