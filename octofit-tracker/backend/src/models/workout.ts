import { Schema, model } from 'mongoose'

export interface WorkoutDocument {
  name: string
  description: string
  durationMinutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  focusArea: string
}

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  focusArea: { type: String, required: true },
})

export default model<WorkoutDocument>('Workout', workoutSchema)
