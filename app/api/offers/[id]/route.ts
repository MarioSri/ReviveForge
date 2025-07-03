import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Sentry from '@/lib/sentry';
import { offerActionSchema } from '@/schemas/offerSchema';
import { stripe } from '@/lib/stripe';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const idSchema = z.string().uuid();

async function getSupabaseUser() {
  try {
    const supabaseServer = createServerComponentClient({ cookies });
    const { data: { user }, error } = await supabaseServer.auth.getUser();
    return { user, error };
  } catch (e) {
    return { user: null, error: e };
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const valid = idSchema.safeParse(id);
    if (!valid.success) {
      return NextResponse.json({ error: 'Invalid offer id' }, { status: 400 });
    }
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Fetch offer and related project
    const { data: offer } = await supabase.from('offers').select('*, project:projects(*)').eq('id', id).single();
    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }
    if (!offer.project || offer.project.seller_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (offer.status !== 'pending') {
      return NextResponse.json({ error: 'Offer already processed' }, { status: 400 });
    }
    const body = await req.json();
    const parsed = offerActionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    if (parsed.data.action === 'reject') {
      const { error: updateError } = await supabase.from('offers').update({ status: 'rejected' }).eq('id', id);
      if (updateError) throw updateError;
      return NextResponse.json({ success: true });
    }
    // Accept: create Stripe PaymentIntent
    // Get seller's Stripe account
    const { data: sellerProfile } = await supabase.from('profiles').select('*').eq('id', offer.project.seller_id).single();
    if (!sellerProfile || !sellerProfile.stripe_account_id) {
      return NextResponse.json({ error: 'Seller not connected to Stripe' }, { status: 400 });
    }
    const applicationFee = Math.round(offer.amount * 0.1 * 100); // 10% fee, in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: offer.amount * 100, // cents
      currency: 'usd',
      payment_method_types: ['card'],
      application_fee_amount: applicationFee,
      transfer_data: { destination: sellerProfile.stripe_account_id },
      metadata: { offerId: offer.id, projectId: offer.project_id },
    });
    // Update offer
    const { error: updateError } = await supabase.from('offers').update({ status: 'accepted', stripe_payment_intent_id: paymentIntent.id }).eq('id', id);
    if (updateError) throw updateError;
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
