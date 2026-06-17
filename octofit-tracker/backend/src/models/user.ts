import { Schema, model } from 'mongoose'

export interface UserDocument {
  name: string
  email: string
  role: 'member' | 'coach' | 'admin'
  team: string
  joinedAt: Date
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
  team: { type: String, required: true },
  joinedAt: { type: Date, default: () => new Date() },
})

export default model<UserDocument>('User', userSchema)
