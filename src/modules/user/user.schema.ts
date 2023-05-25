import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: String, required: true })
  @ApiProperty({
    example: 'account',
    format: 'string',
    minLength: 6,
    maxLength: 20,
    required: true,
  })
    account: string;

  @Prop({ type: String, required: true })
  @ApiProperty({
    example: 'email@gmail.com',
    format: 'string',
    required: true,
  })
    email: string;

  @Prop({ type: String, required: true })
  @ApiProperty({
    example: 'password',
    format: 'string',
    minLength: 6,
    maxLength: 30,
    required: true,
  })
    password: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
