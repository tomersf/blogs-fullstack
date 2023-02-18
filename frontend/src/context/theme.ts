import { createContext } from "react";

interface Theme {
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<Theme>({
  isDark: true,
  toggleDark: () => {},
});

export default ThemeContext;
