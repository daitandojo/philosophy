import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  userId: string;
  title: string;
  description?: string;
  philosopherIds: string[];
  verseIds: string[];
  coverImage?: string;
  color?: string;
  visibility: 'public' | 'unlisted' | 'private';
  isFeatured: boolean;
  likes: number;
  views: number;
  collaborators: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  philosopherIds: [{ type: String }],
  verseIds: [{ type: String }],
  coverImage: { type: String },
  color: { type: String, default: '#8b4513' },
  visibility: { type: String, enum: ['public', 'unlisted', 'private'], default: 'public' },
  isFeatured: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  collaborators: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Collection = mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema);
