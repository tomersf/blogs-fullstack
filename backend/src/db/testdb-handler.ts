import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = MongoMemoryServer.create();
/**
 * Connect to the in-memory database.
 */
const connectTestDB = async () => {
  const uri = (await mongod).getUri();
  return mongoose.connect(uri);
};

/**
 * Drop database, close the connection and stop mongod.
 */
const closeTestDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  (await mongod).stop();
};

/**
 * Remove all the data for all db collections.
 */
const clearTestDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export { connectTestDB, clearTestDatabase, closeTestDatabase };
