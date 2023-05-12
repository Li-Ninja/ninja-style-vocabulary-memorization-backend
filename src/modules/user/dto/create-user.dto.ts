import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty
} from 'class-validator';
import { UserDocument } from '../user.schema';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'account',
    format: 'string',
    required: true
  })
  readonly account: UserDocument['account'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'email@gmail.com',
    format: 'string',
    required: true
  })
  readonly email: UserDocument['email'];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'password',
    format: 'string',
    required: true
  })
  readonly password: UserDocument['password'];
}
