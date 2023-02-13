import express from "express";
import { getAllUsers, getUser, deleteUser } from "../controllers";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).delete(deleteUser);

export default router;
