import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { BiasharaNavbar, BiasharaMobileBottomNav } from './components/biashara/BiasharaNavbar';
import { BiasharaFooter } from './components/biashara/BiasharaFooter';
import { BiasharaHomePage } from './components/biashara/BiasharaHomePage';
import { BiasharaHowItWorksPage } from './components/biashara/pages/BiasharaHowItWorksPage';
import { BiasharaSectorsPage } from './components/biashara/pages/BiasharaSectorsPage';
import { BiasharaTrackPage } from './components/biashara/pages/BiasharaTrackPage';
import { BiasharaFAQPage } from './components/biashara/pages/BiasharaFAQPage';
import { BiasharaSupportPage } from './components/biashara/pages/BiasharaSupportPage';
import { BiasharaLoanForm } from './components/biashara/BiasharaLoanForm';
import { SuperAdminPanel } from './components/biashara/admin/SuperAdminPanel';
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

  // ── /superadmin path takes priority over hash routing ──────────────────────
  const isSuperAdminPath = window.location.pathname === '/superadmin';

  // Dynamic page routing:
  // 'home' | 'how-it-works' | 'calculator' | 'sectors' | 'track' | 'faqs' | 'support' | 'apply' | 'dashboard' | 'onboarding' | 'auth'
  const [activePage, setActivePage] = useState(() => {
    if (isSuperAdminPath) return 'admin';
    const hash = window.location.hash.replace('#', '');
    const validPages = ['home', 'how-it-works', 'sectors', 'track', 'faqs', 'support', 'apply', 'admin', 'dashboard', 'onboarding', 'auth'];
    return validPages.includes(hash) ? hash : 'home';
  });

  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  
  // Active loan object once approved
  const [activeLoan, setActiveLoan] = useState(null);

  // Pre-selected parameters from sectors (if any)
  const [loanApplyParams, setLoanApplyParams] = useState({
    amount: null,
    durationMonths: 2,
    businessCategory: ''
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

  // Sync route with URL hash for browser back/forward and bookmarking
  const navigateToPage = (pageName) => {
    setActivePage(pageName);
    if (pageName === 'admin') {
      // Use clean path for the secret admin route
      window.history.pushState({}, '', '/superadmin');
    } else {
      // All public pages use hash routing
      window.history.pushState({}, '', `/#${pageName}`);
      window.location.hash = pageName;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'how-it-works', 'sectors', 'track', 'faqs', 'support', 'apply', 'admin', 'dashboard', 'onboarding', 'auth'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };
    const handlePopState = () => {
      if (window.location.pathname === '/superadmin') {
        setActivePage('admin');
      } else {
        handleHashChange();
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
    navigateToPage('dashboard');
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
    navigateToPage('dashboard');
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
    } catch {
      // Local state already updated
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  // VIEW 0: SUPER ADMIN PANEL
  // ═════════════════════════════════════════════════════════════════════════
  if (activePage === 'admin') {
    return (
      <SuperAdminPanel onBackToSite={() => navigateToPage('home')} />
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // VIEW 1: DEDICATED 4-STEP LOAN APPLICATION PAGE
  // ═════════════════════════════════════════════════════════════════════════
  if (activePage === 'apply') {
    return (
      <BiasharaLoanForm
        initialParams={loanApplyParams}
        userPhone={userPhone}
        userName={userName}
        onBack={() => navigateToPage('home')}
        onLoanSuccess={handleLoanSuccess}
      />
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // VIEW 2: HALOPESA APP PORTAL & DASHBOARD (WHERE WE HAD LEFT OFF)
  // ═════════════════════════════════════════════════════════════════════════
  if (activePage === 'dashboard' || activePage === 'onboarding' || activePage === 'auth') {
    return (
      <div className="min-h-screen w-full bg-[#FEF3EF] flex justify-center py-0 sm:py-6">
        <div className="w-full max-w-[460px] min-h-screen sm:min-h-[92vh] bg-white sm:rounded-3xl sm:shadow-2xl flex flex-col justify-between relative overflow-hidden sm:border sm:border-stone-200">
          
          {/* Screen: Onboarding Hero */}
          {activePage === 'onboarding' && (
            <OnboardingHero
              lang={lang}
              setLang={setLang}
              t={t}
              onGetStarted={() => navigateToPage('auth')}
            />
          )}

          {/* Screen: Phone Number Input */}
          {activePage === 'auth' && (
            <PhoneAuthScreen
              lang={lang}
              t={t}
              onBack={() => navigateToPage('home')}
              onContinue={handlePhoneAuth}
            />
          )}

          {/* Screen: Interactive HaloPesa Services & Portal (Dashboard) */}
          {activePage === 'dashboard' && (
            <div className="flex-1 h-full flex flex-col bg-[#FAF7F2] overflow-hidden">
              {/* Top Navigation Bar in Dashboard */}
              <div className="shrink-0 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-xs z-30">
                {/* Back to Biashara Loans Homepage */}
                <button
                  type="button"
                  onClick={() => navigateToPage('home')}
                  className="flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-[#F05A22] transition-colors cursor-pointer"
                  title="Go to Biashara Loans / Rudi Tovuti ya Mikopo"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Biashara Portal</span>
                  <span className="sm:hidden">{lang === 'en' ? 'Portal' : 'Tovuti'}</span>
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
                  onNavigateToBiashara={() => navigateToPage('home')}
                  onOpenSend={() => setSendOpen(true)}
                  onOpenWithdraw={() => setWithdrawOpen(true)}
                  onOpenLipa={() => setLipaOpen(true)}
                  onOpenBank={() => setBankOpen(true)}
                  onOpenAirtime={() => setAirtimeOpen(true)}
                  onOpenSavings={() => setSavingsOpen(true)}
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

  // ═════════════════════════════════════════════════════════════════════════
  // VIEW 3: DYNAMIC MULTI-PAGE BIASHARA LOANS WEBSITE
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
      {/* Sticky Top Navigation with Active Highlight */}
      <BiasharaNavbar
        activePage={activePage}
        onNavigatePage={navigateToPage}
        onNavigateToApply={() => navigateToPage('apply')}
        onNavigateToHaloPesa={() => navigateToPage('onboarding')}
      />

      {/* Dynamic Page Router Body */}
      <main className="flex-1">
        {/* Dynamic Page 1: Home */}
        {activePage === 'home' && (
          <BiasharaHomePage
            onNavigateToApply={() => navigateToPage('apply')}
            onNavigatePage={navigateToPage}
            onNavigateToHaloPesa={() => navigateToPage('onboarding')}
            onApplyWithParams={(params) => {
              setLoanApplyParams((prev) => ({ ...prev, ...params }));
              navigateToPage('apply');
            }}
          />
        )}

        {/* Dynamic Page 2: How It Works */}
        {activePage === 'how-it-works' && (
          <BiasharaHowItWorksPage
            onNavigateToApply={() => navigateToPage('apply')}
          />
        )}

        {/* Dynamic Page 3: Supported Sectors */}
        {activePage === 'sectors' && (
          <BiasharaSectorsPage
            onSelectSectorAndApply={(sectorName) => {
              setLoanApplyParams((prev) => ({ ...prev, businessCategory: sectorName }));
              navigateToPage('apply');
            }}
          />
        )}

        {/* Dynamic Page 5: Track Loan */}
        {activePage === 'track' && (
          <BiasharaTrackPage
            activeLoan={activeLoan}
            onNavigateToApply={() => navigateToPage('apply')}
            onNavigateToHaloPesa={() => navigateToPage('onboarding')}
          />
        )}

        {/* Dynamic Page 6: FAQs */}
        {activePage === 'faqs' && (
          <BiasharaFAQPage
            onNavigateToSupport={() => navigateToPage('support')}
            onNavigateToApply={() => navigateToPage('apply')}
          />
        )}

        {/* Dynamic Page 7: Support */}
        {activePage === 'support' && (
          <BiasharaSupportPage />
        )}
      </main>

      {/* Shared Footer */}
      <BiasharaFooter
        onNavigatePage={navigateToPage}
        onNavigateToHaloPesa={() => navigateToPage('onboarding')}
        onNavigateToApply={() => navigateToPage('apply')}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BiasharaMobileBottomNav
        activePage={activePage}
        onNavigatePage={navigateToPage}
        onNavigateToApply={() => navigateToPage('apply')}
        onNavigateToHaloPesa={() => navigateToPage('onboarding')}
      />
    </div>
  );
}
