import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { Response } from 'express';
import { ApiResponseData } from 'src/types/api';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @Get('wordList')
  @ApiResponse({ status: 200, description: 'success'})
  @HttpCode(HttpStatus.OK)
  getList(): ApiResponseData {
    const data = this.reviewService.getWordList();

    return { data };
  }

  @Get('logList')
  @ApiResponse({ status: 200, description: 'success'})
  @HttpCode(HttpStatus.OK)
  getLogList(): ApiResponseData {
    const data = this.reviewService.getLogList();

    return { data };
  }

  @Post('wordList')
  @ApiResponse({ status: 200, description: 'success'})
  async create(@Body() createReviewLogs: CreateReviewDto[], @Res() res: Response) {
    await this.reviewService.create(createReviewLogs);
    res.status(HttpStatus.OK).json();
  }
}