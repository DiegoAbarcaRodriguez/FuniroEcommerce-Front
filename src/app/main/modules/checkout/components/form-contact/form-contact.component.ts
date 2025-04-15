import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { EmailValidatorService } from '../../validators/email.validator';
import { FormsService } from '../../services/forms.service';

@Component({
    selector: 'checkout-component-form-contact',
    templateUrl: 'form-contact.component.html',
    styles: [`
         .disable {
                cursor:not-allowed;
            }

            .disable {
                background-color:#E8F0FE;
                border: gray solid 1px;
            }
        
        `]
})

export class FormContactComponent implements OnInit {

    mustDisable: boolean = false;

    form = this._fb.group({
        phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this._validationService.telefonoRegx)]],
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
        this._formsService.mustDisableInputs.subscribe(value => {
            this.mustDisable = value;
            if (value) {
                this.form.controls['email'].clearValidators();
                this.form.controls['email'].updateValueAndValidity();
                this.form.controls['password'].clearValidators();
                this.form.controls['password'].updateValueAndValidity();
                this.form.controls['password2'].clearValidators();
                this.form.controls['password2'].updateValueAndValidity();

            } else {
                this.form.controls['email'].setValidators([Validators.required, Validators.email]);
                this.form.controls['email'].addAsyncValidators(this._emailValidatorService as any);
                this.form.controls['email'].updateValueAndValidity();
                this.form.controls['password'].setValidators([Validators.required, Validators.minLength(6)]);
                this.form.controls['password'].updateValueAndValidity();
                this.form.controls['password2'].setValidators([Validators.required, Validators.minLength(6)]);
                this.form.controls['password2'].updateValueAndValidity();
            }
        });
    }

    getMessageErrors(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.form);
    }

    mustShowError(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.form);
    }

}