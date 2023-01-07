import { ApiProperty } from '@nestjs/swagger';
import {
  IsObject,
  IsString,
  IsNotEmpty
} from 'class-validator';
import * as dayjs from 'dayjs';
import { WordDocument } from '../../word/word.schema';
import { ReviewDocument } from '../review.schema';

export class ReadReviewDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0',
    format: 'string',
    required: true
  })
  readonly id: ReviewDocument['word_id'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: true,
    format: 'boolean',
    required: true
  })
  readonly isFavorite: WordDocument['isFavorite'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'card',
    format: 'string',
    required: true
  })
  readonly type: WordDocument['text']['type'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '火曜日',
    format: 'string',
    required: true
  })
  readonly question: WordDocument['text']['question'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '星期二',
    format: 'string',
    required: true
  })
  readonly answer: WordDocument['text']['answer'];

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    example: {
      ratio: 5,
      minutes: 10,
      count: 1,
      initialReviewAt: dayjs(),
      nextReviewAt: dayjs()
    } as ReviewDocument['reviewInfo'],
    format: 'Object',
    required: true
  })
  readonly reviewInfo: ReviewDocument['reviewInfo'];
}
