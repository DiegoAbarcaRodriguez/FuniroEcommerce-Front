import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    selector: 'product-comparison-component-add-cart',
    template: ` <button class="btn btn-primary text-white px-4 py-2">Add To Cart</button>`
})

export class AddCartComponent implements OnInit {

    @Input()
    furniture?: Furniture;

    constructor() { }

    ngOnInit() { }
}