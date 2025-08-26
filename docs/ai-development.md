# AI-Fluent Development Guide

This starter is designed to be "AI-fluent" - optimized for development with AI agents while remaining human-friendly.

## AI Context Files (.ai directory)

The `.ai` directory contains structured context that helps AI agents understand your project:

- **context.md** - Project overview and key conventions
- **patterns.md** - Code patterns and examples to follow
- **decisions.md** - Architectural choices and reasoning
- **examples.md** - Common implementation examples

AI agents will reference these files to maintain consistency with your project's standards.

## Scaffolding Commands

Quick code generation with consistent patterns:

```bash
# Create a new component
pnpm scaffold:component MyComponent --with-test

# Create API endpoints
pnpm scaffold:api users --crud --with-test

# Create a new page
pnpm scaffold:page dashboard --protected --with-test
```

## Test Annotations

Add `@test` comments to components for AI-generated tests:

```typescript
// @test: renders loading state when data is fetching
// @test: shows error message on API failure
// @test: filters results when search term entered
export function MyComponent() {
  // Component code
}
```

AI agents can read these annotations and generate comprehensive test suites.

## Environment Validation

All environment variables are validated with TypeScript:

```typescript
import { env } from '@/lib/env'

// Type-safe access
console.log(env.NEXT_PUBLIC_APP_URL) // ✅ TypeScript knows this exists

// Runtime validation
// If PAYLOAD_SECRET is missing, app won't start
```

## Type-Safe API Client

Consistent API calls with automatic error handling:

```typescript
import { apiClient } from '@/lib/api-client'

// GET request
const users = await apiClient.get<User[]>('/api/users')

// POST with data
const newUser = await apiClient.post<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// With parameters
const filtered = await apiClient.get<User[]>('/api/users', {
  params: { role: 'admin' }
})
```

## Semantic Code Comments

Use AI-friendly comments to provide context:

```typescript
// AI-CONTEXT: Manages user authentication state
// PATTERN: Zustand store with persistent sessions
// SECURITY: Tokens stored in httpOnly cookies
export const useAuthStore = create((set) => ({
  // Store implementation
}))
```

## GitHub Issue Enrichment

The AI Issue Enrichment workflow automatically:

- Adds size labels based on issue content
- Suggests component labels
- Adds 'agent' label for well-formed issues
- Links related issues
- Prompts for missing requirements

## Best Practices for AI Development

1. **Keep PRs Small**: ~90 minutes of work maximum
2. **Write Clear Issues**: Include Outcome, AC, and Test Notes
3. **Use Semantic Names**: Functions and variables should be descriptive
4. **Add Test IDs**: Use `data-testid` for reliable test selection
5. **Document Decisions**: Update `.ai/decisions.md` for significant choices

## Common AI Commands

When working with AI agents (like Claude with MCP):

```bash
# Find work
"Find me an open issue labeled 'agent' in the backlog"

# Research before coding
"Search Archon for patterns related to data tables"

# Generate code
"Create a new component for user profiles using the scaffold"

# Write tests
"Generate tests for the UserProfile component based on its @test annotations"

# Review changes
"Run Playwright tests and create a PR for issue #123"
```

## Directory Structure for AI

AI agents understand this structure:

```
apps/web/
  app/              # Next.js pages and API routes
  components/       # Reusable UI components
  lib/              # Utilities and core logic
  stores/           # Zustand state management
  tests/            # Playwright E2E tests
  
.ai/                # AI context and documentation
scripts/scaffold/   # Code generation scripts
```

## Error Handling Patterns

Consistent error handling AI can recognize:

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  // Always log with context
  console.error('Operation failed:', { error, userId, timestamp })
  
  // User-friendly error
  throw new ApiError('Something went wrong', 500)
}
```

## Next Steps

1. Run `pnpm install` to set up the project
2. Review `.ai/context.md` for project overview
3. Try the scaffolding commands to see the patterns
4. Create a test issue with proper format
5. Let AI agents help you build faster!
