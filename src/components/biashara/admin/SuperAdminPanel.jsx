import React, { useState, useEffect, useMemo } from 'react';
import { BiasharaLogo } from '../BiasharaLogo';
import { getStoredLoanRules, saveStoredLoanRules, DEFAULT_LOAN_RULES } from '../../../utils/loanRules';
import {
  LogOut,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LayoutDashboard,
  Users,
  Settings,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  Banknote,
  Search,
  ChevronDown,
  X,
  AlertCircle,
  Save,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Store,
  Tractor,
  Truck,
  Scissors,
  UtensilsCrossed,
  Package,
  BarChart3,
  PieChart,
  Activity,
  ArrowLeft
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@biasharaloans.co.tz';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'BiasharaAdmin2026!';

const fmt = (n) =>
  Number(n).toLocaleString('sw-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 });

const fmtNum = (n) => Number(n).toLocaleString('sw-TZ');

const STATUS_COLOR = {
  Pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  Approved: 'bg-blue-100 text-blue-700 border border-blue-200',
  Disbursed: 'bg-green-100 text-green-700 border border-green-200',
  Rejected: 'bg-red-100 text-red-700 border border-red-200',
};

const MOCK_APPLICANTS = [
  {
    loanId: 'BL-183472',
    borrowerName: 'Amina Salehe',
    phone: '0622 100 221',
    nida: '19901110-00001-00001-01',
    category: 'Retail & Small Shops',
    monthlyRevenue: 'TZS 1,000,001 - 2,500,000',
    amount: 1200000,
    durationMonths: 3,
    status: 'Disbursed',
    createdAt: '2026-11-20T08:00:00Z',
  },
  {
    loanId: 'BL-294810',
    borrowerName: 'Juma Hassan',
    phone: '0712 882 190',
    nida: '19850314-00002-00002-02',
    category: 'Transport & Logistics',
    monthlyRevenue: 'TZS 2,500,001 - 5,000,000',
    amount: 2800000,
    durationMonths: 4,
    status: 'Approved',
    createdAt: '2026-11-21T10:30:00Z',
  },
  {
    loanId: 'BL-388102',
    borrowerName: 'Grace Mwangi',
    phone: '0754 320 008',
    nida: '19950702-00003-00003-03',
    category: 'Hair Salon & Beauty',
    monthlyRevenue: 'TZS 500,001 - 1,000,000',
    amount: 600000,
    durationMonths: 2,
    status: 'Pending',
    createdAt: '2026-11-22T14:00:00Z',
  },
  {
    loanId: 'BL-491003',
    borrowerName: 'Said Kimaro',
    phone: '0622 740 991',
    nida: '19780112-00004-00004-04',
    category: 'Agriculture & Farming',
    monthlyRevenue: 'TZS 1,000,001 - 2,500,000',
    amount: 1800000,
    durationMonths: 6,
    status: 'Rejected',
    createdAt: '2026-11-23T09:00:00Z',
  },
  {
    loanId: 'BL-500221',
    borrowerName: 'Fatuma Ali',
    phone: '0754 110 445',
    nida: '19920803-00005-00005-05',
    category: 'Food Vending & Markets',
    monthlyRevenue: 'Below TZS 500,000',
    amount: 200000,
    durationMonths: 1,
    status: 'Disbursed',
    createdAt: '2026-11-23T16:00:00Z',
  },
  {
    loanId: 'BL-601447',
    borrowerName: 'Moses Mabunda',
    phone: '0622 550 773',
    nida: '19880619-00006-00006-06',
    category: 'Wholesale & Distribution',
    monthlyRevenue: 'Above TZS 5,000,000',
    amount: 4500000,
    durationMonths: 5,
    status: 'Approved',
    createdAt: '2026-11-24T07:00:00Z',
  },
];

const SECTOR_ICONS = {
  'Retail & Small Shops': Store,
  'Agriculture & Farming': Tractor,
  'Transport & Logistics': Truck,
  'Hair Salon & Beauty': Scissors,
  'Food Vending & Markets': UtensilsCrossed,
  'Wholesale & Distribution': Package,
};

// ─── Admin Login ───────────────────────────────────────────────────────────────
function AdminLoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (
        email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() &&
        password === ADMIN_PASSWORD
      ) {
        sessionStorage.setItem('biashara_admin_session', 'true');
        onLoginSuccess(email.trim());
      } else {
        setError('Barua pepe au nywila si sahihi. / Invalid email or password.');
        setLoading(false);
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F05A22]/10 border border-[#F05A22]/30 mb-4">
            <Lock className="w-7 h-7 text-[#F05A22]" />
          </div>
          <BiasharaLogo variant="white" />
          <p className="text-stone-400 text-xs mt-2">Super Admin Portal / Mfumo wa Wasimamizi</p>
        </div>

        {/* Login Card */}
        <div className="bg-stone-900/70 border border-stone-700/60 backdrop-blur-sm rounded-2xl p-7 shadow-2xl">
          <h2 className="text-white font-extrabold text-lg mb-1">Admin Login</h2>
          <p className="text-stone-400 text-xs mb-6">/ Ingia kwa akaunti ya msimamizi</p>

          {error && (
            <div className="flex items-start gap-2.5 mb-5 bg-red-950/50 border border-red-700/50 text-red-300 rounded-xl px-4 py-3 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-stone-400 mb-1.5">
                Email / Barua Pepe
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@biasharaloans.co.tz"
                  className="w-full bg-stone-800 border border-stone-600 text-white text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder-stone-500 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]/50 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-stone-400 mb-1.5">
                Password / Nywila
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••"
                  className="w-full bg-stone-800 border border-stone-600 text-white text-sm rounded-xl pl-9 pr-10 py-2.5 placeholder-stone-500 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-extrabold text-white bg-[#F05A22] hover:bg-[#D8450E] disabled:opacity-60 transition-colors cursor-pointer shadow-lg shadow-orange-900/30 mt-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Log In / Ingia</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-stone-600 text-xs mt-5">
          Biashara Loans Admin System · Secured Access
        </p>
      </div>
    </div>
  );
}

// ─── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({ icon: Icon, label, labelSw, value, sub, color = 'orange' }) {
  const colorMap = {
    orange: 'bg-orange-100 text-[#F05A22]',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
  };
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start gap-4 shadow-xs hover:shadow-md transition-shadow">
      <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-stone-500 font-medium leading-tight">{label}</p>
        <p className="text-xs text-stone-400 italic leading-tight">/ {labelSw}</p>
        <p className="text-xl font-extrabold text-stone-900 mt-1 leading-none">{value}</p>
        {sub && <p className="text-xs text-stone-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Analytics Tab ────────────────────────────────────────────────────────────
function AnalyticsTab({ applicants }) {
  const stats = useMemo(() => {
    const total = applicants.length;
    const disbursed = applicants.filter((a) => a.status === 'Disbursed');
    const approved = applicants.filter((a) => a.status === 'Approved' || a.status === 'Disbursed');
    const totalCapital = disbursed.reduce((s, a) => s + Number(a.amount), 0);
    const approvalRate = total > 0 ? Math.round((approved.length / total) * 100) : 0;
    const projectedInterest = disbursed.reduce(
      (s, a) => s + Number(a.amount) * 0.05 * Number(a.durationMonths),
      0
    );

    // Sector breakdown
    const sectorMap = {};
    applicants.forEach((a) => {
      sectorMap[a.category] = (sectorMap[a.category] || 0) + 1;
    });

    return { total, disbursed: disbursed.length, totalCapital, approvalRate, projectedInterest, sectorMap };
  }, [applicants]);

  const sectorEntries = Object.entries(stats.sectorMap).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...sectorEntries.map((e) => e[1]), 1);

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <KpiCard
          icon={Users}
          label="Total Applications"
          labelSw="Jumla ya Maombi"
          value={fmtNum(stats.total)}
          sub="All time / Tangu mwanzo"
          color="blue"
        />
        <KpiCard
          icon={Banknote}
          label="Capital Disbursed"
          labelSw="Mtaji Uliotolewa"
          value={fmt(stats.totalCapital)}
          sub={`${stats.disbursed} loans funded / mikopo`}
          color="green"
        />
        <KpiCard
          icon={TrendingUp}
          label="Approval Rate"
          labelSw="Kiwango cha Kibali"
          value={`${stats.approvalRate}%`}
          sub="Approved + Disbursed / Zilizopitishwa"
          color="orange"
        />
        <KpiCard
          icon={Activity}
          label="Active Borrowers"
          labelSw="Wakopaji Wanaoendelea"
          value={fmtNum(stats.disbursed)}
          sub="Currently funded / Zinaendelea"
          color="purple"
        />
        <KpiCard
          icon={BarChart3}
          label="Projected Interest"
          labelSw="Faida Inayotarajiwa"
          value={fmt(stats.projectedInterest)}
          sub="At 5% / month flat rate"
          color="amber"
        />
        <KpiCard
          icon={PieChart}
          label="Sectors Covered"
          labelSw="Sekta Zinazofadhiliwa"
          value={fmtNum(sectorEntries.length)}
          sub="Business sectors / Sekta za biashara"
          color="blue"
        />
      </div>

      {/* Sector Breakdown */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-extrabold text-stone-800 mb-1">Sector Distribution</h3>
        <p className="text-xs text-stone-400 mb-5">/ Mgawanyo wa Sekta za Biashara</p>

        <div className="space-y-3">
          {sectorEntries.length === 0 && (
            <p className="text-xs text-stone-400 text-center py-4">No applications yet / Hakuna maombi bado</p>
          )}
          {sectorEntries.map(([sector, count]) => {
            const Icon = SECTOR_ICONS[sector] || Store;
            const pct = Math.round((count / maxCount) * 100);
            return (
              <div key={sector} className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-orange-50">
                  <Icon className="w-3.5 h-3.5 text-[#F05A22]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-stone-700 truncate">{sector}</span>
                    <span className="text-xs font-bold text-stone-500 ml-2 shrink-0">{count}</span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F05A22] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {['Pending', 'Approved', 'Disbursed', 'Rejected'].map((status) => {
          const count = applicants.filter((a) => a.status === status).length;
          return (
            <div key={status} className="bg-white border border-stone-200 rounded-xl p-4 text-center shadow-xs">
              <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mb-2 ${STATUS_COLOR[status]}`}>
                {status}
              </span>
              <p className="text-2xl font-extrabold text-stone-900">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Applicant Detail Modal ────────────────────────────────────────────────────
function ApplicantModal({ applicant, onClose, onStatusChange }) {
  if (!applicant) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <div>
            <h3 className="font-extrabold text-stone-900">{applicant.borrowerName}</h3>
            <p className="text-xs text-stone-500">{applicant.loanId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${STATUS_COLOR[applicant.status] || ''}`}>
              {applicant.status}
            </span>
            <span className="text-xs text-stone-400">
              {new Date(applicant.createdAt).toLocaleDateString('en-TZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* Two Column Info */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
            {[
              ['Phone / Simu', applicant.phone],
              ['NIDA / Kitambulisho', applicant.nida],
              ['Category / Sekta', applicant.category],
              ['Monthly Revenue / Mapato', applicant.monthlyRevenue],
              ['Loan Amount / Kiasi', fmt(applicant.amount)],
              ['Duration / Muda', `${applicant.durationMonths} months`],
              ['Total Repayment', fmt(applicant.amount * (1 + 0.05 * applicant.durationMonths))],
              ['Monthly Instalment', fmt((applicant.amount * (1 + 0.05 * applicant.durationMonths)) / applicant.durationMonths)],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-stone-400 font-medium">{label}</p>
                <p className="text-stone-800 font-bold break-words">{val || '—'}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          {applicant.status === 'Pending' && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { onStatusChange(applicant.loanId, 'Approved'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve / Idhinisha
              </button>
              <button
                onClick={() => { onStatusChange(applicant.loanId, 'Rejected'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                Reject / Kataa
              </button>
            </div>
          )}
          {applicant.status === 'Approved' && (
            <button
              onClick={() => { onStatusChange(applicant.loanId, 'Disbursed'); onClose(); }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-green-600 hover:bg-green-700 transition-colors cursor-pointer"
            >
              <Banknote className="w-4 h-4" />
              Mark as Disbursed / Lipa Mkopo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Applicants Tab ───────────────────────────────────────────────────────────
function ApplicantsTab({ applicants, onStatusChange }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const statusOptions = ['All', 'Pending', 'Approved', 'Disbursed', 'Rejected'];

  const filtered = useMemo(() => {
    return applicants.filter((a) => {
      const matchesSearch =
        !search ||
        a.borrowerName?.toLowerCase().includes(search.toLowerCase()) ||
        a.loanId?.toLowerCase().includes(search.toLowerCase()) ||
        a.phone?.includes(search);
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applicants, search, statusFilter]);

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, phone / Tafuta..."
            className="w-full border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]/30 bg-white"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                statusFilter === s
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-stone-400 font-medium">
        Showing {filtered.length} of {applicants.length} applications / maombi
      </p>

      {/* Table (desktop) / Cards (mobile) */}
      <div className="hidden md:block bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                {['Ref ID', 'Borrower / Mkopaji', 'Category / Sekta', 'Revenue Tier', 'Amount', 'Term', 'Status / Hali', 'Date / Tarehe', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-extrabold text-stone-600 uppercase tracking-wide text-[10px] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-stone-400 text-sm">
                    No applications match your filters. / Hakuna maombi yanayolingana.
                  </td>
                </tr>
              )}
              {filtered.map((a) => (
                <tr key={a.loanId} className="border-b border-stone-100 hover:bg-stone-50/70 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-stone-700">{a.loanId}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-stone-800">{a.borrowerName}</p>
                    <p className="text-stone-400">{a.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-stone-600 max-w-[120px] truncate">{a.category}</td>
                  <td className="px-4 py-3 text-stone-600 max-w-[110px] truncate">{a.monthlyRevenue}</td>
                  <td className="px-4 py-3 font-bold text-stone-800 whitespace-nowrap">{fmt(a.amount)}</td>
                  <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{a.durationMonths}mo</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${STATUS_COLOR[a.status] || ''}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-400 whitespace-nowrap">
                    {new Date(a.createdAt).toLocaleDateString('en-TZ', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedApplicant(a)}
                        className="px-2.5 py-1.5 text-[10px] font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer"
                      >
                        View
                      </button>
                      {a.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => onStatusChange(a.loanId, 'Approved')}
                            className="px-2.5 py-1.5 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onStatusChange(a.loanId, 'Rejected')}
                            className="px-2.5 py-1.5 text-[10px] font-bold bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {a.status === 'Approved' && (
                        <button
                          onClick={() => onStatusChange(a.loanId, 'Disbursed')}
                          className="px-2.5 py-1.5 text-[10px] font-bold bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors cursor-pointer"
                        >
                          Disburse
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 text-center text-stone-400 text-sm">
            No applications match your filters. / Hakuna maombi yanayolingana.
          </div>
        )}
        {filtered.map((a) => (
          <div key={a.loanId} className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-extrabold text-stone-800 text-sm">{a.borrowerName}</p>
                <p className="text-xs text-stone-400">{a.loanId} · {a.phone}</p>
              </div>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${STATUS_COLOR[a.status] || ''}`}>
                {a.status}
              </span>
            </div>
            <div className="flex justify-between text-xs text-stone-600 mb-3">
              <span>{fmt(a.amount)}</span>
              <span>{a.durationMonths} months</span>
              <span>{a.category}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedApplicant(a)}
                className="flex-1 py-1.5 text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer"
              >
                View Details
              </button>
              {a.status === 'Pending' && (
                <>
                  <button onClick={() => onStatusChange(a.loanId, 'Approved')} className="flex-1 py-1.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-lg cursor-pointer">Approve</button>
                  <button onClick={() => onStatusChange(a.loanId, 'Rejected')} className="flex-1 py-1.5 text-xs font-bold bg-red-50 text-red-700 rounded-lg cursor-pointer">Reject</button>
                </>
              )}
              {a.status === 'Approved' && (
                <button onClick={() => onStatusChange(a.loanId, 'Disbursed')} className="flex-1 py-1.5 text-xs font-bold bg-green-50 text-green-700 rounded-lg cursor-pointer">Disburse</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <ApplicantModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onStatusChange={onStatusChange}
        />
      )}
    </div>
  );
}

// ─── Loan Rules Settings Tab ───────────────────────────────────────────────────
function LoanRulesTab() {
  const [rules, setRules] = useState(() => getStoredLoanRules());
  const [toast, setToast] = useState('');

  const handleSave = () => {
    saveStoredLoanRules(rules);
    setToast('Mipangilio imehifadhiwa! / Settings saved successfully.');
    setTimeout(() => setToast(''), 3500);
  };

  const handleReset = () => {
    setRules(DEFAULT_LOAN_RULES);
  };

  const updateTier = (tierId, field, rawValue) => {
    const value = field === 'minLoan' || field === 'maxLoan' ? Number(rawValue) : rawValue;
    setRules((prev) => ({
      ...prev,
      salaryBrackets: prev.salaryBrackets.map((b) =>
        b.id === tierId ? { ...b, [field]: value } : b
      ),
    }));
  };

  const updateGlobal = (field, value) => {
    setRules((prev) => ({ ...prev, [field]: Number(value) }));
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Global Settings */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-extrabold text-stone-800 mb-1">Global Loan Parameters</h3>
        <p className="text-xs text-stone-400 mb-5">/ Vigezo vya Jumla vya Mkopo</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              Monthly Interest Rate (%) / Riba ya Kila Mwezi
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={rules.interestRateMonthly}
              onChange={(e) => updateGlobal('interestRateMonthly', e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]/30"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              Minimum Age / Umri wa Chini
            </label>
            <input
              type="number"
              min="18"
              max="65"
              value={rules.minAge}
              onChange={(e) => updateGlobal('minAge', e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]/30"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              Max Tenure (Months) / Muda wa Juu (Miezi)
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={rules.maxTenureMonths}
              onChange={(e) => updateGlobal('maxTenureMonths', e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]/30"
            />
          </div>
        </div>
      </div>

      {/* Salary Tier Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-stone-100">
          <h3 className="text-sm font-extrabold text-stone-800">Salary Bracket Loan Limits</h3>
          <p className="text-xs text-stone-400 mt-0.5">/ Mipaka ya Mkopo kwa Kipato cha Kila Kundi</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                {['Tier / Kundi', 'Salary Range / Kipato', 'Min Loan (TZS)', 'Max Loan (TZS)'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-extrabold text-stone-600 uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rules.salaryBrackets.map((tier, idx) => (
                <tr key={tier.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="inline-block bg-orange-100 text-[#F05A22] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                      Tier {idx + 1}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-stone-700">{tier.labelEn}</p>
                    <p className="text-stone-400 italic">{tier.labelSw}</p>
                  </td>
                  <td className="px-5 py-4">
                    <input
                      type="number"
                      min="10000"
                      step="10000"
                      value={tier.minLoan}
                      onChange={(e) => updateTier(tier.id, 'minLoan', e.target.value)}
                      className="w-32 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]/30"
                    />
                  </td>
                  <td className="px-5 py-4">
                    <input
                      type="number"
                      min="10000"
                      step="10000"
                      value={tier.maxLoan}
                      onChange={(e) => updateTier(tier.id, 'maxLoan', e.target.value)}
                      className="w-36 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-[#F05A22] focus:ring-1 focus:ring-[#F05A22]/30"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold text-white bg-[#F05A22] hover:bg-[#D8450E] transition-colors shadow-md shadow-orange-500/20 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Settings / Hifadhi Mipangilio
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Defaults / Rejesha Mwanzo
        </button>
      </div>
    </div>
  );
}

// ─── Main Super Admin Panel ───────────────────────────────────────────────────
export function SuperAdminPanel({ onBackToSite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('biashara_admin_session') === 'true'
  );
  const [adminEmail, setAdminEmail] = useState('');
  const [activeTab, setActiveTab] = useState('analytics');

  // Load & manage applicants (from localStorage + fallback mock data)
  const [applicants, setApplicants] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('biashara_applications') || '[]');
      if (stored.length > 0) {
        // Merge stored with mocks so we always have something to show
        const storedIds = new Set(stored.map((a) => a.loanId));
        const uniqueMocks = MOCK_APPLICANTS.filter((m) => !storedIds.has(m.loanId));
        return [...stored, ...uniqueMocks];
      }
    } catch {}
    return MOCK_APPLICANTS;
  });

  const handleLogin = (email) => {
    setAdminEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('biashara_admin_session');
    setIsAuthenticated(false);
    setAdminEmail('');
  };

  const handleStatusChange = (loanId, newStatus) => {
    setApplicants((prev) => {
      const updated = prev.map((a) => a.loanId === loanId ? { ...a, status: newStatus } : a);
      // Persist to localStorage
      try {
        const persisted = updated.filter((a) => !MOCK_APPLICANTS.find((m) => m.loanId === a.loanId));
        localStorage.setItem('biashara_applications', JSON.stringify(persisted));
      } catch {}
      return updated;
    });
  };

  if (!isAuthenticated) {
    return <AdminLoginView onLoginSuccess={handleLogin} />;
  }

  const TABS = [
    { id: 'analytics', label: 'Analytics', labelSw: 'Takwimu', icon: BarChart3 },
    { id: 'applicants', label: 'Applicants', labelSw: 'Waombaji', icon: Users },
    { id: 'settings', label: 'Loan Rules', labelSw: 'Mipangilio', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-stone-900 text-white border-b border-stone-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToSite}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
                title="Back to Biashara Loans / Rudi Tovutini"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="h-5 w-px bg-stone-700" />
              <BiasharaLogo variant="white" />
              <span className="hidden sm:inline text-xs font-bold text-stone-400 border border-stone-600 px-2 py-0.5 rounded-lg">
                Admin Panel
              </span>
            </div>

            {/* Right: Tab Nav (desktop) + User + Logout */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center bg-stone-800 border border-stone-700 rounded-xl p-0.5 gap-0.5">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-[#F05A22] text-white shadow-sm'
                          : 'text-stone-400 hover:text-white hover:bg-stone-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Admin email */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400 border border-stone-700 bg-stone-800 rounded-lg px-2.5 py-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span className="max-w-[140px] truncate">{adminEmail || ADMIN_EMAIL}</span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-stone-400 hover:text-white hover:bg-stone-700 border border-stone-700 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Nav */}
      <div className="md:hidden bg-white border-b border-stone-200 sticky top-14 z-30">
        <div className="flex">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-[10px] font-extrabold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#F05A22] border-b-2 border-[#F05A22]'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-stone-900">
            {TABS.find((t) => t.id === activeTab)?.label}
          </h1>
          <p className="text-sm text-stone-400">
            / {TABS.find((t) => t.id === activeTab)?.labelSw} — Biashara Loans Super Admin
          </p>
        </div>

        {activeTab === 'analytics' && <AnalyticsTab applicants={applicants} />}
        {activeTab === 'applicants' && (
          <ApplicantsTab applicants={applicants} onStatusChange={handleStatusChange} />
        )}
        {activeTab === 'settings' && <LoanRulesTab />}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-stone-200 bg-white py-3 px-6 text-center text-xs text-stone-400">
        Biashara Loans Admin System · Secured · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
