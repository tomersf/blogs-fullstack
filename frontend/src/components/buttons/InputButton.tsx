import React from "react";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  extraStyles?: string;
  id?: string;
  width?: string;
};

const InputButton = ({
  onChange,
  placeholder,
  value,
  type,
  extraStyles,
  id,
  width,
}: Props) => {
  const styles = `form-input font-Ubuntu my-1 mx-0 rounded-lg border-none bg-[#ecf0f3] pl-6 font-[sans-serif] text-sm tracking-[0.15px] outline-none duration-200 ease-in ${extraStyles} h-[40px] ${
    width ? width : "w-[350px]"
  }`;
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
