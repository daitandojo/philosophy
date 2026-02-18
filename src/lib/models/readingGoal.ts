import mongoose, { Schema, Document } from 'mongoose';

export interface IReadingGoal extends Document {
  userId: string;
  weeklyGoal: number;
  currentWeekVerses: number;
  weekStartDate: Date;
  totalVersesRead: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReadingGoalSchema = new Schema<IReadingGoal>({
  userId: { type: String, required: true, unique: true },
  weeklyGoal: { type: Number, default: 10 },
  currentWeekVerses: { type: Number, default: 0 },
  weekStartDate: { type: Date },
  totalVersesRead: { type: Number, default: 0 },
}, { timestamps: true });

ReadingGoalSchema.index({ userId: 1 });

export const ReadingGoalModel = mongoose.models.ReadingGoal || mongoose.model<IReadingGoal>('ReadingGoal', ReadingGoalSchema);
