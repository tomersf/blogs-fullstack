type Blog = {
  title: string;
  author: string;
  url: string;
  likes: number;
};

type Person = {
  name: string;
  blogs: Blog[];
  password: string;
  email: string;
};

export type { Blog, Person };
