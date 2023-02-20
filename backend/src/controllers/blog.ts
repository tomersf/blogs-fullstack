import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Blog } from "../interfaces";
import { BadRequestError, NotFoundError } from "../errors";
import ModelBlog from "../models/Blog";
import ModelUser from "../models/User";
import { PopulatedOptionalFields, User } from "@tomersf/blog.shared";

const blogPropsExistenceValidator = (
  author: string,
  title: string,
  url: string
) => {
  if (!author || !title || !url)
    throw new BadRequestError("Please provide author, title and url");
};

const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await ModelBlog.find({}).populate("user", {
    username: 1,
    id: 1,
  } as PopulatedOptionalFields<User>);
  return res.status(StatusCodes.OK).send(blogs);
};

const addBlog = async (req: Request, res: Response) => {
  const { author, likes, title, url } = req.body;
  blogPropsExistenceValidator(author, title, url);
  const decodedUserID = req.user.userID;
  const user = await ModelUser.findById(decodedUserID);
  if (!user) throw new BadRequestError("Cant add blog to non existing user");

  const existingBlog = await ModelBlog.findOne({
    author,
    title,
    url,
    user: decodedUserID,
  });

  if (existingBlog) throw new BadRequestError("Blog already exists");
  const newBlog = await ModelBlog.create({
    author,
    title,
    url,
    likes,
    user: decodedUserID,
  });

  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();
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
  const decodedUserID = req.user.userID;
  const blog = await ModelBlog.findByIdAndRemove({
    _id: id,
    user: decodedUserID,
  });
  if (!blog) throw new NotFoundError("Unable to find blog");
  return res.status(StatusCodes.NO_CONTENT).send();
};

const updateBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { author, likes, title, url } = req.body as Blog;
  blogPropsExistenceValidator(author, title, url);
  const blog = await ModelBlog.findByIdAndUpdate(
    id,
    {
      title,
      url,
      author,
      likes: likes || 0,
    },
    { runValidators: true, new: true }
  );
  if (!blog) throw new NotFoundError("Unable to find blog");
  return res.status(StatusCodes.OK).json(blog);
};

const getUserBlogs = async (req: Request, res: Response) => {
  const decodedUserID = req.user.userID;
  const blogs = await ModelBlog.find({ user: decodedUserID }).populate("user", {
    username: 1,
  } as PopulatedOptionalFields<User>);
  return res.status(StatusCodes.OK).send(blogs);
};

export { getBlog, getAllBlogs, deleteBlog, addBlog, updateBlog, getUserBlogs };
