import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiQuery, ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReadReviewWordDto } from './dto/read-reviewWord.dto';
import { ReviewService } from './review.service';
import { ApiResponseData } from '@/types/api';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @Get('wordList')
  @ApiResponse({ status: 200, description: 'success' })
  @ApiQuery({ name: 'count', required: false, type: Number })
  @HttpCode(HttpStatus.OK)
  async getList(@Query('count') count?: string) {
    const countNumber = Number(count);
    let data: ReadReviewWordDto[] = [];

    if (Number.isNaN(countNumber) || countNumber > 50) {
      data = await this.reviewService.getWordList();
    } else {
      data = await this.reviewService.getWordList(countNumber);
    }

    return { data } as ApiResponseData;
  }

  @Get('logList')
  @ApiResponse({ status: 200, description: 'success' })
  @HttpCode(HttpStatus.OK)
  async getLogList() {
    const data = await this.reviewService.getLogList();

    return { data } as ApiResponseData;
  }

  @Post('wordList')
  @ApiResponse({ status: 200, description: 'success' })
  async create(@Body() createReviewLogs: CreateReviewDto[], @Res() res: Response) {
    await this.reviewService.create(createReviewLogs);
    res.status(HttpStatus.OK).json();
  }
}
