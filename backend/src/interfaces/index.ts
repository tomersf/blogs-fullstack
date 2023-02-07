type Blog = {
  title: String;
  author: String;
  test: String;
};

type Person = {
  name: string;
  blogs: Blog[];
  password: string;
  email: string;
};

export type { Blog, Person };
