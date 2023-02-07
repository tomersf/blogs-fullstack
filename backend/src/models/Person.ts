import { Schema, model, connect } from "mongoose";
import { Person } from "../interfaces";

const personSchema = new Schema<Person>({
  name: {
    type: String,
    required: [true, "Name must be at least 3 chars long"],
    minlength: 3,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Person>("Person", personSchema);
