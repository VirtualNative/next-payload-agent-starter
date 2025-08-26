# Code Patterns for AI Agents

## Component Patterns

### Basic Component Structure
```typescript
// AI-CONTEXT: Describe component purpose
// PATTERN: Functional component with TypeScript
// DEPENDENCIES: List any required imports

interface ComponentNameProps {
  // Props with JSDoc comments
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Hooks at the top
  // Event handlers next
  // Render logic at bottom
  
  return (
    <div className="tailwind-classes">
      {/* Semantic HTML */}
    </div>
  )
}
```

### Component with State
```typescript
// AI-CONTEXT: Stateful component for [purpose]
export function StatefulComponent() {
  // Use descriptive state names
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<DataType | null>(null)
  const [error, setError] = useState<Error | null>(null)
  
  // Group related logic in custom hooks
  const { items, fetchItems } = useItems()
  
  return <div>{/* UI */}</div>
}
```

## API Patterns

### API Route Structure
```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server'

// AI-PATTERN: RESTful API endpoints
export async function GET(req: NextRequest) {
  try {
    // Validate auth if needed
    // Fetch data
    // Return typed response
    return NextResponse.json({ data })
  } catch (error) {
    // Consistent error handling
    return NextResponse.json(
      { error: 'Failed to fetch' },
      { status: 500 }
    )
  }
}
```

### Data Fetching Pattern
```typescript
// AI-PATTERN: Type-safe data fetching
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}
```

## State Management Patterns

### Store Creation
```typescript
// AI-PATTERN: Zustand store with TypeScript
interface StoreState {
  items: Item[]
  loading: boolean
  error: Error | null
  
  // Actions follow verb-noun pattern
  fetchItems: () => Promise<void>
  addItem: (item: Item) => void
  updateItem: (id: string, updates: Partial<Item>) => void
  deleteItem: (id: string) => void
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  items: [],
  loading: false,
  error: null,
  
  // Implementations
  fetchItems: async () => {
    set({ loading: true, error: null })
    try {
      const items = await api.items.list()
      set({ items, loading: false })
    } catch (error) {
      set({ error: error as Error, loading: false })
    }
  },
  // ... other actions
}))
```

## Testing Patterns

### Component Test
```typescript
// AI-PATTERN: Component testing with Playwright
import { test, expect } from '@playwright/test'

test.describe('ComponentName', () => {
  test('renders correctly', async ({ page }) => {
    await page.goto('/path')
    
    // Use data-testid for reliable selection
    const component = page.getByTestId('component-name')
    await expect(component).toBeVisible()
  })
  
  test('handles user interaction', async ({ page }) => {
    await page.goto('/path')
    
    // Simulate user action
    await page.click('[data-testid="button"]')
    
    // Verify result
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

### API Test
```typescript
// AI-PATTERN: API endpoint testing
test('GET /api/items returns data', async ({ request }) => {
  const response = await request.get('/api/items')
  
  expect(response.ok()).toBeTruthy()
  
  const data = await response.json()
  expect(Array.isArray(data.items)).toBeTruthy()
})
```

## Error Handling Patterns

### Try-Catch with Context
```typescript
// AI-PATTERN: Descriptive error handling
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  // Log with context
  console.error('Failed to perform operation:', {
    error,
    context: { userId, timestamp: Date.now() }
  })
  
  // Re-throw with better message
  throw new Error(
    `Operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
  )
}
```

### Error Boundaries
```typescript
// AI-PATTERN: React error boundary
export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        // AI-HINT: Log to error tracking service
        console.error('React Error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
```

## Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile`)
- **Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Types/Interfaces**: PascalCase with descriptive names
- **API endpoints**: RESTful conventions (`/api/users`, `/api/users/[id]`)

## Import Order

```typescript
// 1. React/Next.js imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 2. External dependencies
import { z } from 'zod'
import { format } from 'date-fns'

// 3. Internal dependencies
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

// 4. Types
import type { User } from '@/types'

// 5. Styles (if any)
import styles from './component.module.css'
```

## Common Pitfalls to Avoid

1. **Don't use `any` type** - Always define proper types
2. **Don't ignore errors** - Handle or propagate meaningfully
3. **Don't use magic numbers** - Extract to named constants
4. **Don't nest ternaries** - Use early returns or switch statements
5. **Don't modify props directly** - Props are immutable
6. **Don't forget cleanup** - Clear timeouts, unsubscribe, etc.