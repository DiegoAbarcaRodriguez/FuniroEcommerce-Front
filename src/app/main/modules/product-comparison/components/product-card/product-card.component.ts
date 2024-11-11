import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'product-comparison-component-product-card',
    templateUrl: 'product-card.component.html',
    styles: [
        `
         a {
          text-decoration:underline;  
        }

        .bar {
         color: #9F9F9F;
         font-weight: 200;
        }

        
        .product-image{
            width:250px;
            heigth:157px;
            border-radius:5%;
        }

        
        `
    ]
})

export class ProductCardComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}