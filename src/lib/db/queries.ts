import { connectDB } from './connection'
import { Project, Experience, Blog, Certification } from './models'
import type { IProject, IExperience, IBlog, ICertification } from './models'

/**
 * Server-side data fetching functions.
 * These are used directly in Server Components — no API call needed.
 */

export async function getProjects(): Promise<IProject[]> {
  await connectDB()
  return Project.find().sort({ order: 1, createdAt: -1 }).lean()
}

export async function getExperiences(): Promise<IExperience[]> {
  await connectDB()
  return Experience.find().sort({ order: 1 }).lean()
}

export async function getBlogs(): Promise<IBlog[]> {
  await connectDB()
  return Blog.find({ published: true }).sort({ date: -1 }).lean()
}

export async function getBlogBySlug(slug: string): Promise<IBlog | null> {
  await connectDB()
  return Blog.findOne({ slug, published: true }).lean()
}

export async function getCertifications(): Promise<ICertification[]> {
  await connectDB()
  return Certification.find().sort({ order: 1 }).lean()
}
