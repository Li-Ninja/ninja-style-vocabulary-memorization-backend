import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dayjs from 'dayjs';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReadReviewDto } from './dto/read-review.dto';
import { Review, ReviewDocument } from './review.schema';
import { WordService } from '../word/word.service';
import { WordDocument } from '../word/word.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
    private readonly wordService: WordService
  ) {}

  async getAll() {
    const list: WordDocument[] = await this.wordService.getAll();

    return list.filter(item => !item.isClosed).map(item => ({
      id: item._id,
      type: item.text.type,
      question: item.text.question,
      answer: item.text.answer,
      isFavorite: item.isFavorite
    })) as ReadReviewDto[];
  }

  getLogList() {
    return this.reviewModel.find();
  }

  async create(reviewLogs: CreateReviewDto[]) {
    const data: Review[] = reviewLogs.map(reviewLog => ({
      word_Id: reviewLog.id,
      isCorrect: reviewLog.isCorrect,
      createAt: dayjs()
    }));

    return await this.reviewModel.insertMany(data);
  }
}