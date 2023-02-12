import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : undefined;
const isDev = process.env.NODE_ENV === "development" ? true : false;
const isTest = process.env.NODE_ENV === "test" ? true : false;
const isProd = process.env.NODE_ENV === "production" ? true : false;
const JWT_SECRET = process.env.JWT_SECRET || "simplesecret";

const appConfig = {
  PORT,
  MONGODB_URI,
  isDev,
  isTest,
  isProd,
  JWT_SECRET,
};

export default appConfig;
