import React, { useContext } from "react";
import ActionButton from "./buttons/ActionButton";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import ThemeContext from "../context/theme";

type Props = {
  extraStyles?: string;
};

const ColorTheme = ({ extraStyles }: Props) => {
  const darkMode = useContext(ThemeContext);

  const changeThemeHandler = () => {
    darkMode.toggleDark();
  };
  let styles, content;
  if (darkMode.isDark) {
    styles = `flex justify-center items-center ${extraStyles}`;
    content = <SunIcon className="w-7" />;
  } else {
    styles = `flex justify-center items-center ${extraStyles}`;
    content = <MoonIcon className="w-7" />;
  }

  return (
    <ActionButton
      isFormButton={false}
      handleOnClick={changeThemeHandler}
      extraStyles={styles}
    >
      {content}
    </ActionButton>
  );
};

export default ColorTheme;
