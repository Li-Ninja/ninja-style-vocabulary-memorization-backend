import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModule } from 'src/modules/review/review.module';
import { WordController } from './word.controller';
import {
  Word, WordSchema,
} from './word.schema';
import { WordService } from './word.service';

@Module({
  imports: [
    ReviewModule,
    MongooseModule.forFeature([
      {
        name: Word.name,
        schema: WordSchema,
      },
    ]),
  ],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
