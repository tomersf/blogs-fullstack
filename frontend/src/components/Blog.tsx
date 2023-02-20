import { Blog as IBlog, ReturnedBlog } from "@tomersf/blog.shared";
import { HttpStatusCode } from "axios";
import { useContext, useState } from "react";
import NameContext from "../context/name";
import ThemeContext from "../context/theme";
import blogService from "../services/blogService";
import ActionButton from "./ActionButton";

type Props = {
  blog: ReturnedBlog;
  onDelete: (id: number) => void;
};

const Blog = ({ blog, onDelete }: Props) => {
  const themeContext = useContext(ThemeContext);
  const nameContext = useContext(NameContext);
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
      <div className="flex w-full items-center justify-between">
        <div>{`@${blog.user.username}`}</div>
        {blog.user.username == nameContext.name ? (
          <ActionButton
            extraStyles="w-1/3 rounded-md h-[30px] m-1"
            handleOnClick={deleteBlogHandler}
          >
            Delete
          </ActionButton>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
