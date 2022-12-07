import { Types } from 'mongoose';

export interface ReviewLog {
  word_id: Types.ObjectId;
  isCorrect: boolean;
}