# Architectural Decisions

## Why These Technologies?

### Next.js 14 with App Router
**Decision**: Use Next.js App Router instead of Pages Router
**Reasoning**:
- Server Components reduce client bundle size
- Improved data fetching with async components
- Better layouts and nested routing
- Built-in loading and error states
- Future-proof as Vercel's recommended approach

### Payload CMS
**Decision**: Payload as headless CMS instead of Strapi/Contentful
**Reasoning**:
- TypeScript-first with excellent type generation
- Self-hosted for data ownership
- Powerful access control system
- Easy to extend with custom fields
- Great developer experience

### Tailwind CSS + shadcn/ui
**Decision**: Utility-first CSS with copy-paste components
**Reasoning**:
- No CSS-in-JS runtime overhead
- shadcn components are owned, not dependencies
- Easy to customize without fighting framework
- Smaller bundle size than component libraries
- AI agents understand utility classes well

### TypeScript Strict Mode
**Decision**: Enable all strict checks
**Reasoning**:
- Catches errors at compile time
- Better IDE support and autocomplete
- Self-documenting code
- Easier for AI to understand intent
- Prevents common runtime errors

### pnpm Workspaces
**Decision**: Monorepo with pnpm instead of npm/yarn
**Reasoning**:
- Faster installs with better caching
- Strict dependency resolution
- Native workspace support
- Smaller node_modules size
- Better monorepo tooling

## Architecture Patterns

### API Design
**Decision**: REST over GraphQL for primary API
**Reasoning**:
- Simpler to understand and debug
- Better caching strategies
- No over-fetching concerns with targeted endpoints
- Payload provides GraphQL if needed later
- Lower complexity for small teams

### State Management
**Decision**: Zustand for global state, React state for local
**Reasoning**:
- Minimal boilerplate compared to Redux
- TypeScript inference works perfectly
- No providers needed
- Small bundle size (8kb)
- Simple mental model

### Authentication
**Decision**: Payload CMS built-in auth
**Reasoning**:
- Battle-tested implementation
- Integrated with content permissions
- JWT with refresh tokens
- No additional auth service needed
- Extensible with custom strategies

### Testing Strategy
**Decision**: Playwright for E2E, no unit tests by default
**Reasoning**:
- E2E tests catch real user issues
- Less brittle than unit tests
- Visual regression capabilities
- Can be written by AI agents
- Better ROI for small teams

### Error Handling
**Decision**: Centralized error boundaries with structured logging
**Reasoning**:
- Consistent user experience
- Easier debugging in production
- Can integrate with error tracking
- Prevents white screen of death
- Clear error recovery paths

## File Structure Decisions

### Feature Folders
**Decision**: Group by feature, not file type
```
features/
  auth/
    components/
    hooks/
    utils/
  dashboard/
    components/
    hooks/
    utils/
```
**Reasoning**:
- Related code stays together
- Easier to understand features
- Simple to add/remove features
- Clear ownership boundaries
- AI can understand feature context

### Barrel Exports
**Decision**: Use index.ts for public APIs only
**Reasoning**:
- Clear public/private boundaries
- Prevents circular dependencies
- Easier to refactor internals
- Better tree-shaking
- Cleaner imports

## Development Workflow

### Branch Strategy
**Decision**: Feature branches directly to main
**Reasoning**:
- Simple mental model
- No complex git flows
- Relies on CI/CD for safety
- Faster development cycle
- Clear PR ownership

### PR Size
**Decision**: Hard limit of 90 minutes of work per PR
**Reasoning**:
- Easier to review thoroughly
- Less merge conflicts
- Faster feedback cycle
- Can ship incomplete features safely
- AI agents work better with small contexts

### Issue-Driven Development
**Decision**: Every change starts with a GitHub Issue
**Reasoning**:
- Clear audit trail
- Acceptance criteria upfront
- Better project visibility
- AI agents can track work
- Natural documentation

## Performance Decisions

### Image Optimization
**Decision**: Next.js Image component everywhere
**Reasoning**:
- Automatic optimization
- Lazy loading built-in
- Responsive images
- WebP with fallbacks
- No manual optimization needed

### Code Splitting
**Decision**: Rely on Next.js automatic splitting
**Reasoning**:
- Route-based splitting by default
- Dynamic imports where needed
- No manual optimization
- Simpler mental model
- Good enough for most apps

### Caching Strategy
**Decision**: ISR for content, SWR for dynamic data
**Reasoning**:
- Best of SSG and SSR
- Automatic background updates
- Good UX with stale content
- Simple cache invalidation
- Payload webhooks for updates

## Security Decisions

### Environment Variables
**Decision**: Strict validation with Zod
**Reasoning**:
- Runtime type safety
- Clear error messages
- Self-documenting
- Prevents deployment issues
- AI understands requirements

### CORS Policy
**Decision**: Strict origin checking
**Reasoning**:
- Prevents CSRF attacks
- Clear allowed origins
- No wildcard in production
- Easy to audit
- Standard security practice

### Input Validation
**Decision**: Zod schemas for all user input
**Reasoning**:
- Type inference from schemas
- Consistent validation
- Good error messages
- Reusable schemas
- Works client and server

## Future Considerations

### When to Add Complexity
Only add new patterns/tools when:
1. Current solution has proven inadequate
2. Team has felt the pain multiple times
3. Benefits clearly outweigh complexity
4. Migration path is clear

### Potential Additions
- **Redis**: When caching becomes critical
- **Queue System**: When background jobs exceed n8n
- **Monitoring**: When user base grows
- **CDN**: When global performance matters
- **Microservices**: When team size justifies it

### Anti-Patterns to Avoid
1. **Premature optimization**: Measure first
2. **Over-engineering**: YAGNI principle
3. **Too many dependencies**: Each adds complexity
4. **Custom solutions**: Use battle-tested libraries
5. **Perfect abstractions**: Good enough is good enough