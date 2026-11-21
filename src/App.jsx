import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { OnboardingHero } from './components/OnboardingHero';
import { Dashboard } from './components/Dashboard';
import { TariffCalculator } from './components/TariffCalculator';
import { AgentFinder } from './components/AgentFinder';
import { SendMoneyModal } from './components/SendMoneyModal';
import { WithdrawModal } from './components/WithdrawModal';
import { LipaModal } from './components/LipaModal';
import { BankModal } from './components/BankModal';
import { AirtimeModal } from './components/AirtimeModal';
import { SavingsModal } from './components/SavingsModal';
import { MobileFrame } from './components/MobileFrame';
import { HaloPesaLogo } from './components/BrandLogo';
import { TanzaniaFlag, UKFlag } from './components/Flags';
import {
  Smartphone,
  Monitor,
  Phone,
  ArrowLeft
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'sw'
  const [viewMode, setViewMode] = useState('web'); // 'web' | 'mobile'
  const [hasStarted, setHasStarted] = useState(false);

  // Simulated Account State
  const [balance, setBalance] = useState(485250); // 485,250 TZS initial
  const [transactions, setTransactions] = useState([
    {
      id: 'HP918274102',
      title: 'Salary Deposit (Halotel Payroll)',
      amount: 450000,
      fee: 0,
      date: 'Today, 08:30 AM',
      category: 'deposit'
    },
    {
      id: 'LP481029482',
      title: 'LUKU Electricity TANESCO',
      amount: -30000,
      fee: 300,
      date: 'Yesterday, 06:15 PM',
      category: 'bill'
    },
    {
      id: 'HP771928410',
      title: 'Sent to Juma Rashid (0622 918 201)',
      amount: -15000,
      fee: 450,
      date: '20 Nov, 02:40 PM',
      category: 'transfer'
    },
    {
      id: 'AT192847291',
      title: 'Halotel Royal Bundle Top-up',
      amount: -10000,
      fee: 0,
      date: '19 Nov, 11:20 AM',
      category: 'airtime'
    }
  ]);

  // Modal Dialog Controllers
  const [sendOpen, setSendOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [lipaOpen, setLipaOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [airtimeOpen, setAirtimeOpen] = useState(false);
  const [savingsOpen, setSavingsOpen] = useState(false);

  const t = translations[lang];

  // Load balance and transactions from Neon DB API if available
  useEffect(() => {
    fetch('/api/balance')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.balance !== undefined) {
          setBalance(data.balance);
        }
      })
      .catch(() => {});

    fetch('/api/transactions')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.transactions && Array.isArray(data.transactions) && data.transactions.length > 0) {
          setTransactions(data.transactions);
        }
      })
      .catch(() => {});
  }, []);

  // Callback when user performs any transaction
  const handleTransactionComplete = async (newTx) => {
    setBalance((prev) => prev + newTx.amount - (newTx.fee || 0));
    setTransactions((prev) => [newTx, ...prev]);

    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx),
      });
    } catch (err) {
      // Local state already updated
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
      {/* Clean, Minimal Top Bar: Only Brand Logo + View Mode + Language Selector */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div
            onClick={() => setHasStarted(false)}
            className="cursor-pointer flex items-center gap-2 select-none"
          >
            <HaloPesaLogo className="h-8" />
          </div>

          {/* Right Controls: Display Mode & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Switcher (Web Card vs Mobile Phone Frame) */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('web')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'web'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Card View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.webView}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'mobile'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Phone Mockup View"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.mobileView}</span>
              </button>
            </div>

            {/* Language Switcher Buttons (Zero Emojis - Vector SVG Flags) */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Switch to English"
              >
                <UKFlag className="w-4 h-3" />
                <span>EN</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('sw')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'sw'
                    ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Badili kwenda Kiswahili"
              >
                <TanzaniaFlag className="w-4 h-3" />
                <span>SW</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
        {/* If Mobile Phone Frame is selected */}
        {viewMode === 'mobile' ? (
          <div className="py-2">
            <MobileFrame>
              {!hasStarted ? (
                <OnboardingHero
                  lang={lang}
                  setLang={setLang}
                  t={t}
                  onGetStarted={() => setHasStarted(true)}
                  inFrame={true}
                />
              ) : (
                <div className="p-4 space-y-4">
                  <button
                    type="button"
                    onClick={() => setHasStarted(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#F05A22] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Back to Onboarding' : 'Rudi Mwanzo'}</span>
                  </button>
                  <Dashboard
                    t={t}
                    lang={lang}
                    balance={balance}
                    transactions={transactions}
                    onOpenSend={() => setSendOpen(true)}
                    onOpenWithdraw={() => setWithdrawOpen(true)}
                    onOpenLipa={() => setLipaOpen(true)}
                    onOpenBank={() => setBankOpen(true)}
                    onOpenAirtime={() => setAirtimeOpen(true)}
                    onOpenSavings={() => setSavingsOpen(true)}
                    onBackToHero={() => setHasStarted(false)}
                  />
                </div>
              )}
            </MobileFrame>
          </div>
        ) : (
          /* Flexible Card Layout */
          <div className="w-full flex justify-center py-2">
            {!hasStarted ? (
              <div className="w-full max-w-[440px]">
                <OnboardingHero
                  lang={lang}
                  setLang={setLang}
                  t={t}
                  onGetStarted={() => setHasStarted(true)}
                  inFrame={false}
                />
              </div>
            ) : (
              <div className="w-full max-w-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setHasStarted(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#F05A22] transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-stone-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Back to Onboarding Screen' : 'Rudi Kwenye Muonekano wa Mwanzo'}</span>
                  </button>
                </div>
                <Dashboard
                  t={t}
                  lang={lang}
                  balance={balance}
                  transactions={transactions}
                  onOpenSend={() => setSendOpen(true)}
                  onOpenWithdraw={() => setWithdrawOpen(true)}
                  onOpenLipa={() => setLipaOpen(true)}
                  onOpenBank={() => setBankOpen(true)}
                  onOpenAirtime={() => setAirtimeOpen(true)}
                  onOpenSavings={() => setSavingsOpen(true)}
                  onBackToHero={() => setHasStarted(false)}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Transaction Modals */}
      <SendMoneyModal
        isOpen={sendOpen}
        onClose={() => setSendOpen(false)}
        t={t}
        lang={lang}
        onTransactionComplete={handleTransactionComplete}
      />
      <WithdrawModal
        isOpen={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        t={t}
        lang={lang}
        onTransactionComplete={handleTransactionComplete}
      />
      <LipaModal
        isOpen={lipaOpen}
        onClose={() => setLipaOpen(false)}
        t={t}
        lang={lang}
        onTransactionComplete={handleTransactionComplete}
      />
      <BankModal
        isOpen={bankOpen}
        onClose={() => setBankOpen(false)}
        t={t}
        lang={lang}
        onTransactionComplete={handleTransactionComplete}
      />
      <AirtimeModal
        isOpen={airtimeOpen}
        onClose={() => setAirtimeOpen(false)}
        t={t}
        lang={lang}
        onTransactionComplete={handleTransactionComplete}
      />
      <SavingsModal
        isOpen={savingsOpen}
        onClose={() => setSavingsOpen(false)}
        t={t}
        lang={lang}
        onTransactionComplete={handleTransactionComplete}
      />

      {/* Clean Minimal Footer */}
      <footer className="mt-auto bg-white border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t.copyright}</span>
          <span className="text-stone-400 font-medium">{t.customerCare}</span>
        </div>
      </footer>
    </div>
  );
}
