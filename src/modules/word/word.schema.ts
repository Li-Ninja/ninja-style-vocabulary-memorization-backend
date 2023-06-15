import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Dayjs } from 'dayjs';
import {
  HydratedDocument, Types,
} from 'mongoose';
import { User } from '@/modules/user/user.schema';
import {
  Word as IWord, WordText,
} from '@/types/word';

@Schema()
export class Word {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  @ApiProperty({
    example: 0,
    format: 'string',
    required: true,
  })
    user_id: IWord['user_id'];

  @Prop({ type: Array, required: true })
  @ApiProperty({
    example: ['life', 'restaurant'],
    format: 'string[]',
    required: true,
  })
    tags: string[];

  @Prop({ type: Number, required: true })
  @ApiProperty({
    example: 1,
    format: 'number',
    required: true,
  })
    nativeLanguage: number;

  @Prop({ type: Number, required: true })
  @ApiProperty({
    example: 2,
    format: 'number',
    required: true,
  })
    learnLanguage: number;

  @Prop({ type: Object, required: true })
  @ApiProperty({
    example: {
      type: 'card',
      question: 'お茶',
      answer: '茶',
    } as WordText,
    format: 'Object',
    required: true,
  })
    text: WordText;

  @Prop({ type: Boolean, required: true })
  @ApiProperty({
    example: false,
    format: 'boolean',
    required: true,
  })
    isClosed: boolean;

  @Prop({ type: Boolean, required: true })
  @ApiProperty({
    example: false,
    format: 'boolean',
    required: true,
  })
    isFavorite: boolean;

  @Prop({ type: Date, required: true })
  @ApiProperty({
    example: '2022-07-18T16:00:00.000+00:00',
    format: 'Date',
    required: true,
  })
    createAt: Dayjs;

  @Prop({ type: Date, required: true })
  @ApiProperty({
    example: '2022-07-18T16:00:00.000+00:00',
    format: 'Date',
    required: true,
  })
    updateAt: Dayjs;
}

export type WordDocument = HydratedDocument<Word>;
export const WordSchema = SchemaFactory.createForClass(Word);
