import express from "express";
import { resetTestData } from "../controllers";

const router = express.Router();

router.route("/reset").post(resetTestData);

export default router;
