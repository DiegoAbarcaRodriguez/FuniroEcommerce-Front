import { User } from "src/app/shared/interfaces"


export interface RespondSuccessLogin {
    ok: boolean,
    token: string
    message: string,
}

export interface LoginBody {
    username: string,
    password: string
}

export interface RespondCheckLogginStatus {
    user: User,
    ok: boolean,
    token: string
}