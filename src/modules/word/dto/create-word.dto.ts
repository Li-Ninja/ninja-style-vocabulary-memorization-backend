import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { WordDocument } from '../word.schema';

export class CreateWordDto {
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
}
