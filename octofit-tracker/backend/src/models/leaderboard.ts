import { Schema, model, Types } from 'mongoose'

export interface LeaderboardEntryDocument {
  user: Types.ObjectId
  rank: number
  points: number
  team: string
}

const leaderboardSchema = new Schema<LeaderboardEntryDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  team: { type: String, required: true },
})

export default model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardSchema)
