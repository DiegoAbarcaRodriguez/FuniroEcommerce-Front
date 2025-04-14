import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CustomerService } from 'src/app/main/shared/services/customer.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
    templateUrl: 'recover-password.component.html',
    styles: [
        `
            .w-custom{
                width:100%;
                @media(min-width:768px){
                    width:50%
                }
            }
        `
    ]
})

export class RecoverPasswordComponent implements OnInit {

    private _customerId?: string;

    form = this._fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]],
    }, {
        validators: [
            this._validationService.compareFieldsFromFormGroup('password', 'password2')
        ]
    });

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _customerService: CustomerService,
        private _validationService: ValidationService,
        private _fb: FormBuilder,
        private _modal: ModalService,
        private _router: Router
    ) { }



    ngOnInit() {
        this._getUrlParams();
    }

    private _getUrlParams() {

        this._activatedRoute.params.pipe(
            switchMap(({ token }) => this._customerService.validatePasswordToken(token))
        ).subscribe(({ ok, id }) => {
            if (!ok) {
                this._router.navigateByUrl('/home');
                this._modal.openModal({ status: 'error', message: 'The token is not valid!' });
                return;
            }

            this._customerId = id;
        });
    }

    isValidField(field: string) {
        return this._validationService.isValidField(field, this.form);
    }

    getErrorsField(field: string) {
        return this._validationService.getErrorsField(field, this.form);
    }

    generatePassword() {
        this._customerService.updatePassword(this._customerId!, this.form.value.password, this.form.value.password2)
            .subscribe({
                next: () => {
                    this._router.navigateByUrl('/home');
                    this._modal.openModal({ status: 'success', message: 'The password was updated successfully' });
                },
                error: ({ error }: HttpErrorResponse) => {
                    this._router.navigateByUrl('/home');
                    this._modal.openModal({ status: 'success', message: error.message });
                }
            });
    }
}