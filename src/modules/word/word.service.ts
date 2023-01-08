import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dayjs from 'dayjs';
import { Word, WordDocument } from './word.schema';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { LanguageEnum } from 'src/enums/common.enum';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word.name) private wordModel: Model<WordDocument>,
  ) {}

  async getAll() {
    return await this.wordModel.find();
  }

  getById(id: string) {
    return this.wordModel.findById(id);
  }

  async create(word: CreateWordDto[]) {
    const data: Word[] = word.map(item => ({
      text: item,
      tags: [],
      // TODO data from frontend
      nativeLanguage: LanguageEnum.TraditionalChinese,
      learnLanguage: LanguageEnum.Japanese,
      isClosed: false,
      isFavorite: false,
      createAt: dayjs(),
      reviewAt: dayjs(),
      updateAt: dayjs()
    }));

    return await this.wordModel.insertMany(data);
  }

  update(id: string, updateWordDto: UpdateWordDto) {
    const updatedData = {
      text: updateWordDto,
      updateAt: dayjs()
    }

    return this.wordModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  remove(id: string) {
    // TODO remove
    console.log('remove', id);
    // return this.wordModel.findOneAndRemove(id);
  }
}
