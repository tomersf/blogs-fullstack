import { Blog, ErrorType } from "@tomersf/blog.shared";

function isErrorType(data: ErrorType | unknown): data is ErrorType {
  try {
    return (data as ErrorType).msg !== undefined;
  } catch {
    return false;
  }
}

function isBlogType(data: Blog | unknown): data is Blog {
  try {
    return (data as Blog).title !== undefined;
  } catch {
    return false;
  }
}

function isBlogsType(data: Blog[] | unknown): data is Blog[] {
  try {
    return (Array.isArray(data) && (data as Blog[])[0].title) !== undefined;
  } catch {
    return false;
  }
}

export default { isErrorType, isBlogType, isBlogsType };
