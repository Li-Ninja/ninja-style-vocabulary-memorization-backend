import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import * as dayjs from 'dayjs';
import { WordDocument } from '../../word/word.schema';
import { ReviewDocument } from '../review.schema';

export class ReadReviewLogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0',
    format: 'string',
    required: true,
  })
  readonly _id: ReviewDocument['_id'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0',
    format: 'string',
    required: true,
  })
  readonly word_id: ReviewDocument['word_id'];

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: dayjs.Dayjs,
    format: 'Date',
    required: true,
  })
  readonly createAt: ReviewDocument['createAt'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'card',
    format: 'string',
    required: true,
  })
  readonly type: WordDocument['text']['type'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '火曜日',
    format: 'string',
    required: true,
  })
  readonly question: WordDocument['text']['question'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '星期二',
    format: 'string',
    required: true,
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
      nextReviewAt: dayjs(),
    } as ReviewDocument['reviewInfo'],
    format: 'Object',
    required: true,
  })
  readonly reviewInfo: ReviewDocument['reviewInfo'];
}
