import { test, expect } from '@playwright/test'

test('Write to testdata collection via API route', async ({ request }) => {
  const payload = {
    name: 'Teszt Elek',
    note: 'Automatikus Playwright teszt jegyzet',
    metadata: {
      browser: 'Playwright',
      runId: Math.floor(Math.random() * 100000),
      timestamp: new Date().toISOString(),
    },
  }

  const response = await request.post('http://localhost:3000/api/write-testdata', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  })

  const json = await response.json()
  console.log('✅ API válasz:', json)

  expect(response.status(), `❌ Status: ${response.status()}, Error: ${JSON.stringify(json)}`).toBe(
    201,
  )
  expect(json.success).toBe(true)
  expect(json.data).toMatchObject(payload)
})
