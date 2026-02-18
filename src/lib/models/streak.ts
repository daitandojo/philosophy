import mongoose, { Schema, Document } from 'mongoose';

export interface IStreak extends Document {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastVisitDate: Date;
  dailyWisdomRead: boolean;
  wisdomReadDates: Date[];
}

const StreakSchema = new Schema<IStreak>({
  userId: { type: String, required: true, unique: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastVisitDate: { type: Date },
  dailyWisdomRead: { type: Boolean, default: false },
  wisdomReadDates: [{ type: Date }],
});

StreakSchema.index({ userId: 1 });
StreakSchema.index({ currentStreak: -1 });

export const StreakModel = mongoose.models.Streak || mongoose.model<IStreak>('Streak', StreakSchema);
