# Read Me First

In this repo, GitHub Issues/Projects are the single source of truth for work. Archon is for knowledge (briefs, ADRs, context). All coding must be tied to a GitHub issue. Use MCP servers to operate on GitHub, fetch Archon context, run Playwright tests, and (optionally) call n8n flows.

## 🔒 Critical Rule (must follow)

- **Tasks & bugs:** Use GitHub only (Issues/Projects).
- **Knowledge & research:** Use Archon (briefs, ADRs, docs, RAG).
- **Never track or update tasks in Archon.** If a task exists only in Archon, create the corresponding GitHub Issue first and link back to the Archon doc.
- If you started work without an Issue, stop → open an Issue → link PRs & commits → continue.

## 🧰 MCP Servers & Roles

- **github** — create/search/update Issues & PRs, manage Projects, comment, attach artifacts.
- **archon** — fetch project briefs, ADRs, knowledge; run RAG/code-example searches.
- **playwright** — record/run UI tests; attach results to PRs.
- **n8n** (optional, feature work only) — call product flows (webhooks, jobs). Not for PM.

**Tip:** Use tool introspection (e.g., "list tools/commands") to discover available operations. Prefer high-level helpers; fall back to REST methods if needed.

## 📦 Task Contract (keep work small & shippable)

- **Scope:** ≤ 90 minutes, one PR, one component/feature slice.
- **Every Issue must have:**
  - Outcome (one sentence)
  - Acceptance Criteria (testable bullets)
  - Test Note (what Playwright should verify)
- **Labels/fields:** `type:*`, `prio:*`, `size:*`, `component:*`, `agent` if AI-friendly.
- **Definition of Done:** AC met, tests pass, docs updated, preview verified, Issue closed.

## 🧭 Standard Work Session (do this every time)

### 1. Locate work in GitHub
- Find your next task: search Issues in this repo (status Backlog/Selected; label `agent` if applicable).
- If no suitable Issue exists for the work at hand, create one (Feature/Bug template) and add labels/assignee.

### 2. Pull knowledge from Archon
- From the Issue context/links, open related Archon brief/ADR.
- If missing: search Archon (RAG) by feature/tech; link the best doc back into the Issue.

### 3. Plan the change
- Post a short plan as an Issue comment: approach, files to touch, test plan.

### 4. Branch & implement
- Branch name: `feat/gh-<id>-short-slug` or `fix/gh-<id>-short-slug`.
- Commit style: `feat(<area>): message (gh-<id>)`.

### 5. QA with Playwright
- Create/update a test that proves the AC.
- Run locally; attach/summary to the PR.

### 6. Open PR
- Link the Issue (`Closes #<id>`), fill the PR template, include test results, and any Archon doc links.

### 7. Respond & finalize
- Address review, ensure Vercel preview meets AC, then merge.
- Verify auto-close of Issue or close it manually.

## 🔧 GitHub (via MCP) — common operations

Use the GitHub MCP's native commands; names may vary. Prefer specific helpers like `issues.create`, `issues.search`, `pulls.create`, `issues.comment`, `projects.items.update`. If unavailable, use the REST passthrough.

### Find next task
- Search Issues: `is:open is:issue repo:<owner/repo> label:agent sort:updated-desc`
- Or filter by milestone/iteration/status fields.

### Create an Issue
- **Title:** `<short outcome>`
- **Body:** Include Outcome, Acceptance Criteria, Test Note, and links to Archon brief/ADR.
- **Labels/fields:** set type, prio, size, component, agent if appropriate.

### Start work
- Comment: "Starting work. Plan: …"
- Assign yourself; move card/status to `In Progress`.

### Open PR
- Branch → PR to main
- PR body includes: Issue link, AC checklist, Playwright run reference, preview URL.

### Finish
- Merge, ensure Issue is closed, add a one-line "What changed/Why" note.

## 📚 Archon (via MCP) — how to use it properly

**Purpose:** Knowledge hub and research—not task tracking.

**When to use:**
- Fetch briefs/ADRs for the feature/problem.
- Run RAG queries for architecture, security, patterns.
- Search code examples to guide implementation.

**Linking:**
- Paste the Archon doc URL/ID into the Issue.
- If you generate a new brief/ADR in Archon, post the link in the Issue.

**Research checklist before coding:**
- Patterns & best practices (RAG)
- Security implications
- Known pitfalls
- Minimal, relevant examples

## ✅ Playwright MCP — QA expectations

- Add/update a test for each Issue's AC (e.g., `tests/<area>.spec.ts`).
- For visual stability, emulate reduced motion where needed.
- On PRs, run tests and paste a brief result summary or attach artifact.
- If tests are flaky, fix the flake or adjust the test (don't delete coverage).

## 🧩 Optional: n8n as product instrument (not PM)

- Only use n8n for product flows (e.g., content index, emails, AI jobs).
- Trigger safe flows exposed by the team (versioned, documented).
- If a feature requires a new flow, propose it in the Issue, link a minimal spec, and coordinate with maintainers.

## 🗂️ Branching, Commits, and PRs

- **Branches:** `feat/gh-123-add-recipe-list`, `fix/gh-456-nav-overflow`
- **Commits:** `feat(recipes): add list grid (gh-123)`
- **PR template:** keep the checkboxes; ensure AC & tests checked before requesting review.

## 🔄 Status Flow (Project board)

Backlog → Selected → In Progress → Review → Done

- Move cards by updating Issue fields/status; do not invent new states.
- Use `Review` when waiting on PR review/QA.

## 🔐 Security & Secrets

- Never print or commit secrets.
- Use environment variables, never hard-code keys.
- If you see a secret in history, rotate it and note the action in the Issue.

## 🧯 When something's missing

- **No Issue?** Create one before coding.
- **No brief/ADR?** Write a minimal note in Archon and link it to the Issue.
- **Unclear scope?** Break into smaller Issues; ensure each has AC.

## 🏁 Quick checklist (copy into each Issue comment when you start)

- [ ] Confirmed this Issue has Outcome + AC + Test Note
- [ ] Linked/verified Archon brief/ADR
- [ ] Posted implementation plan
- [ ] Opened branch with `gh-<id>`
- [ ] Added/updated Playwright test(s)
- [ ] Opened PR linking Issue; included results & preview
- [ ] Met AC; merged; closed Issue

**Remember:** GitHub for tasks. Archon for knowledge. Use MCP to connect them, prove value with tests, and keep changes small and shippable.