import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreSelector } from "../store/hooks";
import ActionButton from "./buttons/ActionButton";
type Props = {};

const UserMenu = (props: Props) => {
  const user = useStoreSelector((state) => state.user);
  const navigate = useNavigate();

  const createBlogHandler = () => {
    navigate("blog");
  };

  const myBlogsHandler = () => {
    navigate(`blogs/${user.username}`);
  };

  const allBlogsHandler = () => {
    navigate("blogs");
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex gap-6">
        {user.asGuest ? null : (
          <>
            <ActionButton
              handleOnClick={createBlogHandler}
              id="create-blog-menu-btn"
            >
              Create Blog
            </ActionButton>

            <ActionButton handleOnClick={myBlogsHandler}>My Blogs</ActionButton>
          </>
        )}
        <ActionButton handleOnClick={allBlogsHandler}>All Blogs</ActionButton>
      </div>
      <Outlet />
    </div>
  );
};

export default UserMenu;
