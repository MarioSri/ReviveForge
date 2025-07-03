# ReviveForge

A turnkey marketplace for discovering, valuing, and relaunching abandoned digital projects.

![Architecture Diagram](./docs/architecture.png)

## Features
- Project discovery, listing, and filtering
- AI-powered valuation (OpenAI GPT-4)
- Secure offers, payments (Stripe Connect)
- Supabase Auth, PostgreSQL, Storage
- Transactional emails (Resend)
- Error monitoring (Sentry)
- Automated GitHub repo discovery (cron)

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Supabase (PostgreSQL, Auth, Storage)
- Stripe Connect & Billing
- OpenAI GPT-4
- Resend
- Sentry

## Setup
1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-org/reviveforge.git
   cd reviveforge
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
3. **Set environment variables:**
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `OPENAI_API_KEY`
   - `RESEND_API_KEY`
   - `GITHUB_TOKEN`
   - `SENTRY_DSN`
   - (see `.env.example`)

## Running Locally
- **Dev server:**
  ```sh
  pnpm dev
  ```
- **Run all tests:**
  ```sh
  pnpm test:unit && pnpm test:integration
  ```
- **Lint & type-check:**
  ```sh
  pnpm lint && pnpm type-check
  ```

## Dev > Hydration Guardrails

• `npm run build:hydration && npm run hydration:scan` catches server‑side browser code.<br>
• `npm run test:hydration` launches the built app in headless Chrome and fails if React logs a mismatch.

## Deployment
- Deploys automatically to Vercel on push to `main` (see `.github/workflows/ci.yml`).
- Configure Vercel project with all required environment variables.

## API Documentation
- OpenAPI spec: [`/openapi.yaml`](./openapi.yaml)
- Swagger UI: [`/api/docs`](./app/api/docs)

## Contributing
- Fork, branch, and PRs welcome!
- Please add/extend tests for new features.

## License
MIT

## Accessibility & Performance

- Run `npm run lhci` and `npm run test:a11y` before PR merge.
- Budgets: performance ≥ 90, accessibility ≥ 90 on Home & Marketplace.
- CI will fail if Lighthouse or axe-core/Playwright finds issues.

[![Upvote on Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/placeholder.svg?post_id=000000&theme=light)](https://www.producthunt.com/posts/reviveforge-TODO)

## Launch

Before merging to `main`, you must complete the [Launch QA Checklist](./docs/LAUNCH_QA_CHECKLIST.md).

A GitHub Action ([`.github/workflows/checklist.yml`](./.github/workflows/checklist.yml)) will block PRs if any checklist item remains unchecked. Work through the checklist as a team to ensure ReviveForge is truly launch‑ready.

## Investor Deck

- [View the deck](docs/INVESTOR_DECK.md)
- To export as PowerPoint: run `npm run slides:export` (requires @marp-team/marp-cli)
