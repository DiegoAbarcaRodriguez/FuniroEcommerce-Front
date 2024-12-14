import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCarService } from '../shared/services/shopping-car.service';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit, OnDestroy {

    subscription?: Subscription;
    mustShowShoppingCarComponent: boolean = false;

    constructor(private _shoppingCarService: ShoppingCarService) { }
    
    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit() {
        this.subscription = this._shoppingCarService.mustShowShoppingCarComponet.subscribe(mustShow => this.mustShowShoppingCarComponent = mustShow);
    }
}