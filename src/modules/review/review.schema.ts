import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Dayjs } from 'dayjs';
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


  @Prop({type: Boolean, required: true })
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
  createAt: Dayjs;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

