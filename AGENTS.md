# Task-Driven Development with GitHub + Archon

**Policy:** **GitHub Issues/Projects are the single source of truth for tasks & bugs.** **Archon is for knowledge** (briefs, ADRs, context, RAG/code examples) and documentation only. Never track or update task status in Archon.

## 🔒 Critical Rule

1. **Tasks & bugs:** use **GitHub** (Issues/Projects) — always.
2. **Knowledge & research:** use **Archon** (briefs, ADRs, docs, RAG).
3. If a "task" exists only in Archon, **create a GitHub Issue first** and link the Archon doc.
4. If you started work without a GitHub Issue, **stop** → open an Issue → link PR/commits → continue.

## 🧭 Golden Rule: Task-Driven Dev with GitHub + Archon Support

**MANDATORY: Complete this cycle for every piece of work:**

1. **Confirm Current Task (GitHub)**  
   Open or select the Issue. Ensure it has: **Outcome**, **Acceptance Criteria (AC)**, **Test Note**, labels.

2. **Research for Task (Archon)**  
   Find the linked brief/ADR or run **RAG**/**code-example** queries. Add the best doc link back to the Issue.

3. **Implement the Task (Repo)**  
   Create a branch `feat/gh-<id>-slug` or `fix/gh-<id>-slug`. Commit with `(<area>): message (gh-<id>)`.

4. **Quality Gate (Playwright)**  
   Add/adjust tests to satisfy AC. Run locally; prepare result summary for the PR.

5. **Update Status (GitHub)**  
   Open a PR linking the Issue (`Closes #<id>`). Move Issue/Project status: **todo → doing → review → done** (no skipping).

6. **Get Next Task (GitHub)**  
   Pick the next prioritized Issue; repeat.

## 📦 Task Management Rules (GitHub)

- **Statuses:** `todo → doing → review → done` (do not jump directly to done).
- **Fields/labels:** `type:*`, `prio:*`, `size:*`, `component:*`, `agent` if AI-friendly.
- **Definition of Done:** AC met, tests pass, docs updated, preview verified, Issue closed.
- **Planning note:** Post a short implementation plan as an **Issue comment** before coding.

## 📚 Research Workflow (Archon)

Use Archon to **accelerate understanding** and **preserve knowledge**:

- **Find context:** open linked brief/ADR from the Issue.
- **RAG queries:** architecture, security, performance, patterns.
- **Code-example search:** minimal, current, relevant patterns to adapt.
- **Document outcomes:** update the brief or add a short ADR if a decision was made.

### Research checklist (before coding)
- Patterns & best practices verified (RAG)
- Security/edge cases understood
- Pitfalls identified
- Minimal examples collected
- Archon link pasted into the Issue

## 🧩 Documentation & ADRs (in Archon)

- **Briefs**: "what/why/constraints/links".
- **ADRs**: one decision per doc — context → decision → consequences.
- **Linking convention** (both ways recommended):
  - In **GitHub Issue body**: "Related: `<Archon link or ID>`"
  - In **Archon doc metadata/body**: `GitHub Issue: #<id>` and PR link when merged.

### When to write/update an ADR
- You changed a dependency, API contract, data model, or security posture.
- You adopted a new pattern that others should follow.

## ✅ QA Expectations (Playwright)

- At least one test per Issue's AC (e.g., `apps/web/tests/<area>.spec.ts`).
- For visual checks, emulate **reduced motion**.
- On PRs, include a brief test result summary (or attach artifact).
- Fix flaky tests; don't remove coverage to "make it pass".

## 🔐 Security & Secrets

- Never commit or echo secrets.
- Use environment variables & secret managers.
- If a secret leaks, rotate it and note remediation in the Issue.

## 🧯 When Something's Missing

- **No Issue?** Create one before coding.
- **No brief/ADR?** Draft a minimal Archon note and link it in the Issue.
- **Unclear scope?** Split into smaller Issues; each must have AC.

## ✅ Start/End Checklists

### At start (comment this in the Issue):
- [ ] Confirmed **Outcome + AC + Test Note**
- [ ] Linked/verified **Archon brief/ADR**
- [ ] Posted **implementation plan**
- [ ] Created branch `gh-<id>` and began work

### Before merge:
- [ ] Playwright tests pass & cover AC
- [ ] Docs updated (brief/ADR if needed)
- [ ] PR links Issue and preview verified
- [ ] Issue moved to **done** (auto/close)

**Remember:** **GitHub for tasks. Archon for knowledge.** Keep changes small, testable, and documented.