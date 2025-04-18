import { test, expect } from '@playwright/test'

test('Create post via Payload custom API (title only)', async ({ request }) => {
  const response = await request.post('http://localhost:3000/api/write-post', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      title: 'Post created from Playwright',
      // 👇 content removed
    },
  })

  const json = await response.json()
  console.log('📦 Payload response:', json)

  expect(response.status(), `Server responded with: ${JSON.stringify(json)}`).toBe(201)
  expect(json.success).toBe(true)
  expect(json.data).toHaveProperty('title', 'Post created from Playwright')
})
