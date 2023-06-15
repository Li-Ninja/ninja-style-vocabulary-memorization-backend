import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
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
import { CustomRequest } from '@/types/api.d';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @Get('wordList')
  @ApiResponse({ status: 200, description: 'success' })
  @ApiQuery({ name: 'count', required: false, type: Number })
  @HttpCode(HttpStatus.OK)
  async getList(
    @Req() req: CustomRequest,
    @Query('count') count?: string,
  ) {
    const countNumber = Number(count);
    let data: ReadReviewWordDto[] = [];

    if (Number.isNaN(countNumber) || countNumber > 50) {
      data = await this.reviewService.getWordList(req.userId);
    } else {
      data = await this.reviewService.getWordList(req.userId, countNumber);
    }

    return { data } as ApiResponseData;
  }

  @Get('logList')
  @ApiResponse({ status: 200, description: 'success' })
  @HttpCode(HttpStatus.OK)
  async getLogList(@Req() req: CustomRequest) {
    const data = await this.reviewService.getLogList(req.userId);

    return { data } as ApiResponseData;
  }

  @Post('wordList')
  @ApiResponse({ status: 200, description: 'success' })
  async create(
    @Body() createReviewLogs: CreateReviewDto[],
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    await this.reviewService.create(req.userId, createReviewLogs);
    res.status(HttpStatus.OK).json();
  }
}
