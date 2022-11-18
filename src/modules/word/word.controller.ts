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
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import Express from 'express';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getAll(@Request() _req: Express.Request, @Response() res: Express.Response) {
    const data = await this.wordService.getAll();

    res.json(data);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.wordService.getById(id);

    return data;
  }

  @Post()
  create(@Body() createWordsDto: CreateWordDto) {
    return this.wordService.create(createWordsDto);

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
    return this.wordService.update(id, body);
  }

  @Delete(':id')
  // TODO: delete
  remove(@Param('id') id: string) {
    return this.wordService.remove(id);
  }

}
