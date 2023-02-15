import React, { useContext } from "react";
import ThemeContext from "../context/theme";

type Props = {
  children: React.ReactNode;
};

function HText({ children }: Props) {
  const darkTheme = useContext(ThemeContext);
  if (darkTheme) {
    return (
      <h1 className="text-4xl font-bold text-primary-light">{children}</h1>
    );
  } else {
    return <h1 className="text-4xl font-bold text-primary-dark">{children}</h1>;
  }
}

export default HText;
