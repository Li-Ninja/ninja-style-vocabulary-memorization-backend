import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'success'})
  async getAll(@Res() res: Response) {
    const data = await this.userService.getAll();

    res.json(data);
  }

  // TODO create account
}
