import { Customer } from "src/app/shared/interfaces"

export interface ReviewPayload {
    customer_id: string,
    furniture_id: string,
    title: string,
    grade: number,
    comment: string
}

export interface Review {
    id: string,
    title: string,
    comment: string,
    grade: number,
    customer: Customer,
    created_at: Date,
    furniture_fk: string,
    customer_fk?:string,
    stars?: number[]

}