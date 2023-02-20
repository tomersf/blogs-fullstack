import { Blog as IBlog } from "@tomersf/blog.shared";
import React, { useEffect, useState } from "react";
import blogService from "../services/blogService";
import Blog from "./Blog";

type Props = {};

const Blogs = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const fetchBlogs = async () => {
    const response = await blogService.getAll();
    setBlogs(response);
    console.log("%j", response[0].user);
    console.log(response);
    // NEED TO FIX, NOT GETTING THE POPULATED USER
    console.log(response[0].user);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="grid grid-cols-3">
      {blogs ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />) : ""}
    </div>
  );
};

export default Blogs;
