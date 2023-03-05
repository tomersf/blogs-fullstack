import { createSlice } from "@reduxjs/toolkit";
import { ReturnedBlog } from "@tomersf/blog.shared";
import guard from "../helpers/guard";
import { ActionWithBlogPayload, ActionWithBlogsPayload } from "../interfaces";
import blogService from "../services/blogService";
import { ThunkFn } from "../store/store";

const initialState: ReturnedBlog[] = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    createBlog(state, action: ActionWithBlogPayload) {
      state.push(action.payload);
    },
    appendBlog(state, action: ActionWithBlogPayload) {
      state.push(action.payload);
    },
    setBlogs(state, action: ActionWithBlogsPayload) {
      return action.payload;
    },
  },
});

export const initializeBlogs = (): ThunkFn => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    if (guard.isBlogsType(blogs)) {
      dispatch(setBlogs(blogs));
    }
  };
};

export const { createBlog, appendBlog, setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
