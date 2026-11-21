import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, Check, Shield } from 'lucide-react';

export function TariffCalculator({ t, lang }) {
  const [txType, setTxType] = useState('halo-to-halo');
  const [calcAmount, setCalcAmount] = useState('50000');

  const amount = parseFloat(calcAmount) || 0;

  // Accurate regulatory tariff tier calculations in TZS
  const calculateFees = () => {
    let fee = 0;
    let levy = 0;

    if (amount <= 0) return { fee: 0, levy: 0, total: 0, recipientGets: 0 };

    if (txType === 'halo-to-halo') {
      if (amount <= 1000) fee = 0;
      else if (amount <= 2500) fee = 100;
      else if (amount <= 5000) fee = 200;
      else if (amount <= 10000) fee = 350;
      else if (amount <= 20000) fee = 450;
      else if (amount <= 40000) fee = 550;
      else if (amount <= 100000) fee = 750;
      else if (amount <= 500000) fee = 1200;
      else fee = 1800;
      levy = Math.round(fee * 0.1); // 10% statutory excise
    } else if (txType === 'halo-to-other') {
      if (amount <= 1000) fee = 150;
      else if (amount <= 2500) fee = 350;
      else if (amount <= 5000) fee = 550;
      else if (amount <= 10000) fee = 750;
      else if (amount <= 20000) fee = 950;
      else if (amount <= 40000) fee = 1350;
      else if (amount <= 100000) fee = 1750;
      else if (amount <= 500000) fee = 2600;
      else fee = 3500;
      levy = Math.round(fee * 0.1);
    } else if (txType === 'withdraw-agent') {
      if (amount <= 1000) fee = 300;
      else if (amount <= 2500) fee = 550;
      else if (amount <= 5000) fee = 850;
      else if (amount <= 10000) fee = 1200;
      else if (amount <= 20000) fee = 1600;
      else if (amount <= 40000) fee = 2200;
      else if (amount <= 100000) fee = 3100;
      else if (amount <= 500000) fee = 4500;
      else fee = 6500;
      levy = Math.round(fee * 0.1);
    } else if (txType === 'pay-merchant') {
      fee = 0; // Free for consumer
      levy = 0;
    }

    const total = amount + fee + levy;
    const recipientGets = amount;

    return { fee, levy, total, recipientGets };
  };

  const { fee, levy, total, recipientGets } = calculateFees();

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-[#F05A22] text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.navTariffs}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            {t.calculatorTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {t.calculatorSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Input Form Column */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-2">
              {t.selectTxType}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'halo-to-halo', label: t.txHaloToHalo },
                { id: 'halo-to-other', label: t.txHaloToOther },
                { id: 'withdraw-agent', label: t.txWithdrawAgent },
                { id: 'pay-merchant', label: t.txPayMerchant },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTxType(opt.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer font-medium ${
                    txType === opt.id
                      ? 'border-[#F05A22] bg-orange-50/70 text-stone-900 font-bold ring-1 ring-[#F05A22]'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {t.amountInputLabel}
            </label>
            <div className="relative">
              <input
                type="number"
                min="500"
                step="1000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-xl font-extrabold focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]"
              />
              <span className="absolute right-4 top-3.5 text-sm font-bold text-stone-400">
                TZS
              </span>
            </div>
            {/* Quick amount chips */}
            <div className="flex flex-wrap gap-2 mt-2.5">
              {['5000', '10000', '25000', '50000', '100000', '200000'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCalcAmount(preset)}
                  className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer transition-colors"
                >
                  {parseInt(preset).toLocaleString()} TZS
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Info className="w-4 h-4 text-[#F05A22] shrink-0" />
            <span>
              {lang === 'en'
                ? 'Rates conform to Bank of Tanzania (BOT) national interoperability standards.'
                : 'Viwango hivi vinalingana na miongozo ya Benki Kuu ya Tanzania (BOT).'}
            </span>
          </div>
        </div>

        {/* Results Output Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-6 shadow-md space-y-4">
          <div className="text-xs uppercase tracking-wider text-orange-400 font-bold flex items-center justify-between">
            <span>{lang === 'en' ? 'Summary Breakdown' : 'Mchanganuo Kamili'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
              {txType === 'pay-merchant' ? 'Zero Fee' : 'Live Tariff'}
            </span>
          </div>

          <div className="space-y-3 text-sm pt-2">
            <div className="flex justify-between items-center text-stone-300 text-xs">
              <span>{t.amountTZS}:</span>
              <span className="font-semibold text-white">{amount.toLocaleString()} TZS</span>
            </div>

            <div className="flex justify-between items-center text-stone-300 text-xs">
              <span>{t.transactionFee}:</span>
              <span className="font-semibold text-white">
                {fee === 0 ? (lang === 'en' ? 'FREE' : 'BURE') : `${fee.toLocaleString()} TZS`}
              </span>
            </div>

            <div className="flex justify-between items-center text-stone-300 text-xs">
              <span>{t.governmentLevy}:</span>
              <span className="font-semibold text-stone-400">{levy.toLocaleString()} TZS</span>
            </div>

            <div className="border-t border-stone-700 pt-3 flex justify-between items-baseline">
              <span className="text-xs text-orange-200 font-bold">{t.totalDeduction}</span>
              <span className="text-2xl font-black text-[#F05A22]">
                {total.toLocaleString()} <span className="text-xs font-normal text-stone-400">TZS</span>
              </span>
            </div>

            <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60 flex justify-between items-center text-xs">
              <span className="text-stone-300">{t.recipientGets}</span>
              <span className="font-bold text-emerald-400 text-sm">{recipientGets.toLocaleString()} TZS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
