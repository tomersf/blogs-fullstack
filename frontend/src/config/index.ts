const baseUrl = "http://localhost:3003/api/";
const blogsUrl = baseUrl + "blogs/";
const userBlogsUrl = blogsUrl + "myblogs";
const usersUrl = baseUrl + "users/";
const authUrl = baseUrl + "auth/";
const loginUrl = authUrl + "login";
const registerUrl = authUrl + "register";

const JWT_SECRET = "Test";

export default {
  authUrl,
  baseUrl,
  blogsUrl,
  loginUrl,
  registerUrl,
  usersUrl,
  JWT_SECRET,
  userBlogsUrl,
};
