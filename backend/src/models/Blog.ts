import mongoose, { Schema, model } from "mongoose";
import { Blog } from "../interfaces";

const blogSchema = new Schema<Blog>({
  title: {
    type: String,
    required: [true, "Title must be at least 5 chars long"],
    minlength: 5,
  },
  author: {
    type: String,
    required: [true, "Author must be at least 2 chars long"],
    minlength: 2,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  url: {
    type: String,
    validate: {
      validator: (value: any) => {
        return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
          value
        );
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, "Must enter a blog url"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Blog>("Blog", blogSchema);
