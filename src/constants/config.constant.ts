import * as dotenv from 'dotenv';

dotenv.config();

export const corsOrigin = process.env.IS_DEV === 'true' ? new RegExp('http://localhost'): new RegExp('ninjaccc.com');
