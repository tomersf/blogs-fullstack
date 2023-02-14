import supertest from "supertest";
import ModelBlog from "../models/Blog";
import app from "..";
import { StatusCodes } from "http-status-codes";
import DBHelper from "./helper";
import { Blog } from "../interfaces";
import { closeTestDatabase } from "../db/testdb-handler";

const api = supertest(app);
const generatedUser = {
  userID: "",
  token: "",
};

beforeAll(async () => {
  const [userID, token] = await DBHelper.generateFakeUser();
  DBHelper.updateIdForInitialBlogs(userID);
  generatedUser.token = token;
  generatedUser.userID = userID;
});

beforeEach(async () => {
  await ModelBlog.deleteMany({});
  await ModelBlog.insertMany(DBHelper.initialBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get(DBHelper.API_ROUTES.BLOGS)
      .expect(StatusCodes.OK)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get(DBHelper.API_ROUTES.BLOGS);

    expect(response.body).toHaveLength(DBHelper.initialBlogs.length);
  });
});

describe("when making a POST req to blogs", () => {
  console.log("");
  const newBlog: Blog = {
    author: "Test Jest",
    likes: 20,
    title: "Jest is awesome",
    url: "www.jest.com",
    user: generatedUser.userID,
  };
  test("return status code and content type are valid", async () => {
    await api
      .post(DBHelper.API_ROUTES.BLOGS)
      .set("Authorization", "Bearer " + generatedUser.token)
      .send(newBlog)
      .expect(StatusCodes.CREATED)
      .expect("Content-Type", /application\/json/);
  });
  test("a new blog is inserted into db", async () => {
    await api
      .post(DBHelper.API_ROUTES.BLOGS)
      .send(newBlog)
      .set("Authorization", "Bearer " + generatedUser.token);
    const initialBlogs = DBHelper.initialBlogs;
    const blogsInDB = await DBHelper.blogsInDB();

    expect(blogsInDB).toHaveLength(initialBlogs.length + 1);
    const contents = blogsInDB.map((blog) => blog.title);
    expect(contents).toContain(newBlog.title);
  });

  test("without the likes field, it defaults to 0", async () => {
    const blogWithoutLikes: Omit<Blog, "likes"> = {
      author: newBlog.author,
      title: newBlog.title,
      url: newBlog.url,
      user: generatedUser.userID,
    };
    await api
      .post(DBHelper.API_ROUTES.BLOGS)
      .send(blogWithoutLikes)
      .set("Authorization", "Bearer " + generatedUser.token);
    const blogsInDB = await DBHelper.blogsInDB();
    const contents = blogsInDB.map((blog) => {
      return { title: blog.title, likes: blog.likes };
    });
    expect(contents).toContainEqual({
      title: blogWithoutLikes.title,
      likes: 0,
    });
  });

  test("without title or url, we return bad request", async () => {
    const blogWithoutURLandTitle: Omit<Blog, "url" | "title"> = {
      author: newBlog.author,
      likes: 5,
      user: generatedUser.userID,
    };
    await api
      .post(DBHelper.API_ROUTES.BLOGS)
      .send(blogWithoutURLandTitle)
      .set("Authorization", "Bearer " + generatedUser.token)
      .expect(StatusCodes.BAD_REQUEST)
      .expect("Content-Type", /application\/json/);
  });
});

describe("when doing a PUT req to blogs", () => {
  const initialBlog = DBHelper.initialBlogs[0];
  test("blog is getting updated", async () => {
    const blog = await ModelBlog.findOne({
      author: initialBlog.author,
      title: initialBlog.title,
    });
    if (!blog) fail("Unable to find initial blog");
    blog.title = blog.title + "updated";
    await api
      .put(`${DBHelper.API_ROUTES.BLOGS}${blog._id}`)
      .send(blog.toJSON())
      .set("Authorization", "Bearer " + generatedUser.token)
      .expect(StatusCodes.OK);

    const updatedBlog = await api.get(
      `${DBHelper.API_ROUTES.BLOGS}${blog._id}`
    );

    expect(updatedBlog.body).toEqual(blog.toJSON());
  });
});

afterAll(async () => {
  await closeTestDatabase();
});
