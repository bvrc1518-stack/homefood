import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface VerifyBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyBody = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Verify signature: HMAC SHA256 of "order_id|payment_id" with key_secret
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Payment is verified — TODO: update order status in your database, send confirmation email
    console.log('Payment verified:', razorpay_payment_id, 'Order:', razorpay_order_id);

    return NextResponse.json({ success: true, paymentId: razorpay_payment_id });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
