import { ReturnedBlog, User } from "@tomersf/blog.shared";

interface LoginPayload {
  success: boolean;
  token?: string;
}

interface ActionWithBlogPayload {
  type: string;
  payload: ReturnedBlog;
}

interface ActionWithBlogsPayload {
  type: string;
  payload: ReturnedBlog[];
}

interface ActionLogIn {
  type: string;
  payload: string;
}

export type {
  LoginPayload,
  ActionWithBlogPayload,
  ActionLogIn,
  ActionWithBlogsPayload,
};
