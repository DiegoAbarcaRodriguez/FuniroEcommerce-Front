import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingCarService {

    private _mustShowShoppingCarComponent: Subject<boolean> = new Subject();

    get mustShowShoppingCarComponet(): Observable<boolean> {
        return this._mustShowShoppingCarComponent.asObservable();
    }

    set mustShowShoppingCarComponet(value: boolean) {
        this._mustShowShoppingCarComponent.next(value);
    }

    constructor() { }

}