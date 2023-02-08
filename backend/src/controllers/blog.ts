import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Blog } from "../interfaces";
import { BadRequestError, NotFoundError } from "../errors";
import ModelBlog from "../models/Blog";

const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await ModelBlog.find({});
  return res.status(StatusCodes.OK).send(blogs);
};

const addBlog = async (req: Request, res: Response) => {
  const { author, likes, title, url } = req.body as Blog;
  if (!author || !title || !url)
    throw new BadRequestError("Please provide author, title and url");

  const existingBlog = await ModelBlog.findOne({
    author,
    title,
    url,
    likes,
  });

  if (existingBlog) throw new BadRequestError("Blog already exists");
  const newBlog = await ModelBlog.create({ author, title, url, likes });
  res.status(StatusCodes.CREATED).json(newBlog);
};

const getBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const blog = await ModelBlog.findOne({ _id: id });
  if (!blog) throw new NotFoundError("Unable to find blog");

  return res.status(StatusCodes.OK).json(blog);
};

const deleteBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const blog = await ModelBlog.findByIdAndRemove({ _id: id });
  if (!blog) throw new NotFoundError("Unable to find blog");
  return res.status(StatusCodes.NO_CONTENT).send();
};

export { getBlog, getAllBlogs, deleteBlog, addBlog };
