import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { openai } from '@/lib/openai';
import { getRepoStats } from '@/lib/github';
import Sentry from '@/lib/sentry';
import { aiValuationSchema } from '@/schemas/aiValuationSchema';
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

export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await getSupabaseUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const parsed = aiValuationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    // Parse owner/repo from githubUrl
    const match = parsed.data.githubUrl.match(/github.com\/(.+?)\/(.+?)(\/|$)/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
    }
    const [_, owner, repo] = match;
    const repoStats = await getRepoStats(owner, repo);
    // Compose prompt for OpenAI
    const prompt = `Given the following GitHub repo stats, estimate the healthScore (0-100), valueMin, valueMax (USD), difficultyRating (1-5), and provide a 2-3 sentence summary.\n\n${JSON.stringify(repoStats, null, 2)}`;
    const aiRes = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert in software valuation.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });
    const aiAnalysis = aiRes.choices[0]?.message?.content ? JSON.parse(aiRes.choices[0].message.content) : null;
    if (!aiAnalysis) {
      return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 });
    }
    // Upsert into projects (by github_url)
    const { data: project } = await supabase.from('projects').select('*').eq('github_url', parsed.data.githubUrl).single();
    if (project) {
      await supabase.from('projects').update({
        ai_analysis: aiAnalysis,
        health_score: aiAnalysis.healthScore,
        value_min: aiAnalysis.valueMin,
        value_max: aiAnalysis.valueMax,
      }).eq('id', project.id);
    }
    return NextResponse.json({ aiAnalysis });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
