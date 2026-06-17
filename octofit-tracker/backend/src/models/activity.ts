import { Schema, model, Types } from 'mongoose'

export interface ActivityDocument {
  user: Types.ObjectId
  type: string
  durationMinutes: number
  distanceKm: number
  caloriesBurned: number
  date: Date
}

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: () => new Date() },
})

export default model<ActivityDocument>('Activity', activitySchema)
