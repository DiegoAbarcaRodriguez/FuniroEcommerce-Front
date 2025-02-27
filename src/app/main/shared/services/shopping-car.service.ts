import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Furniture } from 'src/app/shared/interfaces';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable({ providedIn: 'root' })
export class ShoppingCarService {

    private _furnituresToBuy: { furniture: Furniture, quantity: number }[] = [];
    private _mustShowShoppingCarComponent: Subject<boolean> = new Subject();

    get furnituresToBuy(): { furniture: Furniture, quantity: number }[] {
        return this._furnituresToBuy;
    }

    get mustShowShoppingCarComponet(): Observable<boolean> {
        return this._mustShowShoppingCarComponent.asObservable();
    }

    set mustShowShoppingCarComponet(value: boolean) {
        this._mustShowShoppingCarComponent.next(value);
    }



    constructor(private _snackbarService: SnackbarService) {
        this.getFurnituresFromLocalStorage();
    }

    setFurnituresToBuy(furniture: Furniture, quantity: number, isFromProductPage: boolean = false) {

        if (!isFromProductPage) {
            const hasBeenAlreadyAdded = this._furnituresToBuy?.some(furnitureToBuy => furnitureToBuy.furniture.id === furniture.id);

            if (hasBeenAlreadyAdded) {
                this._snackbarService.message = 'The furniture has been added already!';
                this._snackbarService.mustShowSnackBar = true;
                return;
            }
        } else {

            let hasAlreadyAdded: boolean = false;
            this._furnituresToBuy = this._furnituresToBuy.map(furnitureToBuy => {
                if (furnitureToBuy.furniture.id === furniture.id) {
                    furnitureToBuy.quantity = quantity;
                    hasAlreadyAdded = true;
                }
                return furnitureToBuy;
            });


            this.deployShoppingCart();
            if (hasAlreadyAdded) return;

        }

        this._furnituresToBuy.push({ furniture, quantity });
        this.deployShoppingCart();
    }


    private deployShoppingCart() {

        localStorage.setItem('furnituresToBuy', JSON.stringify(this._furnituresToBuy));

        window.scrollTo(0, 0);
        document.querySelector('body')?.classList.add('no-scroll');
        this._mustShowShoppingCarComponent.next(true);
    }

    private getFurnituresFromLocalStorage() {
        if (!localStorage.getItem('furnituresToBuy')) return;

        this._furnituresToBuy = JSON.parse(localStorage.getItem('furnituresToBuy')!) || [];

    }

    removeFurnitureFromList(index: number) {
        this._furnituresToBuy.splice(index, 1);
        localStorage.setItem('furnituresToBuy', JSON.stringify(this._furnituresToBuy));
    }

}