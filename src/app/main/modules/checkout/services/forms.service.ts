import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormsService {

    private _formAddress?: FormGroup;
    private _formContact?: FormGroup;
    private _formNames?: FormGroup;

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