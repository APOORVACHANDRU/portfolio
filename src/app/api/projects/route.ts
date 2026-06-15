import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Project } from '@/lib/db/models'
import { createProjectSchema } from '@/lib/db/validators'

export const dynamic = 'force-dynamic'

// GET /api/projects — list all projects
export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('[GET /api/projects]', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// POST /api/projects — create a new project
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = createProjectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const project = await Project.create(parsed.data)
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('[POST /api/projects]', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
