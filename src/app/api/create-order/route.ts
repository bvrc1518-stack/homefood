import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { CartItem, CurrencyConfig } from '@/types';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

interface RequestBody {
  items: CartItem[];
  currency: CurrencyConfig;
}

// Razorpay supported currencies for international payments
const SUPPORTED_CURRENCIES = ['INR', 'USD', 'GBP'];

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { items, currency } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const currencyCode = SUPPORTED_CURRENCIES.includes(currency.code)
      ? currency.code
      : 'INR';

    // Amount in smallest unit (paise for INR, cents for USD/GBP)
    const subtotalUsdCents = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const amount = Math.round((subtotalUsdCents / 100) * currency.rate * 100);

    const order = await razorpay.orders.create({
      amount,
      currency: currencyCode,
      receipt: `receipt_${Date.now()}`,
      notes: {
        items: JSON.stringify(
          items.map((i) => ({ id: i.product.id, name: i.product.name, qty: i.quantity }))
        ),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
