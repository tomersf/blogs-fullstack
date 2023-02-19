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
  let styles, content;
  if (darkMode.isDark) {
    styles = "flex justify-center items-center w-[100px]";
    content = <SunIcon className="w-7" />;
  } else {
    styles = "flex justify-center items-center w-[100px]";
    content = <MoonIcon className="w-7" />;
  }
  // return (
  //   <button onClick={() => {}} className="flex w-20 justify-center bg-red-500">
  //     {darkMode.isDark ? (
  //       <SunIcon className="w-6 items-center text-white" />
  //     ) : (
  //       <MoonIcon className="w-6 items-center text-center" />
  //     )}
  //   </button>
  // );

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
