import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import ModelUser from "../models/User";

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
  return res.status(StatusCodes.NO_CONTENT).send();
};

export { getAllUsers, getUser, deleteUser };
