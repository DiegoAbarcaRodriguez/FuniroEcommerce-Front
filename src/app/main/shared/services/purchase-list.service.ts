import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';
import { PurchasedFurnitures } from '../interfaces/purchased-furnitures.interface';

@Injectable({ providedIn: 'root' })
export class PurchaseListService {

    private _url: string = Environment.url + '/furniture';

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

    getPurchasedFurnitures(): Observable<PurchasedFurnitures> {
        return this._http.get<PurchasedFurnitures>(`${this._url}/purchased-furnitures`, {
            headers: {
                'Authorization': `Bearer ${this._customerService.token}`
            }
        }).pipe(
            catchError(() => []
            ));
    }

}