import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  lessonId: string;
  learningPathId: string;
  questions: {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    type: 'multiple_choice' | 'true_false' | 'fill_blank';
  }[];
  passingScore: number;
  timeLimit?: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema({
  _id: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  type: { 
    type: String, 
    enum: ['multiple_choice', 'true_false', 'fill_blank'], 
    default: 'multiple_choice' 
  },
}, { _id: false });

const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  lessonId: { type: String, required: true },
  learningPathId: { type: String, required: true },
  questions: [QuestionSchema],
  passingScore: { type: Number, default: 70 },
  timeLimit: { type: Number },
}, { timestamps: true });

QuizSchema.index({ lessonId: 1 });
QuizSchema.index({ learningPathId: 1 });

export const QuizModel = mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
