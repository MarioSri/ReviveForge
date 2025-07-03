import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Sentry from '@/lib/sentry'
import { projectSchema, projectCreateSchema } from '@/schemas/projectSchema'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// Query validation schema
const querySchema = z.object({
  techStack: z.union([z.string(), z.array(z.string())]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minHealth: z.coerce.number().optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
})

// Helper to get user from Supabase session (cookie-based)
async function getSupabaseUser(req: NextRequest) {
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

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const params: any = Object.fromEntries(url.searchParams.entries())
    // Parse arrays from query string
    if (params.techStack) {
      params.techStack = url.searchParams.getAll('techStack')
    }
    const parsed = querySchema.safeParse(params)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const { techStack, minPrice, maxPrice, minHealth, page, pageSize } = parsed.data
    let query = supabase.from('projects').select('*', { count: 'exact' })
    if (techStack && techStack.length > 0) {
      query = query.contains('tech_stack', techStack)
    }
    if (minPrice !== undefined) query = query.gte('value_min', minPrice)
    if (maxPrice !== undefined) query = query.lte('value_max', maxPrice)
    if (minHealth !== undefined) query = query.gte('health_score', minHealth)
    query = query
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)
    const { data, count, error } = await query
    if (error) throw error
    return NextResponse.json({ data, count })
  } catch (err) {
    Sentry.captureException(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await getSupabaseUser(req)
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Fetch profile to check role
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (!profile || profile.user_type !== 'seller') {
      return NextResponse.json({ error: 'Only sellers can create projects' }, { status: 403 })
    }
    const body = await req.json()
    const parsed = projectCreateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const insertData = {
      ...parsed.data,
      seller_id: user.id,
      ai_analysis: null,
    }
    const { data, error } = await supabase.from('projects').insert(insertData).select('*').single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    Sentry.captureException(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
