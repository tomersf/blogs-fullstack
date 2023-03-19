import { useContext } from "react";
import ThemeContext from "../../context/theme";

type Props = {
  children?: React.ReactNode;
  handleOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  extraStyles?: string;
  isFormButton?: boolean;
  isBlogButton?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const ActionButton = ({
  children,
  handleOnClick,
  extraStyles,
  isFormButton,
  isBlogButton,
  ...restProps
}: Props) => {
  const isDarkTheme = useContext(ThemeContext);
  let style, baseStyle, hoverStyle;
  if (isDarkTheme.isDark) {
    baseStyle =
      "h-[50px] w-[180px] rounded-3xl cursor-pointer text-sm font-bold tracking-[1.15px] outline-none";
    hoverStyle = "hover:border-[2px] transition duration-300";
    if (!isFormButton) {
      baseStyle = baseStyle + " " + "bg-primary-light text-dark-theme";
      hoverStyle =
        hoverStyle +
        " " +
        "hover:bg-transparent hover:border-primary-light hover:text-primary-light";
    }
    style = extraStyles
      ? baseStyle + " " + hoverStyle + " " + extraStyles
      : baseStyle + " " + hoverStyle;
  } else {
    baseStyle =
      "h-[50px] w-[180px] rounded-3xl cursor-pointer text-sm font-bold tracking-[1.15px] bg-secondary-dark text-primary-dark outline-none";
    hoverStyle =
      "hover:bg-primary-dark hover:border-[2px] hover:border-secondary-dark hover:text-secondary-dark transition duration-300";
    style = extraStyles
      ? baseStyle + " " + hoverStyle + " " + extraStyles
      : baseStyle + " " + hoverStyle;
    style = extraStyles
      ? baseStyle + " " + hoverStyle + " " + extraStyles
      : baseStyle + " " + hoverStyle;
  }

  return (
    <button onClick={handleOnClick} className={style} {...restProps}>
      {children}
    </button>
  );
};

export default ActionButton;
