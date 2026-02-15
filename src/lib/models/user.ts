import mongoose, { Schema, Document } from 'mongoose';
import type { User, UserPreferences } from '@/types';

export interface UserDocument extends Omit<User, '_id'>, Document {}

const UserPreferencesSchema = new Schema<UserPreferences>(
  {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    fontSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
    layout: { type: String, enum: ['default', 'compact'], default: 'default' },
    dailyNudge: { type: Boolean, default: true },
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
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
