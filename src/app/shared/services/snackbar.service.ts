import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
    private _mustShowSnackBar: Subject<boolean> = new Subject();
    private _message: string = '';

    set mustShowSnackBar(value: boolean) {
        this._mustShowSnackBar.next(value);
    }

    get mustShowSnackBar(): Observable<boolean> {
        return this._mustShowSnackBar.asObservable();
    }

    set message(value: string) {
        this._message = value;
    }

    get message(): string {
        return this._message;
    }

    constructor() { }

}