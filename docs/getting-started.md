# Getting Started

## Prereqs
- Node 18+ and pnpm
- (Optional) Docker for Postgres
- GitHub + Vercel accounts

## Install & run
```bash
pnpm i
pnpm --filter cms dev     # http://localhost:3001/admin
pnpm --filter web dev     # http://localhost:3000
```

Create first Payload user at `/admin`.

## Optional add-ons
```bash
pnpm run integrate:motion   # Framer Motion wrappers
pnpm run integrate:n8n      # n8n webhook helpers + stubs
```

## Deploy
- Web: Vercel project root `apps/web`
- CMS: Vercel (Other) or your Node host; envs:
  - `PAYLOAD_SECRET`
  - `PUBLIC_SERVER_URL` (your production CMS URL)
  - `DATABASE_URI` (Postgres/Supabase)
