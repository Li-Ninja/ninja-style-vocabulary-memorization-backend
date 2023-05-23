import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReviewService } from '../review/review.service';
import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class CronService {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly socketGateway: SocketGateway
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleWordReviewNotify() {
    const wordList = await this.reviewService.getWordList();

    if (wordList.length === 0) {
      return;
    }

    // TODO only notify the user who need to review
    this.socketGateway.sendWordReviewNotify(wordList.length);
  }
}