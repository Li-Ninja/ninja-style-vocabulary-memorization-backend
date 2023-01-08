import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as dayjs from 'dayjs';
import Decimal from 'decimal.js';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReadReviewDto } from './dto/read-review.dto';
import { Review, ReviewDocument } from './review.schema';
import { MongoReviewGetAll } from 'src/types/review';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>
  ) {}

  async getAll() {
    const logList: MongoReviewGetAll = await this.reviewModel.aggregate()
      .group({
        _id: '$word_id',
        reviewList: {
          $push: {
            nextReviewAt: '$reviewInfo.nextReviewAt',
            reviewInfo: '$reviewInfo'
          }
        }
      })
      .addFields({
        review: {
          '$arrayElemAt': [
            '$reviewList',
            { '$indexOfArray': [ '$reviewList.nextReviewAt', { '$max': '$reviewList.nextReviewAt' } ] }
          ]
        }
      })
      .project({
        reviewList: 0,
        'review.nextReviewAt': 0
      })
      .match({
        'review.reviewInfo.nextReviewAt': {
            $lte: new Date(dayjs().valueOf())
        }
      })
      .lookup({
        from: 'words',
        localField: '_id',
        foreignField:'_id',
        as: 'wordList',
        pipeline: [
          {
            $project: {
              _id: 0,
              text: 1,
              isClosed: 1,
              isFavorite: 1
            }
          }
        ]
      })
      .addFields({
        word: {
          '$arrayElemAt': [
            '$wordList',
            { '$indexOfArray': [ '$wordList.text', { '$max': '$wordList.text' } ] }
          ]
        }
      })
      .project({
        wordList: 0
      })
      .sort({
        'review.nextReviewAt': 'asc'
      })

      // return logList;

    return logList.filter(item => !item.word.isClosed).map(item => ({
      id: item._id,
      isFavorite: item.word.isFavorite,
      type: item.word.text.type,
      question: item.word.text.question,
      answer: item.word.text.answer,
      reviewInfo: item.review.reviewInfo
    })) as ReadReviewDto[];
  }

  async getLogList() {
    return await this.reviewModel.find();
  }

  async create(reviewLogs: CreateReviewDto[], isInitial = false) {
    const data: Review[] = reviewLogs.map(reviewLog => ({
      word_id: new Types.ObjectId(reviewLog.word_id),
      isCorrect: reviewLog.isCorrect,
      createAt: dayjs(),
      reviewInfo: {
        ratio: reviewLog.reviewInfo.ratio,
        minutes: reviewLog.reviewInfo.minutes,
        count: reviewLog.reviewInfo.count + 1,
        initialReviewAt: reviewLog.reviewInfo.initialReviewAt,
        // Geometric progression
        nextReviewAt:
          isInitial
          ?
            reviewLog.reviewInfo.initialReviewAt
          :
            dayjs(reviewLog.reviewInfo.initialReviewAt)
            .add(
              new Decimal(reviewLog.reviewInfo.minutes)
                .mul(new Decimal(reviewLog.reviewInfo.ratio)
                .pow(reviewLog.reviewInfo.count))
                .toNumber(),
              'minutes'
            )
      }
    }));

    return await this.reviewModel.insertMany(data);
  }
}