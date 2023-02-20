import { Blog as IBlog } from "@tomersf/blog.shared";
import React, { useEffect, useState } from "react";
import blogService from "../services/blogService";
import Blog from "./Blog";

type Props = {
  all: boolean;
};

const Blogs = ({ all }: Props) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const fetchBlogs = async () => {
    let response;
    if (all) {
      response = await blogService.getAll();
    } else {
      response = await blogService.getUserBlogs();
    }
    setBlogs(response);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="mt-5 grid w-full max-w-sm grid-cols-3 md:max-w-2xl">
      {blogs ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />) : ""}
    </div>
  );
};

export default Blogs;
