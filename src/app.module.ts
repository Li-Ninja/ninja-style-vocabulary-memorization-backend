import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './modules/word/word.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_ACCOUNT}:${process.env.MONGODB_PASSWORD}@mycluster.xr8zjdk.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`
    ),
    WordModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
