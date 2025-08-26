# Ops & Environments

## Envs
- Development: local `.env` files per app
- Staging/Prod: Vercel or your host for apps/web and apps/cms

## Secrets
- Payload: `PAYLOAD_SECRET`, `DATABASE_URI`, `PUBLIC_SERVER_URL`
- n8n (optional): `N8N_URL`, `N8N_HMAC_SECRET`

## Monitoring & Errors
- JS: consider Sentry for immediate error tracking.
- Python workers (if added): Pydantic Logfire integrates nicely.
- Synthetic checks: use n8n cron + Playwright MCP to probe user journeys.
