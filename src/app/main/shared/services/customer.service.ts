import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    private _token: string = '';
    private _customer?: Customer;
    private _url = Environment.url;

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



    constructor(private _htpp: HttpClient) {
        this._token = localStorage.getItem('customer_token') || '';
    }

    loginCustomerAccount(email: string, password: string): Observable<{ customer: Customer, token: string }> {
        return this._htpp.post<{ customer: Customer, token: string }>(`${this._url}/customer/login`, { email, password });
    }

    sendEmailRecoverPassword(email: string) {
        return this._htpp.post(`${this._url}/customer/send-email`, { email });
    }

    validatePasswordToken(token: string): Observable<{ ok: boolean, id?: string }> {
        return this._htpp.get<{ ok: boolean, id?: string }>(`${this._url}/customer/validate-token`, { headers: { 'Authorization': 'Bearer ' + token } })
            .pipe(catchError(() => of({ ok: false })));

    }

    updatePassword(id: string, password: string, password2: string) {
        return this._htpp.post(`${this._url}/customer/update-password/${id}`, { password, password2 });
    }

    logOut() {
        this._customer = undefined;
        this._token = '';
        localStorage.removeItem('customer_token');
    }

}