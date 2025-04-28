import { Component, OnInit } from '@angular/core';
import { PurchaseListService } from '../../services/purchase-list.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';
import { Order } from '../../interfaces/order.interface';
import { FormControl } from '@angular/forms';
import { filter, switchMap } from 'rxjs';

@Component({
    selector: 'main-component-purchase-list',
    templateUrl: 'purchase-list.component.html',
    styleUrls: ['purchase-list.component.scss']
})

export class PurchaseListComponent implements OnInit {

    furnitures: Furniture[] = [];
    url_image: string = Environment.imagesUrl;

    orders: Order[] = [];

    select: FormControl = new FormControl();

    constructor(private _purchaseListService: PurchaseListService) { }

    ngOnInit() {
        this.getOrders();
        this.formatOrdersDate();
        this.onChangeSelect();
    }

    private getOrders() {
        this._purchaseListService.getOrders()
            .subscribe(
                {
                    next: ({ orders }) => this.orders = orders,
                    error: () => this.orders = []
                }
            );
    }

    private formatOrdersDate() {
        this.orders = this.orders.map(order => (
            {
                ...order,
                created_at: new Date(order.created_at)
            }));
    }

    private onChangeSelect() {
        this.select.valueChanges.pipe(
            filter(value => value !== ''),
            switchMap((value) => this._purchaseListService.getPurchasedFurnitures(value))
        ).subscribe({
            next: ({ furnitures }) => this.furnitures = furnitures,
            error: () => this.furnitures = []
        });

    }

    closePurchaseList() {
        this._purchaseListService.mustShowPurchaseList = false;
    }
}