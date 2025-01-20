import { User } from "./user.interface";

export interface ContentModal {
    status?: 'error' | 'success',
    message: string,
}