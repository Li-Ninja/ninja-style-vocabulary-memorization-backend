import { Types } from 'mongoose';
import { Dayjs } from 'dayjs';
import { ReviewDocument } from 'src/modules/review/review.schema';
import { WordDocument } from 'src/modules/word/word.schema';

export interface ReviewLog {
  word_id: Types.ObjectId;
  isCorrect: boolean;
  reviewInfo: {
    ratio: number;
    minutes: number;
    count: number;
    initialReviewAt: Dayjs;
    nextReviewAt: Dayjs;
  }
}

export interface MongoReviewGet {
  _id: ReviewDocument['word_id'];
  // review: {
  //   reviewInfo: ReviewDocument['reviewInfo'];
  // }
  review: Pick<ReviewDocument, 'reviewInfo'>;
  word: Pick<WordDocument, 'text' | 'isClosed' | 'isFavorite'>;
}

export type MongoReviewGetAll = MongoReviewGet[];