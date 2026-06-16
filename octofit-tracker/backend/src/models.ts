import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'] },
  joinedAt: { type: Date, default: () => new Date() }
})

const teamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
})

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['run', 'bike', 'swim', 'strength', 'yoga', 'hike'] },
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  calories: { type: Number, required: true, min: 0 },
  distanceKm: { type: Number, default: 0 },
  date: { type: Date, required: true }
})

const workoutSchema = new Schema({
  title: { type: String, required: true },
  focus: { type: String, required: true, enum: ['endurance', 'strength', 'mobility', 'recovery'] },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  exercises: [{ name: String, reps: String, equipment: String }]
})

const leaderboardEntrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true, min: 0 }
})

export const User = model('User', userSchema)
export const Team = model('Team', teamSchema)
export const Activity = model('Activity', activitySchema)
export const Workout = model('Workout', workoutSchema)
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema)
