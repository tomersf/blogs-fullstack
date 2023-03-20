import React, { useContext } from "react";
import ThemeContext from "../context/theme";

type Props = {
  children: React.ReactNode;
  extraStyles?: string;
};

function HText({ children, extraStyles }: Props) {
  const theme = useContext(ThemeContext);
  if (theme.isDark) {
    return (
      <h1
        className={`font-bold text-primary-light xxs:text-2xl sm:text-4xl ${extraStyles}`}
      >
        {children}
      </h1>
    );
  } else {
    return (
      <h1
        className={`font-bold text-secondary-dark xxs:text-2xl sm:text-4xl ${extraStyles}`}
      >
        {children}
      </h1>
    );
  }
}

export default HText;
