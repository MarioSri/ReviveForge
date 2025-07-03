import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const PRICE_IDS: Record<string, string | undefined> = {
  pro_monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
};

export async function POST(req: NextRequest) {
  try {
    const { priceId }: { priceId: string } = await req.json();
    if (!priceId || !PRICE_IDS[priceId]) {
      return NextResponse.json({ error: "Invalid priceId" }, { status: 400 });
    }
    if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_BASE_URL) {
      return NextResponse.json({ error: "Stripe env vars missing" }, { status: 500 });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRICE_IDS[priceId]!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing/cancel`,
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 14,
      },
    });
    return NextResponse.json({ checkoutUrl: session.url });
  } catch (e) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
