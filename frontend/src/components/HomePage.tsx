import { User } from "@tomersf/blog.shared";
import React from "react";
import ActionButton from "./ActionButton";
import HText from "./HText";
import UserMenu from "./UserMenu";

type Props = {
  user: string;
};

const HomePage = ({ user }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-32">
      <div>
        <HText>Welcome {user}</HText>
      </div>
      <div className="h-full">
        <UserMenu />
      </div>
    </div>
  );
};

export default HomePage;
