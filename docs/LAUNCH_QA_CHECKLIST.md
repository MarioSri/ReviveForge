# ReviveForge Launch QA Checklist

## A – Pre‑production
- [ ] `SUPABASE_URL` / `SERVICE_KEY` set in Vercel prod env
- [ ] Stripe live keys & price IDs configured
- [ ] `WEBHOOK_SECRET` / `CRON_SECRET` rotated for prod
- [ ] Domain & SSL active (`https://reviveforge.com`)
- [ ] Email deliverability test (magic link + Resend digest)

## B – Smoke Tests
- [ ] Sign‑up via email magic link
- [ ] GitHub OAuth sign‑up
- [ ] Browse marketplace & filters return 200
- [ ] Project detail loads carousel & metrics
- [ ] Run AI valuation (OpenAI live key)
- [ ] Make & accept offer (Stripe test $1 flow)
- [ ] Dashboard tables render w/ real data
- [ ] Weekly digest cron fires in staging
- [ ] Onboarding checklist fully completes

## C – Quality Gates
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run test:e2e` passes
- [ ] `npm run lhci` ≥ 90 Perf/A11y
- [ ] 0 axe violations (`npm run test:a11y`)

## D – Go‑live Ops
- [ ] Upstash Redis rate‑limit keys in prod
- [ ] Sentry DSN points to prod project
- [ ] Slack alert webhooks live
- [ ] Backup + Uptime GitHub Actions scheduled
- [ ] Announce on Twitter & Product Hunt
- [ ] Set “Public” feature flag in Supabase
