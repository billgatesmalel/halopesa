import React from 'react';
import { BiasharaCalculator } from '../BiasharaCalculator';
import { ShieldCheck, Check, Calendar } from 'lucide-react';

export function BiasharaCalculatorPage({ onApplyWithAmount }) {
  return (
    <div className="py-12 sm:py-16 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3.5 py-1 rounded-full mb-3">
            Loan Planning / Mipango ya Mkopo
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Transparent Loan Calculator
            <span className="block text-2xl sm:text-3xl font-bold text-[#F05A22] mt-2">
              / Kikokotoo cha Mkopo na Marejesho Yako
            </span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            Estimate your monthly installments, total interest, and exact repayment dates before applying. Zero surprises.
            <span className="block text-xs sm:text-sm text-stone-500 italic mt-0.5">
              / Piga hesabu ya marejesho yako ya kila mwezi, riba nafuu, na tarehe kamili ya kurejesha kabla ya kutuma maombi.
            </span>
          </p>
        </div>

        {/* Embedded Interactive Calculator */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-stone-200/90 shadow-sm">
          <BiasharaCalculator onApplyWithAmount={onApplyWithAmount} />
        </div>

        {/* Transparent Borrowing Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F05A22] flex items-center justify-center font-bold mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
              Transparent 5% Monthly Flat Interest
            </h4>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              We charge an upfront, clear interest rate. You only pay for the exact duration of your loan term with zero hidden charges.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#009A44] flex items-center justify-center font-bold mb-3">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
              0 TZS Processing & Appraisal Fees
            </h4>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              Unlike banks that deduct documentation, ledger, and insurance fees before disbursing, we disburse 100% of your approved loan.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
              Flexible 30 to 180 Days Term
            </h4>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              Choose to repay in 1, 2, 3, or 6 months according to your business turnover and seasonal sales cycles.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
