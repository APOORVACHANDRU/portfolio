import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Certification } from '@/lib/db/models'
import { updateCertificationSchema } from '@/lib/db/validators'

// GET /api/certifications/:id
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const cert = await Certification.findById(params.id).lean()
    if (!cert) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
    }
    return NextResponse.json(cert)
  } catch (error) {
    console.error('[GET /api/certifications/:id]', error)
    return NextResponse.json({ error: 'Failed to fetch certification' }, { status: 500 })
  }
}

// PUT /api/certifications/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = updateCertificationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const cert = await Certification.findByIdAndUpdate(params.id, parsed.data, { new: true, lean: true })
    if (!cert) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
    }
    return NextResponse.json(cert)
  } catch (error) {
    console.error('[PUT /api/certifications/:id]', error)
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 })
  }
}

// DELETE /api/certifications/:id
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const cert = await Certification.findByIdAndDelete(params.id)
    if (!cert) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Certification deleted' })
  } catch (error) {
    console.error('[DELETE /api/certifications/:id]', error)
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 })
  }
}
