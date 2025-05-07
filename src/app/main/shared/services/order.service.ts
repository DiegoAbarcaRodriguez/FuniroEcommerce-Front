import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';
import { Observable, Subject } from 'rxjs';
import { OrderRespond } from '../interfaces/order-extended.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private _url: string = Environment.url + '/order';
    private _mustShowDetailOrderModal: Subject<boolean> = new Subject();
    private _order_id: string = ''

    get mustShowDetailOrderModal(): Observable<boolean> {
        return this._mustShowDetailOrderModal.asObservable();
    }


    get order_id(): string {
        return this._order_id;
    }


    constructor(
        private _http: HttpClient,
        private _customerService: CustomerService,
        private _authService: AuthService
    ) { }

    getOrderDetails(id: string, isFromDashboard: boolean = false): Observable<OrderRespond> {
        return this._http.get<OrderRespond>(`${this._url}/${id}`, { headers: { 'Authorization': `Bearer ${isFromDashboard ? this._authService.token : this._customerService.token}` } });
    }

    openModalDetailsOrder(id: string) {
        this._order_id = id;
        window.scroll(0, 0,);
        document.querySelector('body')?.classList.add('no-scroll');
        this._mustShowDetailOrderModal.next(true);

    }
    closeModalDetailsOrder() {
        this._order_id = '';
        document.querySelector('body')?.classList.remove('no-scroll');
        this._mustShowDetailOrderModal.next(false);

    }
}