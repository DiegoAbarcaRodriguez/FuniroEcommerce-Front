import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Furniture } from 'src/app/shared/interfaces';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { PaymentService } from '../../services/payment.service';
import { filter, switchMap } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'checkout-component-card-payment',
    templateUrl: 'card-payment.component.html',
    styles: [
        `   
            .disabled {
                cursor : not-allowed;
            }
        
        `
    ]
})

export class CardPaymentComponent implements OnInit {

    formAddress?: FormGroup;
    formContact?: FormGroup;
    formNames?: FormGroup;

    furnituresToBuy: { furniture: Furniture, quantity: number }[] = [];
    total: number = 0;
    subtotal: number = 0;

    mustDisableButton: boolean = true;


    constructor(
        private _shoppingCartService: ShoppingCarService,
        private _formsService: FormsService,
        private _paymentService: PaymentService,
        private _modalService: ModalService,
    ) { }



    ngOnInit() {

        this.loadForms();
        this.onChangeFormsStatus();
        this.calculateTotal();
        this._shoppingCartService.mustRefreshFurnituresToBuy.subscribe(() => this.calculateTotal());
    }

    private loadForms() {
        this.formNames = this._formsService.formNames;
        this.formAddress = this._formsService.formAddress;
        this.formContact = this._formsService.formContact;
    }

    private onChangeFormsStatus() {
        this.formAddress?.statusChanges.subscribe(() => this.updateButtonStatus());
        this.formContact?.statusChanges.subscribe(() => this.updateButtonStatus());
        this.formNames?.statusChanges.subscribe(() => this.updateButtonStatus());
    }

    private updateButtonStatus() {
        this.mustDisableButton = !(this.formNames?.valid && this.formAddress?.valid && this.formContact?.valid);
    }

    private calculateTotal() {
        this.furnituresToBuy = this._shoppingCartService.furnituresToBuy;
        this.furnituresToBuy.forEach(({ furniture, quantity }) => {
            this.total += (furniture.price - furniture.discount! || 0) * quantity;
            this.subtotal += (furniture.price) * quantity;
        });
    }

    proceedToPay() {
        this.mustDisableButton = true;
        const furnitures_id = this.furnituresToBuy.map(({ furniture }) => furniture.id);
        const quantities = this.furnituresToBuy.map(({ quantity }) => +quantity);

        this._paymentService.verifyFurnituresStock(furnitures_id, quantities).pipe(
            filter(({ ok }) => ok),
            switchMap(() => this._paymentService.executePayment(furnitures_id, quantities, this.total.toString()))
        ).subscribe({
            next: ({ session_id, url}) => {
                localStorage.setItem('session_id', session_id);
                this.mustDisableButton = false;
                window.location.href = url;
            },
            error: ({ error }: HttpErrorResponse) => {
                this._modalService.openModal({ status: 'error', message: error?.message });
                this.mustDisableButton = false;
            }
        });
    }
}