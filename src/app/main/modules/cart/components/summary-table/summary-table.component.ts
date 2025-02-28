import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

@Component({
    selector: 'cart-component-summary-table',
    templateUrl: 'summary-table.component.html',
    styleUrls: ['summary-table.component.scss']
})

export class SummaryComponent implements OnInit {

    furnituresToBuy: { furniture: Furniture, quantity: number }[] = [];

    furnitures: Furniture[] = [];
    quantities: number[] = [];

    images_url: string = Environment.imagesUrl;

    constructor(private _shoppingCartService: ShoppingCarService) { }

    ngOnInit() {
        this.getFurnituresAndQuantities();
    }

    private getFurnituresAndQuantities() {
        this.furnituresToBuy = this._shoppingCartService.furnituresToBuy;
        this.furnitures = this.furnituresToBuy?.map(({ furniture }) => furniture);
        this.quantities = this.furnituresToBuy?.map(({ quantity }) => quantity);
    }

    changeQuantity(quantity: number, id: string) {
        this._shoppingCartService.changeQuantityOfFurniture(quantity, id);
        this.getFurnituresAndQuantities();
        this._shoppingCartService.mustRefreshFurnituresToBuy = true;
    }

    removeFurniture(id: string) {
        this._shoppingCartService.removeFurnitureFromList(id);
        this.getFurnituresAndQuantities();
        this._shoppingCartService.mustRefreshFurnituresToBuy = true;
    }
}