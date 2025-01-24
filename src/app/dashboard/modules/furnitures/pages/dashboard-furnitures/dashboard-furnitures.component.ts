import { Component, OnDestroy, OnInit } from '@angular/core';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from '../../interfaces/furniture.interface';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: 'dashboard-furnitures.component.html'
})

export class DashboardFurnituresComponent implements OnInit, OnDestroy {

    furnitures: Furniture[] = [];
    pagesNumber: number = 0;
    limit: number = 5;
    subscription: Subscription = new Subscription();

    constructor(private _furnitureService: FurnitureService) { }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.onGetFurnitures();
    }

    onGetFurnitures(page?: number) {
        this.subscription.add(this._furnitureService.getFurnitures(page, this.limit).subscribe(({ total, furnitures }) => {
            this.furnitures = furnitures;
            this.pagesNumber = Math.ceil(total / this.limit)
        }));
    }
}