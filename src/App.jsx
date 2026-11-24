import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { BiasharaHomePage } from './components/biashara/BiasharaHomePage';
import { BiasharaLoanForm } from './components/biashara/BiasharaLoanForm';
import { OnboardingHero } from './components/OnboardingHero';
import { PhoneAuthScreen } from './components/PhoneAuthScreen';
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
  
  // Navigation screen:
  // 'biashara-home': Modern Bidii-style homepage for Biashara Loans
  // 'biashara-apply': Simple bilingual loan application form
  // 'onboarding': HaloPesa onboarding screen
  // 'auth': HaloPesa phone authentication
  // 'dashboard': HaloPesa wallet dashboard ("where we had left the project")
  const [currentScreen, setCurrentScreen] = useState('biashara-home');

  const [userPhone, setUserPhone] = useState('0628 123 456');
  const [userName, setUserName] = useState('');
  
  // Active loan object once approved
  const [activeLoan, setActiveLoan] = useState(null);

  // Pre-selected parameters from homepage calculator / sectors
  const [loanApplyParams, setLoanApplyParams] = useState({
    amount: 500000,
    durationMonths: 2,
    businessCategory: 'Retail & Small Shops'
  });

  // Simulated Account State (HaloPesa Wallet)
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

  // Handle phone submission from PhoneAuthScreen
  const handlePhoneAuth = ({ phoneNumber, name }) => {
    setUserPhone(phoneNumber);
    if (name) setUserName(name);
    setCurrentScreen('dashboard');
  };

  // Callback when a Biashara loan is successfully approved and disbursed
  const handleLoanSuccess = (loanData) => {
    setActiveLoan(loanData);
    
    // Add disbursed funds to HaloPesa wallet balance
    setBalance((prev) => prev + loanData.amount);

    // Create a new deposit transaction in the account statement
    const newTx = {
      id: loanData.loanId,
      title: 'Biashara Loan Disbursement / Mkopo wa Biashara',
      amount: loanData.amount,
      fee: 0,
      date: 'Just now, ' + (loanData.disbursedAt || 'Today'),
      category: 'loan'
    };

    setTransactions((prev) => [newTx, ...prev]);

    if (loanData.borrowerName) setUserName(loanData.borrowerName);
    if (loanData.phone) setUserPhone(loanData.phone);

    // Redirect to where we had left the project (Dashboard)
    setCurrentScreen('dashboard');
  };

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

  // ═════════════════════════════════════════════════════════════════════════
  // VIEW 1: MODERN BIASHARA LOANS HOMEPAGE (FULL-WIDTH MODERN CODES)
  // ═════════════════════════════════════════════════════════════════════════
  if (currentScreen === 'biashara-home') {
    return (
      <BiasharaHomePage
        onNavigateToApply={() => setCurrentScreen('biashara-apply')}
        onNavigateToHaloPesa={() => setCurrentScreen('dashboard')}
        onApplyWithParams={(params) => {
          setLoanApplyParams((prev) => ({ ...prev, ...params }));
          setCurrentScreen('biashara-apply');
        }}
      />
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // VIEW 2: BIASHARA LOAN APPLICATION FORM (BILINGUAL SWAHILI STROKES)
  // ═════════════════════════════════════════════════════════════════════════
  if (currentScreen === 'biashara-apply') {
    return (
      <BiasharaLoanForm
        initialParams={loanApplyParams}
        userPhone={userPhone}
        userName={userName}
        onBack={() => setCurrentScreen('biashara-home')}
        onLoanSuccess={handleLoanSuccess}
      />
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // VIEW 3: HALOPESA APP PORTAL & DASHBOARD (WHERE WE HAD LEFT OFF)
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen w-full bg-[#FEF3EF] flex justify-center py-0 sm:py-6">
      <div className="w-full max-w-[460px] min-h-screen sm:min-h-[92vh] bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col justify-between relative overflow-hidden sm:border sm:border-stone-200">
        
        {/* Screen: Onboarding Hero */}
        {currentScreen === 'onboarding' && (
          <OnboardingHero
            lang={lang}
            setLang={setLang}
            t={t}
            onGetStarted={() => setCurrentScreen('auth')}
          />
        )}

        {/* Screen: Phone Number Input */}
        {currentScreen === 'auth' && (
          <PhoneAuthScreen
            lang={lang}
            t={t}
            onBack={() => setCurrentScreen('biashara-home')}
            onContinue={handlePhoneAuth}
          />
        )}

        {/* Screen: Interactive HaloPesa Services & Portal (Dashboard) */}
        {currentScreen === 'dashboard' && (
          <div className="flex-1 h-full flex flex-col bg-[#FAF7F2] overflow-hidden">
            {/* Top Navigation Bar in Dashboard */}
            <div className="shrink-0 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-xs z-30">
              {/* Back to Biashara Loans Homepage */}
              <button
                type="button"
                onClick={() => setCurrentScreen('biashara-home')}
                className="flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-[#F05A22] transition-colors cursor-pointer"
                title="Go to Biashara Loans / Rudi Tovuti ya Mikopo"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Biashara Loans</span>
                <span className="sm:hidden">{lang === 'en' ? 'Loans' : 'Mikopo'}</span>
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
                activeLoan={activeLoan}
                onNavigateToBiashara={() => setCurrentScreen('biashara-home')}
                onOpenSend={() => setSendOpen(true)}
                onOpenWithdraw={() => setWithdrawOpen(true)}
                onOpenLipa={() => setLipaOpen(true)}
                onOpenBank={() => setBankOpen(true)}
                onOpenAirtime={() => setAirtimeOpen(true)}
                onOpenSavings={() => setSavingsOpen(true)}
                onBackToHero={() => setCurrentScreen('biashara-home')}
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
