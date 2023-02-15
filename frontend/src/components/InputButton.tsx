import React, { useContext } from "react";
import ThemeContext from "../context/theme";

type Props = {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  extraStyles?: string;
};

const InputButton = ({
  onChange,
  placeholder,
  value,
  type,
  extraStyles,
}: Props) => {
  const isDarkTheme = useContext(ThemeContext);
  let inputStyles = isDarkTheme ? "bg-primary-300" : "bg-secondary-light-500";
  inputStyles += " mb-5 w-full rounded-lg px-5 py-3";
  return (
    <input
      className={extraStyles + " " + inputStyles}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default InputButton;
