import mongoose, { Schema, Document } from 'mongoose';

export interface IBlock extends Document {
  blockerId: string;
  blockedId: string;
  reason?: string;
  createdAt: Date;
}

const BlockSchema = new Schema<IBlock>(
  {
    blockerId: { type: String, required: true },
    blockedId: { type: String, required: true },
    reason: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

BlockSchema.index({ blockerId: 1, blockedId: 1 }, { unique: true });
BlockSchema.index({ blockedId: 1 });

export const BlockModel = mongoose.models.Block || mongoose.model<IBlock>('Block', BlockSchema);
