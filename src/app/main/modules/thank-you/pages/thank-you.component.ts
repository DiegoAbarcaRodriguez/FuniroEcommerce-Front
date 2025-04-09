import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../checkout/services/payment.service';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'main-component-thank-you',
    templateUrl: 'thank-you.component.html',
    styleUrls: ['thank-you.component.scss']
})

export class ThankyouComponent implements OnInit {

    public email: string = '';
    public name: string = '';
    public loading: boolean = true;

    constructor(
        private _paymentService: PaymentService,
        private _shoppingCartService: ShoppingCarService,
        private _modalService: ModalService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.createOrder();
        this.retrieveCustomerData();
    }

    private retrieveCustomerData() {
        this.name = this._paymentService.customerName;
    }


    private createOrder() {
        this.loading = true;
        this._paymentService.createOrder()
            .subscribe({
                next: ({ token, email }) => {
                    this.loading = false;
                    this.email = email;
                    localStorage.removeItem('session_id');
                    localStorage.removeItem('payload');
                    localStorage.setItem('customer_token', token);
                    this._shoppingCartService.resetFurniturestoBuy();
                },
                error: ({ error }: HttpErrorResponse) => {
                    localStorage.removeItem('session_id');
                    this._router.navigateByUrl('/checkout');
                    this._modalService.openModal({ status: 'error', message: error.message });
                }
            });
    }
}