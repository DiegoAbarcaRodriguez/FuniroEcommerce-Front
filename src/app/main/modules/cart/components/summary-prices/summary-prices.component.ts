import { Component, OnInit } from '@angular/core';

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
    constructor() { }

    ngOnInit() { }
}