'use client';

import React, { useState } from 'react';
import { Truck, Gift, ChevronDown } from 'lucide-react';

export default function AnnouncementBar() {
  const [currency, setCurrency] = useState('TND (DT)');
  const [isOpen, setIsOpen] = useState(false);

  const currencies = ['TND (DT)', 'USA (USD)', 'EUR (€)', 'GBP (£)'];

  return (
    <div className="bg-[#d9cdbd] text-[#37322b] text-[10.5px] font-semibold tracking-wider py-2 px-6 flex items-center justify-between select-none relative z-50">
      <div className="flex items-center gap-5 overflow-hidden">
        <span className="flex items-center gap-2 shrink-0">
          <Gift className="w-4 h-4 stroke-[1.5]" />
          <span>COMPLIMENTARY SAMPLES WITH EVERY ORDER</span>
        </span>
        <span className="hidden sm:block w-[1px] h-3.5 bg-[#b3a693] shrink-0" />
        <span className="hidden sm:flex items-center gap-2 shrink-0">
          <Truck className="w-4 h-4 stroke-[1.5]" />
          <span>EXPRESS DELIVERY ACROSS TUNISIA</span>
        </span>
      </div>

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 hover:text-black transition-colors uppercase tracking-wider font-semibold cursor-pointer py-0.5"
          aria-expanded={isOpen}
          aria-label="Select currency"
        >
          <span>{currency}</span>
          <ChevronDown className="w-3 h-3 stroke-[2]" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1.5 w-32 bg-white shadow-xl border border-[#e5ded3] rounded py-1 z-50 text-xs">
              {currencies.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCurrency(c);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#f7f4ef] transition-colors ${
                    currency === c ? 'font-bold text-[#1c1a17]' : 'text-[#7a756d]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
