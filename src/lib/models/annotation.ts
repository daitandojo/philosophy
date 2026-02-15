import mongoose, { Schema, Document, Types } from 'mongoose';
import type { Annotation } from '@/types';

export interface AnnotationDocument extends Omit<Annotation, '_id' | 'userId' | 'verseId'>, Document {
  userId: Types.ObjectId;
  verseId: Types.ObjectId;
}

const AnnotationSchema = new Schema<AnnotationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    verseId: { type: Schema.Types.ObjectId, ref: 'Verse', required: true },
    content: { type: String, required: true },
    visibility: { type: String, enum: ['private', 'public'], default: 'private' },
    highlightedText: { type: String },
  },
  { timestamps: true }
);

AnnotationSchema.index({ verseId: 1, visibility: 1 });
AnnotationSchema.index({ userId: 1 });

export const AnnotationModel = mongoose.models.Annotation || mongoose.model<AnnotationDocument>('Annotation', AnnotationSchema);
