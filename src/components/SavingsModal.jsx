import React, { useState } from 'react';
import { X, PiggyBank, CheckCircle2, TrendingUp, Users, ShieldCheck } from 'lucide-react';

export function SavingsModal({ isOpen, onClose, t, lang, onTransactionComplete }) {
  const [tab, setTab] = useState('personal'); // 'personal' | 'kikoba'
  const [depositAmount, setDepositAmount] = useState('30000');
  const [interestPeriod, setInterestPeriod] = useState('6'); // months
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const numAmount = parseFloat(depositAmount) || 0;
  const annualRate = 0.09; // 9% per annum
  const expectedReturn = Math.round(numAmount * (annualRate * (parseInt(interestPeriod) / 12)));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (pin.length < 4) return;
      setStep(3);
      if (onTransactionComplete) {
        onTransactionComplete({
          id: 'SV' + Math.floor(100000000 + Math.random() * 900000000),
          title: tab === 'personal'
            ? `${t.savingsKikoba} (Akiba Binafsi)`
            : `${t.savingsKikoba} (Kikoba - Mwenge Group)`,
          amount: -numAmount,
          fee: 0,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'savings'
        });
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setPin('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-100">
        <div className="bg-[#4F46E5] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-lg">{t.savingsKikoba}</h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex rounded-xl bg-stone-100 p-1">
              <button
                type="button"
                onClick={() => setTab('personal')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  tab === 'personal' ? 'bg-white text-indigo-700 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Personal Savings (9% p.a.)' : 'Akiba Binafsi (9% Faida)'}
              </button>
              <button
                type="button"
                onClick={() => setTab('kikoba')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  tab === 'kikoba' ? 'bg-white text-indigo-700 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                {lang === 'en' ? 'HaloKikoba Group' : 'Vikundi vya Kikoba'}
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.amountTZS}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-lg font-bold focus:outline-none focus:border-indigo-600"
                />
                <span className="absolute right-3.5 top-3 text-xs font-semibold text-stone-400">
                  TZS
                </span>
              </div>
            </div>

            {tab === 'personal' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {lang === 'en' ? 'Savings Lock Period' : 'Muda wa Kuweka Akiba'}
                  </label>
                  <select
                    value={interestPeriod}
                    onChange={(e) => setInterestPeriod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-indigo-600 bg-white"
                  >
                    <option value="3">{lang === 'en' ? '3 Months (Earn ~2.25%)' : 'Miezi 3 (Faida ~2.25%)'}</option>
                    <option value="6">{lang === 'en' ? '6 Months (Earn ~4.5%)' : 'Miezi 6 (Faida ~4.5%)'}</option>
                    <option value="12">{lang === 'en' ? '12 Months (Earn 9.0% Full)' : 'Mwaka 1 (Faida 9.0% Kamili)'}</option>
                  </select>
                </div>

                <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-100 text-xs space-y-1.5">
                  <div className="flex justify-between text-indigo-950">
                    <span>{lang === 'en' ? 'Projected Profit Earned' : 'Makadirio ya Faida Utakayopata'}:</span>
                    <span className="font-bold text-indigo-700">+{expectedReturn.toLocaleString()} TZS</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-stone-900 pt-1 border-t border-indigo-200">
                    <span>{lang === 'en' ? 'Total Return at Maturity' : 'Jumla ya Malipo ya Mwisho'}:</span>
                    <span>{(numAmount + expectedReturn).toLocaleString()} TZS</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="font-semibold text-stone-800">
                  {lang === 'en' ? 'Active HaloKikoba Group: "Mwenge Vision 2026"' : 'Kikundi Hai cha Kikoba: "Mwenge Vision 2026"'}
                </div>
                <p>
                  {lang === 'en'
                    ? '14 Members. Automated ledger with weekly contributions and low-interest emergency loans.'
                    : 'Wanachama 14. Daftari la kidijitali lenye michango ya kila wiki na mikopo ya dharura.'}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md shadow-indigo-600/20"
            >
              {lang === 'en' ? 'Confirm Deposit' : 'Thibitisha Kuweka Akiba'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-indigo-100 text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-900 text-base">{t.enterPin}</h4>
              <p className="text-xs text-stone-500">
                {numAmount.toLocaleString()} TZS
              </p>
            </div>

            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder={t.pinPlaceholder}
                autoFocus
                required
                className="w-36 mx-auto block px-3 py-2 text-center text-2xl font-bold tracking-widest rounded-xl border border-stone-300 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-semibold text-xs hover:bg-stone-50 cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={pin.length < 4}
                className="flex-1 py-2.5 bg-[#4F46E5] disabled:opacity-50 hover:bg-[#4338CA] text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                {t.confirmTransfer}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-bold text-stone-900 text-lg">{t.statusSuccess}</h4>
              <p className="text-xs text-stone-500 mt-1">
                {lang === 'en' ? 'Deposit has been added to your savings portfolio.' : 'Akiba imehifadhiwa salama kwenye mfuko wako.'}
              </p>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">{t.amountTZS}</span>
                <span className="font-bold text-stone-900">{numAmount.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{lang === 'en' ? 'Interest Rate' : 'Kiwango cha Faida'}</span>
                <span className="font-semibold text-emerald-600">9.0% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.timestamp}</span>
                <span className="text-stone-700">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
