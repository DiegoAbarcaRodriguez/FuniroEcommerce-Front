import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from '../../services/shopping-car.service';

@Component({
    templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {

    mustShowShoppingCarComponent: boolean = false;

    constructor(private _shoppingCarService: ShoppingCarService) { }

    ngOnInit() {
        this._shoppingCarService.mustShowShoppingCarComponet.subscribe(mustShow => this.mustShowShoppingCarComponent = mustShow);
    }
}