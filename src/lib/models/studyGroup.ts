import mongoose, { Schema, Document } from 'mongoose';

export interface IStudyGroup extends Document {
  name: string;
  description: string;
  learningPathId: string;
  creatorId: string;
  memberIds: string[];
  maxMembers: number;
  isPrivate: boolean;
  currentChapter: number;
  discussionEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudyGroupSchema = new Schema<IStudyGroup>({
  name: { type: String, required: true },
  description: { type: String },
  learningPathId: { type: String, required: true },
  creatorId: { type: String, required: true },
  memberIds: [{ type: String }],
  maxMembers: { type: Number, default: 20 },
  isPrivate: { type: Boolean, default: false },
  currentChapter: { type: Number, default: 1 },
  discussionEnabled: { type: Boolean, default: true },
}, { timestamps: true });

StudyGroupSchema.index({ learningPathId: 1 });
StudyGroupSchema.index({ creatorId: 1 });
StudyGroupSchema.index({ memberIds: 1 });

export const StudyGroupModel = mongoose.models.StudyGroup || mongoose.model<IStudyGroup>('StudyGroup', StudyGroupSchema);
