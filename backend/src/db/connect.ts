import mongoose from "mongoose";
import appConfig from "../config";
import { connectTestDB } from "./testdb-handler";

const connectDB = () => {
  if (!appConfig.isProd) return connectTestDB();
  if (!appConfig.MONGODB_URI)
    throw new Error("Unable to connect to prod DB with empty string");
  return mongoose.connect(appConfig.MONGODB_URI.replace(" ", ""));
};
export default connectDB;
