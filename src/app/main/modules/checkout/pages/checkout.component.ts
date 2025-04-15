import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/main/shared/services/customer.service';
import { ModalCustomerService } from 'src/app/main/shared/services/modal-customer.service';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Customer } from 'src/app/shared/interfaces';
import { FormsService } from '../services/forms.service';
import { PaymentService } from '../services/payment.service';

@Component({
    templateUrl: 'checkout.component.html',
    styles:
        [
            `
            input[type='checkbox']{
                accent-color:#B88E2F;
            }
        `
        ]
})

export class CheckoutComponent implements OnInit {

    isThereCustomerLoggedIn: boolean = false;
    formCheckControl = new FormControl('');

    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _customerService: CustomerService,
        private _modalCustomerService: ModalCustomerService,
        private _formsService: FormsService,
        private _paymentService: PaymentService
    ) { }

    ngOnInit() {
        this.isThereCustomerLoggedIn = !!localStorage.getItem('customer_token');
        this.onChangeCheckControl();
        this._shoppingCarService.mustShowShoppingCarComponet = false;
        document.querySelector('body')?.classList.remove('no-scroll');
    }

    openLoginModal() {
        this._modalCustomerService.openModal()
    }

    onChangeCheckControl() {

        this.formCheckControl.valueChanges
            .subscribe((value) => {
                const { country, zip_code, street, ...customer } = this._customerService.customer!;

                if (value) {
                    this._formsService.formAddress?.controls['country'].setValue(country);
                    this._formsService.formAddress?.controls['zip_code'].setValue(zip_code);
                    this._formsService.formAddress?.controls['street'].setValue(street);

                    this._formsService.formContact?.reset({ ...customer });
                    this._formsService.formNames?.reset({ ...customer });
                    this._formsService.mustDisableInputs = true;
                    this._paymentService.wasFilledWithCustomerData = true;
                } else {
                    this._formsService.formAddress?.reset({});
                    this._formsService.formContact?.reset({});
                    this._formsService.formNames?.reset({});
                    this._formsService.mustDisableInputs = false;
                    this._paymentService.wasFilledWithCustomerData = true;
                }

            });
    }
}