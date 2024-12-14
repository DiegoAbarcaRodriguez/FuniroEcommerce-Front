export interface User {
    id: string,
    username: string,
    is_admin: boolean,
    is_root: boolean,
    user?: { username?: string },
    modify_at: string
}

