import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Sentry from '@/lib/sentry'
import { projectSchema, projectCreateSchema } from '@/schemas/projectSchema'
import { profileSchema } from '@/schemas/profileSchema'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const idSchema = z.string().uuid()

async function getSupabaseUser() {
  try {
    const supabaseServer = createServerComponentClient({ cookies })
    const {
      data: { user },
      error,
    } = await supabaseServer.auth.getUser()
    return { user, error }
  } catch (e) {
    return { user: null, error: e }
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const valid = idSchema.safeParse(id)
    if (!valid.success) {
      return NextResponse.json({ error: 'Invalid project id' }, { status: 400 })
    }
    const { data: project, error } = await supabase
      .from('projects')
      .select('*, seller:profiles(*)')
      .eq('id', id)
      .single()
    if (error || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ project })
  } catch (err) {
    Sentry.captureException(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const valid = idSchema.safeParse(id)
    if (!valid.success) {
      return NextResponse.json({ error: 'Invalid project id' }, { status: 400 })
    }
    const { user, error: authError } = await getSupabaseUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Fetch project to check seller
    const { data: project } = await supabase.from('projects').select('*').eq('id', id).single()
    if (!project || project.seller_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const body = await req.json()
    // Only allow updatable fields
    const updateSchema = projectCreateSchema.partial()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const { data, error: updateError } = await supabase
      .from('projects')
      .update(parsed.data)
      .eq('id', id)
      .select('*')
      .single()
    if (updateError) throw updateError
    return NextResponse.json(data)
  } catch (err) {
    Sentry.captureException(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const valid = idSchema.safeParse(id)
    if (!valid.success) {
      return NextResponse.json({ error: 'Invalid project id' }, { status: 400 })
    }
    const { user, error: authError } = await getSupabaseUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Fetch project to check seller
    const { data: project } = await supabase.from('projects').select('*').eq('id', id).single()
    if (!project || project.seller_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    // Soft-delete: set status = 'deleted'
    const { error: delError } = await supabase.from('projects').update({ status: 'deleted' }).eq('id', id)
    if (delError) throw delError
    return NextResponse.json({ success: true })
  } catch (err) {
    Sentry.captureException(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
