'use client';

import { useState } from 'react';
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/currencies';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { subtotal, currency, items, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'Validation failed');
      setLoading(false);
      return;
    }

    // Create payment intent
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, currency }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to initialize payment');
      setLoading(false);
      return;
    }

    const { clientSecret } = await res.json();

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
      },
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed');
    } else {
      clearCart();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping address */}
      <div>
        <h3 className="font-semibold text-warm-800 mb-3">Shipping Address</h3>
        <AddressElement
          options={{
            mode: 'shipping',
            allowedCountries: ['US', 'GB', 'IN'],
            fields: { phone: 'always' },
            validation: { phone: { required: 'always' } },
          }}
        />
      </div>

      {/* Payment */}
      <div>
        <h3 className="font-semibold text-warm-800 mb-3">Payment Details</h3>
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'upi', 'google_pay', 'apple_pay'],
          }}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || !stripe || !elements}
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              Pay {formatPrice(subtotal, currency)}
            </>
          )}
        </button>

        <p className="text-center text-xs text-warm-400 mt-3 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Secured by Stripe · 256-bit SSL encryption
        </p>
      </div>
    </form>
  );
}
