import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty
} from 'class-validator';


export class CreateWordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'card',
    format: 'string',
    required: true
  })
  readonly type: WordText['type'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '火曜日',
    format: 'string',
    required: true
  })
  readonly question: WordText['question'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '星期二',
    format: 'string',
    required: true
  })
  readonly answer: WordText['answer'];
}
