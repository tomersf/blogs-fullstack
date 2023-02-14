import express from "express";
import { getAllUsers, getUser, deleteUser } from "../controllers";
import authenticateUser from "../middlewares/authentications";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).delete(authenticateUser, deleteUser);

export default router;
