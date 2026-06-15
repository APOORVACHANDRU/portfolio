import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  title:       string
  slug:        string
  date:        string
  excerpt:     string
  tags:        string[]
  content:     string
  readingTime: string
  coverImage:  string | null
  published:   boolean
  createdAt:   Date
  updatedAt:   Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, trim: true },
    date:        { type: String, required: true },
    excerpt:     { type: String, required: true },
    tags:        { type: [String], default: [] },
    content:     { type: String, required: true },
    readingTime: { type: String, required: true },
    coverImage:  { type: String, default: null },
    published:   { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
