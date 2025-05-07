import { status } from "./update-status-response.interface";

export interface OrderResponse {
    ok: boolean;
    orders: Order[];
    total: number;
}

export interface Order {
    id: string;
    status: status;
    total: number;
    created_at: Date;
    modify_at?: Date;
    user: User;
    customer: Customer;
}

export interface User {
    username: string
}

export interface Customer {
    first_name: string;
    last_name: string;
    street: string;
    email: string;
    phone: string
    zip_code: number,
    country: string,
    city: string,
    province: string,
}
