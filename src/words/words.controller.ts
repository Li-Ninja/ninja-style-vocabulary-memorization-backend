import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  Response
} from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
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

  @Get(':id')
  findOne(@Param() params: { id: string }) {
    const noWord = {
      id: 0,
      word: '',
      answer: ''
    };

    return this.wordList.find(word => word.id === parseInt(params.id)) ?? noWord;
  }

  @Post()
  create(@Body() createWordsDto: CreateWordDto, @Response() res: Express.Response) {
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

  @Patch(':id')
  // TODO patch
  update(@Param('id') id: string, @Body() body: any) {
    console.log('this is update ', id, body);
  }

  @Delete(':id')
  // TODO: delete
  remove(@Param('id') id: string) {
    console.log('this is delete ', id);
  }

}
