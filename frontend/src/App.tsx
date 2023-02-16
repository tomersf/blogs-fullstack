import { useEffect, useState } from "react";
import { Blog as IBlog } from "@tomersf/blog.shared";
import HomePage from "./components/HomePage";
import AuthForm from "./components/AuthForm";
import ThemeContext from "./context/theme";
import ColorTheme from "./components/ColorTheme";
import ActionButton from "./components/ActionButton";

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

  const signOut = () => {
    localStorage.removeItem("blogData");
    setUser("");
    setToken("");
    setBlogs([]);
  };

  return (
    <>
      <ThemeContext.Provider value={darkMode}>
        <div
          className={`app flex ${darkMode ? "bg-dark-theme" : "bg-gray-20"}`}
        >
          <div className="mx-5 mt-3 flex w-full justify-around">
            <div className="">
              <ColorTheme
                onClick={() => setDarkMode((prevValue) => !prevValue)}
              />
            </div>
            <div className="grow">
              {user ? (
                <HomePage user={user} />
              ) : (
                <AuthForm setUser={setUser} setToken={setToken} />
              )}
            </div>
            {user ? (
              <div className="">
                <ActionButton handleOnClick={signOut}>Sign Out</ActionButton>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
