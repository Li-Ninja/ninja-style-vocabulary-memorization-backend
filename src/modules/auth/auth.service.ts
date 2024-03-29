import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ReadAuthLoginDto } from './dto/read-authLogin.dto';
import { UserService } from '@/modules/user/user.service';
import { CustomRequest } from '@/types/api.d';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateToken(headers: CustomRequest['headers']): Promise<{ user_id: string; account: string }> {
    const token = AuthService.extractTokenFromHeader(headers);

    if (!token) {
      throw new ForbiddenException();
    }

    try {
      const user: { user_id: string; account: string } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return user;
    } catch {
      throw new ForbiddenException();
    }
  }

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
          user_id: userList[0]._id,
          account: userList[0].account,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      );

      return token;
    }

    return false;
  }

  static extractTokenFromHeader(headers: CustomRequest['headers']): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
