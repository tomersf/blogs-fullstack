import axios, { HttpStatusCode } from "axios";

export const errorHandler = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return {
      msg: err.response?.data.msg as string,
      status: err.response?.status as number,
    };
  } else {
    return {
      msg: "Something went wrong",
      status: HttpStatusCode.InternalServerError,
    };
  }
};
