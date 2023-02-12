import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";
import appConfig from "../config";
import { JWTPayload } from "../interfaces";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, appConfig.JWT_SECRET) as JWTPayload;
    req.user = { userID: payload.id, username: payload.username };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication invalid");
  }
};

export default auth;
