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
  Calculator,
  MapPin,
  Home,
  Layers,
  Shield,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'sw'
  const [viewMode, setViewMode] = useState('web'); // 'web' | 'mobile'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'services' | 'tariffs' | 'agents'
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
    // Update local state immediately for responsive feedback
    setBalance((prev) => prev + newTx.amount - (newTx.fee || 0));
    setTransactions((prev) => [newTx, ...prev]);

    // Sync with Neon DB backend API
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

  const handleGetStarted = () => {
    setHasStarted(true);
    setActiveTab('services');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
      {/* Universal Top Controls Bar: Display Mode + Language Switcher + USSD info */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div
            onClick={() => {
              setActiveTab('home');
              setHasStarted(false);
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            <HaloPesaLogo className="h-8" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-stone-700">
            <button
              type="button"
              onClick={() => {
                setActiveTab('home');
                setHasStarted(false);
              }}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'home' && !hasStarted
                  ? 'bg-orange-50 text-[#F05A22]'
                  : 'hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {t.navHome}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('services');
                setHasStarted(true);
              }}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'services' || hasStarted
                  ? 'bg-orange-50 text-[#F05A22]'
                  : 'hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {t.navServices}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tariffs')}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'tariffs'
                  ? 'bg-orange-50 text-[#F05A22]'
                  : 'hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {t.navTariffs}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('agents')}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'agents'
                  ? 'bg-orange-50 text-[#F05A22]'
                  : 'hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {t.navAgents}
            </button>
          </nav>

          {/* Right Action Controls: View Mode Switcher + Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Switcher (Mobile Mockup vs Full Web) */}
            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('web')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'web'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Full Responsive Web Portal"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{t.webView}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'mobile'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Interactive Mobile Frame"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{t.mobileView}</span>
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

            {/* Quick Dial USSD Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-100 text-[#F05A22] text-xs font-mono font-bold">
              <span>USSD:</span>
              <span className="text-stone-900">{t.ussdCode}</span>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden border-t border-stone-200 bg-stone-50 px-3 py-1.5 justify-around text-xs font-medium text-stone-600 overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
              setHasStarted(false);
            }}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              activeTab === 'home' && !hasStarted ? 'bg-orange-100 text-[#F05A22] font-bold' : ''
            }`}
          >
            {t.navHome}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('services');
              setHasStarted(true);
            }}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              activeTab === 'services' || hasStarted ? 'bg-orange-100 text-[#F05A22] font-bold' : ''
            }`}
          >
            {t.navServices}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tariffs')}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              activeTab === 'tariffs' ? 'bg-orange-100 text-[#F05A22] font-bold' : ''
            }`}
          >
            {t.navTariffs}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('agents')}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              activeTab === 'agents' ? 'bg-orange-100 text-[#F05A22] font-bold' : ''
            }`}
          >
            {t.navAgents}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* If Mobile Frame Mode is selected, render inside interactive smartphone bezel */}
        {viewMode === 'mobile' ? (
          <div className="py-4">
            <div className="text-center mb-4">
              <span className="inline-block text-xs font-semibold text-stone-500 bg-stone-200/70 px-3 py-1 rounded-full">
                {lang === 'en'
                  ? 'Mobile Device Preview - Interactive Smartphone View'
                  : 'Muonekano wa Simu ya Mkononi - Majaribio'}
              </span>
            </div>
            <MobileFrame>
              {!hasStarted && activeTab === 'home' ? (
                <OnboardingHero
                  lang={lang}
                  setLang={setLang}
                  t={t}
                  onGetStarted={handleGetStarted}
                  inFrame={true}
                />
              ) : activeTab === 'tariffs' ? (
                <div className="p-4">
                  <TariffCalculator t={t} lang={lang} />
                </div>
              ) : activeTab === 'agents' ? (
                <div className="p-4">
                  <AgentFinder t={t} lang={lang} />
                </div>
              ) : (
                <div className="p-4">
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
          /* Full Responsive Web Layout */
          <div className="space-y-10">
            {/* When at Home tab and hasn't clicked started, show the full Hero presentation */}
            {activeTab === 'home' && !hasStarted && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side: Authentic Screenshot Onboarding Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-[430px]">
                    <OnboardingHero
                      lang={lang}
                      setLang={setLang}
                      t={t}
                      onGetStarted={handleGetStarted}
                      inFrame={false}
                    />
                  </div>
                </div>

                {/* Right Side: Web Portal Highlights, Key Offerings & Value Prop */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F05A22] text-xs font-bold tracking-wide">
                    <span>{lang === 'en' ? 'Halotel Tanzania Mobile Financial Services' : 'Huduma za Kifedha za Halotel Tanzania'}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
                    {lang === 'en' ? (
                      <>
                        Simple, fast and reliable <span className="text-[#F05A22]">mobile money</span> for everyone.
                      </>
                    ) : (
                      <>
                        Huduma rahisi, ya haraka na salama ya <span className="text-[#F05A22]">fedha kwa simu</span> yako.
                      </>
                    )}
                  </h1>

                  <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                    {lang === 'en'
                      ? 'HaloPesa empowers millions across Tanzania to send and receive cash, withdraw with low fees, pay utilities and merchant bills, transfer to any bank, and grow savings with high interest.'
                      : 'HaloPesa inawasaidia mamilioni ya Watanzania kutuma na kupokea pesa, kutoa kwa tozo nafuu, kulipia huduma na bili za wafanyabiashara, kuhamisha kwenda benki yoyote, na kuweka akiba yenye faida kubwa.'}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { title: t.sendMoney, desc: lang === 'en' ? 'Low network tariffs' : 'Tozo nafuu sana' },
                      { title: t.withdrawCash, desc: '65,000+ Mawakala' },
                      { title: t.payBills, desc: 'LUKU, GePG & DAWASA' },
                      { title: t.bankTransfer, desc: 'TIPS Interoperability' },
                      { title: t.airtimeBundles, desc: lang === 'en' ? '+10% Bonus Airtime' : '+10% Bonasi ya Muda' },
                      { title: t.savingsKikoba, desc: lang === 'en' ? '9% p.a. Interest' : '9% Faida ya Mwaka' },
                    ].map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-1 hover:border-orange-300 transition-colors"
                      >
                        <h4 className="font-bold text-xs text-stone-900">{feat.title}</h4>
                        <p className="text-[11px] text-stone-500">{feat.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleGetStarted}
                      className="py-3 px-6 rounded-xl bg-[#F05A22] hover:bg-[#D8450E] text-white font-bold text-sm transition-all shadow-md shadow-orange-500/20 cursor-pointer flex items-center gap-2"
                    >
                      <span>{t.getStarted}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('tariffs')}
                      className="py-3 px-5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Calculator className="w-4 h-4 text-[#F05A22]" />
                      <span>{t.navTariffs}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('agents')}
                      className="py-3 px-5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>{t.navAgents}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Dashboard & Services Tab */}
            {(activeTab === 'services' || (hasStarted && activeTab === 'home')) && (
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
                onBackToHero={() => {
                  setHasStarted(false);
                  setActiveTab('home');
                }}
              />
            )}

            {/* Tariff Calculator Tab */}
            {activeTab === 'tariffs' && (
              <TariffCalculator t={t} lang={lang} />
            )}

            {/* Agent Locator Tab */}
            {activeTab === 'agents' && (
              <AgentFinder t={t} lang={lang} />
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

      {/* Footer */}
      <footer className="mt-auto bg-stone-900 text-stone-400 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HaloPesaLogo variant="white" className="h-7" />
              <span className="text-stone-500">|</span>
              <span className="text-stone-300 font-medium">Halotel Tanzania</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-stone-300">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>{t.customerCare}</span>
              </span>
              <span>•</span>
              <span className="font-mono text-orange-400 font-bold">{t.ussdCode}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-3 text-stone-500">
            <p>{t.copyright} {t.regulatedBy}</p>
            <div className="flex gap-4">
              <button type="button" className="hover:text-stone-300 transition-colors cursor-pointer">{t.termsOfService}</button>
              <button type="button" className="hover:text-stone-300 transition-colors cursor-pointer">{t.privacyPolicy}</button>
              <button type="button" className="hover:text-stone-300 transition-colors cursor-pointer">{t.faq}</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
