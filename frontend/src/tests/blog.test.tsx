import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import { ReturnedBlog } from "@tomersf/blog.shared";
import blogService from "../services/blogService";
import { vi } from "vitest";
import CreateBlogForm from "../components/CreateBlogForm";

const blog: ReturnedBlog = {
  author: "Test",
  title: "Test",
  likes: 0,
  url: "www.test.com",
  user: {
    username: "test",
    id: "1111",
  },
};

test("should render blog", () => {
  render(<Blog blog={blog} onDelete={() => {}} />);
  let element = screen.getByText("Author: Test");
  expect(element).toBeDefined();
  element = screen.getByText("Title: Test");
  expect(element).toBeDefined();
});

test("Should increase the like counter when the like button is clicked", async () => {
  blogService.updateBlog = vi.fn();
  const mockedFn = blogService.updateBlog;
  render(<Blog blog={blog} onDelete={() => {}} />);
  await userEvent.click(screen.getByText("LIKE"));
  expect(screen.getByText("Likes", { exact: false })).toHaveTextContent(
    `Likes: ${blog.likes + 1}`
  );
  await userEvent.click(screen.getByText("LIKE"));
  expect(mockedFn).toBeCalledTimes(2);
});

test("When creating a new blog, the props arriving to createBlog service are the same as entered", async () => {
  render(<CreateBlogForm />);
  const createBlog = (blogService.createBlog = vi.fn());
  const user = userEvent.setup();
  let author = screen.getByPlaceholderText("Author");
  let title = screen.getByPlaceholderText("Title");
  let url = screen.getByPlaceholderText("Url");

  await user.type(author, "TestAuthor");
  await user.type(title, "TestTitle");
  await user.type(url, "www.example.com");
  await user.click(screen.getByText("Create Blog"));
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toBe("TestTitle");
  expect(createBlog.mock.calls[0][1]).toBe("TestAuthor");
  expect(createBlog.mock.calls[0][2]).toBe("www.example.com");
});
