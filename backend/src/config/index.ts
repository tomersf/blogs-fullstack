import { config } from "dotenv";
config();

type MongoDBConnections = {
    BLOGS_URL?: string,
    PERSONS_URL?: string
}

const PORT = process.env.PORT
const MONGODB_URLS : MongoDBConnections= {
    BLOGS_URL: process.env.NODE_ENV === 'test' ? process.env.TEST_BLOGS_MONGODB_URI : process.env.PROD_BLOGS_MONGODB_URI,
    PERSONS_URL: process.env.NODE_ENV === 'test' ? process.env.TEST_PERSONS_MONGODB_URI : process.env.PROD_PERSONS_MONGODB_URI
}


export default {PORT,MONGODB_URLS}