export interface OrderResponse {
    ok: boolean;
    orders: Order[];
}

export interface Order {
    id: string;
    total: number;
    status: string;
    customer_fk?: string;
    user_fk?: string;
    created_at: Date;
}