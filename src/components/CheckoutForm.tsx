'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/currencies';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function CheckoutForm() {
  const { subtotal, currency, items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customer.name || !customer.email || !customer.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Razorpay order on server
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, currency }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create order');
      }

      const { orderId, amount, currency: orderCurrency } = await res.json();

      // Step 2: Open Razorpay checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: orderCurrency,
        name: 'HomeFood Artisan Kitchen',
        description: 'Homemade Sweets & Snacks Order',
        image: '/logo.png',
        order_id: orderId,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        notes: { address: customer.address },
        theme: { color: '#ff7d0f' },
        modal: { ondismiss: () => setLoading(false) },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          // Step 3: Verify payment on server
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            clearCart();
            router.push('/order-success');
          } else {
            setError('Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response: { error: { description: string } }) => {
        setError(response.error.description || 'Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-5">
      {/* Customer details */}
      <div>
        <h3 className="font-semibold text-warm-800 mb-4">Your Details</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder="John Smith"
              required
              className="w-full px-4 py-2.5 border border-warm-200 rounded-xl text-sm text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 border border-warm-200 rounded-xl text-sm text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
              className="w-full px-4 py-2.5 border border-warm-200 rounded-xl text-sm text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">
              Delivery Address
            </label>
            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              rows={3}
              placeholder="House/Flat no., Street, City, PIN/ZIP code, Country"
              className="w-full px-4 py-2.5 border border-warm-200 rounded-xl text-sm text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Payment methods info */}
      <div className="p-4 bg-warm-50 rounded-xl border border-warm-100">
        <p className="text-xs font-semibold text-warm-600 mb-2">Accepted payment methods</p>
        <div className="flex flex-wrap gap-2">
          {['UPI', 'Cards', 'Net Banking', 'Wallets', 'EMI', 'Paytm', 'PhonePe', 'GPay'].map((m) => (
            <span key={m} className="text-xs bg-white border border-warm-200 text-warm-600 px-2 py-1 rounded">
              {m}
            </span>
          ))}
        </div>
        <p className="text-xs text-warm-400 mt-2">
          International cards (Visa, Mastercard) accepted for USA & UK customers
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Opening Payment...
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5" />
            Pay {formatPrice(subtotal, currency)}
          </>
        )}
      </button>

      <p className="text-center text-xs text-warm-400 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5" />
        Secured by Razorpay · 256-bit SSL encryption
      </p>
    </form>
  );
}
