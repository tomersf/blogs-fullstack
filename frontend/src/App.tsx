import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ThemeContext from "./context/theme";
import ColorTheme from "./components/ColorTheme";
import authService from "./services/authService";
import ActionButton from "./components/buttons/ActionButton";
import { useStoreDispatch, useStoreSelector } from "./store/hooks";
import { logIn, logOut } from "./reducers/userReducer";
import { initializeBlogs, setBlogs, setMyBlogs } from "./reducers/blogReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
import ResponsiveAuthPage from "./pages/auth/ResponsiveAuthPage";
import BlogPage from "./components/BlogPage";
import RequireLogin from "./components/RequireLogin";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const user = useStoreSelector((state) => state.user);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const { isExpired, username } = authService.parseToken();
    if (!user.asGuest && isExpired) {
      signOut();
      return;
    }
    if (!user.asGuest) {
      dispatch(initializeBlogs(username));
      dispatch(logIn(username));
    }
  }, [user]);

  const signOut = () => {
    authService.removeToken();
    dispatch(logOut());
    dispatch(setBlogs([]));
    dispatch(setMyBlogs(""));
  };

  return (
    <Router>
      <ThemeContext.Provider
        value={{
          isDark: darkMode,
          toggleDark: () => setDarkMode((prevValue) => !prevValue),
        }}
      >
        <div
          className={`min-h-screen w-full ${
            darkMode ? "bg-dark-theme" : "bg-gray-20"
          }`}
        >
          <Routes>
            <Route path="/auth" element={<ResponsiveAuthPage />} />
            <Route
              path="/"
              element={
                <RequireLogin>
                  <div className="flex h-full w-full ">
                    <div className="flex h-full w-full  px-5">
                      <ColorTheme extraStyles="mt-5" />
                      <HomePage user={user.username || "Guest"} />
                      <ActionButton handleOnClick={signOut} extraStyles="mt-5">
                        Sign Out
                      </ActionButton>
                    </div>
                  </div>
                </RequireLogin>
              }
            >
              <Route path="blogs/:name" element={<Blogs all={false} />}></Route>
              <Route path="blogs" element={<Blogs all />}></Route>
              <Route path="blog/:id" element={<BlogPage />} />
              <Route path="blog" element={<CreateBlogForm />} />
            </Route>
          </Routes>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;
