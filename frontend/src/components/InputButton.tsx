import React, { useContext } from "react";
import ThemeContext from "../context/theme";

type Props = {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  extraStyles?: string;
  id?: string;
};

const InputButton = ({
  onChange,
  placeholder,
  value,
  type,
  extraStyles,
  id,
}: Props) => {
  const styles = `form-input font-Ubuntu my-1 mx-0 h-[40px] w-[350px] rounded-lg border-none bg-[#ecf0f3] pl-6 font-[sans-serif] text-sm tracking-[0.15px] outline-none duration-200 ease-in ${extraStyles}`;
  return (
    <input
      onChange={onChange}
      type={type}
      className={styles}
      placeholder={placeholder}
      value={value}
      id={id}
    />
  );
};

export default InputButton;
