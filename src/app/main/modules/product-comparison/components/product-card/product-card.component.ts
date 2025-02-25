import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

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

    @Input()
    furniture?: Furniture;

    image_url = Environment.imagesUrl;

    constructor() { }

    ngOnInit() { }
}