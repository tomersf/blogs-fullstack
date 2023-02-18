import { useEffect, useState } from "react";
import { Blog as IBlog } from "@tomersf/blog.shared";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import ThemeContext from "./context/theme";

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const blogUserData = window.localStorage.getItem("blogData");
    if (blogUserData) {
      const data = JSON.parse(blogUserData);
      setUser(data.username);
      setToken(data.token);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("blogData");
    setUser("");
    setToken("");
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
            <HomePage user={user} signOut={signOut} />
          ) : (
            <AuthPage setUser={setUser} setToken={setToken} />
          )}
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
