import { createSlice } from "@reduxjs/toolkit";
import { ReturnedBlog } from "@tomersf/blog.shared";
import guard from "../helpers/guard";
import {
  ActionSetBoolean,
  ActionAppendBlog,
  ActionSetBlogs,
  ActionSetMyBlogs,
} from "../interfaces";
import blogService from "../services/blogService";
import { ThunkFn } from "../store/store";

const initialState: {
  blogs: ReturnedBlog[];
  myBlogs: ReturnedBlog[];
  isCreateBlogError: boolean;
  isCreateBlogSuccess: boolean;
} = {
  blogs: [],
  myBlogs: [],
  isCreateBlogError: false,
  isCreateBlogSuccess: false,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setError(state, action: ActionSetBoolean) {
      state.isCreateBlogError = action.payload;
    },
    setSuccess(state, action: ActionSetBoolean) {
      state.isCreateBlogSuccess = action.payload;
    },
    appendBlog(state, action: ActionAppendBlog) {},
    setBlogs(state, action: ActionSetBlogs) {
      state.blogs = action.payload;
    },
    setMyBlogs(state, action: ActionSetMyBlogs) {
      state.myBlogs = state.blogs.filter(
        (blog) => blog.user.username == action.payload
      );
    },
  },
});

export const initializeBlogs = (username: string): ThunkFn => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    if (guard.isBlogsType(blogs)) {
      dispatch(setBlogs(blogs));
      dispatch(setMyBlogs(username));
    }
  };
};

export const createBlog = (args: {
  author: string;
  title: string;
  url: string;
}): ThunkFn => {
  return async (dispatch) => {
    const { title, author, url } = args;
    const isValid = validateInputs(author, title, url);
    if (!isValid) {
      dispatch(setError(true));
      dispatch(setSuccess(false));
      return;
    }
    const response = await blogService.createBlog(title, author, url);
    if (guard.isBlogType(response)) {
      dispatch(setError(false));
      dispatch(setSuccess(true));
    } else {
      dispatch(setError(true));
      dispatch(setSuccess(false));
    }
  };
};

const validateInputs = (author: string, title: string, url: string) => {
  if (
    author.length >= 5 &&
    title.length >= 3 &&
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
      url
    )
  ) {
    return true;
  }
  return false;
};

export const { appendBlog, setBlogs, setError, setSuccess, setMyBlogs } =
  blogSlice.actions;

export default blogSlice.reducer;
