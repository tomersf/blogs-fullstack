import { Schema, model, connect } from "mongoose";
import { Blog } from "../interfaces";

const blogSchema = new Schema<Blog>({});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Blog>("Blog", blogSchema);
