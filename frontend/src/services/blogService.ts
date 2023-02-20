import { Blog, ErrorType, ReturnedBlog } from "@tomersf/blog.shared";
import axios from "axios";
import config from "../config";
import { errorHandler } from "./errorHandler";

const getAll = async (): Promise<ReturnedBlog[] | ErrorType> => {
  try {
    const response = await axios.get(config.blogsUrl);
    return response.data;
  } catch (err) {
    return errorHandler(err);
  }
};

const getUserBlogs = async (): Promise<ReturnedBlog[] | ErrorType> => {
  try {
    const response = await axios.get(
      config.userBlogsUrl,
      config.requestConfig()
    );
    return response.data;
  } catch (err) {
    return errorHandler(err);
  }
};

const createBlog = async (
  title: string,
  author: string,
  url: string
): Promise<Blog | ErrorType> => {
  try {
    const response = await axios.post(
      config.blogsUrl,
      {
        author,
        title,
        url,
        likes: 0,
      } as Blog,
      config.requestConfig()
    );
    return response.data;
  } catch (err) {
    return errorHandler(err);
  }
};

const updateBlog = async (blog: Blog): Promise<Blog | ErrorType> => {
  try {
    const response = await axios.put(
      `${config.blogsUrl}/${blog.id}`,
      {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes,
      } as Blog,
      config.requestConfig()
    );
    return response.data;
  } catch (err) {
    return errorHandler(err);
  }
};

const deleteBlog = async (id: number) => {
  try {
    const response = await axios.delete(
      `${config.blogsUrl}/${id}`,
      config.requestConfig()
    );
    return response.status;
  } catch (err) {
    return errorHandler(err);
  }
};

export default { getAll, createBlog, getUserBlogs, updateBlog, deleteBlog };
