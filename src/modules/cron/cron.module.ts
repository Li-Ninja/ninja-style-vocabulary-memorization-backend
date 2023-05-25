import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReviewModule } from '../review/review.module';
import { SocketModule } from '../socket/socket.module';
import { CronService } from './cron.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ReviewModule,
    SocketModule,
  ],
  providers: [CronService],
})

export class CronModule {}
