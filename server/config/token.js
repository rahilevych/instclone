import dotenv from 'dotenv';

dotenv.config();
export const secret = process.env.TOKEN_SECRET;
