import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export function SendMoneyModal({ isOpen, onClose, t, lang, onTransactionComplete }) {
  const [step, setStep] = useState(1); // 1: Input, 2: PIN Confirm, 3: Success Receipt
  const [network, setNetwork] = useState('halopesa'); // 'halopesa', 'mpesa', 'airtel', 'tigo'
  const [recipientPhone, setRecipientPhone] = useState('0628 459 812');
  const [recipientName, setRecipientName] = useState('Amina Juma Mohamed');
  const [amount, setAmount] = useState('25000');
  const [reference, setReference] = useState(lang === 'en' ? 'School supplies' : 'Mahitaji ya shule');
  const [pin, setPin] = useState('');
  const [txId, setTxId] = useState('');

  if (!isOpen) return null;

  const numAmount = parseFloat(amount) || 0;
  const fee = network === 'halopesa' ? (numAmount > 10000 ? 450 : 200) : (numAmount > 10000 ? 850 : 500);
  const total = numAmount + fee;

  const handleNextToPin = (e) => {
    e.preventDefault();
    if (!amount || numAmount <= 0) return;
    setStep(2);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (pin.length < 4) return;
    const generatedId = 'HP' + Math.floor(100000000 + Math.random() * 900000000);
    setTxId(generatedId);
    setStep(3);
    if (onTransactionComplete) {
      onTransactionComplete({
        id: generatedId,
        title: `${t.sendMoney} (${recipientName})`,
        amount: -numAmount,
        fee: fee,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'transfer',
        recipient: recipientPhone,
        network: network.toUpperCase()
      });
    }
  };

  const handleReset = () => {
    setStep(1);
    setPin('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-100">
        {/* Modal Header */}
        <div className="bg-[#F05A22] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            <h3 className="font-bold text-lg">{t.sendMoney}</h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Transfer Details */}
        {step === 1 && (
          <form onSubmit={handleNextToPin} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-2">
                {lang === 'en' ? 'Select Destination Network' : 'Chagua Mtandao'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                {[
                  { id: 'halopesa', name: 'HaloPesa (Halotel)', badge: 'Free / Low Fee' },
                  { id: 'mpesa', name: 'Vodacom M-Pesa', badge: 'Interoperable' },
                  { id: 'airtel', name: 'Airtel Money', badge: 'Interoperable' },
                  { id: 'tigo', name: 'Tigo Pesa', badge: 'Interoperable' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNetwork(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      network === item.id
                        ? 'border-[#F05A22] bg-[#FFF5F0] text-stone-900 font-semibold ring-1 ring-[#F05A22]'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div>{item.name}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{item.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.recipientNumber}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="062X XXX XXX"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]"
                />
                <span className="absolute right-3 top-2.5 text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span>{t.recipientName}:</span>
              <span className="font-semibold text-stone-900">{recipientName}</span>
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
                  placeholder="e.g. 10000"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-lg font-bold focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]"
                />
                <span className="absolute right-3.5 top-3 text-xs font-semibold text-stone-400">
                  TZS
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.referenceNote}
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. Rent, Gift, Food"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22]"
              />
            </div>

            {/* Fee summary card */}
            <div className="bg-orange-50/60 p-3 rounded-xl border border-orange-100 text-xs space-y-1.5 text-stone-700">
              <div className="flex justify-between">
                <span>{t.transactionFee}:</span>
                <span className="font-medium text-stone-900">{fee.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-orange-200">
                <span>{t.totalDeduction}:</span>
                <span className="text-[#F05A22]">{total.toLocaleString()} TZS</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#F05A22] hover:bg-[#D8450E] text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-500/10"
            >
              <span>{lang === 'en' ? 'Continue to Authorization' : 'Endelea Kuthibitisha'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: PIN Confirmation */}
        {step === 2 && (
          <form onSubmit={handleConfirm} className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-orange-100 text-[#F05A22] rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-900 text-base">
                {lang === 'en' ? 'Confirm Payment Details' : 'Thibitisha Malipo'}
              </h4>
              <p className="text-xs text-stone-500">
                {lang === 'en'
                  ? `Sending ${numAmount.toLocaleString()} TZS to ${recipientName} (${recipientPhone})`
                  : `Unatuma TZS ${numAmount.toLocaleString()} kwa ${recipientName} (${recipientPhone})`}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">{t.recipientName}</span>
                <span className="font-semibold text-stone-900">{recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.recipientNumber}</span>
                <span className="font-semibold text-stone-900">{recipientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.amountTZS}</span>
                <span className="font-bold text-stone-900">{numAmount.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.transactionFee}</span>
                <span className="font-medium text-stone-900">{fee.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 font-bold">
                <span className="text-stone-700">{t.totalDeduction}</span>
                <span className="text-[#F05A22] text-sm">{total.toLocaleString()} TZS</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1 text-center">
                {t.enterPin}
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder={t.pinPlaceholder}
                autoFocus
                required
                className="w-36 mx-auto block px-3 py-2 text-center text-2xl font-bold tracking-widest rounded-xl border border-stone-300 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]"
              />
              <p className="text-[11px] text-stone-400 text-center mt-1">
                {lang === 'en' ? 'Simulated PIN (type any 4 digits, e.g. 1234)' : 'PIN ya Majaribio (andika tarakimu 4 zozote)'}
              </p>
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

        {/* Step 3: Success Receipt */}
        {step === 3 && (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-bold text-stone-900 text-lg">{t.statusSuccess}</h4>
              <p className="text-xs text-stone-500 mt-1">
                {lang === 'en' ? 'Funds have been delivered successfully.' : 'Pesa zimetumwa kwa ufanisi.'}
              </p>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">{t.referenceCode}</span>
                <span className="font-mono font-bold text-stone-900">{txId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.recipientName}</span>
                <span className="font-semibold text-stone-900">{recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.recipientNumber}</span>
                <span className="font-medium text-stone-900">{recipientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.amountTZS}</span>
                <span className="font-bold text-stone-900">{numAmount.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.transactionFee}</span>
                <span className="text-stone-700">{fee.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200">
                <span className="text-stone-500">{t.timestamp}</span>
                <span className="text-stone-700">{new Date().toLocaleString()}</span>
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
