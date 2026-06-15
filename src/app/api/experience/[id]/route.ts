import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Experience } from '@/lib/db/models'
import { updateExperienceSchema } from '@/lib/db/validators'

// GET /api/experience/:id
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const experience = await Experience.findById(params.id).lean()
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    return NextResponse.json(experience)
  } catch (error) {
    console.error('[GET /api/experience/:id]', error)
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}

// PUT /api/experience/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = updateExperienceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const experience = await Experience.findByIdAndUpdate(params.id, parsed.data, { new: true, lean: true })
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    return NextResponse.json(experience)
  } catch (error) {
    console.error('[PUT /api/experience/:id]', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

// DELETE /api/experience/:id
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const experience = await Experience.findByIdAndDelete(params.id)
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Experience deleted' })
  } catch (error) {
    console.error('[DELETE /api/experience/:id]', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
