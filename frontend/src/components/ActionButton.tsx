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
      className={
        extraStyles +
        " " +
        `rounded-md px-10 py-2 hover:text-white ${
          isDarkTheme
            ? "bg-secondary-dark-400 hover:bg-primary-dark-100"
            : "bg-secondary-light-500 hover:bg-primary-light-500"
        }`
      }
      onClick={(e) => handleOnClick(e)}
    >
      {children}
    </button>
  );
};

export default ActionButton;
