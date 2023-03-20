import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ReturnedBlog } from "@tomersf/blog.shared";
import { useContext, useState } from "react";
import ThemeContext from "../context/theme";
import blogService from "../services/blogService";
import { useStoreSelector } from "../store/hooks";
import BlogButton from "./buttons/BlogButton";

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
    "flex h-full w-full flex-col items-center justify-around rounded-lg border-2 p-3 gap-2 hover:cursor-pointer";
  if (themeContext.isDark) {
    styles =
      "bg-primary-light text-primary-light bg-transparent border-primary-light";
  } else {
    styles =
      "bg-secondary-dark bg-secondary-dark bg-transparent border-secondary-dark";
  }
  baseStyles = `${baseStyles} ${styles}`;
  return (
    // <div className="hover:cursor-pointer"></div>
    <div className={baseStyles}>
      <h1>Title: {blog.title}</h1>
      <div>Author: {blog.author}</div>
      <div>Likes: {likes}</div>
      <div>
        <BlogButton handleOnClick={increaseLikeHandler}>
          <HandThumbUpIcon className="h-5 w-5" />
        </BlogButton>
        <BlogButton handleOnClick={increaseLikeHandler}>
          <HandThumbDownIcon className="h-5 w-5" />
        </BlogButton>
      </div>
      <a className="underline" href={`http://${blog.url}`}>
        Link
      </a>
      <div className="flex w-full justify-around">
        <div>
          {`@${
            blog.user.username.length > 20
              ? `${blog.user.username.slice(0, 20)}...`
              : blog.user.username
          }`}
        </div>
        {blog.user.username == user.username ? (
          <BlogButton handleOnClick={deleteBlogHandler}>
            <TrashIcon className="h-5 w-5" />
          </BlogButton>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
