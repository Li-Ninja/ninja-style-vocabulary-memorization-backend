import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  Response
} from '@nestjs/common';
import { CreateWordsDto } from '../modules/words/dto/create-words.dto';
import Express from 'express';

@Controller('words')
export class WordsController {
  // TODO wordList from DB
  wordList = [
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

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Request() _req: Express.Request, @Response() res: Express.Response) {
    res.json(this.wordList);
  }

  @Get('/:id')
  findOne(@Param() params: { id: string }) {
    const noWord = {
      id: 0,
      word: '',
      answer: ''
    };

    return this.wordList.find(word => word.id === parseInt(params.id)) ?? noWord;
  }

  @Post()
  create(@Body() createWordsDto: CreateWordsDto, @Response() res: Express.Response) {
    const { word, answer } = createWordsDto;

    console.info('addWord body', createWordsDto, word, answer);

    if (!word || !answer) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        success: false,
        message: 'add failed'
      })
    }

    // TODO add to DB

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'add success'
    })
  }
}
