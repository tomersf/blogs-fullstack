import { Blog } from "@tomersf/blog.shared";
import axios from "axios";
import config from "../config";
import authService from "./authService";

const getAll = (): Promise<Blog[]> => {
  const request = axios.get(config.blogsUrl);
  return request.then((response) => response.data);
};

const createBlog = async (title: string, author: string, url: string) => {
  const requestConfig = {
    headers: { Authorization: "Bearer " + authService.getToken() },
  };

  console.log(authService.getToken());
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
