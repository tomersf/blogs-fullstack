import React, { useContext } from "react";
import ActionButton from "./ActionButton";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import ThemeContext from "../context/theme";

type Props = {
  onClick: () => void;
};

const ColorTheme = ({ onClick }: Props) => {
  const darkMode = useContext(ThemeContext);

  return (
    <ActionButton extraStyles="mx-4 my-4" handleOnClick={onClick}>
      {darkMode ? (
        <SunIcon className="w-6 text-white" />
      ) : (
        <MoonIcon className="w-6 text-white" />
      )}
    </ActionButton>
  );
};

export default ColorTheme;
