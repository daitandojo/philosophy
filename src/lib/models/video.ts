import mongoose, { Schema, Document, Types } from 'mongoose';

export type VideoCategory = 
  | 'poetry'
  | 'history'
  | 'music'
  | 'documentary'
  | 'educational'
  | 'sufism'
  | 'philosophy';

export interface IVideo {
  youtubeId: string;
  title: string;
  description: string;
  titleFa?: string;
  descriptionFa?: string;
  category: VideoCategory;
  philosopher?: string;
  duration: string;
  thumbnailUrl: string;
  submittedBy?: Types.ObjectId;
  approved: boolean;
  featured: boolean;
  views: number;
  likes: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideoDocument extends Omit<IVideo, 'submittedBy'>, Document {
  submittedBy?: Types.ObjectId;
}

const VideoSchema = new Schema<IVideoDocument>(
  {
    youtubeId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    titleFa: { type: String },
    descriptionFa: { type: String },
    category: { 
      type: String, 
      enum: ['poetry', 'history', 'music', 'documentary', 'educational', 'sufism', 'philosophy'],
      default: 'educational'
    },
    philosopher: { type: String },
    duration: { type: String, default: '0:00' },
    thumbnailUrl: { type: String },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approved: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

VideoSchema.index({ category: 1 });
VideoSchema.index({ featured: 1 });
VideoSchema.index({ youtubeId: 1 });

export const VideoModel = mongoose.models.Video || mongoose.model<IVideoDocument>('Video', VideoSchema);
