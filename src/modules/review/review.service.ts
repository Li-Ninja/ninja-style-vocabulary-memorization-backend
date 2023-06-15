import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import Decimal from 'decimal.js';
import {
  Model, Types,
} from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReadReviewWordDto } from './dto/read-reviewWord.dto';
import {
  Review, ReviewDocument,
} from './review.schema';
import { MongoReviewGet } from '@/types/review';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async getWordList(count = 50) {
    const now = dayjs().toDate();

    return await this.reviewModel.aggregate()
      .match({
        'reviewInfo.nextReviewAt': {
          $lte: now,
        },
      })
      .sort({
        word_id: 1,
        'reviewInfo.nextReviewAt': -1,
      })
      .group({
        _id: '$word_id',
        review: {
          $first: '$$ROOT',
        },
      })
      .sample(count)
      .lookup({
        from: 'words',
        let: {
          wordId: '$_id',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$wordId'],
              },
              isClosed: {
                $ne: true,
              },
            },
          },
          {
            $addFields: {
              type: '$text.type',
              question: '$text.question',
              answer: '$text.answer',
              isClosed: '$isClosed',
              isFavorite: '$isFavorite',
            },
          },
        ],
        as: 'words',
      })
      .match({
        words: {
          $ne: [],
        },
      })
      .unwind('$words')
      .project({
        _id: 0,
        word_id: '$_id',
        reviewInfo: '$review.reviewInfo',
        type: '$words.type',
        question: '$words.question',
        answer: '$words.answer',
        isFavorite: '$words.isFavorite',
      })
      .exec() as ReadReviewWordDto[];
  }

  async getLogList() {
    return await this.reviewModel.aggregate()
      .lookup({
        from: 'words',
        localField: 'word_id',
        foreignField: '_id',
        as: 'wordList',
        pipeline: [
          {
            $project: {
              _id: 0,
              text: 1,
            },
          },
        ],
      })
      .addFields({
        word: {
          $arrayElemAt: [
            '$wordList',
            { $indexOfArray: ['$wordList.text', { $max: '$wordList.text' }] },
          ],
        },
      })
      .project({
        wordList: 0,
      })
      .addFields({
        type: '$word.text.type',
        question: '$word.text.question',
        answer: '$word.text.answer',
      })
      .project({
        word: 0,
      })
      .sort({
        createAt: 'desc',
      })
      .exec() as MongoReviewGet[];
  }

  async create(reviewLogs: CreateReviewDto[], isInitial = false) {
    const dateTime = dayjs();
    const data: Review[] = reviewLogs.map(reviewLog => ({
      word_id: new Types.ObjectId(reviewLog.word_id),
      isCorrect: reviewLog.isCorrect,
      createAt: dayjs(),
      reviewInfo: {
        ratio: reviewLog.reviewInfo.ratio,
        minutes: reviewLog.reviewInfo.minutes,
        count: reviewLog.isCorrect ? reviewLog.reviewInfo.count + 1 : reviewLog.reviewInfo.count,
        initialReviewAt: reviewLog.reviewInfo.initialReviewAt,
        // Geometric progression
        nextReviewAt:
          isInitial
            ? reviewLog.reviewInfo.initialReviewAt
            : (
              reviewLog.isCorrect
                ? dateTime
                  .add(
                    new Decimal(reviewLog.reviewInfo.minutes)
                      .mul(new Decimal(reviewLog.reviewInfo.ratio)
                        .pow(reviewLog.reviewInfo.count))
                      .toNumber(),
                    'minutes',
                  )
                : dateTime),
      },
    }));

    const result = await this.reviewModel.insertMany(data);

    return result;
  }
}
