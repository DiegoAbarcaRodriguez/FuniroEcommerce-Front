import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Furniture } from 'src/app/shared/interfaces';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../services/forms.service';

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
        private _formsService: FormsService
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
        console.log(!(this.formNames?.valid && this.formAddress?.valid && this.formContact?.valid))
        this.mustDisableButton = !(this.formNames?.valid && this.formAddress?.valid && this.formContact?.valid);
    }

    private calculateTotal() {
        this.furnituresToBuy = this._shoppingCartService.furnituresToBuy;
        this.furnituresToBuy.forEach(({ furniture, quantity }) => {
            this.total += (furniture.price - furniture.discount! || 0) * quantity;
            this.subtotal += (furniture.price) * quantity;
        });
    }
}