import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/main/shared/services/customer.service';
import { ModalCustomerService } from 'src/app/main/shared/services/modal-customer.service';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Customer } from 'src/app/shared/interfaces';

@Component({
    templateUrl: 'checkout.component.html'
})

export class CheckoutComponent implements OnInit {

    customer?: Customer;

    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _customerService: CustomerService,
        private _modalCustomerService: ModalCustomerService
    ) {
        this.customer = this._customerService.customer;
    }

    ngOnInit() {
        this._shoppingCarService.mustShowShoppingCarComponet = false;
        document.querySelector('body')?.classList.remove('no-scroll');
    }

    openLoginModal() {
        this._modalCustomerService.openModal()
    }
}