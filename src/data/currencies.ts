import { CurrencyConfig } from '@/types';

export const currencies: CurrencyConfig[] = [
  {
    code: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    country: 'USA',
    rate: 1,
  },
  {
    code: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    country: 'United Kingdom',
    rate: 0.79,
  },
  {
    code: 'INR',
    symbol: '₹',
    flag: '🇮🇳',
    country: 'India',
    rate: 83.5,
  },
];

export function formatPrice(cents: number, currency: CurrencyConfig): string {
  const amount = (cents / 100) * currency.rate;

  if (currency.code === 'INR') {
    return `${currency.symbol}${Math.round(amount).toLocaleString('en-IN')}`;
  }

  return `${currency.symbol}${amount.toFixed(2)}`;
}

export function convertToStripeAmount(cents: number, currency: CurrencyConfig): number {
  // Stripe uses smallest currency unit
  // INR uses paise (100 paise = 1 INR), GBP uses pence, USD uses cents
  const amount = (cents / 100) * currency.rate;

  if (currency.code === 'INR') {
    return Math.round(amount * 100); // Convert to paise
  }

  return Math.round(amount * 100); // Convert to pence or cents
}
