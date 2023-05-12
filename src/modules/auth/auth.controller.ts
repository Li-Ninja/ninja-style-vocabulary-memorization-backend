import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ReadAuthLoginDto } from './dto/read-authLogin.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: 'success'})
  async login(@Body() readAuthLogin: ReadAuthLoginDto, @Res() res: Response) {
    const successToken = await this.authService.validateUser(readAuthLogin);

    if (successToken) {
        res.status(HttpStatus.OK).json({
          token: successToken
        });
    } else {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({
          message: 'Invalid account or password'
        });
    }
  }
}