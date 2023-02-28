import { Request, Response } from "express";
import ModelUser from "../models/User";
import ModelBlog from "../models/Blog";
import { StatusCodes } from "http-status-codes";

const resetTestData = async (req: Request, res: Response) => {
  const testUser = await ModelUser.findOne({ username: "TestUser" });
  if (testUser) {
    const blogs = await ModelBlog.find({ user: testUser._id });
    for (const blog of blogs) {
      await blog.remove();
    }
  }
  res.status(StatusCodes.NO_CONTENT).end();
};

export { resetTestData };
