import React, { useState, useMemo } from 'react';
import { BiasharaLogo } from '../BiasharaLogo';
import { getStoredLoanRules, saveStoredLoanRules, DEFAULT_LOAN_RULES } from '../../../utils/loanRules';
import {
  Menu,
  X,
  LogOut,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Users,
  Settings,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Banknote,
  Search,
  AlertCircle,
  Save,
  RefreshCw,
  ShieldCheck,
  BarChart3,
  PieChart,
  Activity,
  ArrowLeft
} from 'lucide-react';

// ─── Environment Credentials ──────────────────────────────────────────────────
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@biasharaloans.co.tz';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'BiasharaAdmin2026!';

const fmt = (n) =>
  `TZS ${Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

const fmtNum = (n) => Number(n).toLocaleString('en-US');

const STATUS_BADGE = {
  Pending: 'bg-slate-100 text-slate-700 border border-slate-300',
  Approved: 'bg-slate-200 text-slate-800 border border-slate-300',
  Disbursed: 'bg-slate-900 text-white border border-slate-900',
  Rejected: 'bg-white text-slate-500 border border-slate-300 line-through',
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
    category: 'Transport & Bodaboda',
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
    category: 'Salon & Beauty Services',
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
    category: 'Food & Restaurant Vendors',
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

// ─── Admin Login View (English Only, Clean Neutral UI) ────────────────────────
function AdminLoginView({ onLoginSuccess, onBackToSite }) {
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
        setError('Invalid email or password.');
        setLoading(false);
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <BiasharaLogo />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Super Admin Portal
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <h1 className="text-lg font-bold text-slate-900">Sign In</h1>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Enter your administrator credentials to continue.
          </p>

          {error && (
            <div className="flex items-center gap-2 mb-5 bg-slate-100 border border-slate-300 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-slate-700" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter admin email"
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl pl-9 pr-10 py-2.5 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60 transition-colors cursor-pointer mt-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-5">
          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Biashara Loans</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── KPI Card (Restrained Monochrome Style) ───────────────────────────────────
function KpiCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4">
      <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-xl font-bold text-slate-900 mt-1 leading-none">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1.5">{sub}</p>}
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
          value={fmtNum(stats.total)}
          sub="All submitted applications"
        />
        <KpiCard
          icon={Banknote}
          label="Capital Disbursed"
          value={fmt(stats.totalCapital)}
          sub={`${stats.disbursed} funded loans`}
        />
        <KpiCard
          icon={TrendingUp}
          label="Approval Rate"
          value={`${stats.approvalRate}%`}
          sub="Approved and disbursed"
        />
        <KpiCard
          icon={Activity}
          label="Active Borrowers"
          value={fmtNum(stats.disbursed)}
          sub="Currently active accounts"
        />
        <KpiCard
          icon={BarChart3}
          label="Projected Interest"
          value={fmt(stats.projectedInterest)}
          sub="Calculated at current monthly rate"
        />
        <KpiCard
          icon={PieChart}
          label="Sectors Covered"
          value={fmtNum(sectorEntries.length)}
          sub="Active business categories"
        />
      </div>

      {/* Sector Distribution */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="mb-5">
          <h3 className="text-sm font-bold text-slate-900">Sector Distribution</h3>
          <p className="text-xs text-slate-500 mt-0.5">Breakdown of loan applications by business category</p>
        </div>

        <div className="space-y-3.5">
          {sectorEntries.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-4">No applications recorded yet.</p>
          )}
          {sectorEntries.map(([sector, count]) => {
            const pct = Math.round((count / maxCount) * 100);
            return (
              <div key={sector} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 truncate">{sector}</span>
                  <span className="font-semibold text-slate-900 ml-2 shrink-0">{count}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-800 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['Pending', 'Approved', 'Disbursed', 'Rejected'].map((status) => {
          const count = applicants.filter((a) => a.status === status).length;
          return (
            <div key={status} className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-medium text-slate-500">{status}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Applicant Detail Modal ───────────────────────────────────────────────────
function ApplicantModal({ applicant, onClose, onStatusChange }) {
  if (!applicant) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-slate-900">{applicant.borrowerName}</h3>
            <p className="text-xs text-slate-500 font-mono">{applicant.loanId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-md ${STATUS_BADGE[applicant.status] || ''}`}>
              {applicant.status}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(applicant.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs border-t border-b border-slate-100 py-4">
            {[
              ['Phone Number', applicant.phone],
              ['National ID (NIDA)', applicant.nida],
              ['Business Category', applicant.category],
              ['Monthly Revenue Tier', applicant.monthlyRevenue],
              ['Requested Amount', fmt(applicant.amount)],
              ['Repayment Term', `${applicant.durationMonths} months`],
              ['Total Repayment', fmt(applicant.amount * (1 + 0.05 * applicant.durationMonths))],
              ['Monthly Installment', fmt((applicant.amount * (1 + 0.05 * applicant.durationMonths)) / applicant.durationMonths)],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-slate-400 font-medium">{label}</p>
                <p className="text-slate-900 font-semibold mt-0.5 break-words">{val || '—'}</p>
              </div>
            ))}
          </div>

          {applicant.status === 'Pending' && (
            <div className="flex gap-2.5">
              <button
                onClick={() => { onStatusChange(applicant.loanId, 'Approved'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve Application
              </button>
              <button
                onClick={() => { onStatusChange(applicant.loanId, 'Rejected'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          )}
          {applicant.status === 'Approved' && (
            <button
              onClick={() => { onStatusChange(applicant.loanId, 'Disbursed'); onClose(); }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Banknote className="w-4 h-4" />
              Mark as Disbursed
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
        a.phone?.includes(search) ||
        a.nida?.includes(search);
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applicants, search, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, reference ID, NIDA, or phone..."
            className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 bg-white"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                statusFilter === s
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Showing {filtered.length} of {applicants.length} applications
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Reference', 'Applicant', 'Category', 'Salary Tier', 'Amount', 'Term', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-600 uppercase tracking-wider text-[10px] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400 text-sm">
                    No applications match the selected filters.
                  </td>
                </tr>
              )}
              {filtered.map((a) => (
                <tr key={a.loanId} className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-slate-700">{a.loanId}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{a.borrowerName}</p>
                    <p className="text-slate-400">{a.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-[140px] truncate">{a.category}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-[140px] truncate">{a.monthlyRevenue}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{fmt(a.amount)}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{a.durationMonths} mo</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md whitespace-nowrap ${STATUS_BADGE[a.status] || ''}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {new Date(a.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedApplicant(a)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      {a.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => onStatusChange(a.loanId, 'Approved')}
                            className="px-2.5 py-1 text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onStatusChange(a.loanId, 'Rejected')}
                            className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {a.status === 'Approved' && (
                        <button
                          onClick={() => onStatusChange(a.loanId, 'Disbursed')}
                          className="px-2.5 py-1 text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
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
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-400 text-sm">
            No applications match the selected filters.
          </div>
        )}
        {filtered.map((a) => (
          <div key={a.loanId} className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold text-slate-900 text-sm">{a.borrowerName}</p>
                <p className="text-xs text-slate-400">{a.loanId} · {a.phone}</p>
              </div>
              <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${STATUS_BADGE[a.status] || ''}`}>
                {a.status}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 mb-3">
              <span className="font-semibold text-slate-900">{fmt(a.amount)}</span>
              <span>{a.durationMonths} months</span>
              <span className="truncate max-w-[120px]">{a.category}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedApplicant(a)}
                className="flex-1 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
              >
                View Details
              </button>
              {a.status === 'Pending' && (
                <>
                  <button onClick={() => onStatusChange(a.loanId, 'Approved')} className="flex-1 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg cursor-pointer">Approve</button>
                  <button onClick={() => onStatusChange(a.loanId, 'Rejected')} className="flex-1 py-1.5 text-xs font-medium bg-white border border-slate-300 text-slate-700 rounded-lg cursor-pointer">Reject</button>
                </>
              )}
              {a.status === 'Approved' && (
                <button onClick={() => onStatusChange(a.loanId, 'Disbursed')} className="flex-1 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg cursor-pointer">Disburse</button>
              )}
            </div>
          </div>
        ))}
      </div>

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

// ─── Loan Rules & Eligibility Tab ─────────────────────────────────────────────
function LoanRulesTab() {
  const [rules, setRules] = useState(() => getStoredLoanRules());
  const [toast, setToast] = useState('');

  const handleSave = () => {
    saveStoredLoanRules(rules);
    setToast('Eligibility brackets and loan settings saved.');
    setTimeout(() => setToast(''), 3500);
  };

  const handleReset = () => {
    setRules(DEFAULT_LOAN_RULES);
    saveStoredLoanRules(DEFAULT_LOAN_RULES);
    setToast('Settings reset to defaults.');
    setTimeout(() => setToast(''), 3500);
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
      {toast && (
        <div className="flex items-center gap-2 bg-slate-900 text-white rounded-xl px-4 py-3 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Global Parameters */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-900">Global Loan Parameters</h3>
        <p className="text-xs text-slate-500 mt-0.5 mb-5">
          Configure base interest rate, age requirement, and maximum repayment period.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Monthly Interest Rate (%)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={rules.interestRateMonthly}
              onChange={(e) => updateGlobal('interestRateMonthly', e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Minimum Borrower Age
            </label>
            <input
              type="number"
              min="18"
              max="65"
              value={rules.minAge}
              onChange={(e) => updateGlobal('minAge', e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Maximum Tenure (Months)
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={rules.maxTenureMonths}
              onChange={(e) => updateGlobal('maxTenureMonths', e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Salary Eligibility Brackets */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Salary Eligibility Brackets</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Define exact minimum and maximum eligible loan amounts for each monthly salary tier.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Tier', 'Monthly Salary Range', 'Min Eligible Loan (TZS)', 'Max Eligible Loan (TZS)'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-slate-600 uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rules.salaryBrackets.map((tier, idx) => (
                <tr key={tier.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="inline-block bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-md">
                      Tier {idx + 1}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <input
                      type="text"
                      value={tier.labelEn}
                      onChange={(e) => updateTier(tier.id, 'labelEn', e.target.value)}
                      className="w-full min-w-[180px] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-slate-900"
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <input
                      type="number"
                      min="10000"
                      step="10000"
                      value={tier.minLoan}
                      onChange={(e) => updateTier(tier.id, 'minLoan', e.target.value)}
                      className="w-32 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-slate-900"
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <input
                      type="number"
                      min="10000"
                      step="10000"
                      value={tier.maxLoan}
                      onChange={(e) => updateTier(tier.id, 'maxLoan', e.target.value)}
                      className="w-36 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-slate-900"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

// ─── Main Super Admin Panel (Organized 3-Bar Navigation Menu) ─────────────────
export function SuperAdminPanel({ onBackToSite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('biashara_admin_session') === 'true'
  );
  const [adminEmail, setAdminEmail] = useState('');
  const [activeTab, setActiveTab] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [applicants, setApplicants] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('biashara_applications') || '[]');
      if (stored.length > 0) {
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
      const updated = prev.map((a) => (a.loanId === loanId ? { ...a, status: newStatus } : a));
      try {
        const persisted = updated.filter((a) => !MOCK_APPLICANTS.find((m) => m.loanId === a.loanId));
        localStorage.setItem('biashara_applications', JSON.stringify(persisted));
      } catch {}
      return updated;
    });
  };

  if (!isAuthenticated) {
    return <AdminLoginView onLoginSuccess={handleLogin} onBackToSite={onBackToSite} />;
  }

  const NAV_ITEMS = [
    { id: 'analytics', label: 'Analytics', description: 'Portfolio & sector overview', icon: BarChart3 },
    { id: 'applicants', label: 'Applicants', description: 'Review & approve loans', icon: Users },
    { id: 'settings', label: 'Eligibility & Limits', description: 'Salary brackets & rules', icon: Settings },
  ];

  const currentNav = NAV_ITEMS.find((t) => t.id === activeTab);

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar with 3-Bar Hamburger Menu */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-14 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 3-Bar Menu Toggle Button (Desktop & Mobile) */}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileMenuOpen(!mobileMenuOpen);
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            title="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <BiasharaLogo />
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 border-l border-slate-200 pl-3">
            Admin Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
            <span className="max-w-[180px] truncate">{adminEmail || ADMIN_EMAIL}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Desktop Sidebar (controlled by 3-bar menu) */}
        {sidebarOpen && (
          <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between bg-white border-r border-slate-200 p-4">
            <nav className="space-y-1">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Navigation
              </p>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-tight">{item.label}</p>
                      <p className={`text-[11px] leading-tight mt-0.5 truncate ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200 space-y-1">
              <button
                type="button"
                onClick={onBackToSite}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Public Site</span>
              </button>
            </div>
          </aside>
        )}

        {/* Mobile Slide-Out Drawer (controlled by 3-bar menu) */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="relative z-10 w-64 max-w-[80vw] bg-white h-full border-r border-slate-200 p-4 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Admin Menu
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-xs font-semibold">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onBackToSite}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Public Site</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Workspace */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-slate-900">{currentNav?.label}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{currentNav?.description}</p>
          </div>

          {activeTab === 'analytics' && <AnalyticsTab applicants={applicants} />}
          {activeTab === 'applicants' && (
            <ApplicantsTab applicants={applicants} onStatusChange={handleStatusChange} />
          )}
          {activeTab === 'settings' && <LoanRulesTab />}
        </main>
      </div>
    </div>
  );
}
