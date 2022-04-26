import { config } from "dotenv";
config();

export const PORT = process.env.PORT || process.env.APP_PORT || 3000;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
