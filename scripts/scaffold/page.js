#!/usr/bin/env node

// AI-CONTEXT: Scaffolds Next.js pages with proper layouts and metadata
// USAGE: pnpm scaffold:page page-name [--protected] [--with-test]

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const pageName = args[0];
const options = {
  protected: args.includes('--protected'),
  withTest: args.includes('--with-test'),
};

if (!pageName) {
  console.error('❌ Please provide a page name');
  console.log('Usage: pnpm scaffold:page page-name [--protected] [--with-test]');
  process.exit(1);
}

// Convert to different cases
const kebabCase = pageName.toLowerCase().replace(/\s+/g, '-');
const pascalCase = pageName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');
const titleCase = pageName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const pageDir = path.join(
  process.cwd(),
  'apps/web/app',
  kebabCase
);

// Page template
const pageTemplate = `// AI-CONTEXT: ${titleCase} page
// PATTERN: Next.js App Router page${options.protected ? ' with authentication' : ''}
// CREATED: ${new Date().toISOString()}

import { Metadata } from 'next'
${options.protected ? `import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'` : ''}

export const metadata: Metadata = {
  title: '${titleCase}',
  description: '${titleCase} page description',
}

${options.protected ? `async function checkAuth() {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  }
  return session
}

` : ''}export default async function ${pascalCase}Page() {
  ${options.protected ? 'const session = await checkAuth()\n  ' : ''}
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">${titleCase}</h1>
      
      <div className="prose max-w-none">
        <p>Welcome to the ${titleCase} page.</p>
        ${options.protected ? '<p>You are logged in as: {session.user.email}</p>' : ''}
      </div>
      
      {/* TODO: Add your page content here */}
    </div>
  )
}
`;

// Loading template
const loadingTemplate = `// AI-CONTEXT: Loading state for ${titleCase} page

export default function ${pascalCase}Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}
`;

// Error template
const errorTemplate = `'use client'

// AI-CONTEXT: Error boundary for ${titleCase} page

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ${pascalCase}Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to error reporting service
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive">
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          {error.message || 'An unexpected error occurred'}
        </AlertDescription>
      </Alert>
      
      <Button
        onClick={reset}
        variant="outline"
        className="mt-4"
      >
        Try again
      </Button>
    </div>
  )
}
`;

// Layout template (optional)
const layoutTemplate = `// AI-CONTEXT: Layout wrapper for ${titleCase} section
// PATTERN: Shared layout for nested routes

export default function ${pascalCase}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Add any shared UI elements here */}
      {children}
    </div>
  )
}
`;

// Test template
const testTemplate = `import { test, expect } from '@playwright/test'

// AI-CONTEXT: Tests for ${titleCase} page
// @test: Page loads successfully
// @test: Shows correct title
${options.protected ? '// @test: Redirects when not authenticated' : ''}

test.describe('${titleCase} Page', () => {
  ${options.protected ? `test('redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/${kebabCase}')
    
    // Should redirect to login
    await expect(page).toHaveURL(/\\/login/)
  })
  
  test('shows content when authenticated', async ({ page }) => {
    // TODO: Add authentication setup
    // await authenticateUser(page)
    
    await page.goto('/${kebabCase}')
    
    // Verify page loaded
    await expect(page.getByRole('heading', { name: '${titleCase}' })).toBeVisible()
  })` : `test('loads successfully', async ({ page }) => {
    await page.goto('/${kebabCase}')
    
    // Wait for page to load
    await expect(page.getByRole('heading', { name: '${titleCase}' })).toBeVisible()
  })
  
  test('has correct metadata', async ({ page }) => {
    await page.goto('/${kebabCase}')
    
    // Check title
    await expect(page).toHaveTitle(/^${titleCase}/)
  })`}
  
  test('handles errors gracefully', async ({ page }) => {
    // TODO: Mock an error condition
    
    // Verify error UI shows
  })
})
`;

// Create page directory
if (!fs.existsSync(pageDir)) {
  fs.mkdirSync(pageDir, { recursive: true });
} else {
  console.error(`❌ Page ${pageName} already exists`);
  process.exit(1);
}

// Write page file
fs.writeFileSync(
  path.join(pageDir, 'page.tsx'),
  pageTemplate
);

// Write loading file
fs.writeFileSync(
  path.join(pageDir, 'loading.tsx'),
  loadingTemplate
);

// Write error file
fs.writeFileSync(
  path.join(pageDir, 'error.tsx'),
  errorTemplate
);

// Optionally write layout file for nested routes
const shouldAddLayout = args.includes('--with-layout');
if (shouldAddLayout) {
  fs.writeFileSync(
    path.join(pageDir, 'layout.tsx'),
    layoutTemplate
  );
}

// Write test file if requested
if (options.withTest) {
  const testDir = path.join(process.cwd(), 'apps/web/tests/pages');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(testDir, `${kebabCase}.spec.ts`),
    testTemplate
  );
}

console.log(`✅ Page ${titleCase} created successfully!`);
console.log(`📁 Location: ${pageDir}`);
console.log(`📄 Files created:`);
console.log(`   - page.tsx (main page component)`);
console.log(`   - loading.tsx (loading state)`);
console.log(`   - error.tsx (error boundary)`);
if (shouldAddLayout) {
  console.log(`   - layout.tsx (shared layout)`);
}
if (options.protected) {
  console.log(`🔒 Protected route - requires authentication`);
}
if (options.withTest) {
  console.log(`🧪 Test created: apps/web/tests/pages/${kebabCase}.spec.ts`);
}

console.log(`
Next steps:
1. Update the page content in page.tsx
2. Customize metadata for SEO
3. Add any required data fetching
4. Style with Tailwind classes
${options.protected ? '5. Ensure auth middleware is configured' : ''}
`);
