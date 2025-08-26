#!/usr/bin/env node

// AI-CONTEXT: Scaffolds REST API endpoints with TypeScript and validation
// USAGE: pnpm scaffold:api resource-name [--crud] [--with-test]

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const resourceName = args[0];
const options = {
  crud: args.includes('--crud'),
  withTest: args.includes('--with-test'),
};

if (!resourceName) {
  console.error('❌ Please provide a resource name');
  console.log('Usage: pnpm scaffold:api resource-name [--crud] [--with-test]');
  process.exit(1);
}

// Convert to different cases
const kebabCase = resourceName.toLowerCase().replace(/\s+/g, '-');
const pascalCase = resourceName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');
const camelCase = pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);

const apiDir = path.join(
  process.cwd(),
  'apps/web/app/api',
  kebabCase
);

// API route template
const routeTemplate = `// AI-CONTEXT: REST API endpoints for ${resourceName}
// PATTERN: Type-safe API routes with Zod validation
// SECURITY: Input validation, error handling

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Input validation schemas
const create${pascalCase}Schema = z.object({
  name: z.string().min(1).max(100),
  // TODO: Add your fields here
})

const update${pascalCase}Schema = create${pascalCase}Schema.partial()

// Types
export type Create${pascalCase}Input = z.infer<typeof create${pascalCase}Schema>
export type Update${pascalCase}Input = z.infer<typeof update${pascalCase}Schema>

${options.crud ? `// GET /api/${kebabCase} - List all ${resourceName}
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100)
    const search = searchParams.get('search') ?? ''
    
    // TODO: Replace with actual data fetching
    const items = []
    const total = 0
    
    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch ${resourceName}:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ${resourceName}' },
      { status: 500 }
    )
  }
}

// POST /api/${kebabCase} - Create new ${resourceName}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const data = create${pascalCase}Schema.parse(body)
    
    // TODO: Replace with actual creation logic
    const created = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString()
    }
    
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }
    
    console.error('Failed to create ${resourceName}:', error)
    return NextResponse.json(
      { error: 'Failed to create ${resourceName}' },
      { status: 500 }
    )
  }
}` : `// GET /api/${kebabCase} - Your endpoint
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement your logic here
    
    return NextResponse.json({ message: 'Success' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}`}
`;

// Dynamic route template for CRUD
const dynamicRouteTemplate = `// AI-CONTEXT: REST API endpoints for individual ${resourceName}
// PATTERN: Dynamic routes with ID parameter

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { update${pascalCase}Schema } from '../route'

// GET /api/${kebabCase}/[id] - Get single ${resourceName}
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // TODO: Replace with actual data fetching
    const item = null
    
    if (!item) {
      return NextResponse.json(
        { error: '${pascalCase} not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to fetch ${resourceName}:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ${resourceName}' },
      { status: 500 }
    )
  }
}

// PATCH /api/${kebabCase}/[id] - Update ${resourceName}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Validate input
    const data = update${pascalCase}Schema.parse(body)
    
    // TODO: Replace with actual update logic
    const updated = {
      id,
      ...data,
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json(updated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }
    
    console.error('Failed to update ${resourceName}:', error)
    return NextResponse.json(
      { error: 'Failed to update ${resourceName}' },
      { status: 500 }
    )
  }
}

// DELETE /api/${kebabCase}/[id] - Delete ${resourceName}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // TODO: Replace with actual deletion logic
    
    return NextResponse.json(
      { message: '${pascalCase} deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to delete ${resourceName}:', error)
    return NextResponse.json(
      { error: 'Failed to delete ${resourceName}' },
      { status: 500 }
    )
  }
}
`;

// Test template
const testTemplate = `import { test, expect } from '@playwright/test'

// AI-CONTEXT: API tests for ${resourceName} endpoints
// @test: GET returns list with pagination
// @test: POST creates new item with validation
// @test: PATCH updates existing item
// @test: DELETE removes item

test.describe('/api/${kebabCase}', () => {
  ${options.crud ? `test('GET returns paginated list', async ({ request }) => {
    const response = await request.get('/api/${kebabCase}?page=1&limit=10')
    
    expect(response.ok()).toBeTruthy()
    
    const data = await response.json()
    expect(data).toHaveProperty('items')
    expect(data).toHaveProperty('pagination')
    expect(Array.isArray(data.items)).toBeTruthy()
  })
  
  test('POST creates new ${resourceName}', async ({ request }) => {
    const response = await request.post('/api/${kebabCase}', {
      data: {
        name: 'Test ${pascalCase}'
        // Add test data
      }
    })
    
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(201)
    
    const created = await response.json()
    expect(created).toHaveProperty('id')
    expect(created.name).toBe('Test ${pascalCase}')
  })
  
  test('POST validates input', async ({ request }) => {
    const response = await request.post('/api/${kebabCase}', {
      data: {
        // Invalid data (missing required fields)
      }
    })
    
    expect(response.status()).toBe(400)
    
    const error = await response.json()
    expect(error).toHaveProperty('error', 'Invalid input')
    expect(error).toHaveProperty('details')
  })
  
  test('GET by ID returns single item', async ({ request }) => {
    // First create an item
    const createResponse = await request.post('/api/${kebabCase}', {
      data: { name: 'Test ${pascalCase}' }
    })
    const { id } = await createResponse.json()
    
    // Then fetch it
    const response = await request.get(\`/api/${kebabCase}/\${id}\`)
    
    expect(response.ok()).toBeTruthy()
    
    const item = await response.json()
    expect(item.id).toBe(id)
  })
  
  test('DELETE removes item', async ({ request }) => {
    // First create an item
    const createResponse = await request.post('/api/${kebabCase}', {
      data: { name: 'To Delete' }
    })
    const { id } = await createResponse.json()
    
    // Delete it
    const response = await request.delete(\`/api/${kebabCase}/\${id}\`)
    
    expect(response.ok()).toBeTruthy()
    
    // Verify it's gone
    const getResponse = await request.get(\`/api/${kebabCase}/\${id}\`)
    expect(getResponse.status()).toBe(404)
  })` : `test('GET endpoint works', async ({ request }) => {
    const response = await request.get('/api/${kebabCase}')
    
    expect(response.ok()).toBeTruthy()
    
    const data = await response.json()
    expect(data).toHaveProperty('message')
  })`}
})
`;

// Create API directory
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
} else {
  console.error(`❌ API route ${resourceName} already exists`);
  process.exit(1);
}

// Write main route file
fs.writeFileSync(
  path.join(apiDir, 'route.ts'),
  routeTemplate
);

// Write dynamic route if CRUD
if (options.crud) {
  const dynamicDir = path.join(apiDir, '[id]');
  fs.mkdirSync(dynamicDir, { recursive: true });
  fs.writeFileSync(
    path.join(dynamicDir, 'route.ts'),
    dynamicRouteTemplate
  );
}

// Write test file if requested
if (options.withTest) {
  const testDir = path.join(process.cwd(), 'apps/web/tests/api');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(testDir, `${kebabCase}.spec.ts`),
    testTemplate
  );
}

console.log(`✅ API route ${resourceName} created successfully!`);
console.log(`📁 Location: ${apiDir}`);
if (options.crud) {
  console.log(`📝 CRUD endpoints created:`);
  console.log(`   - GET    /api/${kebabCase}`);
  console.log(`   - POST   /api/${kebabCase}`);
  console.log(`   - GET    /api/${kebabCase}/[id]`);
  console.log(`   - PATCH  /api/${kebabCase}/[id]`);
  console.log(`   - DELETE /api/${kebabCase}/[id]`);
}
if (options.withTest) {
  console.log(`🧪 Test created: apps/web/tests/api/${kebabCase}.spec.ts`);
}

console.log(`
Next steps:
1. Update the validation schemas in route.ts
2. Implement the data fetching/mutation logic
3. Add authentication if needed
4. Run tests: pnpm test
`);
