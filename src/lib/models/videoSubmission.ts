import mongoose, { Schema, Document, Types } from 'mongoose';
import type { VideoCategory } from './video';

export interface IVideoSubmission {
  youtubeUrl: string;
  youtubeId: string;
  title: string;
  description: string;
  category: VideoCategory;
  philosopher?: string;
  submittedBy: Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideoSubmissionDocument extends Omit<IVideoSubmission, 'submittedBy'>, Document {
  submittedBy: Types.ObjectId;
}

const VideoSubmissionSchema = new Schema<IVideoSubmissionDocument>(
  {
    youtubeUrl: { type: String, required: true },
    youtubeId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { 
      type: String, 
      enum: ['poetry', 'history', 'music', 'documentary', 'educational', 'sufism', 'philosophy'],
      default: 'educational'
    },
    philosopher: { type: String },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

VideoSubmissionSchema.index({ submittedBy: 1 });
VideoSubmissionSchema.index({ status: 1 });

export const VideoSubmissionModel = mongoose.models.VideoSubmission || mongoose.model<IVideoSubmissionDocument>('VideoSubmission', VideoSubmissionSchema);
