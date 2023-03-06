import { Blog as IBlog, ReturnedBlog } from "@tomersf/blog.shared";
import { HttpStatusCode } from "axios";
import { useContext, useState } from "react";
import NameContext from "../context/name";
import ThemeContext from "../context/theme";
import blogService from "../services/blogService";
import { useStoreSelector } from "../store/hooks";
import ActionButton from "./ActionButton";

type Props = {
  blog: ReturnedBlog;
  onDelete: (id: number) => void;
};

const Blog = ({ blog, onDelete }: Props) => {
  const themeContext = useContext(ThemeContext);
  const user = useStoreSelector((state) => state.user);
  const [likes, setLikes] = useState(blog.likes);

  const increaseLikeHandler = () => {
    setLikes((likes) => likes + 1);
    blogService.updateBlog({ ...blog, likes: likes + 1 });
  };

  const deleteBlogHandler = () => {
    onDelete(blog.id!);
  };

  let baseStyles, styles;
  baseStyles =
    "flex h-full w-full flex-col items-center justify-around rounded-lg border-2 p-3 gap-2";
  if (themeContext.isDark) {
    styles =
      "bg-primary-light text-primary-light bg-transparent border-primary-light";
  } else {
    styles =
      "bg-secondary-dark bg-secondary-dark bg-transparent border-secondary-dark";
  }
  baseStyles = `${baseStyles} ${styles}`;
  return (
    <div className={baseStyles}>
      <h1>Title: {blog.title}</h1>
      <div>Author: {blog.author}</div>
      <div>Likes: {likes}</div>
      {
        <ActionButton
          extraStyles="w-1/3 rounded-md h-[30px] m-1"
          handleOnClick={increaseLikeHandler}
        >
          LIKE
        </ActionButton>
      }
      <a className="underline" href={`http://${blog.url}`}>
        Link
      </a>
      <div className="flex w-full flex-col">
        <div>{`@${
          blog.user.username.length > 20
            ? `${blog.user.username.slice(0, 20)}...`
            : blog.user.username
        }`}</div>
        {blog.user.username == user.username ? (
          <div className="flex justify-center">
            <ActionButton
              extraStyles="w-1/2 rounded-md h-[30px] m-1"
              handleOnClick={deleteBlogHandler}
            >
              Delete
            </ActionButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
