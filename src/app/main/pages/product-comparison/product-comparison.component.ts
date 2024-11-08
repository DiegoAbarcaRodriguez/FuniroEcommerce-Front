import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'product-comparison.component.html',
    styles: [`
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

        th,
        td{
            border:none;
        }
        
    `]
})

export class ProductComparisonComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}