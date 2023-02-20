import { Blog } from "@tomersf/blog.shared";
import axios, { HttpStatusCode } from "axios";
import config from "../config";
import authService from "./authService";

const getAll = async (): Promise<Blog[]> => {
  const response = await axios.get(config.blogsUrl);
  return response.data;
};

const getUserBlogs = async (): Promise<Blog[]> => {
  const requestConfig = {
    headers: { Authorization: "Bearer " + authService.getToken() },
  };
  const response = await axios.get(config.userBlogsUrl, requestConfig);
  return response.data;
};

const createBlog = async (title: string, author: string, url: string) => {
  const requestConfig = {
    headers: { Authorization: "Bearer " + authService.getToken() },
  };
  try {
    const response = await axios.post(
      config.blogsUrl,
      {
        author,
        title,
        url,
        likes: 0,
      } as Blog,
      requestConfig
    );
    return response;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        msg: err.response?.data.msg,
        status: err.response?.status,
      };
    } else {
      return {
        msg: "Something went wrong",
        status: HttpStatusCode.InternalServerError,
      };
    }
  }
};

export default { getAll, createBlog, getUserBlogs };
