export interface Customer {
    id?: string;
    first_name: string;
    last_name: string;
    company_name?: string;
    email: string;
    phone: string;
    zip_code: number;
    country: string;
    city: string;
    province: string;
    street: string;
    additional_information?: string;

}