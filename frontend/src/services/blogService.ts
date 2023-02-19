import { Blog } from "@tomersf/blog.shared";
import axios from "axios";
import config from "../config";
import authService from "./authService";

const getAll = async (): Promise<Blog[]> => {
  const response = await axios.get(config.blogsUrl);
  return response.data;
};

const createBlog = async (title: string, author: string, url: string) => {
  const requestConfig = {
    headers: { Authorization: "Bearer " + authService.getToken() },
  };

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

  return response.data;
};

export default { getAll, createBlog };
