import { Customer } from "./customer.interface";
import { Furniture } from "./furniture.interface";

export interface Review {
    id?: string;
    grade: number;
    comment: string;
    customer: Customer;
    furniture: Furniture;
}