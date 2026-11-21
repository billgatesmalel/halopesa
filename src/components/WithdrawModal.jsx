import React, { useState } from 'react';
import { X, ArrowDownLeft, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

export function WithdrawModal({ isOpen, onClose, t, lang, onTransactionComplete }) {
  const [method, setMethod] = useState('agent'); // 'agent' | 'atm'
  const [agentNumber, setAgentNumber] = useState('882910');
  const [amount, setAmount] = useState('50000');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1);
  const [atmCode, setAtmCode] = useState('');

  if (!isOpen) return null;

  const numAmount = parseFloat(amount) || 0;
  const fee = numAmount > 50000 ? 1800 : (numAmount > 10000 ? 1100 : 600);
  const total = numAmount + fee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (pin.length < 4) return;
      if (method === 'atm') {
        setAtmCode(Math.floor(100000 + Math.random() * 900000).toString());
      }
      setStep(3);
      if (onTransactionComplete) {
        onTransactionComplete({
          id: 'WD' + Math.floor(100000000 + Math.random() * 900000000),
          title: method === 'agent' 
            ? `${t.withdrawCash} (${lang === 'en' ? 'Agent' : 'Wakala'} ${agentNumber})` 
            : `${t.withdrawCash} (ATM)`,
          amount: -numAmount,
          fee: fee,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'withdrawal'
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
        <div className="bg-[#009A44] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowDownLeft className="w-5 h-5" />
            <h3 className="font-bold text-lg">{t.withdrawCash}</h3>
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
                {lang === 'en' ? 'Withdrawal Channel' : 'Njia ya Kutoa Fedha'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('agent')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    method === 'agent'
                      ? 'border-[#009A44] bg-emerald-50/50 text-stone-900 font-bold ring-1 ring-[#009A44]'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <div className="text-sm">{lang === 'en' ? 'Wakala / Agent' : 'Kwa Wakala'}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">Over 65,000 agents</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('atm')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    method === 'atm'
                      ? 'border-[#009A44] bg-emerald-50/50 text-stone-900 font-bold ring-1 ring-[#009A44]'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <div className="text-sm">{lang === 'en' ? 'Cardless ATM' : 'Kutoa ATM'}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">UmojaSwitch & CRDB</div>
                </button>
              </div>
            </div>

            {method === 'agent' ? (
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.agentNumber}
                </label>
                <input
                  type="text"
                  value={agentNumber}
                  onChange={(e) => setAgentNumber(e.target.value)}
                  placeholder="e.g. 882910"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-600"
                />
                <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                  {lang === 'en' ? 'Verified Wakala: Halotel Express Mwenge, Dar es Salaam' : 'Wakala Aliyehakikiwa: Halotel Express Mwenge, Dar es Salaam'}
                </p>
              </div>
            ) : (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                <p className="font-semibold text-stone-800 mb-1">
                  {lang === 'en' ? 'ATM Cardless Withdrawal Token' : 'Nambari ya Kutoa Pesa ATM'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'A 6-digit secure code will be generated. Enter it at any UmojaSwitch or partner bank ATM screen.'
                    : 'Msimbo wa tarakimu 6 utatengenezwa. Uingize kwenye mashine yoyote ya ATM inayotumia UmojaSwitch.'}
                </p>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.amountTZS}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-lg font-bold focus:outline-none focus:border-emerald-600"
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
                <span className="text-emerald-700">{total.toLocaleString()} TZS</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#009A44] hover:bg-[#008239] text-white rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md shadow-emerald-600/15"
            >
              {lang === 'en' ? 'Proceed with Withdrawal' : 'Endelea Kutoa Fedha'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-900 text-base">{t.enterPin}</h4>
              <p className="text-xs text-stone-500">
                {lang === 'en'
                  ? `Authorize withdrawal of ${numAmount.toLocaleString()} TZS`
                  : `Thibitisha kutoa TZS ${numAmount.toLocaleString()}`}
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
                className="w-36 mx-auto block px-3 py-2 text-center text-2xl font-bold tracking-widest rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
              <p className="text-[11px] text-stone-400 text-center mt-1">
                {lang === 'en' ? 'Test PIN: enter any 4 digits' : 'Nambari ya majaribio: weka tarakimu 4'}
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
                className="flex-1 py-2.5 bg-[#009A44] disabled:opacity-50 hover:bg-[#008239] text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
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
                {method === 'agent'
                  ? (lang === 'en' ? 'Present this confirmation to the agent.' : 'Onyesha uthibitisho huu kwa wakala kupokea pesa.')
                  : (lang === 'en' ? 'Use the ATM voucher code below.' : 'Tumia namba ya vocha ya ATM hapo chini.')}
              </p>
            </div>

            {method === 'atm' && (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
                <span className="text-xs text-amber-800 font-medium block">
                  {lang === 'en' ? 'ATM One-Time Token (Valid for 15 mins)' : 'Namba ya Vocha ya ATM (Dakika 15)'}
                </span>
                <span className="font-mono text-3xl font-extrabold text-amber-950 tracking-wider block mt-1">
                  {atmCode}
                </span>
              </div>
            )}

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">{t.amountTZS}</span>
                <span className="font-bold text-stone-900">{numAmount.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.transactionFee}</span>
                <span className="text-stone-700">{fee.toLocaleString()} TZS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.timestamp}</span>
                <span className="text-stone-700">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-[#009A44] hover:bg-[#008239] text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
