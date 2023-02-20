import { Blog, ErrorType } from "@tomersf/blog.shared";

function isErrorType(data: ErrorType | unknown): data is ErrorType {
  return (data as ErrorType).msg !== undefined;
}

function isBlogType(data: Blog | unknown): data is Blog {
  return (data as Blog).title !== undefined;
}

function isBlogsType(data: Blog[] | unknown): data is Blog[] {
  return (Array.isArray(data) && (data as Blog[])[0].title) !== undefined;
}

export default { isErrorType, isBlogType, isBlogsType };
