import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Blog } from '@/lib/db/models'
import { createBlogSchema } from '@/lib/db/validators'

export const dynamic = 'force-dynamic'

// GET /api/blogs — list all published blogs
export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find({ published: true }).sort({ date: -1 }).lean()
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('[GET /api/blogs]', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

// POST /api/blogs — create a new blog
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const parsed = createBlogSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // Check slug uniqueness
    const existing = await Blog.findOne({ slug: parsed.data.slug })
    if (existing) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 409 })
    }

    const blog = await Blog.create(parsed.data)
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('[POST /api/blogs]', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}
