import React, { useState } from 'react';
import { X, Receipt, CheckCircle2, Zap, Droplets, Landmark, Store, ShieldCheck } from 'lucide-react';

export function LipaModal({ isOpen, onClose, t, lang, onTransactionComplete }) {
  const [category, setCategory] = useState('luku'); // 'luku' | 'water' | 'gepg' | 'merchant'
  const [billerNumber, setBillerNumber] = useState('24198201948');
  const [amount, setAmount] = useState('20000');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1);
  const [tokenResult, setTokenResult] = useState('');

  if (!isOpen) return null;

  const numAmount = parseFloat(amount) || 0;
  const fee = category === 'merchant' ? 0 : 300; // Merchant Lipa is 0 fee to consumer

  const categories = [
    { id: 'luku', name: 'LUKU (TANESCO)', icon: Zap, placeholder: 'Meter No: 24198201948', label: lang === 'en' ? 'Meter Number' : 'Namba ya Mita' },
    { id: 'water', name: lang === 'en' ? 'Water (DAWASA / Urban)' : 'Maji (DAWASA / Mamlaka)', icon: Droplets, placeholder: 'Account: 01928472', label: lang === 'en' ? 'Water Account' : 'Akaunti ya Maji' },
    { id: 'gepg', name: lang === 'en' ? 'Government (GePG)' : 'Serikali (GePG)', icon: Landmark, placeholder: 'Control: 9912049281', label: lang === 'en' ? 'Control Number' : 'Namba ya Kumbukumbu' },
    { id: 'merchant', name: lang === 'en' ? 'Merchant / Till (Lipa)' : 'Namba ya Mfanyabiashara', icon: Store, placeholder: 'Till / Lipa: 718291', label: lang === 'en' ? 'Till Number' : 'Namba ya Lipa' }
  ];

  const currentCategory = categories.find(c => c.id === category) || categories[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (pin.length < 4) return;
      if (category === 'luku') {
        // Generate realistic 20-digit LUKU token
        const t1 = Math.floor(1000 + Math.random() * 9000);
        const t2 = Math.floor(1000 + Math.random() * 9000);
        const t3 = Math.floor(1000 + Math.random() * 9000);
        const t4 = Math.floor(1000 + Math.random() * 9000);
        const t5 = Math.floor(1000 + Math.random() * 9000);
        setTokenResult(`${t1}-${t2}-${t3}-${t4}-${t5}`);
      }
      setStep(3);
      if (onTransactionComplete) {
        onTransactionComplete({
          id: 'LP' + Math.floor(100000000 + Math.random() * 900000000),
          title: `${t.payBills} (${currentCategory.name})`,
          amount: -numAmount,
          fee: fee,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'bill'
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
        <div className="bg-[#E04B15] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            <h3 className="font-bold text-lg">{t.payBills}</h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-2">
                {t.billType}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCategory(item.id);
                        setBillerNumber(item.placeholder.split(': ')[1] || '');
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2 cursor-pointer ${
                        category === item.id
                          ? 'border-[#E04B15] bg-orange-50/50 text-stone-900 font-bold ring-1 ring-[#E04B15]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#E04B15] mt-0.5 shrink-0" />
                      <span className="text-xs">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {currentCategory.label}
              </label>
              <input
                type="text"
                value={billerNumber}
                onChange={(e) => setBillerNumber(e.target.value)}
                placeholder={currentCategory.placeholder}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#E04B15]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.amountTZS}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-lg font-bold focus:outline-none focus:border-[#E04B15]"
                />
                <span className="absolute right-3.5 top-3 text-xs font-semibold text-stone-400">
                  TZS
                </span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">{t.transactionFee}:</span>
                <span className="font-semibold text-stone-800">
                  {fee === 0 ? (lang === 'en' ? 'FREE for Customer' : 'BURE kwa Mteja') : `${fee} TZS`}
                </span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-stone-200">
                <span>{t.totalDeduction}:</span>
                <span className="text-[#E04B15]">{(numAmount + fee).toLocaleString()} TZS</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E04B15] hover:bg-[#C23C0C] text-white rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md"
            >
              {lang === 'en' ? 'Proceed to Payment' : 'Endelea Kulipia'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-orange-100 text-[#E04B15] rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-900 text-base">{t.enterPin}</h4>
              <p className="text-xs text-stone-500">
                {currentCategory.name} - {numAmount.toLocaleString()} TZS
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
                className="w-36 mx-auto block px-3 py-2 text-center text-2xl font-bold tracking-widest rounded-xl border border-stone-300 focus:outline-none focus:border-[#E04B15]"
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
                className="flex-1 py-2.5 bg-[#E04B15] disabled:opacity-50 hover:bg-[#C23C0C] text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
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
                {lang === 'en' ? 'Bill payment has been settled.' : 'Bili imelipwa kikamilifu.'}
              </p>
            </div>

            {category === 'luku' && (
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
                <span className="text-xs text-emerald-800 font-semibold block">
                  {lang === 'en' ? 'LUKU Electricity Token (Units: 58.4 kWh)' : 'Namba ya Tokeni ya LUKU (Umeme: 58.4 kWh)'}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-emerald-950 tracking-wider block mt-1 select-all">
                  {tokenResult}
                </span>
              </div>
            )}

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">{t.amountTZS}</span>
                <span className="font-bold text-stone-900">{numAmount.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{currentCategory.label}</span>
                <span className="font-mono text-stone-900">{billerNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.timestamp}</span>
                <span className="text-stone-700">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-[#E04B15] hover:bg-[#C23C0C] text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
