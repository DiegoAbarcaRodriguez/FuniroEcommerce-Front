import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormsService {

    private _formAddress?: FormGroup;
    private _formContact?: FormGroup;
    private _formNames?: FormGroup;

    private _mustDisableInputs: Subject<boolean> = new Subject();

    set mustDisableInputs(value: boolean) {
        this._mustDisableInputs.next(value);
    }

    get mustDisableInputs(): Observable<boolean> {
        return this._mustDisableInputs.asObservable();
    }

    set formAddress(form: FormGroup) {
        this._formAddress = form;
    }

    set formContact(form: FormGroup) {
        this._formContact = form;
    }
    set formNames(form: FormGroup) {
        this._formNames = form;
    }

    get formAddress(): FormGroup | undefined {
        return this._formAddress;
    }

    get formContact(): FormGroup | undefined {
        return this._formContact;
    }
    get formNames(): FormGroup | undefined {
        return this._formNames;
    }

    constructor() { }



}