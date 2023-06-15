import { Injectable } from '@nestjs/common';
import {
  Cron, CronExpression,
} from '@nestjs/schedule';
import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class CronService {
  constructor(
    private readonly socketGateway: SocketGateway,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleWordReviewNotify() {
    this.socketGateway.sendWordReviewNotify();
  }
}
