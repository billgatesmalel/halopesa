import React, { useState } from 'react';
import {
  Send,
  ArrowDownLeft,
  Receipt,
  Building2,
  Smartphone,
  PiggyBank,
  Eye,
  EyeOff,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { GoldCoin } from './BrandLogo';

export function Dashboard({
  t,
  lang,
  balance,
  transactions,
  onOpenSend,
  onOpenWithdraw,
  onOpenLipa,
  onOpenBank,
  onOpenAirtime,
  onOpenSavings,
  onBackToHero
}) {
  const [showBalance, setShowBalance] = useState(true);
  const [filter, setFilter] = useState('all');

  const services = [
    {
      id: 'send',
      title: t.sendMoney,
      desc: t.sendMoneyDesc,
      icon: Send,
      color: 'bg-[#F05A22]',
      textColor: 'text-[#F05A22]',
      action: onOpenSend,
      badge: lang === 'en' ? 'Interoperable' : 'Mitandao Yote'
    },
    {
      id: 'withdraw',
      title: t.withdrawCash,
      desc: t.withdrawDesc,
      icon: ArrowDownLeft,
      color: 'bg-[#009A44]',
      textColor: 'text-[#009A44]',
      action: onOpenWithdraw,
      badge: lang === 'en' ? 'Wakala & ATM' : 'Wakala & ATM'
    },
    {
      id: 'lipa',
      title: t.payBills,
      desc: t.payBillsDesc,
      icon: Receipt,
      color: 'bg-[#E04B15]',
      textColor: 'text-[#E04B15]',
      action: onOpenLipa,
      badge: 'LUKU & GePG'
    },
    {
      id: 'bank',
      title: t.bankTransfer,
      desc: t.bankTransferDesc,
      icon: Building2,
      color: 'bg-[#1E293B]',
      textColor: 'text-[#1E293B]',
      action: onOpenBank,
      badge: 'CRDB • NMB'
    },
    {
      id: 'airtime',
      title: t.airtimeBundles,
      desc: t.airtimeBundlesDesc,
      icon: Smartphone,
      color: 'bg-[#EA580C]',
      textColor: 'text-[#EA580C]',
      action: onOpenAirtime,
      badge: lang === 'en' ? '+10% Bonus' : '+10% Bonasi'
    },
    {
      id: 'savings',
      title: t.savingsKikoba,
      desc: t.savingsKikobaDesc,
      icon: PiggyBank,
      color: 'bg-[#4F46E5]',
      textColor: 'text-[#4F46E5]',
      action: onOpenSavings,
      badge: '9.0% p.a.'
    }
  ];

  const filteredTxs = transactions.filter((tx) => {
    if (filter === 'in') return tx.amount > 0;
    if (filter === 'out') return tx.amount < 0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Account Balance Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F05A22] via-[#E24E16] to-[#C93B07] text-white p-6 sm:p-8 shadow-xl shadow-orange-500/15">
        {/* Subtle decorative coin in background */}
        <div className="absolute -right-4 -bottom-4 opacity-30 pointer-events-none">
          <GoldCoin className="w-48 h-32" rotation={20} />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-orange-200">
                {t.currentBalance}
              </span>
              <button
                type="button"
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 rounded-full hover:bg-white/15 transition-colors cursor-pointer text-orange-100"
                title={showBalance ? t.hideBalance : t.showBalance}
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-xs font-mono text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>+255 628 123 456</span>
            </div>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl sm:text-5xl font-black tracking-tight font-mono">
              {showBalance ? balance.toLocaleString() : '••••••••'}
            </span>
            <span className="text-lg sm:text-2xl font-bold text-orange-200">
              TZS
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/20 text-xs">
            <div className="flex items-center gap-2 text-orange-100">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{lang === 'en' ? 'Active HaloPesa Account' : 'Akaunti Hai ya HaloPesa'}</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onOpenSend}
                className="px-3.5 py-1.5 rounded-xl bg-white text-[#F05A22] font-bold hover:bg-orange-50 transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.sendMoney}</span>
              </button>
              <button
                type="button"
                onClick={onOpenWithdraw}
                className="px-3.5 py-1.5 rounded-xl bg-white/20 text-white font-bold hover:bg-white/30 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>{t.withdrawCash}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {t.exploreServices}
            </h2>
            <p className="text-xs text-stone-500">
              {t.allInOneDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 hover:shadow-lg transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl ${item.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 text-base group-hover:text-[#F05A22] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#F05A22]">
                  <span>{lang === 'en' ? 'Open Service' : 'Fungua Huduma'}</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions & Statement Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="font-bold text-stone-900 text-lg">
              {t.recentTransactions}
            </h3>
            <p className="text-xs text-stone-500">
              {lang === 'en' ? 'Real-time statement of account activities' : 'Taarifa ya miamala ya hivi karibuni'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.txFilterAll}
            </button>
            <button
              type="button"
              onClick={() => setFilter('in')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'in' ? 'bg-white text-emerald-700 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.txFilterIn}
            </button>
            <button
              type="button"
              onClick={() => setFilter('out')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'out' ? 'bg-white text-orange-700 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.txFilterOut}
            </button>
          </div>
        </div>

        <div className="divide-y divide-stone-100">
          {filteredTxs.map((tx) => {
            const isPositive = tx.amount > 0;
            return (
              <div key={tx.id} className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isPositive
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-orange-100 text-[#F05A22]'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                      {tx.title}
                    </h4>
                    <div className="text-[11px] text-stone-400 flex items-center gap-2 mt-0.5">
                      <span className="font-mono">{tx.id}</span>
                      <span>•</span>
                      <span>{tx.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs sm:text-sm font-bold font-mono ${
                      isPositive ? 'text-emerald-700' : 'text-stone-900'
                    }`}
                  >
                    {isPositive ? '+' : ''}{tx.amount.toLocaleString()} TZS
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {t.txCompleted}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Banner */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-amber-900">{t.securityNoticeTitle}</h4>
          <p className="text-amber-800 leading-relaxed">{t.securityNoticeBody}</p>
        </div>
      </div>
    </div>
  );
}
