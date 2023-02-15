import { useEffect, useState } from "react";
import { Blog as IBlog, User, JWTPayload } from "@tomersf/blog.shared";
import HomePage from "./components/HomePage";
import AuthForm from "./components/AuthForm";
import jwt from "jsonwebtoken";
import config from "./config";
import ThemeContext from "./context/theme";
import ActionButton from "./components/ActionButton";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  // useEffect(() => {
  //   let token = window.localStorage.getItem('token')
  //   if (token) {
  //     token = JSON.parse(token)
  //     const payload = jwt.verify(token as string, config.JWT_SECRET) as JWTPayload;
  //     console.log(payload)
  //     // setUser({username: payload.username,id: parseInt(payload.id), blogs: []})
  //   }
  // }, [])

  return (
    <>
      <ThemeContext.Provider value={darkMode}>
        <div className={`app ${darkMode ? "bg-dark-theme" : "bg-gray-20"}`}>
          <ActionButton
            extraStyles="mx-4 my-4"
            handleOnClick={() => setDarkMode((prevValue) => !prevValue)}
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-white" />
            ) : (
              <MoonIcon className="h-6 w-6 text-white" />
            )}
          </ActionButton>
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
