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
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import Express from 'express';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Request() _req: Express.Request, @Response() res: Express.Response) {
    const data = await this.wordsService.findAll();

    res.json(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.wordsService.findOne(id);

    return data;
  }

  @Post()
  create(@Body() createWordsDto: CreateWordDto) {
    return this.wordsService.create(createWordsDto);

    // console.info('addWord body', createWordsDto, word, answer);

    // if (!word || !answer) {
    //   return res.status(HttpStatus.NOT_ACCEPTABLE).json({
    //     success: false,
    //     message: 'add failed'
    //   })
    // }

    // // TODO add to DB

    // res.status(HttpStatus.CREATED).json({
    //   success: true,
    //   message: 'add success'
    // })
  }

  @Patch(':id')
  // TODO patch
  update(@Param('id') id: string, @Body() body: any) {
    return this.wordsService.update(id, body);
  }

  @Delete(':id')
  // TODO: delete
  remove(@Param('id') id: string) {
    return this.wordsService.remove(id);
  }

}
