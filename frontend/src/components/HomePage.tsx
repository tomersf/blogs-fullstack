import { User } from "@tomersf/blog.shared";
import React from "react";

type Props = {
  user: User;
};

const HomePage = ({ user }: Props) => {
  return <div>Welcome {user.username}</div>;
};

export default HomePage;
