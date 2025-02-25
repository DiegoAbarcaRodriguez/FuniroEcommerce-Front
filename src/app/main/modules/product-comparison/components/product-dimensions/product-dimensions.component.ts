import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    selector: 'product-comparison-component-product-dimensions',
    templateUrl: 'product-dimensions.component.html'
})

export class ProductDimensionsComponent implements OnInit {
    
    @Input()
    furniture?: Furniture;

    constructor() { }

    ngOnInit() { }
}