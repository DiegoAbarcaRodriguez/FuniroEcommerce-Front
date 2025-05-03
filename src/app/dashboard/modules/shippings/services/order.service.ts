import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderResponse } from '../inferfaces/orders-response';
import { Environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { catchError, Observable } from 'rxjs';
import { status, UpdateStatusResponse } from '../inferfaces/update-status-response.interface';

@Injectable({ providedIn: 'root' })
export class OrderService {

    private _url: string = Environment.url + '/order';

    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) { }

    getAllOrders(page: number = 1, limit: number = 5, status: status = ''): Observable<OrderResponse | any> {
        return this._http.get<OrderResponse>(`${this._url}/get-all-orders?page=${page}&limit=${limit}&status=${status}`, { headers: { 'Authorization': `Bearer ${this._authService.token}` } })
            .pipe(catchError(() => ({ ok: false, orders: [], total: 0 }) as any))
    }

    updateStatus(status: status, order_id: string): Observable<UpdateStatusResponse> {
        return this._http.patch<UpdateStatusResponse>(`${this._url}/update-status/${order_id}`, { status }, { headers: { 'Authorization': `Bearer ${this._authService.token}` } });
    }

    getFilterOrdersByCustomerName(page: number = 1, limit: number = 5, query: string): Observable<OrderResponse | any> {
        return this._http.get<OrderResponse>(`${this._url}/get-order/${query}?limit=${limit}&page=${page}`, { headers: { 'Authorization': `Bearer ${this._authService.token}` } })
            .pipe(catchError(() => ({ ok: false, orders: [], total: 0 }) as any))
    }
}
