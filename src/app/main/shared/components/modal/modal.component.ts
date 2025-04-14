import { Component, OnInit } from '@angular/core';
import { ModalCustomerService } from '../../services/modal-customer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
    selector: 'main-component-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.scss']
})

export class ModalComponent implements OnInit {


    typeOfModal?: 'login' | 'recover' | 'loggedIn' = 'login';
    name: string = ''

    form = this._formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['']
    });

    constructor(
        private _modalCustomerService: ModalCustomerService,
        private _customerService: CustomerService,
        private _modalService: ModalService,
        private _validationService: ValidationService,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this._iniateStatusModal();
    }

    private _iniateStatusModal() {


        if (this._customerService.token) {
            this.name = this._customerService.customer?.first_name!;
            this.typeOfModal = 'loggedIn';
            return
        }

        if (this.typeOfModal === 'login') {
            this.form.controls['password'].addValidators([Validators.required, Validators.minLength(6)]);
            return;
        }

    }

    mustShowError(field: string) {
        return this._validationService.isValidField(field, this.form);
    }

    getMessageErrors(field: string) {
        return this._validationService.getErrorsField(field, this.form);
    }

    closeModal() {
        this._modalCustomerService.closeModal();
    }

    submitRequest() {
        if (this.typeOfModal === 'login') {
            this._customerService.loginCustomerAccount(this.form.value.email!, this.form.value.password!)
                .subscribe(
                    {
                        next: ({ customer, token }) => {
                            this._customerService.token = token;
                            this._customerService.customer = customer;
                            this._modalCustomerService.closeModal();
                        },
                        error: ({ error }: HttpErrorResponse) => {
                            this._modalCustomerService.closeModal();
                            this._modalService.openModal({ status: 'error', message: error.message });

                        }
                    });
        }

        if (this.typeOfModal === 'recover') {
            this._customerService.sendEmailRecoverPassword(this.form.value.email!)
                .subscribe({
                    next: () => {
                        this._modalCustomerService.closeModal();
                        this._modalService.openModal({ status: 'success', message: 'The email has been sent succesfully' });

                    },
                    error: ({ error }: HttpErrorResponse) => {
                        this._modalCustomerService.closeModal();
                        this._modalService.openModal({ status: 'error', message: error.message });
                    }
                })
        }
    }

    changeTypeOfModal() {
        this.typeOfModal = this.typeOfModal === 'login' ? 'recover' : 'login';

        if (this.typeOfModal === 'recover') {
            this.form.controls['password'].clearValidators();
            this.form.controls['password'].updateValueAndValidity();
        } else {
            this.form.controls['password'].setValidators([Validators.required, Validators.minLength(6)]);
            this.form.controls['password'].updateValueAndValidity();
        }


    }

    logOut() {
        this._customerService.logOut();
        this._modalCustomerService.closeModal();
    }
}