import { z } from 'zod'

// ─── Project ──────────────────────────────────────────────────────────────────
export const createProjectSchema = z.object({
  title:       z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(2000),
  tech:        z.array(z.string()).default([]),
  github:      z.string().url().nullable().optional().default(null),
  live:        z.string().url().nullable().optional().default(null),
  featured:    z.boolean().default(false),
  image:       z.string().url().nullable().optional().default(null),
  order:       z.number().int().default(0),
})

export const updateProjectSchema = createProjectSchema.partial()

// ─── Experience ───────────────────────────────────────────────────────────────
export const createExperienceSchema = z.object({
  company:     z.string().min(1, 'Company is required').max(200),
  role:        z.string().min(1, 'Role is required').max(200),
  period:      z.string().min(1, 'Period is required').max(100),
  description: z.array(z.string().min(1)).min(1, 'At least one description point is required'),
  tech:        z.array(z.string()).default([]),
  order:       z.number().int().default(0),
})

export const updateExperienceSchema = createExperienceSchema.partial()

// ─── Blog ─────────────────────────────────────────────────────────────────────
export const createBlogSchema = z.object({
  title:       z.string().min(1, 'Title is required').max(300),
  slug:        z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  date:        z.string().min(1, 'Date is required'),
  excerpt:     z.string().min(1, 'Excerpt is required').max(500),
  tags:        z.array(z.string()).default([]),
  content:     z.string().min(1, 'Content is required'),
  readingTime: z.string().min(1, 'Reading time is required'),
  coverImage:  z.string().url().nullable().optional().default(null),
  published:   z.boolean().default(true),
})

export const updateBlogSchema = createBlogSchema.partial()

// ─── Certification ────────────────────────────────────────────────────────────
export const createCertificationSchema = z.object({
  name:  z.string().min(1, 'Name is required').max(300),
  date:  z.string().min(1, 'Date is required'),
  url:   z.string().default(''),
  order: z.number().int().default(0),
})

export const updateCertificationSchema = createCertificationSchema.partial()
