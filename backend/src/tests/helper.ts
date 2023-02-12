import { Blog, User } from "../interfaces";
import ModelUser from "../models/User";
import ModelBlog from "../models/Blog";

enum API_ROUTES {
  USERS = "/api/users/",
  BLOGS = "/api/blogs/",
}

const initialUsers: User[] = [
  {
    name: "Tomer",
    passwordHash: "testPass",
    blogs: [],
    username: "tomer",
  },
  {
    name: "Lisa",
    passwordHash: "testPass1",
    blogs: [],
    username: "lisaa",
  },
];

const initialBlogs: Blog[] = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

type UserWithID = User & { id: string };

const usersInDb = async (): Promise<UserWithID[]> => {
  const users = await ModelUser.find({});
  return users.map((u) => u.toJSON());
};

type BlogWithID = Blog & { id: string };

const blogsInDB = async (): Promise<BlogWithID[]> => {
  const blogs = await ModelBlog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingUserID = async () => {
  const user = new ModelUser({
    blogs: [],
    name: "test",
    passwordHash: "testpass",
    username: "testtest",
  });
  await user.save();
  await user.remove();
  return user._id.toString();
};

export default {
  initialUsers,
  API_ROUTES,
  usersInDb,
  nonExistingUserID,
  initialBlogs,
  blogsInDB,
};
