Here's the content formatted as a proper README.md file:
markdown# 🚀 Next + Payload Agent Starter

A modern, open-source starter for building production apps with Next.js + Payload CMS + Tailwind + shadcn/ui + TypeScript — wired for GitHub-native AI agent workflows (MCP), Playwright MCP QA, and Vercel deploys. Optional one-command add-ons: Framer Motion (UI animations) and n8n (product automation).

<p align="center">
  <img src="assets/npas-readme-banner-1280x640.png" alt="Next + Payload Agent Starter banner" width="100%" />
</p>

## ✨ Why this exists

Most starters stop at "Hello World." This one goes further:

- **Full-stack scaffolding** that pairs Next.js (frontend/app) with Payload (headless CMS/API).
- **Design-system ready** with Tailwind and shadcn/ui to ship polished UIs fast.
- **AI-assisted workflow**: agents operate natively on GitHub Issues/Projects (via MCP), not a parallel task DB.
- **Quality gates**: Playwright MCP ready so both humans and agents can prove acceptance criteria in PRs.
- **Optional product automations** (email, indexing, AI jobs) via n8n — clearly separated from project management.

If you're a solo builder or a small team (2–3 devs) who wants clarity, speed, and repeatability, this repo is for you.

## 🧱 What's inside

- **apps/web** — Next.js 14 (App Router), Tailwind, shadcn/ui, TypeScript, Playwright config
- **apps/cms** — Payload CMS (Users + Articles collections, Express server)
- **automation/n8n** — JSON schemas & flows folder (opt-in)
- **scripts** — one-command integrations:
  - `integrate:motion` → Framer Motion wrappers for shadcn components
  - `integrate:n8n` → signed webhook stubs (Next/Payload) + schema/flow seeds
- **docs** — Getting Started, Architecture, Agent Workflow (GitHub-native), UI Guidelines, QA, Ops
- **.github** — Issue / PR templates for small, testable tasks
- **.claude.json** — MCP servers prewired: GitHub, Playwright, Archon, n8n

## 🗺️ Monorepo layout
app-starter/
apps/
web/           # Next.js app
cms/           # Payload CMS (Express)
automation/
n8n/
flows/       # export/import your n8n flows here
schemas/     # versioned event/contract JSON
docs/            # guides & runbooks
scripts/         # integrate:motion, integrate:n8n
.github/         # issue/PR templates
.claude.json     # MCP servers config
package.json     # pnpm workspaces: apps/, automation/

## 🔧 Quick start

```bash
pnpm install

# Terminal A: Payload CMS
pnpm --filter cms dev    # http://localhost:3001/admin (create first user)

# Terminal B: Next.js web
pnpm --filter web dev    # http://localhost:3000
Optional one-command add-ons
bashpnpm run integrate:motion   # adds Framer Motion + motion wrappers
pnpm run integrate:n8n      # adds webhook stubs + schemas/flows folders
🧰 Core tech & credits

Next.js by Vercel – React framework with App Router
Payload CMS – TypeScript headless CMS & REST/GraphQL API
Tailwind CSS by Tailwind Labs – utility-first CSS
shadcn/ui by shadcn – Radix-powered React components you copy into your project
TypeScript by Microsoft – typed JavaScript at scale
Playwright by Microsoft – end-to-end testing; Playwright MCP for agent-driven tests
Framer Motion by Framer – production animation library (optional)
n8n by n8n GmbH – workflow automation as product "instrument" (optional)
GitHub – Issues/Projects, Actions, PRs (canonical task system)
MCP (Model Context Protocol) by Anthropic – enables tools/servers (GitHub/Playwright/Archon/n8n) in IDE agents
Archon – knowledge base & RAG/briefs/ADRs used by agents (your org's project)

Trademarks and product names belong to their respective owners.
🧑‍💻 Development workflow (humans + agents)

Single source of truth for tasks: GitHub Issues/Projects
Knowledge & research: Archon (briefs, ADRs, RAG, code examples)
Quality gate: Playwright tests (human or agent-generated) attached to PRs

Keep tasks small (≤ 90 minutes, one PR).
Every Issue must include:

Outcome (1 sentence)
Acceptance Criteria (testable bullets)
Test Note (what Playwright should verify)

Use labels/fields: type:*, prio:*, size:*, component:*, agent.
"Definition of Done": AC met, tests pass, docs updated, preview verified, Issue closed.
See docs/agent-workflow.md and CLAUDE.MD for exact conventions.
🧪 QA with Playwright (and MCP)
bashcd apps/web
pnpm dlx playwright@latest install
pnpm test

Tests live in apps/web/tests/*.
Agents can record/run tests via Playwright MCP (prewired in .claude.json).
For visual stability, emulate reduced motion during tests.

More: docs/qa.md
🎛️ Optional integrations
Framer Motion (UI polish)
bashpnpm run integrate:motion
Adds components/motion/* wrappers (e.g., MotionCard, MotionDialog) and a MotionRoot provider. See docs/ui-guidelines.md for patterns.
n8n (product automation)
bashpnpm run integrate:n8n
Adds signed webhook stubs (Next/Payload), JSON schemas, and flow folders. Use for product flows only (emails, indexing, AI jobs) — not project management. Details in docs/architecture.md and docs/ops.md.
🌐 Deploy
Vercel (recommended)

Web (Next.js): project root apps/web
CMS (Payload): project root apps/cms (Vercel "Other" or any Node host on port 3001)

Environment variables
bash# apps/cms
PAYLOAD_SECRET=your-secret
PUBLIC_SERVER_URL=https://your-cms.example.com
DATABASE_URI=postgres://user:pass@host:5432/db

# optional n8n
N8N_URL=https://n8n.example.com/api/v1
N8N_HMAC_SECRET=your-shared-secret
🧩 MCP servers (IDE agents)
.claude.json includes:

github – create/search Issues & PRs, comment, manage Projects
playwright – record/run tests and attach results
archon – fetch briefs/ADRs; run RAG & code-example search
n8n – call versioned product flows (if enabled)

Agents should never maintain a separate task list — they operate directly on GitHub.
🗒️ Docs you should read next

docs/getting-started.md – install, run, and deploy
docs/architecture.md – how the pieces fit
docs/agent-workflow.md – GitHub-native task rules
docs/ui-guidelines.md – Tailwind + shadcn conventions
docs/qa.md – Playwright MCP & CI notes
docs/ops.md – envs, secrets, and operations

🛤️ Roadmap (suggested)

✅ Starter scaffolding, docs, MCP config, PR/Issue templates
⏳ GitHub Actions examples (auto-add PRs to Projects, attach Playwright reports)
⏳ Optional Supabase example for Payload DB
⏳ Example n8n flows (content index, receipt emails, AI recipe generator)
⏳ Example Framer Motion patterns (page transitions, list reflow)

Contributions welcome (see below)!
🤝 Contributing

Open a GitHub Issue with context + acceptance criteria
Link PRs to Issues; keep changes focused and test-backed
Update relevant docs (brief/ADR, README sections)
Follow the commit style: feat(<area>): message (gh-<id>)

We use Issues/Projects for tracking; Discussions are enabled for Q&A and ideas.
🙏 Acknowledgements & Credits

Vercel – for creating and stewarding Next.js
Payload team – for a fantastic TypeScript CMS
Tailwind Labs – for Tailwind CSS
shadcn – for shadcn/ui component patterns
Microsoft – for TypeScript and Playwright
Framer – for Framer Motion
n8n GmbH – for n8n workflow automation
Anthropic – for MCP (Model Context Protocol) that enables tool-driven agents
GitHub – for the developer platform we rely on

Special thanks to the open-source community and all maintainers of these projects. ❤️
📄 License
MIT © Virtual Native. See LICENSE