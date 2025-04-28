import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';
import { OrderResponse } from '../interfaces/order.interface';
import { Furniture } from 'src/app/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PurchaseListService {

    private _url: string = Environment.url;

    private _mustShowPurchaseList: Subject<boolean> = new Subject();

    get mustShowPurchaseList(): Observable<boolean> {
        return this._mustShowPurchaseList.asObservable();
    }

    set mustShowPurchaseList(value: boolean) {
        this._mustShowPurchaseList.next(value);
    }

    constructor(
        private _http: HttpClient,
        private _customerService: CustomerService
    ) { }

    getOrders(): Observable<OrderResponse> {
        return this._http.get<OrderResponse>(`${this._url}/order/get-orders`, {
            headers: {
                'Authorization': `Bearer ${this._customerService.token}`
            }
        });
    }

    getPurchasedFurnitures(order_id: string): Observable<{ ok: boolean, furnitures: Furniture[] }> {
        return this._http.get<{ ok: boolean, furnitures: Furniture[] }>(`${this._url}/furniture/byOrder/${order_id}`, {
            headers: {
                'Authorization': `Bearer ${this._customerService.token}`
            }
        })
    }

}