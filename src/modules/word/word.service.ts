import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word, WordDocument } from './word.schema';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { LanguageEnum } from 'src/enums/common.enum';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word.name) private wordModel: Model<WordDocument>,
  ) {}

  getAll() {
    return this.wordModel.find();
  }

  getById(id: string) {
    return this.wordModel.findById(id);
  }

  async create(word: CreateWordDto) {
    const newWord = await this.wordModel.create({
      text: word,
      reviewCount: 0,
      tags: [],
      // TODO data from frontend
      nativeLanguage: LanguageEnum.TraditionalChinese,
      learnLanguage: LanguageEnum.Japanese,
      isClosed: false,
      createAt: Date.now(),
      reviewAt: Date.now(),
      updateAt: Date.now()
    });

    return newWord.save();
  }

  update(id: string, updateWordDto: UpdateWordDto) {
    const updatedData = {
      text: updateWordDto,
      updateAt: Date.now()
    }

    return this.wordModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  remove(id: string) {
    // TODO remove
    console.log('remove', id);
    // return this.wordModel.findOneAndRemove(id);
  }
}
