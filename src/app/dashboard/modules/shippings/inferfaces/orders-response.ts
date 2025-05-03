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
    customer: Customer;
}

export interface Customer {
    first_name: string;
    last_name: string;
}
