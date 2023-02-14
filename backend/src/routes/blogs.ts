import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers";

import authenticateUser from "../middlewares/authentications";
const router = express.Router();

router.route("/").get(getAllBlogs).post(authenticateUser, addBlog);
router
  .route("/:id")
  .get(getBlog)
  .delete(authenticateUser, deleteBlog)
  .put(authenticateUser, updateBlog);

export default router;
