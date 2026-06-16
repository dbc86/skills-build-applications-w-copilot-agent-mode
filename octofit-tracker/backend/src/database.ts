import mongoose from 'mongoose'

export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

export function connectDatabase() {
  return mongoose.connect('mongodb://localhost:27017/octofit_db')
}