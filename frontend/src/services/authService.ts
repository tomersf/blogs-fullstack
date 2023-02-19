import { User } from "@tomersf/blog.shared";
import axios, { HttpStatusCode } from "axios";
import config from "../config";
import { LoginPayload } from "../interfaces";

let userToken = "";

const registerUser = async (
  username: string,
  password: string
): Promise<{ success: boolean }> => {
  try {
    const res = await axios.post(config.registerUrl, {
      username,
      password,
    });
    if (res.status == HttpStatusCode.Created) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch {}
  return {
    success: false,
  };
};

const loginUser = async (
  username: string,
  password: string
): Promise<LoginPayload> => {
  try {
    const res = await axios.post(config.loginUrl, {
      username,
      password,
    });
    if (res.status == HttpStatusCode.Ok) {
      window.localStorage.setItem(
        "blogData",
        JSON.stringify({ token: res.data.token, username: res.data.username })
      );
      return {
        success: true,
        data: {
          username: res.data.username,
          blogs: [],
          id: res.data.id,
          token: res.data.token,
        },
      };
    } else {
      return {
        success: false,
      };
    }
  } catch {}
  return {
    success: false,
  };
};

const setToken = (token: string) => {
  userToken = token;
};
const getToken = () => userToken;

export default { registerUser, loginUser, setToken, getToken };
