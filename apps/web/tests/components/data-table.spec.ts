// AI-GENERATED: Tests created from @test annotations in data-table.tsx
// This demonstrates how AI can generate comprehensive tests from simple annotations

import { test, expect } from '@playwright/test'

test.describe('DataTable Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to test page that includes DataTable
    await page.goto('/test/data-table')
  })

  test('renders empty state when no data provided', async ({ page }) => {
    // Set up: Render with empty data array
    await page.evaluate(() => {
      window.testProps = { data: [], columns: [] }
    })
    
    const emptyState = page.getByTestId('data-table-empty')
    await expect(emptyState).toBeVisible()
    await expect(emptyState).toHaveText('No data available')
  })

  test('displays all columns from column definition', async ({ page }) => {
    // Set up: Render with sample data and columns
    await page.evaluate(() => {
      window.testProps = {
        data: [
          { id: 1, name: 'Item 1', status: 'active' },
          { id: 2, name: 'Item 2', status: 'inactive' }
        ],
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'status', label: 'Status' }
        ]
      }
    })
    
    // Verify all columns are rendered
    await expect(page.getByTestId('column-id')).toHaveText('ID')
    await expect(page.getByTestId('column-name')).toHaveText('Name')
    await expect(page.getByTestId('column-status')).toHaveText('Status')
  })

  test('sorts data when column header clicked', async ({ page }) => {
    // Set up: Render with sortable columns
    await page.evaluate(() => {
      window.testProps = {
        data: [
          { name: 'Charlie', age: 30 },
          { name: 'Alice', age: 25 },
          { name: 'Bob', age: 35 }
        ],
        columns: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'age', label: 'Age', sortable: true }
        ]
      }
    })
    
    // Click name column to sort alphabetically
    await page.getByTestId('column-name').click()
    
    // Verify first row is now Alice
    const firstRow = page.getByTestId('data-table-row-0')
    await expect(firstRow).toContainText('Alice')
    
    // Click again to reverse sort
    await page.getByTestId('column-name').click()
    
    // Verify first row is now Charlie
    await expect(firstRow).toContainText('Charlie')
  })

  test('filters data when search input changes', async ({ page }) => {
    // Set up: Render with searchable data
    await page.evaluate(() => {
      window.testProps = {
        data: [
          { name: 'Apple', category: 'Fruit' },
          { name: 'Banana', category: 'Fruit' },
          { name: 'Carrot', category: 'Vegetable' }
        ],
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category' }
        ],
        searchKeys: ['name', 'category']
      }
    })
    
    // Type in search box
    const searchInput = page.getByTestId('data-table-search')
    await searchInput.fill('Fruit')
    
    // Verify only fruit items are visible
    await expect(page.getByTestId('data-table-row-0')).toContainText('Apple')
    await expect(page.getByTestId('data-table-row-1')).toContainText('Banana')
    await expect(page.getByTestId('data-table-row-2')).not.toBeVisible()
  })

  test('paginates to next page when next button clicked', async ({ page }) => {
    // Set up: Render with more items than page size
    await page.evaluate(() => {
      const data = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`
      }))
      window.testProps = {
        data,
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' }
        ],
        pageSize: 10
      }
    })
    
    // Verify first page shows Item 1
    await expect(page.getByTestId('data-table-row-0')).toContainText('Item 1')
    
    // Click next button
    await page.getByTestId('data-table-next').click()
    
    // Verify second page shows Item 11
    await expect(page.getByTestId('data-table-row-0')).toContainText('Item 11')
  })

  test('shows loading skeleton when isLoading is true', async ({ page }) => {
    // Set up: Render in loading state
    await page.evaluate(() => {
      window.testProps = {
        data: [],
        columns: [],
        isLoading: true
      }
    })
    
    // Verify loading state is visible
    const loadingState = page.getByTestId('data-table-loading')
    await expect(loadingState).toBeVisible()
    
    // Verify skeletons are present
    const skeletons = loadingState.locator('.animate-pulse')
    await expect(skeletons).toHaveCount(2)
  })

  test('displays error message when error prop is set', async ({ page }) => {
    // Set up: Render with error
    await page.evaluate(() => {
      window.testProps = {
        data: [],
        columns: [],
        error: new Error('Failed to load data')
      }
    })
    
    // Verify error state is visible
    const errorState = page.getByTestId('data-table-error')
    await expect(errorState).toBeVisible()
    await expect(errorState).toContainText('Failed to load data')
  })

  test('handles row click when onRowClick provided', async ({ page }) => {
    // Set up: Render with click handler
    await page.evaluate(() => {
      window.clickedItem = null
      window.testProps = {
        data: [
          { id: 1, name: 'Clickable Item' }
        ],
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' }
        ],
        onRowClick: (item) => { window.clickedItem = item }
      }
    })
    
    // Click the row
    await page.getByTestId('data-table-row-0').click()
    
    // Verify click handler was called
    const clickedItem = await page.evaluate(() => window.clickedItem)
    expect(clickedItem).toEqual({ id: 1, name: 'Clickable Item' })
  })
})
