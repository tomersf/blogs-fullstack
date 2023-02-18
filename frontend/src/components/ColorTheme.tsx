import React, { useContext } from "react";
import ActionButton from "./ActionButton";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import ThemeContext from "../context/theme";

type Props = {};

const ColorTheme = ({}: Props) => {
  const darkMode = useContext(ThemeContext);

  const changeThemeHandler = () => {
    darkMode.toggleDark();
  };

  return (
    <ActionButton handleOnClick={changeThemeHandler}>
      {darkMode.isDark ? (
        <SunIcon className="w-6 text-white" />
      ) : (
        <MoonIcon className="w-6 text-white" />
      )}
    </ActionButton>
  );
};

export default ColorTheme;
