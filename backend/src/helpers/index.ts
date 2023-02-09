import { readFileSync } from "fs";
import path from "path";
import { Person } from "../interfaces";
import { totalLikes, favoriteBlog } from "./blog";

enum MONGODB_ERROR_NAMES {
  "CastError" = "CastError",
  "ValidationError" = "ValidationError",
}

const loadDB = (): Person[] => {
  return JSON.parse(
    readFileSync(path.join(__dirname, "blog-db.json"), { encoding: "utf-8" })
  );
};

export { loadDB, MONGODB_ERROR_NAMES, totalLikes, favoriteBlog };
