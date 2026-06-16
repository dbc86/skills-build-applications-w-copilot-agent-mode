import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit-tracker'

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
