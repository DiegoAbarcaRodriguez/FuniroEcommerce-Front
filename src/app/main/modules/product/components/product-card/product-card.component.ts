import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ComparisonService } from 'src/app/main/shared/services/comparison.service';
import { ReviewService } from 'src/app/main/shared/services/review.service';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

@Component({
    selector: 'product-component-product-card',
    templateUrl: 'product-card.component.html',
    styleUrls: ['product-card.component.scss']
})

export class ProductCardComponent implements OnChanges {

    @Input()
    furniture?: Furniture;

    inputValue: number = 0;

    url_images: string = Environment.imagesUrl;

    total_furnitures: number = 0;
    average: number = 0;
    stars: number[] = [];
    mustShowHalfStar: boolean = false;


    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _comparisonService: ComparisonService,
        private _reviewService: ReviewService,
        private _router: Router
    ) { }

    ngOnChanges({ furniture }: SimpleChanges) {
        if (furniture.currentValue) {
            this.getTotalAndAverage();
        }
    }


    private getTotalAndAverage() {
        this._reviewService.getTotalAndAverage(this.furniture!.id)
            .subscribe(({ total, average }) => {
                this.total_furnitures = total;
                this.average = average._avg.grade;
                this.mustShowHalfStar = this.average ? !Number.isInteger(this.average) : false;
                this.createArrayForStars();
            });
    }

    private createArrayForStars() {
        for (let index = 0; index < Math.floor(this.average); index++) {
            this.stars.push(1);
        }

        if (this.mustShowHalfStar) this.stars.pop();

    }

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