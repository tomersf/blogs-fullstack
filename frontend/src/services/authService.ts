import axios, { HttpStatusCode } from "axios";
import config from "../config";
import { LoginPayload } from "../interfaces";
import jwtDecode from "jwt-decode";
import { DecodedTokenPayload } from "@tomersf/blog.shared";

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
      window.localStorage.setItem("token", JSON.stringify(res.data.token));
      setToken(res.data.token);
      return {
        success: true,
        token: res.data.token,
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
const getToken = () => `Bearer ${userToken}`;

const removeToken = () => {
  localStorage.removeItem("token");
};

const parseToken = (): { isExpired: boolean; username: string } => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    const token = JSON.parse(savedToken);
    setToken(token);
    const decodedToken = jwtDecode(token) as DecodedTokenPayload;
    const expirationDate = new Date(decodedToken.exp * 1000);
    const isExpired = expirationDate < new Date();
    if (isExpired) {
      return { isExpired: true, username: "" };
    }
    return { isExpired: false, username: decodedToken.username };
  }
  return { isExpired: true, username: "" };
};
export default {
  registerUser,
  loginUser,
  setToken,
  getToken,
  removeToken,
  parseToken,
};
