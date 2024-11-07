import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from '../../services/shopping-car.service';

@Component({
    selector: 'main-component-shopping-car',
    templateUrl: 'shopping-car.component.html',
    styleUrls: ['shopping-car.component.scss']
})

export class ShoppingCarComponent implements OnInit {
    constructor(private _shoppingCarService: ShoppingCarService) { }

    ngOnInit() { }

    closeShoppingCarOffcanvas() {
        this._shoppingCarService.mustShowShoppingCarComponet = false;
        document.querySelector('body')?.classList.remove('no-scroll')
    }
}