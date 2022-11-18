import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word, WordDocument } from './word.schema';
import { CreateWordDto } from './dto/create-word.dto';


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
    // TODO new word data
    const newWord = await this.wordModel.create({
      ...word,
      reviewCount: 0,
      createdAt: Date.now(),
      updateAt: Date.now()
    });

    return newWord.save();
  }

  update(id: string, updateWordDto: any) {
    const word = this.getById(id);

    if (word) {
      console.log('do update word', word, updateWordDto);
    }
  }

  remove(id: string) {
    // TODO remove
    console.log('remove', id);
    // return this.wordModel.findOneAndRemove(id);
  }
}
