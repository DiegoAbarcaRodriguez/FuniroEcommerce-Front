import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    selector: 'product-comparison-component-product-warranty',
    templateUrl: 'product-warranty.component.html'
})

export class ProductWarrantyComponent implements OnInit {

    @Input()
    furniture?: Furniture;

    constructor() { }

    ngOnInit() { }
}