import { User } from "@tomersf/blog.shared"


interface LoginPayload {
    success: boolean
    data? : Omit<User, 'passwordHash'> & {token: string}
}

export type {LoginPayload}