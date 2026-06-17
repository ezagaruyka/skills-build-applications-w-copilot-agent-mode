import { Schema, model } from 'mongoose'

export interface TeamDocument {
  name: string
  description: string
  memberCount: number
  createdAt: Date
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  memberCount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
})

export default model<TeamDocument>('Team', teamSchema)
