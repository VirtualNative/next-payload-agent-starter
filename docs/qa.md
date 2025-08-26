# QA: Playwright (and MCP)

## Local
```bash
cd apps/web
pnpm dlx playwright@latest install
pnpm test
```

## MCP usage
`@playwright/mcp` is registered in `.claude.json` so agents can generate/record tests and run them on PRs.

## Deterministic tests
- Emulate reduced motion or disable animations in tests.
- Keep tests small and tied to acceptance criteria.
