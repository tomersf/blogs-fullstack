import { createContext } from "react";

interface Theme {
  name: string;
}

const NameContext = createContext<Theme>({
  name: "",
});

export default NameContext;
