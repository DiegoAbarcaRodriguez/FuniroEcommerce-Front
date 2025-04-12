import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalCustomerService {
    private _mustShowModalCustomer: Subject<boolean> = new Subject();

    get mustShowModalCustomer(): Observable<boolean> {
        return this._mustShowModalCustomer.asObservable();
    }

    constructor() { }

    openModal() {
        window.scrollTo(0, 0);
        this._mustShowModalCustomer.next(true);
        document.querySelector('body')?.classList.add('no-scroll');
    }

    closeModal() {
        this._mustShowModalCustomer.next(false);
        document.querySelector('body')?.classList.remove('no-scroll');
    }

}