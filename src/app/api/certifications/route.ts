import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Certification } from '@/lib/db/models'
import { createCertificationSchema } from '@/lib/db/validators'

export const dynamic = 'force-dynamic'

// GET /api/certifications
export async function GET() {
  try {
    await connectDB()
    const certifications = await Certification.find().sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json(certifications)
  } catch (error) {
    console.error('[GET /api/certifications]', error)
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 })
  }
}

// POST /api/certifications
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = createCertificationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const certification = await Certification.create(parsed.data)
    return NextResponse.json(certification, { status: 201 })
  } catch (error) {
    console.error('[POST /api/certifications]', error)
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
  }
}
