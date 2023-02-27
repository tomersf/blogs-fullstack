import { StatusCodes } from "http-status-codes";
import supertest from "supertest";
import helper from "./helper";
import app from "..";
import ModelUser from "../models/User";

const api = supertest(app);

beforeEach(async () => {
  console.log("");
  await ModelUser.deleteMany({});
  await ModelUser.insertMany(helper.initialUsers);
});

describe("addition of a new user", () => {
  test("succeeds with valid data", async () => {
    const newUser = {
      blogs: [],
      password: "Ihsakat",
      username: "btcMaster",
    };

    await api
      .post(helper.API_ROUTES.REGISTER)
      .send(newUser)
      .expect(StatusCodes.CREATED)
      .expect("Content-Type", /application\/json/);

    const usersAfterAdding = await helper.usersInDb();
    expect(usersAfterAdding).toHaveLength(helper.initialUsers.length + 1);

    const contents = usersAfterAdding.map((user) => user.username);
    expect(contents).toContain("btcMaster");
  });

  test("fails with status code 400 if data invalid", async () => {
    const newUser = {
      name: "Ts",
    };

    await api
      .post(helper.API_ROUTES.REGISTER)
      .send(newUser)
      .expect(StatusCodes.BAD_REQUEST);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "tomer",
      name: "Superuser",
      password: "super",
    };

    const result = await api
      .post(helper.API_ROUTES.REGISTER)
      .send(newUser)
      .expect(StatusCodes.BAD_REQUEST)
      .expect("Content-Type", /application\/json/);

    expect(result.body.msg).toContain("username already exists");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
