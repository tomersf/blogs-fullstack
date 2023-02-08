type Blog = {
  title: String;
  author: String;
  url: String;
  likes: Number;
};

type Person = {
  name: String;
  blogs: Blog[];
  password: String;
  email: String;
};

export type { Blog, Person };
