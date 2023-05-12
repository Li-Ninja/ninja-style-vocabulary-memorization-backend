import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReadAuthLoginDto } from './dto/read-authLogin.dto';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: ReadAuthLoginDto) {
    const userList = await this.userService.getByAccount(data.account);

    if (userList.length !== 1) {
      // TODO Log
      return false;
    }

    const isValid = bcrypt.compareSync(data.password, userList[0].password);

    if (isValid) {
      const token = await this.jwtService.signAsync(
        {
          id: userList[0]._id,
          account: userList[0].account
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      );

      return token;
    } else {
      return false;
    }
  }
}