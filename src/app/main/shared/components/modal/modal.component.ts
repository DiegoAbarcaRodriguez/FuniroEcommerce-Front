import { Component, Input, OnInit } from '@angular/core';
import { ModalCustomerService } from '../../services/modal-customer.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

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
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this._iniateStatusModal();
    }

    private _iniateStatusModal() {


        if (this._customerService.token) {
            this.name = this._customerService.customer?.first_name + ' ' + this._customerService.customer?.last_name;
            this.typeOfModal = 'loggedIn';
            return
        }

        if (this.typeOfModal === 'recover') {
            this.form.controls['password'].addValidators([Validators.required, Validators.minLength(6)]);
            return;
        }

        this.form.controls['password'].removeValidators([Validators.required, Validators.minLength(6)]);
    }

    closeModal() {
        this._modalCustomerService.closeModal();
    }

    submitRequest() {
        console.log('Submit....');
    }

    changeTypeOfModal() {
        this.typeOfModal = this.typeOfModal === 'login' ? 'recover' : 'login';
        console.log(this.typeOfModal)
    }
}