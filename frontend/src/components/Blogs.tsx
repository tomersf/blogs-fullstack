import { Blog as IBlog, ErrorType, ReturnedBlog } from "@tomersf/blog.shared";
import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import guard from "../helpers/guard";
import blogService from "../services/blogService";
import Blog from "./Blog";

type Props = {
  all: boolean;
};

const Blogs = ({ all }: Props) => {
  const [blogs, setBlogs] = useState<ReturnedBlog[]>([]);
  const fetchBlogs = async () => {
    let response;
    if (all) {
      response = await blogService.getAll();
    } else {
      response = await blogService.getUserBlogs();
    }
    if (guard.isBlogsType(response)) {
      setBlogs(response);
    } else {
      setBlogs([]);
    }
  };

  const blogDeleteHandler = async (id: number) => {
    const result = await blogService.deleteBlog(id);
    if (result == HttpStatusCode.NoContent) {
      setBlogs((oldBlogs) => oldBlogs.filter((blog) => blog.id !== id));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="mt-5 grid w-full max-w-sm grid-cols-3 gap-3 md:max-w-2xl">
      {blogs.length > 0
        ? blogs.map((blog) => (
            <Blog onDelete={blogDeleteHandler} key={blog.id} blog={blog} />
          ))
        : "No Blogs to display"}
    </div>
  );
};

export default Blogs;
