import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem, CurrencyConfig } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

interface RequestBody {
  items: CartItem[];
  currency: CurrencyConfig;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { items, currency } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Calculate total in base currency (USD cents) then convert
    const subtotalUsdCents = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Convert to target currency smallest unit
    const amount = Math.round((subtotalUsdCents / 100) * currency.rate * 100);

    // Stripe minimum amounts (in smallest currency unit)
    const minimums: Record<string, number> = {
      USD: 50,    // $0.50
      GBP: 30,    // £0.30
      INR: 50,    // ₹0.50
    };

    if (amount < (minimums[currency.code] || 50)) {
      return NextResponse.json({ error: 'Order total too small' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.code.toLowerCase(),
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(
          items.map((i) => ({ id: i.product.id, name: i.product.name, qty: i.quantity }))
        ),
        currency_code: currency.code,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
