import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ModelUser from "../models/User";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appConfig from "../config";
import { JWTPayload } from "../interfaces";

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await ModelUser.findOne({ username });
  let passwordCorrect;
  if (user) {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  }

  if (!(user && passwordCorrect)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "invalid username or password",
    });
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

export { loginUser };
