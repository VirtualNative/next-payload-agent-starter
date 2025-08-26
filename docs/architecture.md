# Architecture

- **apps/web**: Next.js (App Router), Tailwind, shadcn-ready
- **apps/cms**: Payload CMS (Express server)
- **automation/n8n**: Schemas & exported flows (optional)
- **.claude.json**: MCP servers (GitHub, Playwright, Archon, n8n)

**Principles**
- GitHub Issues/Projects = single source of truth for tasks
- Archon = knowledge base (briefs, ADRs); may seed issues via automation
- n8n = product instrument (integrations, pipelines), not PM
- Agents operate via MCP against GitHub & Playwright
