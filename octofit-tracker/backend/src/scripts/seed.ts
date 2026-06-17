import mongoose from 'mongoose'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import LeaderboardEntry from '../models/leaderboard'
import Workout from '../models/workout'

// Seed the octofit_db database with test data
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

async function seed() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB at', MONGO_URI)

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const teams = await Team.create([
    { name: 'Harbor Heroes', description: 'A team built for coastal runners and swimmers.', memberCount: 4 },
    { name: 'Mountain Movers', description: 'High-altitude training for endurance athletes.', memberCount: 3 },
  ])

  const users = await User.create([
    { name: 'Ava Patel', email: 'ava@example.com', role: 'member', team: teams[0].name },
    { name: 'Leo Johnson', email: 'leo@example.com', role: 'coach', team: teams[0].name },
    { name: 'Mia Chen', email: 'mia@example.com', role: 'member', team: teams[1].name },
    { name: 'Noah Rivera', email: 'noah@example.com', role: 'admin', team: teams[1].name },
  ])

  const workouts = await Workout.create([
    { name: 'Sunrise Run', description: 'A gentle morning run with dynamic stretches.', durationMinutes: 30, difficulty: 'easy', focusArea: 'cardio' },
    { name: 'Core Crusher', description: 'A targeted session for abs and obliques.', durationMinutes: 25, difficulty: 'medium', focusArea: 'strength' },
    { name: 'Power HIIT', description: 'High-intensity intervals for speed and stamina.', durationMinutes: 40, difficulty: 'hard', focusArea: 'endurance' },
  ])

  const activities = await Activity.create([
    { user: users[0]._id, type: 'running', durationMinutes: 45, distanceKm: 8.2, caloriesBurned: 520, date: new Date('2026-06-14T07:30:00Z') },
    { user: users[1]._id, type: 'cycling', durationMinutes: 60, distanceKm: 22.1, caloriesBurned: 760, date: new Date('2026-06-15T16:00:00Z') },
    { user: users[2]._id, type: 'yoga', durationMinutes: 50, distanceKm: 0, caloriesBurned: 220, date: new Date('2026-06-16T09:00:00Z') },
    { user: users[3]._id, type: 'swimming', durationMinutes: 35, distanceKm: 1.4, caloriesBurned: 410, date: new Date('2026-06-17T12:30:00Z') },
  ])

  await LeaderboardEntry.create([
    { user: users[1]._id, rank: 1, points: 980, team: teams[0].name },
    { user: users[0]._id, rank: 2, points: 920, team: teams[0].name },
    { user: users[3]._id, rank: 3, points: 880, team: teams[1].name },
  ])

  console.log('Seed the octofit_db database with test data complete.')
  console.log({ users: users.length, teams: teams.length, activities: activities.length, workouts: workouts.length })
  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
})
