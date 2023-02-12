import mongoose, { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { User } from "../interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from "../config";

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, "Name must be at least 3 chars long"],
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, "Name must be at least 3 chars long"],
    minlength: 3,
    unique: true,
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default model<User>("User", userSchema);
