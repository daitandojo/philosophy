import mongoose, { Schema, Document } from 'mongoose';

export interface IModeration extends Document {
  contentType: 'verse' | 'comment' | 'discussion' | 'annotation' | 'blogPost';
  contentId: Schema.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  reportedBy?: string;
  reason?: string;
  severity?: 'low' | 'medium' | 'high';
  reviewedBy?: string;
  reviewedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ModerationSchema = new Schema<IModeration>(
  {
    contentType: {
      type: String,
      enum: ['verse', 'comment', 'discussion', 'annotation', 'blogPost'],
      required: true,
    },
    contentId: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'flagged'],
      default: 'pending',
    },
    reportedBy: { type: String },
    reason: { type: String },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    reviewedBy: { type: String },
    reviewedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

ModerationSchema.index({ status: 1, contentType: 1 });
ModerationSchema.index({ contentId: 1 });
ModerationSchema.index({ createdAt: -1 });

export const ModerationModel = mongoose.models.Moderation || mongoose.model<IModeration>('Moderation', ModerationSchema);
