import authService from "../services/authService";

const baseUrl = "http://localhost:3003/api/";
const blogsUrl = baseUrl + "blogs/";
const userBlogsUrl = blogsUrl + "myblogs";
const usersUrl = baseUrl + "users/";
const authUrl = baseUrl + "auth/";
const loginUrl = authUrl + "login";
const registerUrl = authUrl + "register";
const resetUrl = baseUrl + "testing/reset";

const requestConfig = () => {
  return { headers: { Authorization: authService.getToken() } };
};

export default {
  authUrl,
  baseUrl,
  blogsUrl,
  loginUrl,
  registerUrl,
  resetUrl,
  usersUrl,
  userBlogsUrl,
  requestConfig,
};
