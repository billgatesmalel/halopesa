import React from 'react';
import {
  FileText,
  CheckCircle,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Clock,
  Zap,
  Users
} from 'lucide-react';

export function BiasharaHowItWorksPage({ onNavigateToApply }) {
  const steps = [
    {
      num: 1,
      icon: FileText,
      titleEn: '1. Fill Basic Details Online',
      titleSw: '1. Jaza Taarifa za Msingi Mtandaoni',
      time: 'Takes 2 Minutes / Dakika 2 Tu',
      descEn: 'Enter your personal details (Full Name, NIDA ID, HaloPesa line) and your business information in our simple 4-step wizard. No paperwork or physical office visits required.',
      descSw: 'Jaza taarifa zako binafsi (Jina kamili, NIDA, namba ya HaloPesa) na taarifa za biashara yako kupitia fomu yetu rahisi ya hatua 4 bila makaratasi wala kwenda ofisini.'
    },
    {
      num: 2,
      icon: CheckCircle,
      titleEn: '2. Instant Automated Credit Scoring',
      titleSw: '2. Tathmini ya Haraka ya Mfumo wa Kidijitali',
      time: 'Instant / Sekunde Chache',
      descEn: 'Our smart algorithm evaluates your mobile transaction history and automatically matches you with a loan offer up to TZS 5,000,000 without requiring physical land deeds or car logbooks.',
      descSw: 'Mfumo wetu wa kidijitali unakagua mzunguko wako wa miamala na kukupatia idhini ya mkopo hadi TZS 5,000,000 bila kutaka hati za ardhi au kadi za magari.'
    },
    {
      num: 3,
      icon: Smartphone,
      titleEn: '3. Instant Payout Direct to HaloPesa',
      titleSw: '3. Pokea Pesa Moja kwa Moja HaloPesa',
      time: '< 5 Minutes / Chini ya Dakika 5',
      descEn: 'Once approved, the funds are instantly disbursed into your HaloPesa wallet. You receive an immediate SMS confirmation and can use the funds immediately for inventory, tools, or supplies.',
      descSw: 'Mkopo ukishapitishwa, pesa inaingizwa papo hapo kwenye pochi yako ya HaloPesa tayari kuendeleza na kukuza biashara yako.'
    }
  ];

  const eligibility = [
    { en: 'Tanzanian citizen aged 18 years or older', sw: 'Raia wa Tanzania mwenye umri wa miaka 18 au zaidi' },
    { en: 'Valid National ID card (NIDA number)', sw: 'Kitambulisho cha Taifa kinachotumika (NIDA)' },
    { en: 'Active HaloPesa registered mobile line', sw: 'Laini ya simu iliyosajiliwa ya HaloPesa' },
    { en: 'An ongoing retail, farming, service, or trade enterprise', sw: 'Biashara inayofanya kazi (duka, kilimo, usafiri, saluni, n.k.)' },
    { en: 'No physical collateral or bank branch visits required', sw: 'Bila dhamana ya mali wala kwenda kwenye matawi ya benki' }
  ];

  const comparisons = [
    {
      featureEn: 'Physical Collateral / Dhamana ya Mali',
      traditional: 'Required (Title deed / Logbook)',
      biashara: '100% Collateral-Free (Zero)',
      biasharaBetter: true
    },
    {
      featureEn: 'Approval & Payout Time / Muda wa Idhini',
      traditional: '2 to 4 Weeks in branches',
      biashara: 'Under 5 Minutes 24/7',
      biasharaBetter: true
    },
    {
      featureEn: 'Physical Guarantors / Wadhamini wa Karatasi',
      traditional: '2-3 Physical guarantors required',
      biashara: 'No guarantors needed',
      biasharaBetter: true
    },
    {
      featureEn: 'Application Channel / Njia ya Kuomba',
      traditional: 'Paper forms & branch queues',
      biashara: '100% Mobile & Smartphone',
      biasharaBetter: true
    },
    {
      featureEn: 'Disbursement Method / Njia ya Malipo',
      traditional: 'Bank account deposit or cheque',
      biashara: 'Direct to HaloPesa Mobile Wallet',
      biasharaBetter: true
    }
  ];

  return (
    <div className="py-12 sm:py-16 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[#009A44] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3">
            How It Works / Jinsi Inavyofanya Kazi
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Apply, Get Approved & Receive Funds in Minutes
            <span className="block text-2xl sm:text-3xl font-bold text-[#F05A22] mt-2">
              / Omba, Idhinishwa na Upokee Pesa Ndani ya Dakika Chache
            </span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            A transparent, frictionless borrowing process built specifically for small business owners and entrepreneurs in Tanzania.
            <span className="block text-xs sm:text-sm text-stone-500 italic mt-0.5">
              / Mfumo wa uwazi na rahisi uliojengwa mahususi kwa wafanyabiashara wadogo na wa kati nchini Tanzania.
            </span>
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#F05A22] flex items-center justify-center font-black">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F05A22]" />
                      <span>{st.time}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-stone-900 leading-snug">
                    {st.titleEn}
                    <span className="block text-xs font-bold text-[#F05A22] mt-1">
                      / {st.titleSw}
                    </span>
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
                    {st.descEn}
                  </p>
                  <p className="text-xs text-stone-500 italic mt-2 leading-relaxed">
                    {st.descSw}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Eligibility & Requirements Box */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F05A22]">
              Requirements / Mahitaji ya Mkopo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              Who is Eligible to Apply?
              <span className="block text-xl font-bold text-[#F05A22] mt-0.5">
                / Nani Anayestahili Kuomba Mkopo Huu?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              We keep our requirements minimal so any working business owner can access growth capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibility.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-stone-900">{item.en}</p>
                  <p className="text-xs text-stone-500 italic mt-0.5">/ {item.sw}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional vs Biashara Loans Comparison Table */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-6 sm:p-8 border-b border-stone-100 bg-stone-50/60">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Why We Are Different / Tofauti Yetu
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
              Traditional Bank Loans vs. HaloPesa Biashara Loans
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100/50 text-stone-700 font-bold">
                  <th className="p-4 sm:p-5">Feature / Kipengele</th>
                  <th className="p-4 sm:p-5 text-stone-500">Traditional Banks / Benki za Kawaida</th>
                  <th className="p-4 sm:p-5 text-[#F05A22] bg-orange-50/50">Biashara Loans (HaloPesa)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-stone-900">{row.featureEn}</td>
                    <td className="p-4 sm:p-5 text-stone-500 flex items-center gap-1.5">
                      <X className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{row.traditional}</span>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-orange-50/30">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                        <span>{row.biashara}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 to-stone-800 text-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to fund your business? / Uko tayari kuongeza mtaji wa biashara yako?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1.5">
              Fill the 4-step application form now and receive money in under 5 minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToApply}
            className="shrink-0 px-8 py-4 rounded-2xl font-extrabold text-white text-sm sm:text-base bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Apply Now / Omba Sasa</span>
            <ArrowRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

      </div>
    </div>
  );
}
