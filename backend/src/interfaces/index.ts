import { Types } from "mongoose";

type Blog = {
  title: string;
  author: string;
  url: string;
  likes: number;
  user: Types.ObjectId;
};

type User = {
  username: string;
  name: string;
  blogs: Types.ObjectId[];
  passwordHash: string;
};

type JWTPayload = {
  username: string;
  id: string;
};

export type { Blog, User, JWTPayload };
