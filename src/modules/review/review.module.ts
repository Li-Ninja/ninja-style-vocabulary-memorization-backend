import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './review.schema';
import { ReviewService } from './review.service';
import { WordModule } from '../word/word.module';

@Module({
  imports: [
    WordModule,
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema
      }
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})

export class ReviewModule {}