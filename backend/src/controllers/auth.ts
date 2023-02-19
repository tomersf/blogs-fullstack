import bcrypt from "bcrypt";
import ModelUser from "../models/User";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthorizedError } from "../errors";
import { generateToken } from "../helpers";
import { User } from "../interfaces";

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await ModelUser.findOne({ username });
  let passwordCorrect;
  if (user) {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash!);
  }

  if (!(user && passwordCorrect)) {
    throw new UnauthorizedError("invalid username or password");
  }

  const token = generateToken(user.username, user._id.toString());
  res.status(StatusCodes.OK).send({ token });
};

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new BadRequestError("Please provide name, username and password");
  const existingUser = await ModelUser.findOne({ username });
  if (existingUser) {
    throw new BadRequestError("username already exists");
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user: User = {
    username,
    passwordHash,
    blogs: [],
  };
  const newUser = await ModelUser.create(user);
  res.status(StatusCodes.CREATED).json(newUser);
};

export { loginUser, registerUser };
