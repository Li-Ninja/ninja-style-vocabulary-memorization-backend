import { Dayjs } from 'dayjs';
import { UserDocument } from '@/modules/user/user.schema';

export interface WordText {
  type: string;
  question: string;
  answer: string;
}
export interface Word {
  user_id: UserDocument['_id'];
  tags: string[];
  nativeLanguage: number;
  learnLanguage: number;
  text: WordText;
  isClosed: boolean;
  isFavorite: boolean;
  createAt: Dayjs;
  updateAt: Dayjs;
}
