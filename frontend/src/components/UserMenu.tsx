import React, { useState } from "react";
import ActionButton from "./ActionButton";
import Blogs from "./Blogs";
import CreateBlogForm from "./CreateBlogForm";

type Props = {};

const UserMenu = (props: Props) => {
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [isViewingAllBlogs, setIsViewingAllBlogs] = useState(false);
  const [isViewingMyBlogs, setIsViewingMyBlogs] = useState(false);

  const createBlogHandler = () => {
    setIsCreatingBlog(true);
    setIsViewingAllBlogs(false);
    setIsViewingMyBlogs(false);
  };

  const myBlogsHandler = () => {
    setIsCreatingBlog(false);
    setIsViewingAllBlogs(false);
    setIsViewingMyBlogs(true);
  };

  const allBlogsHandler = () => {
    setIsCreatingBlog(false);
    setIsViewingAllBlogs(true);
    setIsViewingMyBlogs(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex gap-6">
        <ActionButton handleOnClick={createBlogHandler}>
          Create Blog
        </ActionButton>
        <ActionButton handleOnClick={allBlogsHandler}>My Blogs</ActionButton>
        <ActionButton handleOnClick={myBlogsHandler}>All Blogs</ActionButton>
      </div>
      {isCreatingBlog ? <CreateBlogForm /> : null}
      {isViewingMyBlogs ? <Blogs all={false} /> : null}
      {isViewingAllBlogs ? <Blogs /> : null}
    </div>
  );
};

export default UserMenu;
