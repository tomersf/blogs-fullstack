import { User } from "@tomersf/blog.shared";

interface LoginPayload {
  success: boolean;
  token?: string;
}

export type { LoginPayload };
