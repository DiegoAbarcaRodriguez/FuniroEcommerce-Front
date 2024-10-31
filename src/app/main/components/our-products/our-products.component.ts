import { Component, OnInit, Renderer2 } from '@angular/core';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from '../../interfaces/furniture.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'main-component-our-products',
    templateUrl: 'our-products.component.html',
    styleUrls: ['our-products.component.scss']
})

export class OurProductsComponent implements OnInit {

    furnitures: Furniture[] = [];
    url?: string;

    constructor(
        private _furnitureService: FurnitureService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.furnitures = this._furnitureService.getFurnitures();
        this.url = this._router.url;
        if (this.url.includes('product')) {
            this.furnitures.splice(0, 2);
        }
    }
}