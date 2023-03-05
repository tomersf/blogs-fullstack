import { ReturnedBlog, User } from "@tomersf/blog.shared";

interface LoginPayload {
  success: boolean;
  token?: string;
}

interface Action {
  type: string;
  payload: any;
}

interface ActionSetBoolean extends Action {
  payload: boolean;
}

interface ActionAppendBlog extends Action {
  payload: { author: string; title: string; url: string };
}

interface ActionSetBlogs extends Action {
  payload: ReturnedBlog[];
}

interface ActionSetMyBlogs extends Action {
  payload: string;
}

interface ActionLogIn {
  type: string;
  payload: string;
}

export type {
  LoginPayload,
  ActionAppendBlog,
  ActionSetBlogs,
  ActionSetBoolean,
  ActionSetMyBlogs,
  ActionLogIn,
};
