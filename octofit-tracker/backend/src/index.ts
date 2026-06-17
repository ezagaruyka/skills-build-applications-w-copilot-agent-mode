import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_HOST = CODESPACE_NAME ? `${CODESPACE_NAME}-8000.githubpreview.dev` : 'localhost'
const API_BASE_URL = `http://${API_HOST}`
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

app.use(express.json())
app.use((req, res, next) => {
  const frontendOrigin = CODESPACE_NAME ? `https://${CODESPACE_NAME}-5173.githubpreview.dev` : 'http://localhost:5173'
  res.setHeader('Access-Control-Allow-Origin', frontendOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API is running on port 8000.',
    apiBaseUrl: API_BASE_URL,
  })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB on port 27017')
    app.listen(PORT, () => {
      console.log(`Backend server listening on http://localhost:${PORT}`)
      if (CODESPACE_NAME) {
        console.log(`Codespaces-aware API URL: https://${CODESPACE_NAME}-8000.githubpreview.dev`)
      }
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
