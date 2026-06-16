import express from 'express'
import { connectDatabase } from '/config/database.js'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const codespaceName = process.env.CODESPACE_NAME
const serverUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.' })
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/users', async (_req, res) => {
  const users = await User.find().sort({ joinedAt: -1 }).lean()
  res.json({ users })
})

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email role').lean()
  res.json({ teams })
})

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name email').sort({ date: -1 }).lean()
  res.json({ activities })
})

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).populate('user', 'name email').lean()
  res.json({ leaderboard })
})

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().populate('createdBy', 'name email role').lean()
  res.json({ workouts })
})

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Server running on ${serverUrl}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
