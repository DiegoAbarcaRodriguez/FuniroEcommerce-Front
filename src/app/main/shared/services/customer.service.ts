import { Injectable } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    private _token: string = '';
    private _customer?: Customer;

    get customer(): Customer | undefined {
        return this._customer;
    }

    set customer(customer: Customer | undefined) {
        this._customer = customer;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
        localStorage.setItem('customer_token', value);
    }



    constructor() {
        this._token = localStorage.getItem('customer_token') || '';
    }

}