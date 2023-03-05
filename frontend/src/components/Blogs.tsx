import { Blog as IBlog, ErrorType, ReturnedBlog } from "@tomersf/blog.shared";
import { HttpStatusCode } from "axios";
import React, { useEffect } from "react";
import blogService from "../services/blogService";
import { useStoreSelector } from "../store/hooks";
import Blog from "./Blog";

type Props = {
  all: boolean;
};

const Blogs = ({ all }: Props) => {
  const blogs = useStoreSelector((state) =>
    all ? state.blogs.blogs : state.blogs.myBlogs
  );
  const blogDeleteHandler = async (id: number) => {
    const result = await blogService.deleteBlog(id);
    if (result == HttpStatusCode.NoContent) {
      // setBlogs((oldBlogs) => oldBlogs.filter((blog) => blog.id !== id));
    }
  };

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
