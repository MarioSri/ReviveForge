import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Sentry from '@/lib/sentry';
import { offerCreateSchema } from '@/schemas/offerSchema';
import { z } from 'zod';
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

// POST /api/offers
export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Check user is buyer
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (!profile || profile.user_type !== 'buyer') {
      return NextResponse.json({ error: 'Only buyers can place offers' }, { status: 403 });
    }
    const body = await req.json();
    const parsed = offerCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    // Check project exists and user is not seller
    const { data: project } = await supabase.from('projects').select('*').eq('id', parsed.data.projectId).single();
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    if (project.seller_id === user.id) {
      return NextResponse.json({ error: 'Cannot make offer on your own project' }, { status: 403 });
    }
    // Insert offer
    const insertData = {
      buyer_id: user.id,
      project_id: parsed.data.projectId,
      amount: parsed.data.amount,
      status: 'pending',
    };
    const { data: offer, error } = await supabase.from('offers').insert(insertData).select('*').single();
    if (error) throw error;
    return NextResponse.json(offer, { status: 201 });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET /api/offers
export async function GET(req: NextRequest) {
  try {
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = new URL(req.url);
    const received = url.searchParams.get('received') === 'true';
    let data, error;
    if (received) {
      // Offers received on your projects
      const { data: projects } = await supabase.from('projects').select('id').eq('seller_id', user.id);
      const projectIds = (projects || []).map((p: any) => p.id);
      if (projectIds.length === 0) {
        return NextResponse.json({ data: [] });
      }
      ({ data, error } = await supabase.from('offers').select('*').in('project_id', projectIds));
    } else {
      // Offers made by you
      ({ data, error } = await supabase.from('offers').select('*').eq('buyer_id', user.id));
    }
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
