import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    selector: 'product-comparison-component-product-description',
    templateUrl: 'product-description.component.html'
})

export class ProductDescriptionComponent implements OnInit {

    @Input()
    furniture?: Furniture;

    constructor() { }

    ngOnInit() { }
}