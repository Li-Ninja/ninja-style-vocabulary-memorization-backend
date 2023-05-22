import * as dotenv from 'dotenv';

dotenv.config();

export const corsOrigin = new RegExp(process.env.CORS_ORIGIN);
