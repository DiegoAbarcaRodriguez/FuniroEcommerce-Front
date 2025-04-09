import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { EmailValidatorService } from '../../validators/email.validator';
import { FormsService } from '../../services/forms.service';

@Component({
    selector: 'checkout-component-form-contact',
    templateUrl: 'form-contact.component.html'
})

export class FormContactComponent implements OnInit {

    form = this._fb.group({
        phone: ['', [Validators.required, Validators.minLength(10)]],
        email: ['', [Validators.required, Validators.email], [this._emailValidatorService]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]],
        additional: ['']
    }, {
        validators: [
            this._validationService.compareFieldsFromFormGroup('password', 'password2')
        ]
    });

    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _emailValidatorService: EmailValidatorService,
        private _formsService: FormsService
    ) { }

    ngOnInit() {
        this._formsService.formContact = this.form;
    }

    getMessageErrors(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.form);
    }

    mustShowError(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.form);
    }

}