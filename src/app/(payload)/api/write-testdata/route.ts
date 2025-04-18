import { NextResponse } from 'next/server'
import payload, { initPayload } from '@/payload'

export async function POST(request: Request) {
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
