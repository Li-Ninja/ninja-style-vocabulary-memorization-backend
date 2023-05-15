import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  @ApiProperty({
    example: 'account',
    format: 'string',
    minLength: 6,
    maxLength: 20,
    required: true
  })
  account: string;

  @Prop({ type: String, required: true })
  @ApiProperty({
    example: 'email@gmail.com',
    format: 'string',
    required: true
  })
  email: string;

  @Prop({ type: String, required: true })
  @ApiProperty({
    example: 'password',
    format: 'string',
    minLength: 6,
    maxLength: 30,
    required: true
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
