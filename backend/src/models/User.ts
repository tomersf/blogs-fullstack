import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { User } from "../interfaces";

const userSchema = new mongoose.Schema<User>({
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

export default mongoose.model<User>("User", userSchema);
