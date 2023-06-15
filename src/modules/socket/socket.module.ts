import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ReviewModule } from '../review/review.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [
    AuthModule,
    ReviewModule,
  ],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
