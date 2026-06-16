import { connectDatabase } from '../db.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        Workout.deleteMany({}),
        LeaderboardEntry.deleteMany({})
    ]);
    const users = await User.create([
        { name: 'Avery Athlete', email: 'avery@octofit.com', role: 'member' },
        { name: 'Taylor Trainer', email: 'taylor@octofit.com', role: 'coach' },
        { name: 'Jordan Journey', email: 'jordan@octofit.com', role: 'member' }
    ]);
    const teams = await Team.create([
        { name: 'Marathon Masters', description: 'Distance crew focused on weekly long runs', members: [users[0]._id, users[2]._id] },
        { name: 'Sprint Squad', description: 'High-intensity interval training and track sessions', members: [users[1]._id] }
    ]);
    const workouts = await Workout.create([
        {
            title: 'Full Body HIIT',
            focus: 'endurance',
            durationMinutes: 40,
            difficulty: 'intermediate',
            createdBy: users[1]._id,
            exercises: [
                { name: 'Jumping Jacks', reps: '3 x 45 sec', equipment: 'bodyweight' },
                { name: 'Burpees', reps: '3 x 12', equipment: 'bodyweight' },
                { name: 'Kettlebell Swings', reps: '3 x 15', equipment: 'kettlebell' }
            ]
        },
        {
            title: 'Recovery Yoga',
            focus: 'recovery',
            durationMinutes: 30,
            difficulty: 'beginner',
            createdBy: users[1]._id,
            exercises: [
                { name: 'Child Pose', reps: '5 min', equipment: 'mat' },
                { name: 'Downward Dog', reps: '3 x 1 min', equipment: 'mat' },
                { name: 'Seated Twist', reps: '3 x 45 sec', equipment: 'mat' }
            ]
        }
    ]);
    const activities = await Activity.create([
        {
            user: users[0]._id,
            type: 'run',
            title: 'Sunday Long Run',
            durationMinutes: 90,
            calories: 760,
            distanceKm: 14.2,
            date: new Date('2026-06-10T07:30:00Z')
        },
        {
            user: users[2]._id,
            type: 'strength',
            title: 'Leg Day Blast',
            durationMinutes: 55,
            calories: 520,
            distanceKm: 0,
            date: new Date('2026-06-11T17:00:00Z')
        },
        {
            user: users[1]._id,
            type: 'yoga',
            title: 'Midweek Mobility',
            durationMinutes: 35,
            calories: 190,
            distanceKm: 0,
            date: new Date('2026-06-12T18:30:00Z')
        }
    ]);
    const leaderboard = await LeaderboardEntry.create([
        { user: users[0]._id, rank: 1, score: 1840 },
        { user: users[2]._id, rank: 2, score: 1575 },
        { user: users[1]._id, rank: 3, score: 1420 }
    ]);
    console.log('Seed complete:', {
        users: users.length,
        teams: teams.length,
        workouts: workouts.length,
        activities: activities.length,
        leaderboard: leaderboard.length
    });
    process.exit(0);
}
seed().catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
});
