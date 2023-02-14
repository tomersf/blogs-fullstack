import { useEffect, useState } from "react";
import { Blog as IBlog, User, JWTPayload } from "@tomersf/blog.shared";
import HomePage from "./components/HomePage";
import AuthForm from "./components/AuthForm";
import jwt from 'jsonwebtoken'
import config from "./config";

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState('')

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
    <div className="app">
      {user ? <HomePage user={user} /> : <AuthForm setUser={setUser} setToken={setToken} />}
    </div>
  );
};

export default App;
