import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { UserDocument } from '@/modules/user/user.schema';

export class ReadAuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'account',
    format: 'string',
    required: true,
  })
  readonly account: UserDocument['account'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'password',
    format: 'string',
    required: true,
  })
  readonly password: UserDocument['password'];
}
