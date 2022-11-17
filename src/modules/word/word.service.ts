import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordService {
  private wordList: CreateWordDto[] = [
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

  getAll() {
    return Promise.resolve(this.wordList);
  }

  getById(id: string) {
    const word = this.wordList.find(word => word.id === +id);

    if (!word) {
      throw new NotFoundException(`word #${id} not found.`);
    }

    return Promise.resolve(word);
  }

  create(word: CreateWordDto) {
    this.wordList.push(word);
  }

  update(id: string, updateWordDto: any) {
    const word = this.getById(id);

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
