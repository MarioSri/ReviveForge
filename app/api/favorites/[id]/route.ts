import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Sentry from '@/lib/sentry';
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const valid = idSchema.safeParse(id);
    if (!valid.success) {
      return NextResponse.json({ error: 'Invalid favorite id' }, { status: 400 });
    }
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Ensure favorite belongs to user
    const { data: favorite } = await supabase.from('favorites').select('*').eq('id', id).single();
    if (!favorite || favorite.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { error } = await supabase.from('favorites').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
