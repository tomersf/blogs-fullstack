import express from "express";
import { getAllUsers, addUser, getUser, deleteUser } from "../controllers";

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUser).delete(deleteUser);

export default router;
