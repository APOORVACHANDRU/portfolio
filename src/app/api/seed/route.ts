import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/connection'
import { Project, Experience, Blog, Certification } from '@/lib/db/models'

export const dynamic = 'force-dynamic'

/**
 * GET/POST /api/seed?secret=xxx
 * Seeds the database. Only works if the database is empty (safety check).
 * This is a one-time migration tool.
 */
export async function GET(req: Request) {
  return handleSeed(req)
}

export async function POST(req: Request) {
  return handleSeed(req)
}

async function handleSeed(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()

    // Safety: only seed if database is empty
    const existingProjects = await Project.countDocuments()
    if (existingProjects > 0) {
      return NextResponse.json({
        message: 'Database already has data. Skipping seed.',
        counts: {
          projects: await Project.countDocuments(),
          experiences: await Experience.countDocuments(),
          blogs: await Blog.countDocuments(),
          certifications: await Certification.countDocuments(),
        },
      })
    }

    return NextResponse.json({
      message: 'Database is empty. Please seed manually via POST /api/projects, /api/blogs, etc. or restore from a backup.',
    })
  } catch (error) {
    console.error('[SEED ERROR]', error)
    return NextResponse.json({ error: 'Seed failed', details: String(error) }, { status: 500 })
  }
}
