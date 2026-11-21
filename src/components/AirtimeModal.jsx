import React, { useState } from 'react';
import { X, Smartphone, CheckCircle2, ShieldCheck, Sparkles, Wifi } from 'lucide-react';

export function AirtimeModal({ isOpen, onClose, t, lang, onTransactionComplete }) {
  const [tab, setTab] = useState('airtime'); // 'airtime' | 'bundle'
  const [phoneNumber, setPhoneNumber] = useState('0628 123 456');
  const [amount, setAmount] = useState('5000');
  const [selectedBundle, setSelectedBundle] = useState('b2');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const bundles = [
    { id: 'b1', name: lang === 'en' ? 'Daily 1.5GB + 30 Mins' : 'Siku 1.5GB + Dakika 30', price: 2000, validity: lang === 'en' ? '24 Hours' : 'Masaa 24' },
    { id: 'b2', name: lang === 'en' ? 'Weekly 8GB + 150 Mins' : 'Wiki 8GB + Dakika 150', price: 10000, validity: lang === 'en' ? '7 Days' : 'Siku 7' },
    { id: 'b3', name: lang === 'en' ? 'Monthly 35GB + 600 Mins' : 'Mwezi 35GB + Dakika 600', price: 30000, validity: lang === 'en' ? '30 Days' : 'Siku 30' },
    { id: 'b4', name: lang === 'en' ? 'Chuo Special 3GB Data' : 'Ofa ya Chuo 3GB Intaneti', price: 3000, validity: lang === 'en' ? '3 Days' : 'Siku 3' },
  ];

  const currentBundle = bundles.find(b => b.id === selectedBundle) || bundles[0];
  const finalAmount = tab === 'airtime' ? (parseFloat(amount) || 0) : currentBundle.price;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (pin.length < 4) return;
      setStep(3);
      if (onTransactionComplete) {
        onTransactionComplete({
          id: 'AT' + Math.floor(100000000 + Math.random() * 900000000),
          title: tab === 'airtime'
            ? `${t.airtimeBundles} (Halotel Airtime ${phoneNumber})`
            : `${t.airtimeBundles} (${currentBundle.name})`,
          amount: -finalAmount,
          fee: 0,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'airtime'
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
        <div className="bg-[#EA580C] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            <h3 className="font-bold text-lg">{t.airtimeBundles}</h3>
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
            <div className="flex rounded-xl bg-stone-100 p-1">
              <button
                type="button"
                onClick={() => setTab('airtime')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  tab === 'airtime' ? 'bg-white text-orange-700 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Normal Airtime (+10% Bonus)' : 'Muda wa Maongezi (+10% Bonasi)'}
              </button>
              <button
                type="button"
                onClick={() => setTab('bundle')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  tab === 'bundle' ? 'bg-white text-orange-700 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Wifi className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Internet & Voice Bundles' : 'Vifurushi vya Intaneti & Sauti'}
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {lang === 'en' ? 'Recipient Halotel Number' : 'Namba ya Simu ya Halotel'}
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-orange-600"
              />
            </div>

            {tab === 'airtime' ? (
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.amountTZS}
                </label>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-lg font-bold focus:outline-none focus:border-orange-600"
                />
                <div className="flex gap-2 mt-2">
                  {['1000', '2000', '5000', '10000'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer"
                    >
                      {parseInt(val).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  {lang === 'en' ? 'Select Preferred Bundle' : 'Chagua Kifurushi'}
                </label>
                <div className="space-y-2">
                  {bundles.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBundle(b.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        selectedBundle === b.id
                          ? 'border-orange-600 bg-orange-50/60 ring-1 ring-orange-600'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-stone-900">{b.name}</div>
                        <div className="text-[10px] text-stone-500">{b.validity}</div>
                      </div>
                      <div className="font-bold text-xs text-orange-600">
                        {b.price.toLocaleString()} TZS
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md shadow-orange-500/15"
            >
              {lang === 'en' ? 'Purchase Instant Top-up' : 'Nunua Papo Hapo'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-900 text-base">{t.enterPin}</h4>
              <p className="text-xs text-stone-500">
                {finalAmount.toLocaleString()} TZS
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
                className="w-36 mx-auto block px-3 py-2 text-center text-2xl font-bold tracking-widest rounded-xl border border-stone-300 focus:outline-none focus:border-orange-600"
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
                className="flex-1 py-2.5 bg-[#EA580C] disabled:opacity-50 hover:bg-[#C2410C] text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
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
                {lang === 'en' ? 'Recharge successfully activated on recipient phone.' : 'Salio au kifurushi kimeongezwa kwa mafanikio.'}
              </p>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">{lang === 'en' ? 'Phone Number' : 'Namba ya Simu'}</span>
                <span className="font-semibold text-stone-900">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.amountTZS}</span>
                <span className="font-bold text-stone-900">{finalAmount.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.timestamp}</span>
                <span className="text-stone-700">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
