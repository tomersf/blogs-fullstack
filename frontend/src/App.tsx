import { useEffect, useState } from "react";
import { Blog as IBlog, User, JWTPayload } from "@tomersf/blog.shared";
import HomePage from "./components/HomePage";
import AuthForm from "./components/AuthForm";
import jwt from "jsonwebtoken";
import config from "./config";
import ThemeContext from "./context/theme";
import ColorTheme from "./components/ColorTheme";

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const blogUserData = window.localStorage.getItem("blogData");
    if (blogUserData) {
      const data = JSON.parse(blogUserData);
      setUser(data.username);
      setToken(data.token);
    }
  }, []);

  return (
    <>
      <ThemeContext.Provider value={darkMode}>
        <div className={`app ${darkMode ? "bg-dark-theme" : "bg-gray-20"}`}>
          <ColorTheme onClick={() => setDarkMode((prevValue) => !prevValue)} />
          {user ? (
            <HomePage user={user} />
          ) : (
            <AuthForm setUser={setUser} setToken={setToken} />
          )}
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
