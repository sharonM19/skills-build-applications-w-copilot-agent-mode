import mongoose, { Schema } from 'mongoose';

const toJsonOptions = {
  versionKey: false,
  transform: (_doc: unknown, ret: Record<string, unknown>) => {
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
};

const userSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, default: 'General wellness' },
  },
  { timestamps: true, toJSON: toJsonOptions },
);

const teamSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    members: { type: Number, required: true },
    points: { type: Number, required: true },
    focus: { type: String, default: 'Community challenge' },
  },
  { timestamps: true, toJSON: toJsonOptions },
);

const activitySchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: String, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true, toJSON: toJsonOptions },
);

const leaderboardEntrySchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: toJsonOptions },
);

const workoutSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    minutes: { type: Number, required: true },
    equipment: { type: [String], default: [] },
    description: { type: String, default: '' },
  },
  { timestamps: true, toJSON: toJsonOptions },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.model('Workout', workoutSchema);
