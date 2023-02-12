import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { JWTPayload } from "../interfaces";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import appConfig from "../config";

enum MONGODB_ERROR_NAMES {
  "CastError" = "CastError",
  "ValidationError" = "ValidationError",
}

enum JWT_ERROR_NAMES {
  "JsonWebTokenError" = "JsonWebTokenError",
  "TokenExpiredError" = "TokenExpiredError",
}

const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const validateToken = (req: Request, res: Response) => {
  const tokenRequest = getTokenFrom(req);
  if (!tokenRequest) {
    throw new BadRequestError("jwt token not found");
  }
  const decodedToken = jwt.verify(
    tokenRequest,
    appConfig.JWT_SECRET
  ) as JWTPayload;

  if (!decodedToken.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "invalid token" });
  }
  return decodedToken.id;
};

export { MONGODB_ERROR_NAMES, JWT_ERROR_NAMES, validateToken };
