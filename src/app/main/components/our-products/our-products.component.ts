import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from '../../interfaces/furniture.interface';

@Component({
    selector: 'main-component-our-products',
    templateUrl: 'our-products.component.html',
    styleUrls: ['our-products.component.scss']
})

export class OurProductsComponent implements OnInit {

    furnitures: Furniture[] = [];

    constructor(private _furnitureService: FurnitureService) { }

    ngOnInit() {
        this.furnitures = this._furnitureService.getFurnitures();
    }
}