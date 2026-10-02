import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seedUsers = [
  { id: 1, name: 'Avery Brooks', email: 'avery@example.com', role: 'Runner', fitnessGoal: 'Half-marathon prep' },
  { id: 2, name: 'Jordan Lee', email: 'jordan@example.com', role: 'Cyclist', fitnessGoal: 'Strength endurance' },
  { id: 3, name: 'Morgan Patel', email: 'morgan@example.com', role: 'Coach', fitnessGoal: 'Team performance' },
  { id: 4, name: 'Riley Chen', email: 'riley@example.com', role: 'Swimmer', fitnessGoal: 'Build aerobic capacity' },
];

const seedTeams = [
  { id: 1, name: 'Trail Blazers', members: 4, points: 1850, focus: 'Endurance challenge' },
  { id: 2, name: 'Velocity Squad', members: 5, points: 2145, focus: 'Sprint intervals' },
  { id: 3, name: 'Storm Chasers', members: 3, points: 1680, focus: 'Recovery and mobility' },
];

const seedActivities = [
  { id: 1, userId: 1, type: 'running', durationMinutes: 36, calories: 385, date: '2026-10-01', notes: 'Tempo run on the river trail' },
  { id: 2, userId: 2, type: 'cycling', durationMinutes: 48, calories: 420, date: '2026-10-02', notes: 'Hill repeats with strong cadence' },
  { id: 3, userId: 3, type: 'strength', durationMinutes: 42, calories: 310, date: '2026-10-03', notes: 'Upper body and core circuits' },
  { id: 4, userId: 4, type: 'swimming', durationMinutes: 32, calories: 290, date: '2026-10-04', notes: 'Technique-focused interval sets' },
];

const seedLeaderboard = [
  { id: 1, userId: 2, name: 'Jordan Lee', points: 1420, streak: 8 },
  { id: 2, userId: 1, name: 'Avery Brooks', points: 1385, streak: 6 },
  { id: 3, userId: 4, name: 'Riley Chen', points: 1290, streak: 5 },
  { id: 4, userId: 3, name: 'Morgan Patel', points: 1215, streak: 4 },
];

const seedWorkouts = [
  { id: 1, title: 'Morning Run', category: 'Cardio', difficulty: 'beginner', minutes: 20, equipment: ['Shoes'], description: 'Easy pace set to build consistency and recovery.' },
  { id: 2, title: 'Core Circuit', category: 'Strength', difficulty: 'intermediate', minutes: 30, equipment: ['Mat', 'Kettlebell'], description: 'Mobility and planks combined for improved stability.' },
  { id: 3, title: 'Interval Sprint', category: 'Cardio', difficulty: 'advanced', minutes: 25, equipment: ['Track shoes'], description: 'Short explosive bursts with controlled rest periods.' },
  { id: 4, title: 'Mobility Flow', category: 'Recovery', difficulty: 'beginner', minutes: 18, equipment: ['Yoga mat'], description: 'Dynamic stretches to support lower body recovery.' },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany(seedUsers);
    await Team.insertMany(seedTeams);
    await Activity.insertMany(seedActivities);
    await LeaderboardEntry.insertMany(seedLeaderboard);
    await Workout.insertMany(seedWorkouts);

    const totals = {
      users: await User.countDocuments(),
      teams: await Team.countDocuments(),
      activities: await Activity.countDocuments(),
      leaderboard: await LeaderboardEntry.countDocuments(),
      workouts: await Workout.countDocuments(),
    };

    console.log('Database seeding complete', totals);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
