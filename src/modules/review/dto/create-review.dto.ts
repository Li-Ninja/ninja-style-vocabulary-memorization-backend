import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsObject,
  IsString,
  IsNotEmpty
} from 'class-validator';
import * as dayjs from 'dayjs';
import { ReviewDocument } from '../review.schema';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0',
    format: 'string',
    required: true
  })
  readonly word_id: ReviewDocument['word_id'];

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    format: 'boolean',
    required: true
  })
  readonly isCorrect: ReviewDocument['isCorrect'];

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    example: {
      ratio: 5,
      minutes: 10,
      count: 1,
      initialReviewAt: dayjs()
    } as Omit<ReviewDocument['reviewInfo'], 'nextReviewAt'>,
    format: 'Object',
    required: true
  })
  readonly reviewInfo: Omit<ReviewDocument['reviewInfo'], 'nextReviewAt'>;
}
