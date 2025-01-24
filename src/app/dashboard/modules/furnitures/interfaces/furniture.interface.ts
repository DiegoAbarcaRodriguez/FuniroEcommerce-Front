import { User } from "src/app/shared/interfaces";

export interface Furniture {
    id: number;
    user_fk: string;
    name: string;
    description: string;
    discount: number | null;
    is_new: boolean;
    category: null | string;
    price: number;
    stock: number;
    sales_package: string;
    model_number: string;
    secondary_material: null | string;
    upholstery_material: null | string;
    upholstery_color: null | string;
    height: number;
    width: number;
    depth: null;
    weight: number;
    warranty_domestic: number;
    warranty_general: number;
    filling_material: null | string;
    has_adjustable_headrest: boolean | null;
    max_load: number;
    origin: string;
    modify_at: Date;
    image: null | string;
    user: User;
}

