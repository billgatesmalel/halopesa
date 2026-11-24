import React from 'react';
import { Zap, Calendar, ShieldCheck, Smartphone, CheckCircle, TrendingUp, Users, Clock, Award } from 'lucide-react';

export function BiasharaFeatures() {
  const features = [
    {
      icon: Zap,
      titleEn: 'Quick Digital Approval',
      titleSw: 'Idhini ya Haraka Kidijitali',
      descEn: 'Get approved within minutes with our automated credit assessment engine. No paperwork.',
      descSw: 'Pata idhini ndani ya dakika chache kwa mfumo wetu wa kidijitali. Hakuna karatasi.',
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      icon: Calendar,
      titleEn: 'Flexible Repayment Terms',
      titleSw: 'Masharti Nafuu ya Marejesho',
      descEn: 'Choose flexible repayment terms from 30 to 180 days that align smoothly with your daily business cashflow.',
      descSw: 'Chagua muda wa siku 30 hadi 180 unaoendana vyema na mzunguko wako wa biashara.',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      icon: ShieldCheck,
      titleEn: '100% Collateral-Free',
      titleSw: 'Bila Dhamana ya Mali 100%',
      descEn: 'No car logbooks, land title deeds, or physical guarantors required. Loans are backed by mobile money history.',
      descSw: 'Hakuna kadi ya gari, hati ya kiwanja, wala mdhamini wa ana kwa ana anayetakiwa.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      icon: Smartphone,
      titleEn: 'Instant HaloPesa Payout',
      titleSw: 'Malipo ya Moja kwa Moja HaloPesa',
      descEn: 'Once approved, money lands directly in your HaloPesa mobile wallet ready for immediate business use.',
      descSw: 'Pesa ikishaidhinishwa, inaingia papo hapo kwenye laini yako ya HaloPesa bila kwenda benki.',
      color: 'text-[#F05A22] bg-orange-50 border-orange-200'
    }
  ];

  const stats = [
    {
      number: '50,000+',
      labelEn: 'Businesses Funded',
      labelSw: 'Biashara Zilizowezeshwa'
    },
    {
      number: 'TZS 3.5B+',
      labelEn: 'Capital Disbursed',
      labelSw: 'Mtaji Uliotolewa'
    },
    {
      number: '< 5 Mins',
      labelEn: 'Average Payout Time',
      labelSw: 'Muda wa Kupokea Pesa'
    },
    {
      number: '99.4%',
      labelEn: 'Customer Satisfaction',
      labelSw: 'Kuridhika kwa Wateja'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-stone-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3 py-1 rounded-full">
            Why Choose Us / Kwa Nini Utuchague
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Tailored for Tanzanian Entrepreneurs
            <span className="block text-xl sm:text-2xl font-bold text-[#F05A22] mt-1">
              / Imeundwa Mahususi kwa Wafanyabiashara wa Tanzania
            </span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Speed, transparency, and scalable business funding built directly into your HaloPesa ecosystem.
            <span className="block text-xs sm:text-sm text-stone-500 italic mt-0.5">
              / Kasi, uwazi, na mtaji unaokuza biashara yako kupitia mtandao imara wa HaloPesa.
            </span>
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${feat.color}`}>
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                    {feat.titleEn}
                    <span className="block text-xs font-bold text-[#F05A22] mt-0.5">
                      / {feat.titleSw}
                    </span>
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2.5">
                    {feat.descEn}
                  </p>
                  <p className="text-xs text-stone-500 italic mt-1.5 leading-relaxed">
                    {feat.descSw}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Strip */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="pt-4 sm:pt-0 first:pt-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight text-[#F05A22]">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-800 mt-1">
                  {stat.labelEn}
                </div>
                <div className="text-[11px] text-stone-500 font-medium">
                  / {stat.labelSw}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
