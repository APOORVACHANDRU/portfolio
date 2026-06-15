import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Experience } from '@/lib/db/models'
import { createExperienceSchema } from '@/lib/db/validators'

export const dynamic = 'force-dynamic'

// GET /api/experience
export async function GET() {
  try {
    await connectDB()
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json(experiences)
  } catch (error) {
    console.error('[GET /api/experience]', error)
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

// POST /api/experience
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = createExperienceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const experience = await Experience.create(parsed.data)
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error('[POST /api/experience]', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
