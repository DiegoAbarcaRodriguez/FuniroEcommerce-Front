import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';
import { Observable } from 'rxjs';
import { OrderRespond } from '../interfaces/order-extended.interface';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private _url: string = Environment.url + '/order';

    constructor(
        private _http: HttpClient,
        private _customerService: CustomerService
    ) { }

    getOrderDetails(id: string): Observable<OrderRespond> {
        return this._http.get<OrderRespond>(`${this._url}/${id}`, { headers: { 'Authorization': `Bearer ${this._customerService.token}` } });
    }
}