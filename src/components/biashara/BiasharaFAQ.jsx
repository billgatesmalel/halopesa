import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function BiasharaFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      qEn: 'What are the requirements to apply for a Biashara Loan?',
      qSw: 'Ni vigezo gani vinavyohitajika ili kuomba Mkopo wa Biashara?',
      aEn: 'You must be a Tanzanian citizen aged 18 or above, have a valid National ID (NIDA), an active registered HaloPesa line used regularly for transactions, and an ongoing business enterprise.',
      aSw: 'Lazima uwe raia wa Tanzania mwenye umri kuanzia miaka 18 na kuendelea, uwe na Kitambulisho cha Taifa (NIDA), laini ya HaloPesa iliyosajiliwa na inayotumika mara kwa mara, pamoja na biashara inayofanya kazi.'
    },
    {
      qEn: 'How fast will I receive the funds in my HaloPesa wallet?',
      qSw: 'Je, inachukua muda gani kupokea pesa kwenye simu yangu?',
      aEn: 'Once your application is submitted and approved by our automated scoring engine, funds are disbursed instantly into your HaloPesa line within seconds to under 5 minutes, 24/7.',
      aSw: 'Pindi maombi yako yanapopokelewa na kuidhinishwa na mfumo wa kidijitali, pesa inatumwa papo hapo kwenye laini yako ya HaloPesa ndani ya dakika 5, saa 24 kwa siku, siku zote za juma.'
    },
    {
      qEn: 'Is any physical collateral or guarantor required?',
      qSw: 'Je, ninahitaji dhamana ya mali au mdhamini wa ana kwa ana?',
      aEn: 'No! All Biashara Loans are 100% collateral-free. You do not need land title deeds, car logbooks, or physical guarantors. Credit scoring is based on your digital mobile money activity.',
      aSw: 'Hapana! Mikopo yote ya Biashara haina dhamana ya mali (100% collateral-free). Huhitaji hati ya kiwanja, kadi ya gari wala wadhamini wa karatasi. Idhini inategemea historia yako ya miamala ya simu.'
    },
    {
      qEn: 'How do I repay my Biashara Loan?',
      qSw: 'Je, ninarudishaje mkopo wangu?',
      aEn: 'You can repay conveniently directly from your HaloPesa wallet via USSD *150*88# or directly through this website or through the automated HaloPesa prompt sent to your phone before the due date.',
      aSw: 'Unaweza kulipa kirahisi kupitia pochi yako ya HaloPesa kwa kupiga *150*88#, au moja kwa moja kupitia tovuti hii, au kupitia ujumbe wa kumbukumbu unaotumwa kwenye simu yako kabla ya tarehe ya mwisho.'
    },
    {
      qEn: 'Can I re-apply for a higher limit after repaying on time?',
      qSw: 'Je, naweza kuomba mkopo mkubwa zaidi baada ya kulipa kwa wakati?',
      aEn: 'Yes! Borrowers who repay on or before their due dates automatically unlock higher credit limits up to TZS 5,000,000 with lower interest rates.',
      aSw: 'Ndiyo! Wateja wanaolipa mikopo yao mapema au kwa wakati huongezewa kiwango cha mkopo kiotomatiki hadi TZS 5,000,000 pamoja na riba nafuu zaidi.'
    }
  ];

  return (
    <section id="faqs" className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#F05A22] text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? / Maswali Yanayoulizwa Mara kwa Mara</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
            <span className="block text-xl sm:text-2xl font-bold text-[#F05A22] mt-1">
              / Maswali na Majibu Kuhusu Mikopo ya Biashara
            </span>
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-stone-50/60 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  <div className="text-left">
                    <span className="text-sm sm:text-base font-extrabold text-stone-900 block leading-snug">
                      {faq.qEn}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#F05A22] block mt-0.5">
                      / {faq.qSw}
                    </span>
                  </div>
                  <div className="shrink-0 text-stone-500">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#F05A22]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-3 bg-white border-t border-stone-100 text-stone-600 text-xs sm:text-sm leading-relaxed space-y-2">
                    <p>{faq.aEn}</p>
                    <p className="text-stone-500 italic text-xs pt-1 border-t border-stone-100">
                      / {faq.aSw}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
