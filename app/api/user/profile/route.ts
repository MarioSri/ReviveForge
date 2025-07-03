import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Sentry from '@/lib/sentry';
import { profileUpdateSchema } from '@/schemas/profileUpdateSchema';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

async function getSupabaseUser() {
  try {
    const supabaseServer = createServerComponentClient({ cookies });
    const { data: { user }, error } = await supabaseServer.auth.getUser();
    return { user, error };
  } catch (e) {
    return { user: null, error: e };
  }
}

export async function GET() {
  try {
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (error || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json({ profile });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const parsed = profileUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const { data: profile, error } = await supabase.from('profiles').update(parsed.data).eq('id', user.id).select('*').single();
    if (error || !profile) {
      return NextResponse.json({ error: 'Profile update failed' }, { status: 500 });
    }
    return NextResponse.json({ profile });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
