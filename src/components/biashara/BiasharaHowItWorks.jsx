import React, { useState } from 'react';
import { ArrowRight, FileText, CheckCircle, Smartphone } from 'lucide-react';

export function BiasharaHowItWorks({ onNavigateToApply }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      icon: FileText,
      titleEn: '1. Apply Online in 2 Minutes',
      titleSw: '1. Jaza Fomu Mtandaoni kwa Dakika 2',
      descEn: 'Enter your basic personal and business details with zero physical paperwork or branch visits.',
      descSw: 'Jaza taarifa zako za msingi na za biashara bila makaratasi wala haja ya kwenda ofisini.'
    },
    {
      num: 2,
      icon: CheckCircle,
      titleEn: '2. Instant Automated Assessment',
      titleSw: '2. Tathmini ya Haraka ya Mfumo',
      descEn: 'Our smart credit scoring engine verifies your details and matches you with an instant loan offer.',
      descSw: 'Mfumo wetu wa kidijitali unakagua taarifa zako na kukupatia idhini ya mkopo papo hapo.'
    },
    {
      num: 3,
      icon: Smartphone,
      titleEn: '3. Receive Cash in HaloPesa',
      titleSw: '3. Pokea Pesa Moja kwa Moja HaloPesa',
      descEn: 'Accept your loan terms and watch the funds disburse directly into your HaloPesa mobile wallet.',
      descSw: 'Kubali masharti ya mkopo na pesa itaingia moja kwa moja kwenye simu yako ya HaloPesa.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#009A44] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Simple Process / Hatua Rahisi
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Apply in 3 Easy Steps
            <span className="block text-xl sm:text-2xl font-bold text-[#F05A22] mt-1">
              / Omba Mkopo kwa Hatua 3 Rahisi
            </span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            No branch queues, no physical collateral, 100% digital experience on your phone.
            <span className="block text-xs sm:text-sm text-stone-500 italic mt-0.5">
              / Hakuna foleni benki, hakuna dhamana ya mali, kila kitu kinafanyika kidijitali kwenye simu yako.
            </span>
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCurrent = activeStep === step.num;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`relative rounded-2xl p-6 sm:p-7 border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-orange-50/50 border-[#F05A22] shadow-md ring-2 ring-[#F05A22]/20'
                    : 'bg-stone-50/60 border-stone-200 hover:border-orange-200 hover:bg-orange-50/20'
                }`}
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                      isCurrent
                        ? 'bg-[#F05A22] text-white shadow-xs'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {step.num}
                  </div>
                  <Icon className={`w-5 h-5 ${isCurrent ? 'text-[#F05A22]' : 'text-stone-400'}`} />
                </div>

                <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                  {step.titleEn}
                  <span className="block text-xs font-bold text-[#F05A22] mt-0.5">
                    / {step.titleSw}
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2.5">
                  {step.descEn}
                </p>
                <p className="text-xs text-stone-500 italic mt-1 leading-relaxed">
                  {step.descSw}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold">
              Ready to fund your business today? / Uko tayari kuongeza mtaji wa biashara yako leo?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Takes less than 2 minutes to complete the application form. / Inachukua chini ya dakika 2 tu.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToApply}
            className="shrink-0 px-6 py-3.5 rounded-xl font-extrabold text-white text-sm bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Fill Application Form / Jaza Fomu Sasa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
