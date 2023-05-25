import { Dayjs } from 'dayjs';
import { WordText } from './word';
import { ReviewDocument } from '@/modules/review/review.schema';
import { WordDocument } from '@/modules/word/word.schema';

export interface Review {
  word_id: WordDocument['_id'];
  isCorrect: boolean | null;
  createAt: Dayjs;
  reviewInfo: {
    ratio: number;
    minutes: number;
    count: number;
    initialReviewAt: Dayjs;
    nextReviewAt: Dayjs;
  };
}

export interface ReviewLog extends Review {
  type: WordText['type'];
  question: WordText['question'];
  answer: WordText['answer'];
}

export interface MongoReviewGet {
  word_id: ReviewDocument['word_id'];
  review: Pick<ReviewDocument, 'reviewInfo'>;
  word: Pick<WordDocument, 'text' | 'isClosed' | 'isFavorite'>;
}
