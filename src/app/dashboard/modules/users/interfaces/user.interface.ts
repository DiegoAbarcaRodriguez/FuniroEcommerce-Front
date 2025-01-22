import { User } from "src/app/shared/interfaces"

export interface CreateUserBody {
    username: string,
    password: string,
    is_admin: boolean
}

export interface UpdateUserBody {
    id: string,
    username?: string,
    password?: string,
}

export interface RespondSuccessfullUserApi {
    ok: boolean,
    message: string,
    user: User
}

export interface RespondGetUsersApi {
    users: User[],
    total: number
}