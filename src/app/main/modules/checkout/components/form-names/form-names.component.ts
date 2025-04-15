import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { FormsService } from '../../services/forms.service';

@Component({
    selector: 'checkout-component-form-names',
    templateUrl: 'form-names.component.html',
    styles: [
        ` .disable {
            cursor:not-allowed;
        }

        .disable {
            background-color:#E8F0FE;
            border: gray solid 1px;
        }
        
        `
    ]
})

export class FormNamesComponent implements OnInit {

    mustDisable: boolean = false;


    form: FormGroup = this._fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        company_name: [''],
    });

    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _formsService: FormsService
    ) { }

    ngOnInit() {
        this._formsService.formNames = this.form;
        this._formsService.mustDisableInputs.subscribe((value) => this.mustDisable = value);
    }

    getMessageErrors(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.form);
    }

    mustShowError(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.form);
    }


}