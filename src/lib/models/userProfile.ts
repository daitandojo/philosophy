import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProfile extends Document {
  userId: string;
  bio?: string;
  favoritePhilosophers: string[];
  favoriteQuotes: string[];
  coverImage?: string;
  themeColor?: string;
  featuredQuote?: string;
  currentlyStudying?: string;
  philosophicalStatement?: string;
  socialLinks: {
    website?: string;
    twitter?: string;
    instagram?: string;
  };
  following: string[];
  followers: number;
  reputation: number;
  badges: string[];
  privacySettings: {
    profileVisibility: 'public' | 'friends' | 'private';
    showActivity: boolean;
    showCollections: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>({
  userId: { type: String, required: true, unique: true },
  bio: { type: String, maxlength: 500 },
  favoritePhilosophers: [{ type: String }],
  favoriteQuotes: [{ type: String }],
  coverImage: { type: String },
  themeColor: { type: String, default: '#8b4513' },
  featuredQuote: { type: String },
  currentlyStudying: { type: String },
  philosophicalStatement: { type: String },
  socialLinks: {
    website: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  following: [{ type: String }],
  followers: { type: Number, default: 0 },
  reputation: { type: Number, default: 0 },
  badges: [{ type: String }],
  privacySettings: {
    profileVisibility: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
    showActivity: { type: Boolean, default: true },
    showCollections: { type: Boolean, default: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserProfile = mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
