import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : undefined;
const isDev = process.env.NODE === "development" ? true : false;
const isTest = process.env.NODE === "test" ? true : false;
const isProd = process.env.NODE === "production" ? true : false;

const appConfig = {
  PORT,
  MONGODB_URI,
  isDev,
  isTest,
  isProd,
};

export default appConfig;
