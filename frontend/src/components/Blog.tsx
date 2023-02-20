import { Blog as IBlog } from "@tomersf/blog.shared";
import { useContext } from "react";
import ThemeContext from "../context/theme";

type Props = {
  blog: IBlog;
};

const Blog = ({ blog }: Props) => {
  const theme = useContext(ThemeContext);
  let baseStyles, styles;
  baseStyles =
    "flex h-full w-full flex-col items-center justify-around rounded-lg border-2 p-3";
  if (theme.isDark) {
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
      <div>Likes: {blog.likes}</div>
      <a className="underline" href={`http://${blog.url}`}>
        Link
      </a>
    </div>
  );
};

export default Blog;
