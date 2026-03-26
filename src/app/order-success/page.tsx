import Link from 'next/link';
import { CheckCircle, ArrowRight, Package, Mail } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h1 className="font-display text-3xl font-bold text-warm-900 mb-3">Order Confirmed!</h1>
      <p className="text-warm-500 mb-8 leading-relaxed">
        Thank you for your order. We&apos;re getting it ready with love and care.
        You&apos;ll receive an email confirmation shortly.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
        <div className="bg-warm-50 rounded-2xl p-5 border border-warm-100">
          <Package className="w-6 h-6 text-brand-500 mb-3" />
          <h3 className="font-semibold text-warm-800 mb-1">What&apos;s next?</h3>
          <p className="text-sm text-warm-500">
            Your order will be freshly made and dispatched within 1–2 business days.
          </p>
        </div>
        <div className="bg-warm-50 rounded-2xl p-5 border border-warm-100">
          <Mail className="w-6 h-6 text-brand-500 mb-3" />
          <h3 className="font-semibold text-warm-800 mb-1">Confirmation Email</h3>
          <p className="text-sm text-warm-500">
            A receipt and tracking info will be sent to your email address.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-warm-50 text-warm-700 font-semibold px-6 py-3 rounded-xl border border-warm-200 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
