import { Types } from "mongoose";

type Blog = {
  title: string;
  author: string;
  url: string;
  likes: number;
  user: Types.ObjectId;
  id?: number;
};

type User = {
  username: string;
  blogs: Types.ObjectId[];
  passwordHash?: string;
  id?: number;
};

type JWTPayload = {
  username: string;
  id: string;
};

type DecodedTokenPayload = {
  exp: number;
  iat: number;
  id: string;
  username: string;
};

export type { Blog, User, JWTPayload, DecodedTokenPayload };