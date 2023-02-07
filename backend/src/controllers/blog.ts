import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Blog } from "../interfaces";
import { BadRequestError, NotFoundError } from "../errors";
import ModelBlog from "../models/Blog";

const getAllBlogs = async (req: Request, res: Response) => {
  const persons = await ModelPerson.find({});
  return res.status(StatusCodes.OK).send(persons);
};

const addBlog = async (req: Request, res: Response) => {
  const person = req.body as Person;
  if (!person.name || !person.number)
    throw new BadRequestError("Please provide name and email");

  const existingPerson = await ModelPerson.findOne({
    name: person.name,
    number: person.number,
  });

  if (existingPerson) throw new BadRequestError("Person already exists");
  const newPerson = await ModelPerson.create(person);
  res.status(StatusCodes.CREATED).json(newPerson);
};

const getBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const person = await ModelPerson.findOne({ _id: id });
  if (!person) throw new NotFoundError("Unable to find person");

  return res.status(StatusCodes.OK).json(person);
};

const deleteBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const person = await ModelPerson.findByIdAndRemove({ _id: id });
  if (!person) throw new NotFoundError("Unable to find person");
  return res.status(StatusCodes.NO_CONTENT).send();
};

export { getBlog, getAllBlogs, deleteBlog, addBlog };
