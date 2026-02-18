import mongoose, { Schema, Document } from 'mongoose';
import type { Verse, VerseVersion } from '@/types';

export interface VerseDocument extends Omit<Verse, '_id'>, Document {}

const VerseVersionSchema = new Schema<VerseVersion>(
  {
    version: { type: Number, required: true },
    persianText: { type: String, required: true },
    transliteration: { type: String, required: true },
    englishTranslation: { type: String, required: true },
    summary: { type: String, required: true },
    source: { type: String, enum: ['human', 'ai', 'hybrid'], required: true },
    confidence: { type: Number },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const VerseSchema = new Schema<VerseDocument>(
  {
    persianText: { type: String, required: true },
    transliteration: { type: String, required: true },
    englishTranslation: { type: String, required: true },
    summary: { type: String, required: true },
    sourceWork: { type: String, required: true },
    philosopher: { type: String, required: true },
    themes: [{ type: String }],
    wisdomScore: { type: Number, min: 1, max: 10 },
    complexity: { type: Number, min: 1, max: 10 },
    emotionalTone: { type: String },
    tags: [{ type: String }],
    imageUrl: { type: String },
    calligraphyUrl: { type: String },
    audioUrl: { type: String },
    audioProvider: { type: String, enum: ['tts', 'human', 'hybrid'], default: 'tts' },
    audioDuration: { type: Number },
    audioLanguage: { type: String, default: 'fa' },
    versions: [VerseVersionSchema],
    relatedVerseIds: [{ type: Schema.Types.ObjectId, ref: 'Verse' }],
    viewCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

VerseSchema.index({ persianText: 'text', transliteration: 'text', englishTranslation: 'text' }, {
  weights: {
    persianText: 10,
    englishTranslation: 5,
    summary: 3,
  }
});
VerseSchema.index({ themes: 1 });
VerseSchema.index({ philosopher: 1 });
VerseSchema.index({ wisdomScore: -1 });
VerseSchema.index({ sourceWork: 1 });
VerseSchema.index({ tags: 1 });
VerseSchema.index({ emotionalTone: 1 });
VerseSchema.index({ isFeatured: 1 });

export const VerseModel = mongoose.models.Verse || mongoose.model<VerseDocument>('Verse', VerseSchema);
