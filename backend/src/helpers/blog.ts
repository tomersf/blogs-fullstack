import { Blog } from "../interfaces";

const totalLikes = (blogs: Blog[]) => {
  let totalLikes = 0;
  for (const blog of blogs) {
    totalLikes += blog.likes;
  }
  return totalLikes;
};

const favoriteBlog = (blogs: Blog[]) => {
  const copyBlogsList = blogs.map((blog) => blog);
  copyBlogsList.sort((blogOne, blogTwo) => blogTwo.likes - blogOne.likes);
  return copyBlogsList[0];
};

const authorWithMostBlogs = (blogs: Blog[]) => {
  const blogsByAuthor = blogs.reduce(
    (result: { [key: string]: number }, blog) => ({
      ...result,
      [blog.author]: (result[blog.author] || 0) + 1,
    }),
    {}
  );
  let authorWithMaxBlogs = Object.keys(blogsByAuthor)[0];
  for (const authorName of Object.keys(blogsByAuthor)) {
    if (blogsByAuthor[authorName] > blogsByAuthor[authorWithMaxBlogs]) {
      authorWithMaxBlogs = authorName;
    }
  }
  return {
    author: authorWithMaxBlogs,
    blogs: blogsByAuthor[authorWithMaxBlogs],
  };
};

const authorWithMostLikes = (blogs: Blog[]) => {
  const likesByAuthor = blogs.reduce(
    (result: { [key: string]: number }, blog) => ({
      ...result,
      [blog.author]: (result[blog.author] || 0) + blog.likes,
    }),
    {}
  );
  let authorWithMaxLikes = Object.keys(likesByAuthor)[0];
  for (const authorName of Object.keys(likesByAuthor)) {
    if (likesByAuthor[authorName] > likesByAuthor[authorWithMaxLikes]) {
      authorWithMaxLikes = authorName;
    }
  }
  return {
    author: authorWithMaxLikes,
    likes: likesByAuthor[authorWithMaxLikes],
  };
};

export { totalLikes, favoriteBlog, authorWithMostBlogs, authorWithMostLikes };
