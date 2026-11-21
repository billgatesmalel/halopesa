import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { OnboardingHero } from './components/OnboardingHero';
import { Dashboard } from './components/Dashboard';
import { SendMoneyModal } from './components/SendMoneyModal';
import { WithdrawModal } from './components/WithdrawModal';
import { LipaModal } from './components/LipaModal';
import { BankModal } from './components/BankModal';
import { AirtimeModal } from './components/AirtimeModal';
import { SavingsModal } from './components/SavingsModal';
import { HaloPesaLogo } from './components/BrandLogo';
import { TanzaniaFlag, UKFlag } from './components/Flags';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'sw'
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
    <div className="min-h-screen w-full bg-[#FEF3EF] flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-white sm:shadow-2xl flex flex-col justify-between relative">
        {!hasStarted ? (
          /* Exact Match Onboarding Screen - Full Screen Edge to Edge */
          <OnboardingHero
            lang={lang}
            setLang={setLang}
            t={t}
            onGetStarted={() => setHasStarted(true)}
          />
        ) : (
          /* Interactive HaloPesa Services & Portal */
          <div className="flex-1 flex flex-col bg-[#FAF7F2]">
            {/* Top Navigation Bar in Dashboard */}
            <div className="sticky top-0 z-30 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-xs">
              <button
                type="button"
                onClick={() => setHasStarted(false)}
                className="flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-[#F05A22] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'en' ? 'Back' : 'Rudi'}</span>
              </button>

              <HaloPesaLogo className="h-6" />

              {/* Language Switcher */}
              <div className="flex items-center bg-stone-100 p-0.5 rounded-lg text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    lang === 'en' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  <UKFlag className="w-3.5 h-2.5" />
                  <span>EN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('sw')}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    lang === 'sw' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  <TanzaniaFlag className="w-3.5 h-2.5" />
                  <span>SW</span>
                </button>
              </div>
            </div>

            {/* Dashboard Body */}
            <div className="flex-1 p-4 overflow-y-auto">
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
          </div>
        )}
      </div>

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
    </div>
  );
}
