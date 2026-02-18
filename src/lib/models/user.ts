import mongoose, { Schema, Document, Types } from 'mongoose';
import type { User, UserPreferences } from '@/types';

export interface UserDocument extends Omit<User, '_id'>, Document {}

export interface ReadingHistoryItem {
  verseId: Types.ObjectId;
  viewedAt: Date;
  completionPercentage: number;
}

export interface FavoriteVerse {
  verseId: Types.ObjectId;
  addedAt: Date;
}

const UserPreferencesSchema = new Schema<UserPreferences>(
  {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    fontSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
    layout: { type: String, enum: ['default', 'compact'], default: 'default' },
    dailyNudge: { type: Boolean, default: true },
  },
  { _id: false }
);

const ReadingHistorySchema = new Schema<ReadingHistoryItem>(
  {
    verseId: { type: Schema.Types.ObjectId, ref: 'Verse', required: true },
    viewedAt: { type: Date, default: Date.now },
    completionPercentage: { type: Number, default: 0 },
  },
  { _id: false }
);

const FavoriteVerseSchema = new Schema<FavoriteVerse>(
  {
    verseId: { type: Schema.Types.ObjectId, ref: 'Verse', required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
    preferences: { type: UserPreferencesSchema, default: () => ({}) },
    readingHistory: [ReadingHistorySchema],
    favoriteVerses: [FavoriteVerseSchema],
    recentlyViewedPhilosophers: [{ type: String }],
    recentlyViewedWorks: [{ type: String }],
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ 'readingHistory.viewedAt': -1 });
UserSchema.index({ 'favoriteVerses.addedAt': -1 });

export const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
