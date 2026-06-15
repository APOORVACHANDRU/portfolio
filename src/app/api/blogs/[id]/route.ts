import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Blog } from '@/lib/db/models'
import { updateBlogSchema } from '@/lib/db/validators'

// GET /api/blogs/:id
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    // Support lookup by ID or slug
    const blog = await Blog.findOne({
      $or: [
        { _id: params.id.match(/^[0-9a-f]{24}$/) ? params.id : undefined },
        { slug: params.id },
      ].filter(Boolean),
    }).lean()

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json(blog)
  } catch (error) {
    console.error('[GET /api/blogs/:id]', error)
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

// PUT /api/blogs/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = updateBlogSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const blog = await Blog.findByIdAndUpdate(params.id, parsed.data, { new: true, lean: true })
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json(blog)
  } catch (error) {
    console.error('[PUT /api/blogs/:id]', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

// DELETE /api/blogs/:id
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const blog = await Blog.findByIdAndDelete(params.id)
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Blog deleted' })
  } catch (error) {
    console.error('[DELETE /api/blogs/:id]', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
