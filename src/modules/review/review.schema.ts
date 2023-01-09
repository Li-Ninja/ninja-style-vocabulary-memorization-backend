import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as dayjs from 'dayjs';
import { ApiProperty } from '@nestjs/swagger';
import { Word } from 'src/modules/word/word.schema';
import { ReviewLog } from 'src/types/review';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop({type: Types.ObjectId, ref: Word.name, required: true })
  @ApiProperty({
    example: 0,
    format: 'string',
    required: true
  })
  word_id: ReviewLog['word_id'];


  @Prop({type: Boolean || null, required: false })
  @ApiProperty({
    example: false,
    format: 'boolean',
    required: true
  })
  isCorrect: ReviewLog['isCorrect'];

  @Prop({type: Date, required: true })
  @ApiProperty({
    example: '2022-07-18T16:00:00.000+00:00',
    format: 'Date',
    required: true
  })
  createAt: dayjs.Dayjs;

  @Prop({
    type: {
      ratio: Number,
      minutes: Number,
      count: Number,
      initialReviewAt: Date,
      nextReviewAt: Date
    },
    _id: false,
    required: true
  })
  @ApiProperty({
    example: {
      ratio: 5,
      minutes: 10,
      count: 1,
      initialReviewAt: dayjs(),
      nextReviewAt: dayjs()
    } as ReviewLog['reviewInfo'],
    format: 'Object',
    required: true
  })
  reviewInfo: ReviewLog['reviewInfo'];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

