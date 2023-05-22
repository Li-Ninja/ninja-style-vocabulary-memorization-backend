import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './modules/word/word.module';
import { ReviewModule } from './modules/review/review.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env']
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_ACCOUNT}:${process.env.MONGODB_PASSWORD}@mycluster.xr8zjdk.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`
    ),
    AuthModule,
    ReviewModule,
    SocketModule,
    UserModule,
    WordModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
