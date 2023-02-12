import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../interfaces";
import { BadRequestError, NotFoundError } from "../errors";
import ModelUser from "../models/User";
import bcrypt from "bcrypt";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await ModelUser.find({});
  return res.status(StatusCodes.OK).send(users);
};

const addUser = async (req: Request, res: Response) => {
  const { username, name, password } = req.body;
  if (!username || !password || !name)
    throw new BadRequestError("Please provide name, username and password");
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const existingUser = await ModelUser.findOne({
    username,
  });

  if (existingUser) throw new BadRequestError("Username already exists");
  const user: User = {
    username,
    name,
    passwordHash,
    blogs: [],
  };
  const newUser = await ModelUser.create(user);
  res.status(StatusCodes.CREATED).json(newUser);
};

const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await ModelUser.findOne({ _id: id });
  if (!user) throw new NotFoundError("Unable to find user");

  return res.status(StatusCodes.OK).json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await ModelUser.findByIdAndRemove({ _id: id });
  if (!user) throw new NotFoundError("Unable to find user");
  return res.status(StatusCodes.NO_CONTENT).send();
};

export { getAllUsers, getUser, deleteUser, addUser };
