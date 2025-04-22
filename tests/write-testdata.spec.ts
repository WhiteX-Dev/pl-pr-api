import { test, expect } from '@playwright/test'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Load .env variables
dotenv.config()

test('Write to testdata with JWT auth', async ({ request }) => {
  // Generate JWT
  const token = jwt.sign(
    {
      user: 'playwright-bot',
      role: 'tester',
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // expires in 5 minutes
    },
    process.env.API_JWT_SECRET as string,
  )

  const payload = {
    name: 'Teszt Elek JWT-tel',
    note: 'Ez egy aláírt JWT-vel mentett teszt',
    metadata: {
      via: 'JWT',
      time: new Date().toISOString(),
    },
  }

  const response = await request.post('http://localhost:3000/api/write-testdata', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: payload,
  })

  const json = await response.json()
  console.log('🔐 API válasz:', json)

  expect(response.status()).toBe(201)
  expect(json.success).toBe(true)
  expect(json.data).toMatchObject(payload)
})
