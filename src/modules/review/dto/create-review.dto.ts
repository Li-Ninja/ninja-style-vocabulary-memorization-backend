import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty
} from 'class-validator';
import { ReviewDocument } from '../review.schema';

export class CreateReviewDto {
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
    example: 'true',
    format: 'boolean',
    required: true
  })
  readonly isCorrect: ReviewDocument['isCorrect'];
}
