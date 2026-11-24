import React from 'react';
import { TrendingUp, Landmark } from 'lucide-react';

export function BiasharaLogo({ className = "h-8", variant = "default" }) {
  const isWhite = variant === 'white';
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Biashara Growth Badge Icon */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform ${
        isWhite ? 'bg-[#F05A22] text-white' : 'bg-gradient-to-br from-[#F05A22] to-[#D8450E] text-white shadow-orange-500/20'
      }`}>
        <TrendingUp className="w-5 h-5 stroke-[2.5]" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left">
        <span className={`font-black tracking-tight text-lg sm:text-xl leading-none ${
          isWhite ? 'text-white' : 'text-stone-900'
        }`}>
          Biashara<span className="text-[#F05A22]">Loans</span>
        </span>
        <span className={`text-[9.5px] font-bold tracking-wider uppercase mt-0.5 ${
          isWhite ? 'text-stone-400' : 'text-stone-500'
        }`}>
          Mikopo ya Biashara
        </span>
      </div>
    </div>
  );
}
