import { HttpStatusCode } from "axios";
import { setBlogs, setMyBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogService";
import { useStoreDispatch, useStoreSelector } from "../store/hooks";
import Blog from "./Blog";

type Props = {
  all: boolean;
};

const Blogs = ({ all }: Props) => {
  const blogs = useStoreSelector((state) =>
    all ? state.blogs.blogs : state.blogs.myBlogs
  );
  const user = useStoreSelector((state) => state.user.username);
  const dispatch = useStoreDispatch();
  const blogDeleteHandler = async (id: number) => {
    const result = await blogService.deleteBlog(id);
    if (result == HttpStatusCode.NoContent) {
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
      if (user && user !== "Guest") {
        dispatch(setMyBlogs(user));
      }
    }
  };

  return (
    <div className="mt-5 grid w-4/5 gap-3 xxs:grid-cols-1 sm:grid-cols-2 md:grid md:grid-cols-3">
      {blogs.length > 0
        ? blogs.map((blog) => (
            <Blog onDelete={blogDeleteHandler} key={blog.id} blog={blog} />
          ))
        : "No Blogs to display"}
    </div>
  );
};

export default Blogs;
