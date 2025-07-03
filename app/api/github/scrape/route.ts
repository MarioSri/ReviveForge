import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Sentry from '@/lib/sentry';
import { octokit } from '@/lib/github';

const LANG_WHITELIST = ['JavaScript', 'Python', 'Ruby'];
const SIX_MONTHS_AGO = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString();

export async function GET() {
  try {
    // GitHub GraphQL query for abandoned repos
    const query = `
      query {
        search(query: "stars:<10 pushed:<${SIX_MONTHS_AGO} language:JavaScript language:Python language:Ruby", type: REPOSITORY, first: 10) {
          nodes {
            ... on Repository {
              name
              owner { login }
              stargazerCount
              pushedAt
              url
              description
              primaryLanguage { name }
            }
          }
        }
      }
    `;
    const result = await octokit.graphql(query);
    let discoveredCount = 0;
    for (const repo of result.search.nodes) {
      // Check if already exists
      const { data: existing } = await supabase.from('projects').select('id').eq('github_url', repo.url).single();
      if (!existing && LANG_WHITELIST.includes(repo.primaryLanguage?.name)) {
        await supabase.from('projects').insert({
          title: repo.name,
          description: repo.description,
          github_url: repo.url,
          tech_stack: [repo.primaryLanguage?.name],
          health_score: 10,
          value_min: 100,
          value_max: 500,
          ai_analysis: null,
          status: 'discovered',
        });
        discoveredCount++;
      }
    }
    Sentry.captureMessage(`GitHub scrape discovered ${discoveredCount} new repos`);
    return NextResponse.json({ discoveredCount });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: 'Scrape error' }, { status: 500 });
  }
}
