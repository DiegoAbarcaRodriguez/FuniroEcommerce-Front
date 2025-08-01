import { Review } from "src/app/main/shared/interfaces/review.interface";
import { User } from "src/app/shared/interfaces";

export interface Furniture {
    id: string;
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
    depth?: number;
    weight: number;
    warranty_domestic: number;
    warranty_general: number;
    filling_material: null | string;
    has_adjustable_headrest: boolean | null;
    max_load: number;
    origin: string;
    modify_at: Date;
    images: string[];
    user?: User;
    discount_percentage?: number;
    quatity?: number;
    review?: Review;
    reviews?: Review[];
    stars?: number[];
}



