import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import payload, { initPayload } from '@/payload'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split(' ')[1]
  const secret = process.env.API_JWT_SECRET

  if (!token || !secret) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, secret)
    console.log('[✅ JWT verified]', decoded)
  } catch (_err) {
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 })
  }

  try {
    await initPayload()

    const body = await request.json()

    const created = await payload.create({
      collection: 'testdata',
      data: {
        name: body.name,
        note: body.note,
        metadata: body.metadata,
      },
    })

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (err) {
    console.error('[API ERROR]', err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : err },
      { status: 500 },
    )
  }
}
