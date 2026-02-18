import mongoose, { Schema, Document } from 'mongoose';

export interface ILearningPath extends Document {
  title: string;
  titlePersian?: string;
  description: string;
  philosopherId: string;
  lessons: {
    _id: string;
    title: string;
    titlePersian?: string;
    content: string;
    verseIds: string[];
    quizId?: string;
    order: number;
  }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  imageUrl?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  titlePersian: { type: String },
  content: { type: String, required: true },
  verseIds: [{ type: String }],
  quizId: { type: String },
  order: { type: Number, required: true },
}, { _id: false });

const LearningPathSchema = new Schema<ILearningPath>({
  title: { type: String, required: true },
  titlePersian: { type: String },
  description: { type: String, required: true },
  philosopherId: { type: String, required: true },
  lessons: [LessonSchema],
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    default: 'beginner' 
  },
  estimatedTime: { type: Number, default: 60 },
  imageUrl: { type: String },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

LearningPathSchema.index({ philosopherId: 1 });
LearningPathSchema.index({ difficulty: 1 });
LearningPathSchema.index({ tags: 1 });

export const LearningPathModel = mongoose.models.LearningPath || mongoose.model<ILearningPath>('LearningPath', LearningPathSchema);
