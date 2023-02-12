import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers";

const router = express.Router();

router.route("/").get(getAllBlogs).post(addBlog);
router.route("/:id").get(getBlog).delete(deleteBlog).put(updateBlog);

export default router;
