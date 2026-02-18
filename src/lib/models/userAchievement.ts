import mongoose, { Schema, Document } from 'mongoose';

export interface IUserAchievement extends Document {
  userId: string;
  achievementCode: string;
  unlockedAt: Date;
}

const UserAchievementSchema = new Schema<IUserAchievement>({
  userId: { type: String, required: true },
  achievementCode: { type: String, required: true },
  unlockedAt: { type: Date, default: Date.now },
});

UserAchievementSchema.index({ userId: 1, achievementCode: 1 }, { unique: true });
UserAchievementSchema.index({ userId: 1, unlockedAt: -1 });

export const UserAchievementModel = mongoose.models.UserAchievement || mongoose.model<IUserAchievement>('UserAchievement', UserAchievementSchema);
