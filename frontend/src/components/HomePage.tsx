import { User } from "@tomersf/blog.shared";
import React from "react";
import HText from "./HText";

type Props = {
  user: string;
};

const HomePage = ({ user }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <HText>Welcome {user}</HText>
    </div>
  );
};

export default HomePage;
