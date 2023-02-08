import { Person } from "../interfaces";
import ModelPerson from "../models/Person";

enum API_ROUTES {
  PERSONS = "/api/persons/",
  BLOGS = "/api/blogs/",
}

const initialPersons: Person[] = [
  {
    name: "Tomer",
    email: "tom@12.com",
    password: "testPass",
    blogs: [],
  },
  {
    name: "Tomer",
    email: "tom@12.com",
    password: "testPass",
    blogs: [],
  },
];

const personsInDB = async () => {
  const persons = await ModelPerson.find({});
  return persons.map((person) => person.toJSON());
};

const nonExistingId = async () => {
  const person = new ModelPerson({
    name: "Simple Test",
    number: "000-0000000",
  });
  await person.save();
  await person.remove();
  return person._id.toString();
};

export default { initialPersons, API_ROUTES, personsInDB, nonExistingId };
