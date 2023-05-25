import { UserDocument } from 'src/modules/user/user.schema';

export interface MongoUserGet {
  _id: UserDocument['_id'];
  account: UserDocument['account'];
  email: UserDocument['email'];
  password: UserDocument['password'];
}
