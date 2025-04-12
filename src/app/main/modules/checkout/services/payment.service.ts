import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { FormsService } from './forms.service';
import { CustomerService } from 'src/app/main/shared/services/customer.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {

    private _baseUrl = Environment.url;
    private _customerName: string = '';
    private _payload: any;



    get customerName(): string {
        return this._customerName;
    }


    constructor(
        private _http: HttpClient,
        private _formsService: FormsService,
        private _customerService: CustomerService
    ) { }

    private _preparePayload(furniture_id: string[], quantity: number[], total: string) {

        localStorage.setItem('payload', JSON.stringify({
            furniture_id,
            quantity,
            ...this._formsService.formContact?.value,
            ...this._formsService.formAddress?.value,
            ...this._formsService.formNames?.value,
            phone: (this._formsService.formContact?.get('phone')?.value as number).toString(),
            zip_code: (this._formsService.formAddress?.get('zip_code')?.value as number).toString(),
            email: (this._formsService.formContact?.get('email')?.value as string).trim().toLocaleLowerCase(),
            total,
            status: 'confirm'
        }));

        return ({
            furniture_id,
            quantity,
            ...this._formsService.formContact?.value,
            ...this._formsService.formAddress?.value,
            ...this._formsService.formNames?.value,
            phone: (this._formsService.formContact?.get('phone')?.value as number).toString(),
            zip_code: (this._formsService.formAddress?.get('zip_code')?.value as number).toString(),
            email: (this._formsService.formContact?.get('email')?.value as string).trim().toLocaleLowerCase(),
            total,
            status: 'confirm'
        });
    }

    private _getCustomerData() {
        this._customerName = this._payload.first_name + ' ' + this._payload.last_name;
    }

    verifyFurnituresStock(furnitures_id: string[], quantities: number[]): Observable<{ ok: boolean, message: string }> {
        return this._http.post<{ ok: boolean, message: string }>(`${this._baseUrl}/order/validate-furnitures`, { furniture_id: furnitures_id, quantity: quantities });
    }

    executePayment(furnitures_id: string[], quantities: number[], total: string): Observable<{ ok: boolean, url: string, session_id: string }> {
        const body = this._preparePayload(furnitures_id, quantities, total);
        return this._http.post<{ ok: boolean, url: string, session_id: string }>(`${this._baseUrl}/order/execute-payment`, body);
    }

    createOrder(): Observable<{ ok: boolean, message: string, token: string, email: string }> {
        this._payload = JSON.parse(localStorage.getItem('payload')!);
        this._getCustomerData();
        return this._http.post<{ ok: boolean, message: string, token: string, email: string }>(`${this._baseUrl}/order`, { ...this._payload, session_id: localStorage.getItem('session_id') || '' })
            .pipe(tap(() => this._customerService.customer = this._payload));
    }

}