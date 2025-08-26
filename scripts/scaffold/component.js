#!/usr/bin/env node

// AI-CONTEXT: Scaffolds a new React component with TypeScript
// USAGE: pnpm scaffold:component ComponentName [--with-test] [--with-story]

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const componentName = args[0];
const options = {
  withTest: args.includes('--with-test'),
  withStory: args.includes('--with-story'),
};

if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('Usage: pnpm scaffold:component ComponentName [--with-test] [--with-story]');
  process.exit(1);
}

// Convert to kebab-case for file names
const kebabCase = componentName
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .toLowerCase();

const componentDir = path.join(
  process.cwd(),
  'apps/web/components',
  kebabCase
);

// Component template
const componentTemplate = `// AI-CONTEXT: ${componentName} component
// PATTERN: Functional component with TypeScript
// CREATED: ${new Date().toISOString()}

import { cn } from '@/lib/utils'

interface ${componentName}Props {
  className?: string
  children?: React.ReactNode
  // TODO: Add specific props
}

export function ${componentName}({ 
  className,
  children,
  ...props 
}: ${componentName}Props) {
  return (
    <div 
      className={cn(
        // Base styles
        "relative",
        // Custom styles
        className
      )}
      data-testid="${kebabCase}"
      {...props}
    >
      {children}
    </div>
  )
}
`;

// Index file template
const indexTemplate = `export { ${componentName} } from './${kebabCase}'
export type { ${componentName}Props } from './${kebabCase}'
`;

// Test template
const testTemplate = `import { test, expect } from '@playwright/test'

// AI-CONTEXT: Tests for ${componentName} component
// @test: Renders without error
// @test: Applies custom className
// @test: Passes through props

test.describe('${componentName}', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to test page with component
    await page.goto('/test/${kebabCase}')
  })

  test('renders without error', async ({ page }) => {
    const component = page.getByTestId('${kebabCase}')
    await expect(component).toBeVisible()
  })

  test('applies custom className', async ({ page }) => {
    const component = page.getByTestId('${kebabCase}')
    await expect(component).toHaveClass(/custom-class/)
  })

  test('displays children content', async ({ page }) => {
    const component = page.getByTestId('${kebabCase}')
    await expect(component.getByText('Test Content')).toBeVisible()
  })
})
`;

// Story template (if Storybook is added later)
const storyTemplate = `import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from './${kebabCase}'

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default ${componentName}',
  },
}

export const WithCustomStyles: Story = {
  args: {
    children: 'Styled ${componentName}',
    className: 'bg-blue-100 p-4 rounded',
  },
}
`;

// Create component directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
} else {
  console.error(`❌ Component ${componentName} already exists`);
  process.exit(1);
}

// Write component file
fs.writeFileSync(
  path.join(componentDir, `${kebabCase}.tsx`),
  componentTemplate
);

// Write index file
fs.writeFileSync(
  path.join(componentDir, 'index.ts'),
  indexTemplate
);

// Write test file if requested
if (options.withTest) {
  const testDir = path.join(process.cwd(), 'apps/web/tests/components');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(testDir, `${kebabCase}.spec.ts`),
    testTemplate
  );
}

// Write story file if requested
if (options.withStory) {
  fs.writeFileSync(
    path.join(componentDir, `${kebabCase}.stories.tsx`),
    storyTemplate
  );
}

console.log(`✅ Component ${componentName} created successfully!`);
console.log(`📁 Location: ${componentDir}`);
if (options.withTest) {
  console.log(`🧪 Test created: apps/web/tests/components/${kebabCase}.spec.ts`);
}
if (options.withStory) {
  console.log(`📚 Story created: ${componentDir}/${kebabCase}.stories.tsx`);
}

console.log(`
Next steps:
1. Update the component props and implementation
2. Add it to your page: import { ${componentName} } from '@/components/${kebabCase}'
3. Run tests: pnpm test
`);
