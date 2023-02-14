import { Blog} from "@tomersf/blog.shared";

type Props = {
  blog: IBlog;
};

const Blog = ({ blog }: Props) => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
};

export default Blog;
