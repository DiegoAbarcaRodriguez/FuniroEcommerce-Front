import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {

    private _mustShowReviewModal: Subject<boolean> = new Subject();


    get mustShowReviewModal(): Observable<boolean> {
        return this._mustShowReviewModal.asObservable();
    }

    constructor() { }

    openModal() {
        document.querySelector('body')?.classList.add('no-scroll');
        window.scroll(0, 0);
        this._mustShowReviewModal.next(true);
    }

    closeModal() {
        document.querySelector('body')?.classList.remove('no-scroll');
        this._mustShowReviewModal.next(false);
    }

}