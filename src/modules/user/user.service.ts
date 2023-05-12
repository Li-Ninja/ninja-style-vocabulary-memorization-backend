import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoUserGet } from 'src/types/user';
import { ReadAuthLoginDto } from 'src/modules/auth/dto/read-authLogin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async getAll() {
    return await this.userModel.aggregate()
      .project({
        password: 0
      })
      .exec() as Omit<MongoUserGet, 'password'>[];
  }

  async getByAccount(account: ReadAuthLoginDto['account']) {
    return await this.userModel.aggregate()
      .match({
        account: account
      })
      .exec() as MongoUserGet[];
  }

  async create(user: CreateUserDto) {
    const userList = await this.getByAccount(user.account);

    if (userList.length > 0) {
      // TODO 帳號重複

      return;
    }

    const data: User[] = [{
      account: user.account,
      email: user.email,
      password: bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS))
    }]

    return await this.userModel.insertMany(data);
  }
}