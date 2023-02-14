import { Blog } from "@tomersf/blog.shared";
import axios from "axios";
import config from "../config";

const getAll = (): Promise<Blog[]> => {
  const request = axios.get(config.blogsUrl);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
