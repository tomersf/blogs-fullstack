import { Blog, Person } from "../interfaces";
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

const initialBlogs: Blog[] = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
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

export default {
  initialPersons,
  API_ROUTES,
  personsInDB,
  nonExistingId,
  initialBlogs,
};
