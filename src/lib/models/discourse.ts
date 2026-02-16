import mongoose, { Schema, Document } from 'mongoose';

export interface Discourse {
  title: string;
  content: string;
  type: 'fable' | 'discourse';
  philosopherId: string;
  philosopherName: string;
  theme: {
    name: string;
    description: string;
  };
  language: string;
  userId?: string;
  userName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscourseDocument extends Omit<Discourse, '_id'>, Document {}

const DiscourseSchema = new Schema<DiscourseDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['fable', 'discourse'], required: true },
    philosopherId: { type: String, required: true },
    philosopherName: { type: String, required: true },
    theme: {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
    language: { type: String, required: true, default: 'en' },
    userId: { type: String },
    userName: { type: String },
  },
  { timestamps: true }
);

export const DiscourseModel = mongoose.models.Discourse || mongoose.model<DiscourseDocument>('Discourse', DiscourseSchema);
