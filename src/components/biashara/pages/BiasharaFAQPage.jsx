import React from 'react';
import { BiasharaFAQ } from '../BiasharaFAQ';
import { HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';

export function BiasharaFAQPage({ onNavigateToSupport, onNavigateToApply }) {
  return (
    <div className="py-12 sm:py-16 bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3.5 py-1 rounded-full mb-3">
            Knowledge Center / Kituo cha Maswali
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
            <span className="block text-2xl sm:text-3xl font-bold text-[#F05A22] mt-2">
              / Maswali na Majibu Kuhusu Mikopo ya Biashara
            </span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            Find quick answers to common questions about eligibility, application steps, interest rates, and loan repayments.
            <span className="block text-xs sm:text-sm text-stone-500 italic mt-0.5">
              / Pata majibu ya haraka kuhusu vigezo, viwango vya riba, upatikanaji wa pesa na marejesho.
            </span>
          </p>
        </div>

        {/* Embedded Accordion Component */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-stone-200/90 shadow-sm">
          <BiasharaFAQ />
        </div>

        {/* Still have questions card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F05A22] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                Still have questions? / Bado una swali?
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Our support team is available 24/7 on Helpline 100 to assist you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onNavigateToSupport}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-bold text-stone-800 text-xs sm:text-sm bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Contact Support / Wasiliana Nasi
            </button>
            <button
              type="button"
              onClick={onNavigateToApply}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-bold text-white text-xs sm:text-sm bg-[#F05A22] hover:bg-[#D8450E] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Apply Now / Omba Sasa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
