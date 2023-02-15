import { useContext } from "react";
import ThemeContext from "../context/theme";

type Props = {
  children: React.ReactNode;
  handleOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  extraStyles?: string;
};

const ActionButton = ({ children, handleOnClick, extraStyles }: Props) => {
  const isDarkTheme = useContext(ThemeContext);
  return (
    <button
      className={`${extraStyles} rounded-md px-10 py-2 hover:text-white ${
        isDarkTheme
          ? "bg-primary-light hover:bg-secondary-light"
          : "bg-primary-dark hover:bg-secondary-dark"
      }`}
      onClick={(e) => handleOnClick(e)}
    >
      {children}
    </button>
  );
};

export default ActionButton;
