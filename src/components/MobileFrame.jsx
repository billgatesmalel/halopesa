import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export function MobileFrame({ children }) {
  return (
    <div className="relative mx-auto w-full max-w-[410px] bg-stone-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-stone-900/10 border-4 border-stone-800">
      {/* Smartphone Outer Notch & Speaker */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-36 bg-stone-900 rounded-b-2xl z-30 flex items-center justify-center">
        <div className="w-12 h-1 bg-stone-700 rounded-full" />
      </div>

      {/* Screen Container */}
      <div className="relative bg-white rounded-[38px] overflow-hidden flex flex-col h-[780px] max-h-[90vh]">
        {/* Smartphone Status Bar (Matches screenshot 9:37 AM) */}
        <div className="bg-[#FFFBF7] px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-stone-800 select-none z-20">
          <span>9:37 AM</span>
          <div className="flex items-center gap-1.5 text-stone-700">
            <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="text-[10px] font-bold">4G</span>
            <BatteryMedium className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#FFFBF7]">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="bg-white py-1.5 flex justify-center items-center z-20">
          <div className="w-32 h-1 bg-stone-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
