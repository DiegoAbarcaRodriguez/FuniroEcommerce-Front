export interface UpdateStatusResponse {
    ok: boolean;
    orderUpdated: OrderUpdated;
}

export interface OrderUpdated {
    id: string;
    total: number;
    status: status;
    customer_fk: string;
    user_fk: string;
    created_at: Date;
    modify_at: Date;
}

export type status = 'confirm' | 'on_way' | 'complete' | 'rejected' | '';

export const statusMap = {
    'confirm': 'on_way',
    'on_way': 'complete',
    'complete': 'rejected',
    'rejected': 'confirm',
    '': ''
}