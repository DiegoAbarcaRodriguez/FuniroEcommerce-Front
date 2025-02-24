import { Component, Input } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

@Component({
    selector: 'main-component-our-products',
    templateUrl: 'our-products.component.html',
    styleUrls: ['our-products.component.scss']
})

export class OurProductsComponent {

    url_images: string = Environment.imagesUrl;

    @Input()
    furnitures: Furniture[] = [];

    @Input()
    numberOfFurnituresToShow?: number;


    constructor() { }

}