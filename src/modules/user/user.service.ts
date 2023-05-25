import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import {
  User, UserDocument,
} from './user.schema';
import { ReadAuthLoginDto } from '@/modules/auth/dto/read-authLogin.dto';
import { MongoUserGet } from '@/types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll() {
    return await this.userModel.aggregate()
      .project({
        password: 0,
      })
      .exec() as Omit<MongoUserGet, 'password'>[];
  }

  async getByAccount(account: ReadAuthLoginDto['account']) {
    return await this.userModel.aggregate()
      .match({
        account,
      })
      .exec() as MongoUserGet[];
  }

  async create(user: CreateUserDto) {
    const userList = await this.getByAccount(user.account);

    if (userList.length > 0) {
      // TODO 帳號重複

      return false;
    }

    const data: User[] = [{
      account: user.account,
      email: user.email,
      password: bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS, 10)),
    }];

    await this.userModel.insertMany(data);

    return true;
  }
}
