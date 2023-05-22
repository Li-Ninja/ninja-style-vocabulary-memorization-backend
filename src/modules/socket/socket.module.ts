import { Module } from '@nestjs/common';
import { ReviewModule } from '../review/review.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [
    ReviewModule
  ],
  providers: [SocketGateway]
})
export class SocketModule {}
