import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ModelUser from "../models/User";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appConfig from "../config";
import { JWTPayload, User } from "../interfaces";
import { BadRequestError, UnauthorizedError } from "../errors";

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await ModelUser.findOne({ username });
  let passwordCorrect;
  if (user) {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  }

  if (!(user && passwordCorrect)) {
    throw new UnauthorizedError("invalid username or password");
  }

  const userForToken: JWTPayload = {
    username: user.username,
    id: user._id.toString(),
  };

  const token = jwt.sign(userForToken, appConfig.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  res
    .status(StatusCodes.OK)
    .send({ token, username: user.username, name: user.name });
};

const registerUser = async (req: Request, res: Response) => {
  const { username, name, password } = req.body;
  if (!username || !password || !name)
    throw new BadRequestError("Please provide name, username and password");
  const existingUser = await ModelUser.findOne({ username });
  if (existingUser) {
    throw new BadRequestError("username already exists");
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user: User = {
    username,
    name,
    passwordHash,
    blogs: [],
  };
  const newUser = await ModelUser.create(user);
  res.status(StatusCodes.CREATED).json(newUser);
};

export { loginUser, registerUser };
