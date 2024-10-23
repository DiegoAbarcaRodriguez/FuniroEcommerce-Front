import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../../services/furniture.service';
import { Carrousel } from '../../interfaces/carrousel.interface';

@Component({
    selector: 'main-component-carrousel',
    templateUrl: 'carrousel.component.html',
    styleUrls: ['carrousel.component.scss'],
})

export class CarrouselComponent implements OnInit {
    carrouselElements: Carrousel[] = [];
    selectedIndex: number = 0;

    constructor(private _furnitureService: FurnitureService) { }

    ngOnInit() {
        this.carrouselElements = this._furnitureService.getCarrouselElements();
    }

    changeToNextImage(index: number) {
        const extractedElement = this.carrouselElements.at(index);
        if (!extractedElement) {
            return;
        }

        if (this.selectedIndex + 1 === this.carrouselElements.length) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex++;
        }


        this.carrouselElements = this.carrouselElements.filter(element => element.img !== extractedElement?.img);
        this.carrouselElements.push(extractedElement);
    }

}