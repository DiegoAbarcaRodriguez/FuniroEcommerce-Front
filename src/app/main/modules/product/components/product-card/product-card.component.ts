import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComparisonService } from 'src/app/main/shared/services/comparison.service';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

@Component({
    selector: 'product-component-product-card',
    templateUrl: 'product-card.component.html',
    styleUrls: ['product-card.component.scss']
})

export class ProductCardComponent {

    @Input()
    furniture?: Furniture;

    inputValue: number = 0;

    url_images: string = Environment.imagesUrl;

    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _comparisonService: ComparisonService,
        private _router: Router
    ) { }


    changeNumberInput(value: number) {
        if (this.inputValue <= 0 && value < 0) return;

        this.inputValue += value;

    }

    addFurnitureToCart() {
        this._shoppingCarService.setFurnituresToBuy(this.furniture!, this.inputValue, true);
    }

    addToComparisonOption() {
        this._comparisonService.furnituresToCompare = this.furniture!;
        this._router.navigateByUrl('/comparison');
    }
}