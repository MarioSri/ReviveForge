import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Sentry from '@/lib/sentry';
import { resend } from '@/lib/resend';

export const config = { api: { bodyParser: false } };

async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const sig = req.headers.get('stripe-signature');
    const rawBody = await buffer(req.body as any);
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      Sentry.captureException(err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const offerId = paymentIntent.metadata?.offerId;
      if (!offerId) return NextResponse.json({ received: true });
      // Idempotency: check if transaction exists
      const { data: existing } = await supabase.from('transactions').select('id').eq('stripe_payment_intent_id', paymentIntent.id).single();
      if (existing) return NextResponse.json({ received: true });
      // Insert transaction
      await supabase.from('transactions').insert({
        offer_id: offerId,
        stripe_payment_intent_id: paymentIntent.id,
        status: 'succeeded',
        created_at: new Date().toISOString(),
      });
      // Fetch offer, buyer, seller
      const { data: offer } = await supabase.from('offers').select('*, project:projects(*, seller:profiles(*))').eq('id', offerId).single();
      if (offer) {
        // Send emails
        try {
          if (offer.buyer_id) {
            await resend.emails.send({
              to: offer.buyer_id,
              subject: 'Your offer was accepted and paid!',
              html: `<p>Your payment for project <b>${offer.project.title}</b> was successful.</p>`
            });
          }
          if (offer.project?.seller?.id) {
            await resend.emails.send({
              to: offer.project.seller.id,
              subject: 'You have a new sale!',
              html: `<p>Your project <b>${offer.project.title}</b> has been purchased.</p>`
            });
          }
        } catch (mailErr) {
          Sentry.captureException(mailErr);
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
