import { test, expect } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

test('Write to testdata with auth (dotenv)', async ({ request }) => {
  const payload = {
    name: 'Teszt Elek .env tokennel',
    note: 'Automatikus teszt dotenv-ből',
    metadata: {
      env: true,
      ts: new Date().toISOString(),
    },
  }

  const response = await request.post('http://localhost:3000/api/write-testdata', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_WRITE_SECRET}`,
    },
    data: payload,
  })

  const json = await response.json()
  console.log('🔐 API válasz:', json)

  expect(response.status()).toBe(201)
  expect(json.success).toBe(true)
  expect(json.data).toMatchObject(payload)
})
