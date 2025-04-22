import { NextResponse } from 'next/server'
import payload, { initPayload } from '@/payload'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.API_WRITE_SECRET

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
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
