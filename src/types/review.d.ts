import { Dayjs } from 'dayjs';
import { ReviewDocument } from 'src/modules/review/review.schema';
import { WordDocument } from 'src/modules/word/word.schema';
import { WordText }from './word';

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
  }
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
