import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word {
  @Prop({ type: Number, required: true })
  @ApiProperty({
    example: 0,
    format: 'number',
    required: true
  })
  reviewCount: number;

  @Prop({ type: Array, required: true })
  @ApiProperty({
    example: ['life', 'restaurant'],
    format: 'string[]',
    required: true
  })
  tags: string[];

  @Prop({type: String, required: true })
  @ApiProperty({
    example: 'chinese',
    format: 'string',
    required: true
  })
  nativeLanguage: string;

  @Prop({type: String, required: true })
  @ApiProperty({
    example: 'japanese',
    format: 'string',
    required: true
  })
  learnLanguage: string;

  @Prop({type: Object, required: true })
  @ApiProperty({
    example: {
      type: 'card',
      question: 'お茶',
      answer: '茶'
    } as WordText,
    format: 'Object',
    required: true
  })
  // TODO can't get interface
  // text: WordText
  text: object;

  @Prop({type: Boolean, required: true })
  @ApiProperty({
    example: false,
    format: 'boolean',
    required: true
  })
  isClosed: boolean;


  @Prop({type: Date, required: true })
  @ApiProperty({
    example: '2022-07-18T16:00:00.000+00:00',
    format: 'Date',
    required: true
  })
  reviewAt: Date;

  @Prop({type: Date, required: true })
  @ApiProperty({
    example: '2022-07-18T16:00:00.000+00:00',
    format: 'Date',
    required: true
  })
  updateAt: Date;
}

export const WordSchema = SchemaFactory.createForClass(Word);

