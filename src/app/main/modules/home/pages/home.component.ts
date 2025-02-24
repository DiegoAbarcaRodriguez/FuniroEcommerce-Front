import { Component, OnInit } from '@angular/core';
import { FurnitureService } from 'src/app/main/shared/services/furniture.service';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    selector: 'main-index',
    templateUrl: 'home.component.html',

})

export class HomeComponent implements OnInit {

    furnitures: Furniture[] = [];

    constructor(private _furnitureService: FurnitureService) { }

    ngOnInit() {
        this._furnitureService.getFurnitures().subscribe({ next: ({ furnitures }) => this.furnitures = furnitures });
    }
}