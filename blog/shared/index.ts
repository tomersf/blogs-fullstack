import { Types } from "mongoose";

type Blog = {
  title: string;
  author: string;
  url: string;
  likes: number;
  user: Types.ObjectId | string;
  id?: number;
};

type ReturnedBlog = Blog & { user: { username: string; id: string } };

type User = {
  username: string;
  blogs: Types.ObjectId[];
  passwordHash?: string;
  id?: number;
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: 0 | 1;
};

type PopulatedOptionalFields<T> = Partial<OptionsFlags<T>>;

type JWTPayload = {
  username: string;
  id: string;
};

type ErrorType = {
  msg: string;
  status: number;
};

type DecodedTokenPayload = {
  exp: number;
  iat: number;
  id: string;
  username: string;
};

export type {
  Blog,
  User,
  JWTPayload,
  DecodedTokenPayload,
  PopulatedOptionalFields,
  ErrorType,
  ReturnedBlog,
};
