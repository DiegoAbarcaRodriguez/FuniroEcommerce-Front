import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from '../shared/services/shopping-car.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../shared/services/snackbar.service';
import { ModalCustomerService } from '../shared/services/modal-customer.service';


@Component({
    templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {

    subscription?: Subscription;
    mustShowShoppingCarComponent: boolean = false;
    mustShowSnackbarComponent: boolean = false;
    mustShowModalCustomerComponent: boolean = false

    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _snackbarService: SnackbarService,
        private _modalCustomerService: ModalCustomerService
    ) { }

    ngOnInit() {
        this._shoppingCarService.mustShowShoppingCarComponet.subscribe(mustShow => this.mustShowShoppingCarComponent = mustShow);
        this._snackbarService.mustShowSnackBar.subscribe(mustShow => this.mustShowSnackbarComponent = mustShow);
        this._modalCustomerService.mustShowModalCustomer.subscribe(mustShow => this.mustShowModalCustomerComponent = mustShow);
    }
}