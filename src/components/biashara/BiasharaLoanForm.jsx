import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HaloPesaLogo } from '../BrandLogo';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Loader2,
  Sparkles
} from 'lucide-react';

export function BiasharaLoanForm({
  initialParams = {},
  userPhone = '',
  userName = '',
  onBack,
  onLoanSuccess
}) {
  // Form State
  const [fullname, setFullname] = useState(userName || '');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState(userPhone || '0622 145 890');
  const [age, setAge] = useState('32');
  const [gender, setGender] = useState('Female');
  const [maritalStatus, setMaritalStatus] = useState('Married');

  const [bizCategory, setBizCategory] = useState(initialParams.businessCategory || 'Retail & Small Shops');
  const [bizLocation, setBizLocation] = useState('Dar es Salaam, Kariakoo');
  const [monthlyRevenue, setMonthlyRevenue] = useState('1000000:2500000');
  const [bizAge, setBizAge] = useState('1-3 Years');

  const [amount, setAmount] = useState(initialParams.amount || 500000);
  const [durationMonths, setDurationMonths] = useState(initialParams.durationMonths || 2);
  const [loanPurpose, setLoanPurpose] = useState('Stock Purchase / Kuongeza Bidhaa');

  // Submission & Processing States: 'idle' | 'processing' | 'approved'
  const [submissionState, setSubmissionState] = useState('idle');
  const [processingStep, setProcessingStep] = useState(1);
  const [approvedLoanData, setApprovedLoanData] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(4);

  // Live Calculations
  const monthlyRate = 0.05; // 5% simple interest per month
  const totalInterest = Math.round(amount * monthlyRate * durationMonths);
  const totalRepayment = amount + totalInterest;

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

  const handleCompleteRedirect = useCallback(() => {
    if (onLoanSuccess && approvedLoanData) {
      onLoanSuccess(approvedLoanData);
    }
  }, [onLoanSuccess, approvedLoanData]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        monthlyInstallment: Math.round(totalRepayment / durationMonths),
        dueDate: formattedDueDate,
        borrowerName: fullname || 'HaloPesa Merchant',
        phone,
        category: bizCategory,
        disbursedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setApprovedLoanData(loanInfo);
      setSubmissionState('approved');
    }, 2800);
  };

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

  return (
    <div className="min-h-screen bg-stone-100 py-6 sm:py-10 px-3 sm:px-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white px-6 py-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={submissionState === 'processing'}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home / Rudi Nyuma</span>
          </button>

          <div className="flex items-center gap-2">
            <HaloPesaLogo className="h-6" variant="white" />
            <div className="h-4 w-px bg-stone-700"></div>
            <span className="text-sm font-extrabold text-[#F05A22]">
              Biashara<span className="text-white">Loans</span>
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            STATE 1: FORM INPUT (IDLE)
        ════════════════════════════════════════════════════════════════════ */}
        {submissionState === 'idle' && (
          <div className="p-6 sm:p-10">
            {/* Form Banner */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3 py-1 rounded-full mb-2">
                100% Digital Application / Maombi ya Kidijitali
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Biashara Loans Application
                <span className="block text-lg sm:text-xl font-bold text-[#F05A22] mt-0.5">
                  / Fomu ya Maombi ya Mkopo wa Biashara
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Fill the simple details below to receive instant capital directly to your registered HaloPesa line.
                <span className="block text-stone-500 italic text-[11px] sm:text-xs mt-0.5">
                  / Jaza taarifa rahisi hapa chini upokee pesa kwenye laini yako ya HaloPesa bila dhamana ya mali.
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: PERSONAL INFORMATION */}
              <div className="bg-stone-50/70 border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#F05A22] flex items-center justify-center font-black text-xs">
                    1
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-stone-900">
                    Personal Information / Taarifa Binafsi
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] bg-white transition-colors"
                    />
                  </div>

                  {/* National ID (NIDA) */}
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
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] bg-white transition-colors"
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
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] bg-white transition-colors"
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
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22] bg-white transition-colors"
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

              {/* SECTION 2: BUSINESS INFORMATION */}
              <div className="bg-stone-50/70 border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#F05A22] flex items-center justify-center font-black text-xs">
                    2
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-stone-900">
                    Business Information / Taarifa za Biashara
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  {/* Monthly Income */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Monthly Revenue (TZS) / Mauzo ya Mwezi *
                    </label>
                    <select
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white cursor-pointer"
                    >
                      <option value="0:500000">Below TZS 500,000 / Chini ya TZS 500,000</option>
                      <option value="500001:1000000">TZS 500,000 - TZS 1,000,000</option>
                      <option value="1000001:2500000">TZS 1,000,000 - TZS 2,500,000</option>
                      <option value="2500001:5000000">TZS 2,500,000 - TZS 5,000,000</option>
                      <option value="5000001:15000000">Above TZS 5,000,000 / Zaidi ya TZS 5,000,000</option>
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
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#F05A22] bg-white transition-colors"
                    />
                  </div>

                  {/* Business Age */}
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
              </div>

              {/* SECTION 3: LOAN AMOUNT & REPAYMENT */}
              <div className="bg-stone-50/70 border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#F05A22] flex items-center justify-center font-black text-xs">
                    3
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-stone-900">
                    Loan Request & Terms / Kiasi na Masharti ya Mkopo
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-stone-700">
                        Loan Amount / Kiasi cha Mkopo (TZS) *
                      </label>
                      <span className="text-base font-extrabold text-[#F05A22]">
                        TZS {Number(amount).toLocaleString()}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="50000"
                      max="5000000"
                      step="50000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#F05A22]"
                    />

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[100000, 300000, 500000, 1000000, 2000000, 3000000].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAmount(val)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            amount === val
                              ? 'bg-[#F05A22] text-white border-[#F05A22]'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300'
                          }`}
                        >
                          TZS {val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tenure */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Repayment Period / Muda wa Marejesho *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            durationMonths === item.m
                              ? 'bg-white border-[#F05A22] ring-2 ring-[#F05A22]/20 text-[#F05A22]'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <div className="text-xs font-black">{item.en}</div>
                          <div className="text-[10px] text-stone-500 font-medium">/ {item.sw}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Loan Purpose / Sababu ya Mkopo *
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

                  {/* Live Cost Summary Box */}
                  <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-4 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-stone-700">
                      <span>Loan Amount / Kiasi cha Mkopo:</span>
                      <span className="font-bold text-stone-900">TZS {Number(amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-700">
                      <span>Interest (5% p.m.) / Riba Nafuu:</span>
                      <span className="font-bold text-stone-900">TZS {totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-700">
                      <span>Processing Fee / Ada ya Huduma:</span>
                      <span className="font-bold text-[#009A44]">0 TZS (Free Promo / Bure)</span>
                    </div>
                    <div className="pt-2 border-t border-orange-200 flex justify-between items-center text-sm">
                      <span className="font-extrabold text-stone-900">Total Repayable / Jumla ya Kulipa:</span>
                      <span className="font-black text-[#F05A22]">TZS {totalRepayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600 text-[11px] pt-0.5">
                      <span>Due Date / Tarehe ya Marejesho:</span>
                      <span className="font-bold">{formattedDueDate}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Terms disclaimer */}
              <div className="flex items-start gap-2.5 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-[#009A44] shrink-0 mt-0.5" />
                <p>
                  By submitting this application, you agree to HaloPesa Biashara Loan Terms & Conditions. No physical collateral required. Funds will disburse directly to your HaloPesa wallet.
                  <span className="block italic text-[11px] text-stone-400 mt-0.5">
                    / Kwa kuwasilisha, unakubaliana na Masharti ya Mikopo ya Biashara HaloPesa. Fedha zitaingizwa moja kwa moja kwenye akaunti yako.
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-white text-base bg-[#F05A22] hover:bg-[#D8450E] active:scale-[0.99] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Submit Application for Assessment / Tuma Maombi ya Mkopo</span>
                <ArrowRight className="w-5 h-5 stroke-[2.2]" />
              </button>
            </form>
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
              Please wait while our automated scoring engine verifies your details and sets up your disbursement...
            </p>

            {/* Steps Progress Checklist */}
            <div className="w-full max-w-sm mt-8 space-y-3 text-left">
              <div className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                processingStep >= 1 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}>
                {processingStep > 1 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
                )}
                <div className="text-xs font-bold leading-snug">
                  Verifying HaloPesa Account / Kuhakiki namba ya HaloPesa ({phone})
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
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
                  Automated Credit Assessment / Kukagua alama za mkopo
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                processingStep >= 3 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}>
                {processingStep === 3 ? (
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-stone-300 shrink-0"></div>
                )}
                <div className="text-xs font-bold leading-snug">
                  Preparing Instant Payout / Kutuma TZS {Number(amount).toLocaleString()} HaloPesa
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
              <span>Loan Approved & Disbursed / Mkopo Umeidhinishwa & Kulipwa!</span>
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
                <span className="font-bold text-[#009A44]">TZS {approvedLoanData.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>Total Repayment / Jumla ya Kurudisha:</span>
                <span className="font-bold text-stone-900">TZS {approvedLoanData.totalRepayment.toLocaleString()}</span>
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
