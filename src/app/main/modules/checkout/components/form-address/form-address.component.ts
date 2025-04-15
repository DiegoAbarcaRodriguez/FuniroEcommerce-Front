import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { CPService } from '../../services/cp.service';
import { catchError, filter, of, switchMap, tap } from 'rxjs';
import { FormsService } from '../../services/forms.service';

@Component({
    selector: 'checkout-component-form-address',
    templateUrl: 'form-address.component.html',
    styles: [
        `
            .disable {
                cursor:not-allowed;
            }

            .disable {
                background-color:#E8F0FE;
                border: gray solid 1px;
            }
      `
    ]
})

export class FormAddressComponent implements OnInit {

    mustDisableZipCodeInput: boolean = true;
    mustDisable: boolean = false;

    form = this._fb.group({
        zip_code: ['', [Validators.required, Validators.minLength(5), Validators.min(0), this._validationService.validateMaxExtensionZipCodeInput]],
        country: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        street: ['', Validators.required],
    });

    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _cpService: CPService,
        private _formsService: FormsService
    ) { }

    ngOnInit() {
        this.onChangeSelect();
        this.onChangeZipCode();
        this._formsService.formAddress = this.form;
        this._formsService.mustDisableInputs.subscribe(value => this.mustDisable = value);
    }

    private onChangeSelect() {
        this.form.get('country')?.valueChanges.subscribe((value) => {
            (value === '')
                ?
                this.mustDisableZipCodeInput = true
                :
                this.mustDisableZipCodeInput = false;

            this.form.get('city')?.reset();
            this.form.get('province')?.reset();
            this.form.get('zip_code')?.reset();

        });
    }

    private onChangeZipCode() {
        let countryCode = '';

        this.form.get('zip_code')?.valueChanges.pipe(
            tap(() => countryCode = this.form.get('country')?.value as 'mx' | 'us'),
            filter(() => countryCode !== '' && this.form.get('zip_code')!.valid),
            switchMap((value) => this._cpService.getLocationFromCp(countryCode as 'mx' | 'us', value!)),
            catchError(() => of(null))

        ).subscribe((data) => {

            if (!data) return;

            const { county, state } = data.features[0]?.properties;

            this.form.get('city')?.setValue(county);
            this.form.get('province')?.setValue(state);
        });
    }

    getMessageErrors(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.form);
    }

    mustShowError(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.form);
    }

}
