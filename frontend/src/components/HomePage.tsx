import HText from "./HText";
import UserMenu from "./UserMenu";

type Props = {
  user: string;
};

const HomePage = ({ user }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-12">
      <HText>Welcome {user}</HText>
      <UserMenu />
    </div>
  );
};

export default HomePage;
