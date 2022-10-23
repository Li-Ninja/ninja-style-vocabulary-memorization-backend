import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Word } from './entities/word.entity';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordsService {
  private wordList: Word[] = [
    {
    id: 1,
    word: '火曜日',
    answer: '星期二'
  },
  {
    id: 2,
    word: '水曜日',
    answer: '星期三'
  }
  ];

  findAll() {
    return Promise.resolve(this.wordList);
  }

  findOne(id: string) {
    const word = this.wordList.find(word => word.id === +id);

    if (!word) {
      throw new HttpException('word not found.', 404);
    }

    return Promise.resolve(word);
  }

  create(word: CreateWordDto) {
    this.wordList.push(word);
  }

  update(id: string, updateWordDto: any) {
    const word = this.findOne(id);

    if (word) {
      console.log('do update word', word, updateWordDto);
    }
  }

  remove(id: string) {
    const wordIndex = this.wordList.findIndex(word => word.id === +id);

    if(wordIndex >= 0) {
      this.wordList.splice(wordIndex, 1);
    }
  }
}
