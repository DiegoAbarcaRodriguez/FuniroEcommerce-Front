export interface OrderRespond {
    ok: boolean;
    order: Order;
    furnitures: FurnitureElement[];
}

export interface FurnitureElement {
    id: number;
    order_fk: string;
    furniture_fk: string;
    quantity: number;
    furniture: FurnitureFurniture;
}

export interface FurnitureFurniture {
    id: string;
    user_fk: string;
    name: string;
    description: string;
    discount: number;
    is_new: boolean;
    category: string;
    price: number;
    stock: number;
    sales_package: string;
    model_number: string;
    secondary_material: string;
    upholstery_material: string;
    upholstery_color: string;
    height: number;
    width: number;
    depth?: number;
    weight: number;
    warranty_domestic: number;
    warranty_general: number;
    filling_material: string;
    has_adjustable_headrest: boolean;
    max_load: number;
    origin: string;
    modify_at: Date;
    images: string[];
}

export interface Order {
    id: string;
    total: number;
    status: string;
    customer_fk: string;
    user_fk?: string;
    created_at: Date;
    customer: Customer;
}

export interface Customer {
    id: string;
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    phone: string;
    zip_code: number;
    country: string;
    city: string;
    province: string;
    street: string;
    additional_information?: string;
    password: string;
    token?: string;
}
