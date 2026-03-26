'use client';

import { useCart } from '@/context/CartContext';
import { currencies } from '@/data/currencies';
import { Currency } from '@/types';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCart();

  return (
    <div className="relative">
      <select
        value={currency.code}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="appearance-none bg-warm-50 border border-warm-200 text-warm-800 text-sm rounded-lg px-3 py-1.5 pr-7 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-400"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-warm-600">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
