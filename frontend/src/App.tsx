import { useEffect, useState } from "react";
import { Blog as IBlog } from "@tomersf/blog.shared";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import ThemeContext from "./context/theme";
import ColorTheme from "./components/ColorTheme";
import authService from "./services/authService";
import ActionButton from "./components/ActionButton";

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [user, setUser] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const blogUserData = window.localStorage.getItem("blogData");
    if (blogUserData) {
      const data = JSON.parse(blogUserData);
      setUser(data.username);
      authService.setToken(data.token);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("blogData");
    setUser("");
    authService.setToken("");
    setBlogs([]);
  };

  return (
    <>
      <ThemeContext.Provider
        value={{
          isDark: darkMode,
          toggleDark: () => setDarkMode((prevValue) => !prevValue),
        }}
      >
        <div className={`app ${darkMode ? "bg-dark-theme" : "bg-gray-20"}`}>
          {user ? (
            <div className="flex h-full w-full">
              <div className="mt-5 flex w-full px-5">
                <ColorTheme />
                <HomePage user={user} />
                <ActionButton handleOnClick={signOut}>Sign Out</ActionButton>
              </div>
            </div>
          ) : (
            <div>
              <ColorTheme />
              <AuthPage setUser={setUser} />
            </div>
          )}
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
