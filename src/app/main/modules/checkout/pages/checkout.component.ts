import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';

@Component({
    templateUrl: 'checkout.component.html'
})

export class CheckoutComponent implements OnInit {
    constructor(private _shoppingCarService: ShoppingCarService) { }

    ngOnInit() {
        this._shoppingCarService.mustShowShoppingCarComponet = false;
        document.querySelector('body')?.classList.remove('no-scroll');
    }
}