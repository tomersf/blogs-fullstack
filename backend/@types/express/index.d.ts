declare namespace Express {
  export interface Request {
    user: {
      userID: string;
      username: string;
    };
  }
}
