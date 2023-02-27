import { Blog, User } from "../interfaces";
import ModelUser from "../models/User";
import ModelBlog from "../models/Blog";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers";

enum API_ROUTES {
  USERS = "/api/users/",
  BLOGS = "/api/blogs/",
  REGISTER = "/api/auth/register/",
  LOGIN = "/api/auth/login/",
}

const initialUsers: User[] = [
  {
    passwordHash: "testPass",
    blogs: [],
    username: "tomer",
    id: 1,
  },
  {
    passwordHash: "testPass1",
    blogs: [],
    username: "lisaa",
    id: 2,
  },
];

const initialBlogs: Blog[] = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    id: 1,
    user: new mongoose.Types.ObjectId().toString(),
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    id: 2,
    user: new mongoose.Types.ObjectId().toString(),
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    id: 3,
    user: new mongoose.Types.ObjectId().toString(),
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    id: 4,
    user: new mongoose.Types.ObjectId().toString(),
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    id: 5,
    user: new mongoose.Types.ObjectId().toString(),
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    id: 6,
    user: new mongoose.Types.ObjectId().toString(),
  },
];

const usersInDb = async (): Promise<User[]> => {
  const users = await ModelUser.find({});
  return users.map((u) => u.toJSON());
};

const blogsInDB = async (): Promise<Blog[]> => {
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

const generateFakeUser = async () => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("testPass", saltRounds);

  const fakeUser: User = {
    blogs: [],
    passwordHash,
    username: crypto.randomBytes(4).toString("hex"),
  };
  const createdUser = await ModelUser.create(fakeUser);
  const token = generateToken(createdUser.username, createdUser._id.toString());
  return [createdUser._id.toString(), token];
};

const updateIdForInitialBlogs = (userID: string) => {
  initialBlogs.forEach((blog) => (blog.user = userID));
};

export default {
  initialUsers,
  API_ROUTES,
  usersInDb,
  nonExistingUserID,
  initialBlogs,
  blogsInDB,
  generateFakeUser,
  updateIdForInitialBlogs,
};
