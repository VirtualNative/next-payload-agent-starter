# Next + Payload Starter (Tailwind, shadcn, TypeScript, MCP-ready)

An open-source starter repo for shipping modern apps with **Next.js + Payload CMS + Tailwind + shadcn/ui + TypeScript**, wired for **GitHub-native agent workflows**, **Vercel deploys**, and **Playwright MCP** testing. Optional one-command integrations: **Framer Motion** and **n8n**.

## Quick start
```bash
# 1) Install deps
pnpm i

# 2) Start CMS & Web in two terminals
pnpm --filter cms dev
pnpm --filter web dev

# Payload: http://localhost:3001/admin (create first user)
# Next.js: http://localhost:3000

# 3) (Optional) Add Framer Motion wrappers
pnpm run integrate:motion

# 4) (Optional) Add n8n webhook helpers + stubs
pnpm run integrate:n8n
```

## Deploy
- **Web (Next.js)** → Vercel (Project root: `apps/web`)
- **CMS (Payload)** → Vercel (Other) or your Node host (port 3001). Provide `PAYLOAD_SECRET`, `PUBLIC_SERVER_URL`, and `DATABASE_URI` (e.g., Supabase).

See `/docs` for full details.
