import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import {
  HydratedDocument, Types,
} from 'mongoose';
import { Word } from 'src/modules/word/word.schema';
import { Review as IReview } from 'src/types/review';

@Schema()
export class Review {
  @Prop({ type: Types.ObjectId, ref: Word.name, required: true })
  @ApiProperty({
    example: 0,
    format: 'string',
    required: true,
  })
    word_id: IReview['word_id'];

  @Prop({ type: Boolean || null, required: false })
  @ApiProperty({
    example: false,
    format: 'boolean',
    required: true,
  })
    isCorrect: IReview['isCorrect'];

  @Prop({ type: Date, required: true })
  @ApiProperty({
    example: '2022-07-18T16:00:00.000+00:00',
    format: 'Date',
    required: true,
  })
    createAt: dayjs.Dayjs;

  @Prop({
    type: {
      ratio: Number,
      minutes: Number,
      count: Number,
      initialReviewAt: Date,
      nextReviewAt: Date,
    },
    _id: false,
    required: true,
  })
  @ApiProperty({
    example: {
      ratio: 5,
      minutes: 10,
      count: 1,
      initialReviewAt: dayjs(),
      nextReviewAt: dayjs(),
    } as IReview['reviewInfo'],
    format: 'Object',
    required: true,
  })
    reviewInfo: IReview['reviewInfo'];
}

export type ReviewDocument = HydratedDocument<Review>;
export const ReviewSchema = SchemaFactory.createForClass(Review);
