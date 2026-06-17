import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit-tracker'

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running on port 8000.' })
})

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB on port 27017')
    app.listen(PORT, () => {
      console.log(`Backend server listening on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
