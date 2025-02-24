import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, toArray } from 'rxjs';
import { FurnitureService } from 'src/app/main/shared/services/furniture.service';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    templateUrl: 'shop.component.html'
})

export class ShopComponent implements OnInit, OnDestroy {

    private _subscription: Subscription = new Subscription();
    pagesNumber: number = 0;
    totalFurnitures: number = 0;
    totalOfDisplayedFurnitures: number = 0;
    numberOfFurnitureToShow?: number;
    furnitures: Furniture[] = [];
    sortBy: string = '';

    constructor(private _furnitureService: FurnitureService) { }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    ngOnInit() {
        this.getFurnitures();

    }

    getFurnitures(page: number = 1, sortBy: string = '') {
        this._subscription.add(this._furnitureService.getFurnitures(page, 8, sortBy || this.sortBy).subscribe({
            next: ({ furnitures, total }) => {
                this.furnitures = furnitures;
                this.totalOfDisplayedFurnitures = furnitures.length;
                this.totalFurnitures = total;
                this.pagesNumber = Math.ceil(total / 8);
            }
        })
        );
    }

    onGetFurnituresByQuery(term: string) {
        this._subscription.add(this._furnitureService.getFurnituresByQuery(term, 8)
            .subscribe(({ furnitures }) => {
                this.furnitures = furnitures;
                this.totalOfDisplayedFurnitures = furnitures.length;
            }));
    }

}