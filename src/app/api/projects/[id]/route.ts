import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Project } from '@/lib/db/models'
import { updateProjectSchema } from '@/lib/db/validators'

// GET /api/projects/:id
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const project = await Project.findById(params.id).lean()
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    console.error('[GET /api/projects/:id]', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

// PUT /api/projects/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = updateProjectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const project = await Project.findByIdAndUpdate(params.id, parsed.data, { new: true, lean: true })
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    console.error('[PUT /api/projects/:id]', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// DELETE /api/projects/:id
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const project = await Project.findByIdAndDelete(params.id)
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Project deleted' })
  } catch (error) {
    console.error('[DELETE /api/projects/:id]', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
