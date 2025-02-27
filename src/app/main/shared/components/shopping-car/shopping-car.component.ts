import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from '../../services/shopping-car.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

@Component({
    selector: 'main-component-shopping-car',
    templateUrl: 'shopping-car.component.html',
    styleUrls: ['shopping-car.component.scss']
})

export class ShoppingCarComponent implements OnInit {

    furnituresToBuy: { furniture: Furniture, quantity: number }[] = [];
    furnitures: Furniture[] = [];
    quantities: number[] = [];
    subtotal: number = 0;

    images_url = Environment.imagesUrl;

    constructor(private _shoppingCarService: ShoppingCarService) { }

    ngOnInit() {
        this.getFurnituresAndQuantities();
    }

    private getFurnituresAndQuantities() {

        this.furnituresToBuy = this._shoppingCarService.furnituresToBuy;

        this.furnitures = this.furnituresToBuy.map(({ furniture }) => furniture);
        this.quantities = this.furnituresToBuy.map(({ quantity }) => quantity);
        this.calculateTotal();

    }

    private calculateTotal() {
        this.furnituresToBuy.forEach(({ furniture, quantity }) => {
            this.subtotal += quantity * (furniture.price - furniture.discount! || 0);
        });
    }

    closeShoppingCarOffcanvas() {
        this._shoppingCarService.mustShowShoppingCarComponet = false;
        document.querySelector('body')?.classList.remove('no-scroll')
    }

    removeFurnitureFromList(index: number) {
        this._shoppingCarService.removeFurnitureFromList(index);
        this.subtotal = 0;
        this.getFurnituresAndQuantities();
    }


}