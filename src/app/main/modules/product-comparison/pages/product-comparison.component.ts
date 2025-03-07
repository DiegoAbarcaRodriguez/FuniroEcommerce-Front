import { Component, OnInit } from '@angular/core';
import { ComparisonService } from 'src/app/main/shared/services/comparison.service';
import { ShoppingCarService } from 'src/app/main/shared/services/shopping-car.service';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    templateUrl: 'product-comparison.component.html',
    styles: [`

        .scroll-x{
            
            width:100%;
            overflow-x: scroll;
            @media(min-width:992px){
                width:auto;
                overflow-x:unset;
            }
        }

        .max-width{
            width: max-content;
            @media(min-width:992px){
                width:auto;
            }
        }
        
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

    furnituresToCompare: any[]  = [undefined, undefined, undefined];

    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _comparisonService: ComparisonService

    ) { }

    ngOnInit() {
        this._shoppingCarService.mustShowShoppingCarComponet = false;
        document.querySelector('body')?.classList.remove('no-scroll');
        this.filterFurnituresToCompare();

    }

    private filterFurnituresToCompare() {
        this.furnituresToCompare.forEach((_furniture, index) => {
            this.furnituresToCompare[index] = this._comparisonService.furnituresToCompare[index] || undefined;
        });
    }
}