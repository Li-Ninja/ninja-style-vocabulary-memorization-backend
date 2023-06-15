import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordService } from './word.service';
import { ApiResponseData } from '@/types/api';
import { CustomRequest } from '@/types/api.d';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getAll(@Req() req: CustomRequest, @Res() res: Response) {
    const data = await this.wordService.getAll(req.userId);

    res.json({
      data,
    } as ApiResponseData);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.wordService.getById(id);

    return { data } as ApiResponseData;
  }

  @Post()
  @ApiResponse({ status: 200, description: 'success' })
  async create(
    @Body() createWords: CreateWordDto[],
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    await this.wordService.create(req.userId, createWords);

    res.status(HttpStatus.OK).json();
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'success' })
  async update(@Param('id') id: string, @Body() body: UpdateWordDto, @Res() res: Response) {
    await this.wordService.update(id, body);
    res.status(HttpStatus.OK).json();
  }

  // @Delete(':id')
  // // TODO: delete
  // remove(@Param('id') id: string) {
  //   return this.wordService.remove(id);
  // }
}
