import { totalLikes, favoriteBlog } from "../helpers";
import { authorWithMostBlogs, authorWithMostLikes } from "../helpers/blog";
import { Blog } from "../interfaces";
import DBHelper from "./helper";

describe("total likes", () => {
  const listWithOneBlog: Blog[] = [
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when getting an empty blog list, the return of likes is 0", () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test("when getting a list of blogs, returns the blog with most likes", () => {
    const result = favoriteBlog(DBHelper.initialBlogs);

    expect(result).toEqual(
      DBHelper.initialBlogs.find((blog) => blog.likes === 12)
    );
  });

  test("when getting a list of blogs, return the author with most likes", () => {
    const authorWithMaxLikes = authorWithMostLikes(DBHelper.initialBlogs);
    expect(authorWithMaxLikes).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

describe("total blogs", () => {
  test("when getting a list of blogs, return the author with most blogs", () => {
    const authorWithMaxBlogs = authorWithMostBlogs(DBHelper.initialBlogs);
    expect(authorWithMaxBlogs).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
