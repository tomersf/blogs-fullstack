import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Model } from "mongoose";
import { NotFoundError } from "../errors";
import ModelUser from "../models/User";
import ModelBlog from "../models/Blog";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await ModelUser.find({}).populate("blogs");
  return res.status(StatusCodes.OK).send(users);
};

const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await ModelUser.findOne({ _id: id }).populate("blogs");
  if (!user) throw new NotFoundError("Unable to find user");

  return res.status(StatusCodes.OK).json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await ModelUser.findByIdAndRemove({ _id: id });
  if (!user) throw new NotFoundError("Unable to find user");
  for (const blog of user.blogs) {
    await ModelBlog.findByIdAndRemove(blog);
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};

export { getAllUsers, getUser, deleteUser };
