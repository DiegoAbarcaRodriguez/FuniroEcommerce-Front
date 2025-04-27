import { Component, OnInit } from '@angular/core';
import { PurchaseListService } from '../../services/purchase-list.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

@Component({
    selector: 'main-component-purchase-list',
    templateUrl: 'purchase-list.component.html',
    styleUrls: ['purchase-list.component.scss']
})

export class PurchaseListComponent implements OnInit {

    furnitures: Furniture[] = [];
    url_image: string = Environment.imagesUrl;

    constructor(private _purchaseListService: PurchaseListService) { }

    ngOnInit() {
        this._purchaseListService.getPurchasedFurnitures().subscribe(
            {
                next: ({ furnitures }) => {
                    this.furnitures = furnitures[0].map(furniture => ({ ...furniture.furniture, quantity: furniture.quantity }));
                }
            });
    }

    closePurchaseList() {
        this._purchaseListService.mustShowPurchaseList = false;
    }
}