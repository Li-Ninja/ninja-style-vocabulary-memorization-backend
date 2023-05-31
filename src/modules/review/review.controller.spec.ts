import { getModelToken } from '@nestjs/mongoose';
import {
  Test, TestingModule,
} from '@nestjs/testing';
import { Model } from 'mongoose';
import { ReviewController } from './review.controller';
import { ReviewDocument } from './review.schema';
import { ReviewService } from './review.service';
import { getAggregateMockValue } from '@/utils/jest.util';

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let reviewModel: Model<ReviewDocument>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        ReviewService,
        {
          provide: getModelToken('Review'),
          useValue: {
            aggregate: jest.fn(),
          },
        },
      ],
    }).compile();

    reviewController = moduleRef.get<ReviewController>(ReviewController);
    reviewModel = moduleRef.get<Model<ReviewDocument>>(getModelToken('Review'));
  });

  describe('root', () => {
    it('should return a list"', async () => {
      // TODO ReadReviewWordDto
      const mockReviewData = [
        {
          word_id: '64633d60e3b2b4b21d821138',
          reviewInfo: {
            ratio: 5,
            minutes: 5,
            count: 3,
            initialReviewAt: '2023-05-16T08:22:56.748Z',
            nextReviewAt: '2023-05-16T10:27:56.748Z',
          },
          type: 'card',
          question: 'しがつ',
          answer: '四月',
          isFavorite: false,
        },
        {
          word_id: '64633d60e3b2b4b21d821141',
          reviewInfo: {
            ratio: 5,
            minutes: 5,
            count: 3,
            initialReviewAt: '2023-05-16T08:22:56.748Z',
            nextReviewAt: '2023-05-16T10:27:56.748Z',
          },
          type: 'card',
          question: 'なんがつ',
          answer: '幾月',
          isFavorite: false,
        },
      ];

      jest.spyOn(reviewModel, 'aggregate').mockReturnValue(getAggregateMockValue(mockReviewData));

      const result = await reviewController.getList();

      expect(result).toEqual({ data: mockReviewData });
    });
  });
});
