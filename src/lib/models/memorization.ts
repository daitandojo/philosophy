import mongoose, { Schema, Document } from 'mongoose';

export interface IMemorizationCard extends Document {
  userId: string;
  verseId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: Date;
  lastReviewDate: Date;
  status: 'new' | 'learning' | 'review' | 'mastered';
}

const MemorizationCardSchema = new Schema<IMemorizationCard>({
  userId: { type: String, required: true },
  verseId: { type: String, required: true },
  easeFactor: { type: Number, default: 2.5 },
  interval: { type: Number, default: 1 },
  repetitions: { type: Number, default: 0 },
  nextReviewDate: { type: Date, default: Date.now },
  lastReviewDate: { type: Date },
  status: { 
    type: String, 
    enum: ['new', 'learning', 'review', 'mastered'], 
    default: 'new' 
  },
});

MemorizationCardSchema.index({ userId: 1, nextReviewDate: 1 });
MemorizationCardSchema.index({ userId: 1, verseId: 1 }, { unique: true });

export const MemorizationCardModel = mongoose.models.MemorizationCard || mongoose.model<IMemorizationCard>('MemorizationCard', MemorizationCardSchema);
