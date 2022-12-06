import {
  Controller,
  Get,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'success'})
  @HttpCode(HttpStatus.OK)
  getList() {
    return this.reviewService.getAll();
  }

  @Get('logList')
  @ApiResponse({ status: 200, description: 'success'})
  @HttpCode(HttpStatus.OK)
  getLogList() {
    return this.reviewService.getLogList();
  }
}