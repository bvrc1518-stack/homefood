'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { ArrowLeft, ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/currencies';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  const { items, subtotal, currency } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-warm-200 mx-auto mb-6" />
        <h2 className="font-display text-2xl font-bold text-warm-800 mb-3">Your cart is empty</h2>
        <p className="text-warm-400 mb-8">Add some items before checking out.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-600 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Load Razorpay checkout script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="text-warm-500 hover:text-brand-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-3xl font-bold text-warm-900">Checkout</h1>
            <p className="text-warm-400 text-sm flex items-center gap-1 mt-0.5">
              <Lock className="w-3.5 h-3.5" />
              Secure checkout via Razorpay
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Checkout form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
              {/* Ships to */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-warm-50 rounded-xl">
                <p className="text-xs text-warm-500 shrink-0">Ships to:</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { flag: '🇮🇳', label: 'India' },
                    { flag: '🇺🇸', label: 'USA' },
                    { flag: '🇬🇧', label: 'UK' },
                  ].map((r) => (
                    <span key={r.label} className="text-xs text-warm-700">
                      {r.flag} {r.label}
                    </span>
                  ))}
                </div>
              </div>

              <CheckoutForm />
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm sticky top-24">
              <h2 className="font-semibold text-warm-900 mb-5">Order Summary</h2>

              <div className="space-y-4 mb-5">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-warm-50">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-warm-800 leading-snug truncate">{product.name}</p>
                      <p className="text-xs text-warm-400">{product.weight}</p>
                    </div>
                    <span className="text-sm font-semibold text-warm-800 shrink-0">
                      {formatPrice(product.price * quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-warm-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-warm-500">
                  <span>Subtotal</span>
                  <span className="text-warm-800 font-medium">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-warm-500">
                  <span>Shipping</span>
                  <span className="text-warm-800">Calculated at payment</span>
                </div>
                <div className="flex justify-between font-bold text-warm-900 text-base pt-2 border-t border-warm-100">
                  <span>Total</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
              </div>

              {/* Razorpay badge */}
              <div className="mt-5 flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-xs text-blue-700 font-medium">Powered by</span>
                <span className="text-xs font-bold text-blue-800">Razorpay</span>
              </div>

              <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <p className="text-xs text-green-700 text-center">
                  UPI · Cards · Net Banking · Wallets · EMI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
