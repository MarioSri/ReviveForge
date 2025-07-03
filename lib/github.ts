import { Octokit } from 'octokit';

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getRepoStats(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.get({ owner, repo });
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    pushedAt: data.pushed_at,
    language: data.language,
    fullName: data.full_name,
    description: data.description,
    url: data.html_url,
  };
}
