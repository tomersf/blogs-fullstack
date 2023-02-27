import mongoose from "mongoose";
import supertest from "supertest";
import ModelUser from "../models/User";
import app from "..";
import { StatusCodes } from "http-status-codes";
import helper from "./helper";
const api = supertest(app);

const generatedUser = {
  userID: "",
  token: "",
};

beforeAll(async () => {
  const [userID, token] = await helper.generateFakeUser();
  helper.updateIdForInitialBlogs(userID);
  generatedUser.token = token;
  generatedUser.userID = userID;
});

beforeEach(async () => {
  console.log("");
  await ModelUser.deleteMany({});
  await ModelUser.insertMany(helper.initialUsers);
});

describe("when there is initially some users saved", () => {
  test("users are returned as json", async () => {
    await api
      .get(helper.API_ROUTES.USERS)
      .expect(StatusCodes.OK)
      .expect("Content-Type", /application\/json/);
  });

  test("all users are returned", async () => {
    const response = await api.get(helper.API_ROUTES.USERS);
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });
});

describe("viewing a specific user", () => {
  test("succeeds with a valid id", async () => {
    const usersAtStart = await helper.usersInDb();
    const userToView = usersAtStart[0];
    const userResult = await api
      .get(`${helper.API_ROUTES.USERS}${userToView.id}`)
      .expect(StatusCodes.OK)
      .expect("Content-Type", /application\/json/);

    expect(userResult.body).toEqual(userToView);
  });

  test("fails with statuscode 404 if user does not exist", async () => {
    const validNonExistingID = await helper.nonExistingUserID();
    await api
      .get(`${helper.API_ROUTES.USERS}${validNonExistingID}`)
      .expect(StatusCodes.NOT_FOUND);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api
      .get(`${helper.API_ROUTES.USERS}${invalidId}`)
      .expect(StatusCodes.BAD_REQUEST);
  });
});

describe("deletion of a user", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const usersAtStart = await helper.usersInDb();
    const userToDelete = usersAtStart[0];

    await api
      .delete(`${helper.API_ROUTES.USERS}${userToDelete.id}`)
      .set("Authorization", "Bearer " + generatedUser.token)
      .expect(StatusCodes.NO_CONTENT);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length - 1);

    const contents = usersAtEnd.map((user) => user.id);
    expect(contents).not.toContain(userToDelete.id);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
