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
      <h1 className={`text-4xl font-bold text-primary-light ${extraStyles}`}>
        {children}
      </h1>
    );
  } else {
    return (
      <h1 className={`text-4xl font-bold text-secondary-dark ${extraStyles}`}>
        {children}
      </h1>
    );
  }
}

export default HText;
