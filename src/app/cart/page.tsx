'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/currencies';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, currency } = useCart();

  const shippingThresholds: Record<string, { threshold: number; label: string }> = {
    USD: { threshold: 5000, label: '$50' },
    GBP: { threshold: 4000, label: '£40' },
    INR: { threshold: 350000, label: '₹3,500' },
  };

  const threshold = shippingThresholds[currency.code];
  const subtotalInCurrency = Math.round((subtotal / 100) * currency.rate * 100);
  const freeShipping = subtotalInCurrency >= threshold.threshold;
  const remaining = threshold.threshold - subtotalInCurrency;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-warm-200 mx-auto mb-6" />
        <h2 className="font-display text-2xl font-bold text-warm-800 mb-3">Your cart is empty</h2>
        <p className="text-warm-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-warm-900 mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 bg-white rounded-2xl p-4 border border-warm-100 shadow-sm"
            >
              <Link href={`/products/${product.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-warm-50">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-semibold text-warm-900 hover:text-brand-600 transition-colors leading-snug"
                  >
                    {product.name}
                  </Link>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-warm-300 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-warm-400 mt-0.5 mb-3">{product.weight}</p>

                <div className="flex items-center justify-between">
                  {/* Qty controls */}
                  <div className="flex items-center border border-warm-200 rounded-lg overflow-hidden text-sm">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-3 py-1.5 text-warm-600 hover:bg-warm-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 font-semibold text-warm-800 min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-3 py-1.5 text-warm-600 hover:bg-warm-50 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-bold text-warm-900">
                    {formatPrice(product.price * quantity, currency)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm sticky top-24">
            <h2 className="font-semibold text-warm-900 text-lg mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-warm-600">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium text-warm-900">{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-warm-600">
                <span>Shipping</span>
                <span className={freeShipping ? 'text-green-600 font-medium' : 'text-warm-900 font-medium'}>
                  {freeShipping ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
            </div>

            {/* Free shipping progress */}
            {!freeShipping && (
              <div className="mb-5 p-3 bg-brand-50 rounded-xl">
                <p className="text-xs text-brand-700 mb-2">
                  Add <strong>{formatPrice(remaining, currency)}</strong> more for free shipping!
                </p>
                <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (subtotalInCurrency / threshold.threshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between font-bold text-warm-900 text-lg border-t border-warm-100 pt-4 mb-6">
              <span>Total</span>
              <span>{formatPrice(subtotal, currency)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-warm-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure checkout powered by Razorpay</span>
            </div>

            <div className="mt-4 flex justify-center gap-3 text-warm-300 flex-wrap">
              {['UPI', 'Cards', 'Wallets', 'EMI'].map((p) => (
                <span key={p} className="text-xs border border-warm-200 px-2 py-0.5 rounded text-warm-500">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
