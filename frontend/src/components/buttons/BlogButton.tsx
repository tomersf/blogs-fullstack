import React, { useContext } from "react";
import ThemeContext from "../../context/theme";
import ActionButton from "./ActionButton";

type Props = {
  children?: React.ReactNode;
  handleOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  extraStyles?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const BlogButton = ({
  handleOnClick,
  children,
  extraStyles,
  ...restProps
}: Props) => {
  const isDarkTheme = useContext(ThemeContext);
  let style;
  if (isDarkTheme.isDark) {
    style = "text-primary-light hover:text-secondary-light";
  } else {
    style = "text-secondary-dark hover:text-dark-theme";
  }
  return (
    <button className={style} onClick={handleOnClick} {...restProps}>
      {children}
    </button>
  );
};

export default BlogButton;
