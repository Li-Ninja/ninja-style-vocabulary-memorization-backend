import { Types } from 'mongoose';
import { Dayjs } from 'dayjs';
import { ReviewDocument } from 'src/modules/review/review.schema';
import { WordDocument } from 'src/modules/word/word.schema';

export interface ReviewLog {
  word_id: Types.ObjectId;
  isCorrect: boolean | null;
  reviewInfo: {
    ratio: number;
    minutes: number;
    count: number;
    initialReviewAt: Dayjs;
    nextReviewAt: Dayjs;
  }
}

export interface MongoReviewGet {
  word_id: ReviewDocument['word_id'];
  review: Pick<ReviewDocument, 'reviewInfo'>;
  word: Pick<WordDocument, 'text' | 'isClosed' | 'isFavorite'>;
}

export type MongoReviewGetAll = MongoReviewGet[];