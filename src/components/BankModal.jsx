import React, { useState } from 'react';
import { X, Building2, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export function BankModal({ isOpen, onClose, t, lang, onTransactionComplete }) {
  const [selectedBank, setSelectedBank] = useState('crdb');
  const [accountNumber, setAccountNumber] = useState('0152948192800');
  const [accountName, setAccountName] = useState('Juma Bakari Mwamba');
  const [amount, setAmount] = useState('100000');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const banks = [
    { id: 'crdb', name: 'CRDB Bank Plc', code: 'CRDB' },
    { id: 'nmb', name: 'NMB Bank Plc', code: 'NMB' },
    { id: 'nbc', name: 'National Bank of Commerce (NBC)', code: 'NBC' },
    { id: 'stanbic', name: 'Stanbic Bank Tanzania', code: 'STANBIC' },
    { id: 'dtb', name: 'Diamond Trust Bank (DTB)', code: 'DTB' },
    { id: 'exim', name: 'Exim Bank Tanzania', code: 'EXIM' }
  ];

  const currentBank = banks.find(b => b.id === selectedBank) || banks[0];
  const numAmount = parseFloat(amount) || 0;
  const fee = 1200; // standard bank bridge fee

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (pin.length < 4) return;
      setStep(3);
      if (onTransactionComplete) {
        onTransactionComplete({
          id: 'BK' + Math.floor(100000000 + Math.random() * 900000000),
          title: `${t.bankTransfer} (${currentBank.code})`,
          amount: -numAmount,
          fee: fee,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'bank'
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
        <div className="bg-[#1E293B] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-lg">{t.bankTransfer}</h3>
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
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.bankSelect}
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white cursor-pointer"
              >
                {banks.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.bankAccount}
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter bank account number"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22]"
              />
            </div>

            <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span>{t.recipientName}:</span>
              <span className="font-semibold text-stone-900">{accountName}</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.amountTZS}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="2000"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-lg font-bold focus:outline-none focus:border-[#F05A22]"
                />
                <span className="absolute right-3.5 top-3 text-xs font-semibold text-stone-400">
                  TZS
                </span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">{t.transactionFee}:</span>
                <span className="font-semibold text-stone-800">{fee.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-stone-200">
                <span>{t.totalDeduction}:</span>
                <span className="text-[#F05A22]">{(numAmount + fee).toLocaleString()} TZS</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#F05A22] hover:bg-[#D8450E] text-white rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md"
            >
              {lang === 'en' ? 'Continue to Transfer' : 'Endelea na Uhamisho'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-orange-100 text-[#F05A22] rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-900 text-base">{t.enterPin}</h4>
              <p className="text-xs text-stone-500">
                {currentBank.name} - {numAmount.toLocaleString()} TZS
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
                className="w-36 mx-auto block px-3 py-2 text-center text-2xl font-bold tracking-widest rounded-xl border border-stone-300 focus:outline-none focus:border-[#F05A22]"
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
                className="flex-1 py-2.5 bg-[#F05A22] disabled:opacity-50 hover:bg-[#D8450E] text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
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
                {lang === 'en' ? 'Bank transfer settled instantly via TIPS / BOT gateway.' : 'Uhamisho wa benki umekamilika papo hapo kupitia TIPS.'}
              </p>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">{t.bankSelect}</span>
                <span className="font-bold text-stone-900">{currentBank.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.recipientName}</span>
                <span className="font-semibold text-stone-900">{accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.amountTZS}</span>
                <span className="font-bold text-stone-900">{numAmount.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.timestamp}</span>
                <span className="text-stone-700">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-[#F05A22] hover:bg-[#D8450E] text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
