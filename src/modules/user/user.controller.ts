import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  async getAll(@Res() res: Response) {
    const data = await this.userService.getAll();

    res.json(data);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'success' })
  async create(
    @Body() createUser: CreateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.create(createUser);

    res.status(HttpStatus.OK).json();
  }
}
