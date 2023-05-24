import { Request } from 'express';

export interface ApiResponseData {
  data: any;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface CustomRequest extends Request {
  userAccount: string;
}
