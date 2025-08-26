# AI Context: Next + Payload Starter

## Project Overview

This is a production-ready monorepo starter that combines:
- Next.js 14 (App Router) for the frontend
- Payload CMS for headless content management
- TypeScript for type safety
- Tailwind CSS + shadcn/ui for styling
- Playwright for testing
- GitHub Issues/Projects for task management
- MCP (Model Context Protocol) for AI agent integration

## Core Principles

1. **GitHub-Native Workflow**: All tasks tracked in GitHub Issues, never in external systems
2. **Small, Testable Changes**: Each PR should be ≤90 minutes of work
3. **AI-Assisted Development**: MCP servers enable AI agents to work alongside humans
4. **Type Safety First**: Full TypeScript coverage across the stack
5. **Documentation as Code**: Keep docs close to implementation

## Architecture Overview

```
Frontend (Next.js) <-> API Routes <-> Payload CMS <-> Database
                         |
                    Optional n8n
                  (product flows)
```

## Key Conventions

- **Branch naming**: `feat/gh-<issue-id>-description` or `fix/gh-<issue-id>-description`
- **Commit format**: `<type>(<scope>): message (gh-<issue-id>)`
- **PR size**: One feature/fix per PR, linked to GitHub Issue
- **Testing**: Every PR must include/update relevant tests

## AI Agent Capabilities

Through MCP servers, AI agents can:
- Create/update GitHub Issues and PRs
- Run Playwright tests and attach results
- Search Archon knowledge base for context
- Trigger n8n workflows (if enabled)

## Common Tasks

1. **Adding a new feature**: Create Issue → Research in Archon → Implement → Test → PR
2. **Fixing a bug**: Reproduce → Create Issue → Fix → Add regression test → PR
3. **Updating documentation**: Make changes → Update relevant ADRs → PR

## Security Considerations

- Never commit secrets (use environment variables)
- All user input must be validated
- Authentication handled by Payload CMS
- CORS configured for production domains only