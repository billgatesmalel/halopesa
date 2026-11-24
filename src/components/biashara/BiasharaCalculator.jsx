import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, ArrowRight, Shield, Wallet, TrendingUp, AlertCircle } from 'lucide-react';
import { getStoredLoanRules } from '../../utils/loanRules';

export function BiasharaCalculator({ onApplyWithAmount }) {
  const [loanRules, setLoanRules] = useState(getStoredLoanRules());
  const [selectedSalaryTierId, setSelectedSalaryTierId] = useState('tier-2');

  // Find active salary bracket
  const activeBracket = useMemo(() => {
    return (
      loanRules.salaryBrackets.find((b) => b.id === selectedSalaryTierId) ||
      loanRules.salaryBrackets[1] ||
      loanRules.salaryBrackets[0]
    );
  }, [loanRules, selectedSalaryTierId]);

  const [amount, setAmount] = useState(500000);
  const [durationMonths, setDurationMonths] = useState(2); // 1, 2, 3, 6

  // Ensure amount is within bracket bounds when bracket changes
  useEffect(() => {
    if (amount > activeBracket.maxLoan) {
      setAmount(activeBracket.maxLoan);
    } else if (amount < activeBracket.minLoan) {
      setAmount(activeBracket.minLoan);
    }
  }, [activeBracket]);

  // Calculation parameters from rules
  const monthlyRate = (loanRules.interestRateMonthly || 5) / 100;
  const totalInterest = Math.round(amount * monthlyRate * durationMonths);
  const totalRepayment = amount + totalInterest;
  const monthlyInstallment = Math.round(totalRepayment / durationMonths);
  const weeklyInstallment = Math.round(totalRepayment / (durationMonths * 4));

  // Dynamic preset chips based on active bracket
  const presetAmounts = useMemo(() => {
    const min = activeBracket.minLoan;
    const max = activeBracket.maxLoan;
    const step = Math.round((max - min) / 4);
    const presets = [min, min + step, min + step * 2, min + step * 3, max];
    return [...new Set(presets.map((p) => Math.round(p / 50000) * 50000))].filter(
      (p) => p >= min && p <= max
    );
  }, [activeBracket]);

  const handleApply = () => {
    if (onApplyWithAmount) {
      onApplyWithAmount({
        amount,
        durationMonths,
        salaryTier: activeBracket.id,
        salaryRange: activeBracket.range
      });
    }
  };

  return (
    <section id="calculator" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#F05A22] text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Loan Calculator / Kikokotoo cha Mkopo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Calculate Your Biashara Loan & Repayment
            <span className="block text-xl sm:text-2xl font-bold text-[#F05A22] mt-1">
              / Piga Hesabu ya Mkopo Kulingana na Mshahara au Mauzo
            </span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            Loan limits depend on your monthly salary and sales turnover. Select your range below.
          </p>
        </div>

        {/* Calculator Card Container */}
        <div className="max-w-4xl mx-auto bg-stone-50 border border-stone-200/90 rounded-3xl p-5 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Sliders & Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Monthly Salary / Revenue Bracket Selector */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-stone-800 block mb-2">
                  1. Your Monthly Salary or Revenue / Mshahara au Mauzo ya Mwezi:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {loanRules.salaryBrackets.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedSalaryTierId(tier.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedSalaryTierId === tier.id
                          ? 'bg-orange-50/80 border-[#F05A22] ring-2 ring-[#F05A22]/20 shadow-xs'
                          : 'bg-white border-stone-200 hover:border-orange-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">{tier.labelEn}</span>
                        {selectedSalaryTierId === tier.id && (
                          <span className="w-2 h-2 rounded-full bg-[#F05A22]"></span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        Max: <strong>TZS {tier.maxLoan.toLocaleString()}</strong>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active Bracket Callout */}
                <div className="mt-3 p-3 bg-emerald-50/80 border border-emerald-200/90 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Eligible Loan Limit / Kikomo cha Mkopo:</span>
                  </div>
                  <strong className="text-sm font-black font-mono text-emerald-700">
                    Up to TZS {activeBracket.maxLoan.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* 2. Amount Slider Control (Bounded by Active Salary Bracket) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold text-stone-800">
                    2. Loan Amount / Kiasi cha Mkopo:
                  </label>
                  <span className="text-lg sm:text-2xl font-black text-[#F05A22] font-mono">
                    TZS {amount.toLocaleString()}
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={activeBracket.minLoan}
                  max={activeBracket.maxLoan}
                  step="50000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#F05A22]"
                />

                <div className="flex justify-between text-[11px] text-stone-400 font-medium mt-1 font-mono">
                  <span>Min: TZS {activeBracket.minLoan.toLocaleString()}</span>
                  <span>Max: TZS {activeBracket.maxLoan.toLocaleString()}</span>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer font-mono ${
                        amount === preset
                          ? 'bg-[#F05A22] text-white border-[#F05A22] shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300'
                      }`}
                    >
                      {preset >= 1000000 ? `${(preset / 1000000).toFixed(1)}M` : `${preset / 1000}K`} TZS
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Repayment Tenure / Period Selector */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-stone-800 block mb-2.5">
                  3. Repayment Period / Muda wa Marejesho:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { months: 1, labelEn: '1 Month', labelSw: 'Mwezi 1' },
                    { months: 2, labelEn: '2 Months', labelSw: 'Miezi 2' },
                    { months: 3, labelEn: '3 Months', labelSw: 'Miezi 3' },
                    { months: 6, labelEn: '6 Months', labelSw: 'Miezi 6' },
                  ].map((item) => (
                    <button
                      key={item.months}
                      type="button"
                      onClick={() => setDurationMonths(item.months)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        durationMonths === item.months
                          ? 'bg-white border-[#F05A22] ring-2 ring-[#F05A22]/20 text-[#F05A22] shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-black">{item.labelEn}</div>
                      <div className="text-[10px] text-stone-500 font-medium">/ {item.sw}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Cost Breakdown Card */}
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              
              <div>
                <h3 className="text-base font-extrabold text-stone-900 border-b border-stone-100 pb-3 mb-4">
                  Repayment Summary / Muhtasari wa Marejesho
                </h3>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Principal / Kiasi cha Mkopo:</span>
                    <span className="font-bold text-stone-900 font-mono">TZS {amount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-stone-600">
                    <span>Interest ({loanRules.interestRateMonthly || 5}% p.m.) / Riba:</span>
                    <span className="font-bold text-stone-900 font-mono">TZS {totalInterest.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-stone-600">
                    <span>Processing Fee / Ada ya Huduma:</span>
                    <span className="font-bold text-[#009A44]">0 TZS (Free / Bure)</span>
                  </div>

                  <div className="pt-3 border-t border-dashed border-stone-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-800">Total Repayable / Kulipa:</span>
                      <span className="text-base sm:text-lg font-black text-[#F05A22] font-mono">
                        TZS {totalRepayment.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-xl border border-orange-200/60 mt-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-700 font-semibold">Monthly Installment / Kwa Mwezi:</span>
                      <span className="font-extrabold text-[#F05A22] font-mono">
                        TZS {monthlyInstallment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-stone-500 mt-1 font-mono">
                      <span>Weekly equivalent / Kwa wiki:</span>
                      <span>~TZS {weeklyInstallment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApply}
                className="w-full mt-6 py-3.5 px-4 rounded-xl font-extrabold text-white text-sm bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Apply for this Loan / Omba Kiasi Hiki</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
