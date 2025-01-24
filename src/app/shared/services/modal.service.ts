import { Injectable } from '@angular/core';
import { ContentModal } from '../interfaces/content-modal.interface';
import { filter, Observable, Subject } from 'rxjs';
import { User } from '../interfaces';
import { Furniture } from 'src/app/dashboard/modules/furnitures/interfaces/furniture.interface';


@Injectable({ providedIn: 'root' })
export class ModalService {

    private _mustShowModal: Subject<boolean> = new Subject();
    private _contentModal?: ContentModal;

    private _respondFromQuestionModal: Subject<boolean> = new Subject();
    private _mustShowQuestionModal: Subject<boolean> = new Subject();
    private _contentQuestionModal?: any;


    get mustShowQuestionModal(): Observable<boolean> {
        return this._mustShowQuestionModal.asObservable();
    }

    get respondFromQuestionModal(): Observable<boolean> {
        return this._respondFromQuestionModal.asObservable()
            .pipe(
                filter(value => value)
            )
    }

    set respondFromQuestionModal(respond: boolean) {
        this._respondFromQuestionModal.next(respond);
        this.closeQuestionModal();
    }

    get contentQuestionModal() {
        return this._contentQuestionModal;
    }

    get mustShowModal(): Observable<boolean> {
        return this._mustShowModal.asObservable();
    }

    get contentModal(): ContentModal | undefined {
        return this._contentModal;
    }

    constructor() { }

    openQuestionModal(content: User | Furniture) {
        this._mustShowQuestionModal.next(true);
        this._contentQuestionModal = content;
        document.querySelector('body')?.classList.add('no-scroll');
    }


    closeQuestionModal() {
        this._mustShowQuestionModal.next(false);
        this._contentModal = undefined;
        document.querySelector('body')?.classList.remove('no-scroll');
    }

    openModal(content: ContentModal) {
        this._mustShowModal.next(true);
        this._contentModal = content;
        document.querySelector('body')?.classList.add('no-scroll');
    }

    closeModal() {
        this._mustShowModal.next(false);
        this._contentModal = undefined;
        document.querySelector('body')?.classList.remove('no-scroll');
    }




}