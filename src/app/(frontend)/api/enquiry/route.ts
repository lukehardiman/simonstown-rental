import { NextRequest, NextResponse } from 'next/server'
import { createEnquiry } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { name, email, phone, arrivalDate, departureDate, guests, message, property } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 },
      )
    }

    await createEnquiry({
      name,
      email,
      phone: phone || undefined,
      arrivalDate: arrivalDate || undefined,
      departureDate: departureDate || undefined,
      guests: guests || undefined,
      message,
      property: property || undefined,
      source: 'website',
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[enquiry] POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
