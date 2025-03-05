import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';

@Component({
    selector: 'cart-component-summary-prices',
    templateUrl: 'summary-prices.component.html',
    styles: [`
    
        .fs-small
        { 

            font-size:16px;

            @media(min-width:480px){
            font-size:18px;
            }

            @media(min-width:992px){
                font-size:13px;
            }

        }
    `]
})

export class SummaryPricesComponent implements OnInit {

    total: number = 0;

    constructor(
        private _shoppingCartService: ShoppingCarService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.calculateTotal();
        this._shoppingCartService.mustRefreshFurnituresToBuy.subscribe(() => this.calculateTotal());
    }

    calculateTotal() {
        this.total = 0;
        if (this._shoppingCartService.furnituresToBuy.length === 0) {
            this._router.navigateByUrl('/home');
            return;
        }
        this._shoppingCartService.furnituresToBuy.forEach(({ furniture, quantity }) => {
            this.total += quantity * (furniture.price - furniture.discount! || 0);
        })
    }
}