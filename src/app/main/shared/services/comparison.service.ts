import { Injectable } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class ComparisonService {

    private _furnituresToCompare: Furniture[] = [];

    set furnituresToCompare(furniture: Furniture) {
        if (this._furnituresToCompare.some(furnitureToCompare => furnitureToCompare.id === furniture.id)) return;
        
        this._furnituresToCompare.push(furniture);
        this._furnituresToCompare.splice(2, 1);
        localStorage.setItem('furnitures', JSON.stringify(this._furnituresToCompare));
    }

    get furnituresToCompare(): Furniture[] {
        return this._furnituresToCompare;
    }

    constructor() {
        this.getFurnituresFromLocalStorage();
    }


    private getFurnituresFromLocalStorage() {
        if (!localStorage.getItem('furnitures')) return;

        this._furnituresToCompare = JSON.parse(localStorage.getItem('furnitures')!);
    }

}