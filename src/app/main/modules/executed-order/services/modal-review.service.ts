import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Review } from 'src/app/main/shared/interfaces/review.interface';

@Injectable({ providedIn: 'root' })
export class ModalReviewService {

    private _mustShowReviewModal: Subject<boolean> = new Subject();
    furniture_id: string = '';
    review?: Review;


    get mustShowReviewModal(): Observable<boolean> {
        return this._mustShowReviewModal.asObservable();
    }

    constructor() { }

    openModal(furniture_id: string, review?: Review) {
        this.furniture_id = furniture_id;
        this.review = review;

        document.querySelector('body')?.classList.add('no-scroll');
        window.scroll(0, 0);
        this._mustShowReviewModal.next(true);
    }

    closeModal() {
        document.querySelector('body')?.classList.remove('no-scroll');
        this._mustShowReviewModal.next(false);
    }

}