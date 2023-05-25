import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import {
  Word, WordDocument,
} from './word.schema';
import { LanguageEnum } from '@/enums/common.enum';
import { CreateReviewDto } from '@/modules/review/dto/create-review.dto';
import { ReviewService } from '@/modules/review/review.service';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word.name) private wordModel: Model<WordDocument>,
    private reviewService: ReviewService,
  ) {}

  async getAll() {
    const list = await this.wordModel.aggregate().sort({
      updateAt: 'desc',
    });

    return list;
  }

  getById(id: string) {
    return this.wordModel.findById(id);
  }

  async create(word: CreateWordDto[]) {
    const dateTime = dayjs();

    const data: Word[] = word.map(item => ({
      text: item,
      tags: [],
      // TODO data from frontend
      nativeLanguage: LanguageEnum.TraditionalChinese,
      learnLanguage: LanguageEnum.Japanese,
      isClosed: false,
      isFavorite: false,
      createAt: dateTime,
      updateAt: dateTime,
    }));

    const wordList = await this.wordModel.insertMany(data);
    const initialReviewList: CreateReviewDto[] = wordList.map(item => ({
      word_id: item._id,
      isCorrect: null,
      reviewInfo: {
        ratio: 5,
        minutes: 5,
        count: 0,
        initialReviewAt: dateTime,
      },
    }));

    await this.reviewService.create(initialReviewList, true);

    return;
  }

  update(id: string, updateWordDto: UpdateWordDto) {
    const updatedData = {
      text: updateWordDto,
      updateAt: dayjs(),
    };

    return this.wordModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  // TODO remove
  // remove(id: string) {
  // console.log('remove', id);
  // return this.wordModel.findOneAndRemove(id);
  // }
}
