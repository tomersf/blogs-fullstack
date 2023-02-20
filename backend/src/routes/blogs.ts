import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  getUserBlogs,
} from "../controllers";

import authenticateUser from "../middlewares/authentications";
const router = express.Router();

router.route("/").get(getAllBlogs).post(authenticateUser, addBlog);
router.route("/myblogs").get(authenticateUser, getUserBlogs);
router
  .route("/:id")
  .get(getBlog)
  .delete(authenticateUser, deleteBlog)
  .put(authenticateUser, updateBlog);

export default router;
