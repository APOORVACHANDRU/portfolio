import mongoose, { Schema, Document } from 'mongoose'

export interface IExperience extends Document {
  company:     string
  role:        string
  period:      string
  description: string[]
  tech:        string[]
  order:       number
  createdAt:   Date
  updatedAt:   Date
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company:     { type: String, required: true, trim: true },
    role:        { type: String, required: true, trim: true },
    period:      { type: String, required: true },
    description: { type: [String], required: true },
    tech:        { type: [String], default: [] },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Experience = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema)
