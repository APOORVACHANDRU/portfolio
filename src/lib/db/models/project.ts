import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  title:       string
  description: string
  tech:        string[]
  github:      string | null
  live:        string | null
  featured:    boolean
  image:       string | null
  order:       number
  createdAt:   Date
  updatedAt:   Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tech:        { type: [String], default: [] },
    github:      { type: String, default: null },
    live:        { type: String, default: null },
    featured:    { type: Boolean, default: false },
    image:       { type: String, default: null },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
