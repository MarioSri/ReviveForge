import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Sentry from '@/lib/sentry';
import { favoriteCreateSchema } from '@/schemas/favoriteSchema';
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

// GET /api/favorites
export async function GET() {
  try {
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { data, error } = await supabase
      .from('favorites')
      .select('*, project:projects(*)')
      .eq('user_id', user.id);
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/favorites
export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const parsed = favoriteCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const insertData = {
      user_id: user.id,
      project_id: parsed.data.projectId,
    };
    const { data, error } = await supabase.from('favorites').insert(insertData).select('*').single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
