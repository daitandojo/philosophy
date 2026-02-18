import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: string;
  learningPathId: string;
  completedLessons: string[];
  quizScores: {
    lessonId: string;
    quizId: string;
    score: number;
    attemptedAt: Date;
  }[];
  currentLesson: string;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
}

const QuizScoreSchema = new Schema({
  lessonId: { type: String, required: true },
  quizId: { type: String, required: true },
  score: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now },
}, { _id: false });

const UserProgressSchema = new Schema<IUserProgress>({
  userId: { type: String, required: true },
  learningPathId: { type: String, required: true },
  completedLessons: [{ type: String }],
  quizScores: [QuizScoreSchema],
  currentLesson: { type: String },
  progress: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

UserProgressSchema.index({ userId: 1, learningPathId: 1 }, { unique: true });
UserProgressSchema.index({ userId: 1, progress: -1 });

export const UserProgressModel = mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
