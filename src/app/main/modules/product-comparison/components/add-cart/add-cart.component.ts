import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    selector: 'product-comparison-component-add-cart',
    template: ` <button class="btn btn-primary text-white px-4 py-2" (click)="addFurnitureToCart()">Add To Cart</button>`
})

export class AddCartComponent implements OnInit {

    @Input()
    furniture?: Furniture;


    constructor(private _shoppingCarService: ShoppingCarService) { }

    ngOnInit() { }

    addFurnitureToCart() {
        this._shoppingCarService.setFurnituresToBuy(this.furniture!, 1);
    }
}