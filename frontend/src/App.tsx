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
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const { isExpired, username } = authService.parseToken();
    if (isExpired) {
      signOut();
    }
    setUser(username);
    setLoggedIn(true);
  }, []);

  const signOut = () => {
    authService.removeToken();
    setUser("");
    setBlogs([]);
    setLoggedIn(false);
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
          {loggedIn ? (
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
              <AuthPage setLoggedIn={setLoggedIn} />
            </div>
          )}
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
