import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Wallet
} from 'lucide-react';

export function BiasharaTrackPage({ activeLoan = null, onNavigateToApply, onNavigateToHaloPesa }) {
  const [query, setQuery] = useState(activeLoan?.loanId || activeLoan?.phone || '');
  const [hasSearched, setHasSearched] = useState(Boolean(activeLoan));
  const [searchResult, setSearchResult] = useState(activeLoan);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // If activeLoan matches or dummy demo lookup
    if (activeLoan && (query.includes(activeLoan.loanId) || query.includes(activeLoan.phone))) {
      setSearchResult(activeLoan);
    } else {
      // Mock lookup if user types any loan ID or phone
      setSearchResult({
        loanId: query.startsWith('BL-') ? query : 'BL-' + Math.floor(100000 + Math.random() * 900000),
        borrowerName: 'Verified HaloPesa Merchant',
        phone: query.startsWith('0') ? query : '0622 145 890',
        amount: 500000,
        totalRepayment: 550000,
        durationMonths: 2,
        dueDate: '24 Jan 2027',
        category: 'Retail & Small Shops',
        disbursedAt: '10:30 AM'
      });
    }
    setHasSearched(true);
  };

  return (
    <div className="py-12 sm:py-16 bg-stone-50/50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[#F05A22] bg-orange-100 px-3.5 py-1 rounded-full mb-3">
            Real-Time Tracking / Fuatilia Mkopo
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Track Your Loan Application
            <span className="block text-xl sm:text-2xl font-bold text-[#F05A22] mt-1.5">
              / Fuatilia Maombi Yako ya Mkopo wa Biashara
            </span>
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            Enter your HaloPesa registered mobile number or Loan Reference ID to check live verification & disbursement status.
          </p>
        </div>

        {/* Search Bar Box */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto bg-white p-2.5 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2">
          <div className="pl-3 text-stone-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Loan ID (e.g. BL-829140) or Phone (0622...)"
            className="flex-1 h-11 px-2 text-xs sm:text-sm text-stone-900 focus:outline-none placeholder-stone-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl font-bold text-white text-xs sm:text-sm bg-[#F05A22] hover:bg-[#D8450E] transition-colors cursor-pointer shrink-0"
          >
            Track Status / Fuatilia
          </button>
        </form>

        {/* Search Results Display */}
        {hasSearched && searchResult && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md space-y-6 animate-in fade-in duration-200">
            
            {/* Header Status Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Disbursed to HaloPesa / Pesa Zimetumwa
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 font-mono mt-0.5">
                  Ref: {searchResult.loanId}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-400 block">Disbursed Amount:</span>
                <span className="text-lg sm:text-xl font-black text-emerald-600 font-mono">
                  TZS {searchResult.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4 py-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-stone-900">
                    1. Application Submitted / Maombi Yamewasilishwa
                  </h4>
                  <p className="text-xs text-stone-500">
                    Received online via Biashara Loans digital portal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-stone-900">
                    2. Automated Credit Scoring / Tathmini ya Mkopo
                  </h4>
                  <p className="text-xs text-stone-500">
                    Pre-approved and verified via mobile money scoring algorithm.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-stone-900">
                    3. Funds Disbursed / Fedha Zimeingia HaloPesa
                  </h4>
                  <p className="text-xs text-stone-500">
                    Credited directly to registered line <strong>{searchResult.phone}</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Repayment Details Card */}
            <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Borrower / Mkopaji:</span>
                <span className="font-bold text-stone-800">{searchResult.borrowerName}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Tenure / Muda:</span>
                <span className="font-bold text-stone-800">{searchResult.durationMonths} Months</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Total Repayable / Kulipa:</span>
                <span className="font-black text-[#F05A22] font-mono">
                  TZS {searchResult.totalRepayment.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Due Date / Tarehe:</span>
                <span className="font-bold text-stone-800">{searchResult.dueDate}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onNavigateToHaloPesa}
                className="flex-1 py-3 px-4 rounded-xl font-extrabold text-white text-xs sm:text-sm bg-[#F05A22] hover:bg-[#D8450E] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Wallet className="w-4 h-4" />
                <span>Open HaloPesa Wallet / Fungua Pochi ya HaloPesa</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToApply}
                className="py-3 px-5 rounded-xl font-bold text-stone-700 text-xs sm:text-sm bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Apply for Another Loan / Omba Mkopo Mpya
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
