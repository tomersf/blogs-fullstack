import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import ThemeContext from "./context/theme";
import ColorTheme from "./components/ColorTheme";
import authService from "./services/authService";
import ActionButton from "./components/ActionButton";
import { useStoreDispatch, useStoreSelector } from "./store/hooks";
import { logIn, logOut } from "./reducers/userReducer";
import { initializeBlogs, setBlogs } from "./reducers/blogReducer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const user = useStoreSelector((state) => state.user);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const { isExpired, username } = authService.parseToken();
    if (isExpired) {
      signOut();
      return;
    }
    dispatch(initializeBlogs(username));
    dispatch(logIn(username));
  }, []);

  const signOut = () => {
    authService.removeToken();
    dispatch(logOut());
    dispatch(setBlogs([]));
  };

  return (
    <Router>
      <ThemeContext.Provider
        value={{
          isDark: darkMode,
          toggleDark: () => setDarkMode((prevValue) => !prevValue),
        }}
      >
        <div className={`app ${darkMode ? "bg-dark-theme" : "bg-gray-20"}`}>
          <Routes>
            <Route
              path="/auth"
              element={
                <div className="flex h-full w-full flex-col">
                  <div className="mt-5 flex w-full px-5">
                    <ColorTheme />
                  </div>
                  <AuthPage />
                </div>
              }
            />
            <Route
              path="/"
              element={
                user.loggedIn ? (
                  <div className="flex h-full w-full">
                    <div className="mt-5 flex w-full px-5">
                      <ColorTheme />
                      <HomePage user={user.username || "Guest"} />
                      <ActionButton handleOnClick={signOut}>
                        Sign Out
                      </ActionButton>
                    </div>
                  </div>
                ) : (
                  <Navigate replace to="/auth" />
                )
              }
            />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;
