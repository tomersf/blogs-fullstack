import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
const notFound = (req: Request, res: Response) =>
  res.status(StatusCodes.NOT_FOUND).send("Route does not exist");

export default notFound;
