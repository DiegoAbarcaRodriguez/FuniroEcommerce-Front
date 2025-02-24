import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

@Component({
    selector: 'product-component-product-card',
    templateUrl: 'product-card.component.html',
    styleUrls: ['product-card.component.scss']
})

export class ProductCardComponent implements OnInit {

    @Input()
    furniture?: Furniture;

    inputValue: number = 0;

    url_images: string = Environment.imagesUrl;

    constructor() { }

    ngOnInit() { }

    changeNumberInput(value: number) {
        if (this.inputValue <= 0 && value < 0) return;

        this.inputValue += value;

    }
}