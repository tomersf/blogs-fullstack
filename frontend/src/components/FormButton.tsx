import React, { useContext } from "react";
import ThemeContext from "../context/theme";
import ActionButton from "./ActionButton";

type Props = {
  children?: React.ReactNode;
  handleOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  extraStyles?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const FormButton = ({
  handleOnClick,
  children,
  extraStyles,
  ...restProps
}: Props) => {
  const isDarkTheme = useContext(ThemeContext);
  let style, baseStyle, hoverStyle;
  if (isDarkTheme.isDark) {
    baseStyle = "bg-dark-theme text-primary-light";
    hoverStyle =
      "hover:bg-primary-light hover:border-dark-theme hover:text-dark-theme";
    style = extraStyles
      ? baseStyle + " " + hoverStyle + " " + extraStyles
      : baseStyle + " " + hoverStyle;
    return (
      <ActionButton
        isFormButton={true}
        extraStyles={style}
        handleOnClick={handleOnClick}
      >
        {children}
      </ActionButton>
    );
  } else {
    style = extraStyles;
    return (
      <ActionButton
        extraStyles={style}
        isFormButton={true}
        handleOnClick={handleOnClick}
        {...restProps}
      >
        {children}
      </ActionButton>
    );
  }
};

export default FormButton;
