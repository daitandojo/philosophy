import mongoose, { Schema, Document } from 'mongoose';

export interface Chapter {
  _id: string;
  title: string;
  titlePersian?: string;
  content: string;
  contentPersian?: string;
  summary?: string;
  order: number;
}

export interface Work {
  _id: string;
  philosopherId: string;
  title: string;
  titlePersian?: string;
  description: string;
  type: 'epic' | 'lyrical' | 'philosophical' | 'theoretical' | 'moral';
  year?: string;
  chapters: Chapter[];
  tags: string[];
  imageUrl?: string;
}

export interface WorkDocument extends Omit<Work, '_id'>, Document {}

const ChapterSchema = new Schema<Chapter>(
  {
    title: { type: String, required: true },
    titlePersian: { type: String },
    content: { type: String, required: true },
    contentPersian: { type: String },
    summary: { type: String },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const WorkSchema = new Schema<WorkDocument>(
  {
    philosopherId: { type: String, required: true },
    title: { type: String, required: true },
    titlePersian: { type: String },
    description: { type: String, required: true },
    type: { type: String, enum: ['epic', 'lyrical', 'philosophical', 'theoretical', 'moral'], required: true },
    year: { type: String },
    chapters: [ChapterSchema],
    tags: [{ type: String }],
    imageUrl: { type: String },
  },
  { timestamps: true }
);

WorkSchema.index({ philosopherId: 1 });
WorkSchema.index({ title: 'text', description: 'text' });

export const WorkModel = mongoose.models.Work || mongoose.model<WorkDocument>('Work', WorkSchema);
