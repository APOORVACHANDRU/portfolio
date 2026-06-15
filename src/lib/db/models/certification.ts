import mongoose, { Schema, Document } from 'mongoose'

export interface ICertification extends Document {
  name:      string
  date:      string
  url:       string
  order:     number
  createdAt: Date
  updatedAt: Date
}

const CertificationSchema = new Schema<ICertification>(
  {
    name:  { type: String, required: true, trim: true },
    date:  { type: String, required: true },
    url:   { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Certification = mongoose.models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema)
