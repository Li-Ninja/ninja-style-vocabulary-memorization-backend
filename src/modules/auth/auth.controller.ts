import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponseData } from 'src/types/api';
import { SkipJwtAuth } from './auth.const';
import { AuthService } from './auth.service';
import { ReadAuthLoginDto } from './dto/read-authLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @SkipJwtAuth()
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  async login(@Body() readAuthLogin: ReadAuthLoginDto, @Res() res: Response) {
    const successToken = await this.authService.validateUser(readAuthLogin);

    if (successToken) {
      res.status(HttpStatus.OK).json({
        data: {
          token: successToken,
        },
      } as ApiResponseData);
    } else {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({
          data: null,
          message: 'Invalid account or password',
        } as ApiResponseData);
    }
  }
}
