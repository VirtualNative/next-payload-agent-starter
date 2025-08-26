# Agent Workflow (GitHub-native)

## Task contract
- Scope ≤ 90 minutes; one PR
- Issue must include: Outcome (1 sentence), Acceptance Criteria (bullets), Test Note
- Label `agent` when AI can attempt

## Issue templates
See `.github/ISSUE_TEMPLATE/*`

## PR template
See `.github/PULL_REQUEST_TEMPLATE.md`

## MCP setup
`.claude.json` includes:
- `mcp-github` (create issues/PRs, read boards)
- `@playwright/mcp` (record/play tests)
- `archon` (context, briefs)
- `n8n` (call product flows)

## Flow
1. Create/triage issue in GH Project (assign Type, Priority, Size, Iteration).
2. Agent (or human) branches, codes, writes/updates Playwright test(s).
3. Open PR; attach Playwright run; link to issue; update docs where needed.
4. Review → merge → close issue.
