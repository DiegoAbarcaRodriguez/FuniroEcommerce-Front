import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';
import { filter, switchMap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { ShoppingCarService } from '../../services/shopping-car.service';

@Component({
    selector: 'main-component-favorites-list',
    templateUrl: 'favorites-list.component.html',
    styleUrls: ['favorites-list.component.scss']
})

export class FavoritesListComponent implements OnInit {


    url_images: string = Environment.imagesUrl;
    furnitures: Furniture[] = [];

    constructor(
        private _favoritesService: FavoritesService,
        private _furnitureService: FurnitureService,
        private _snackbarService: SnackbarService,
        private _shoppingCartService: ShoppingCarService
    ) { }

    ngOnInit() {
        this.getFavoriteFurnitures();
        this.onReloadFavoriteFurnitures();

    }

    getFavoriteFurnitures() {
        this._furnitureService.getFavoriteFurnitures().subscribe(({ furnitures }) => this.furnitures = furnitures);
    }

    onReloadFavoriteFurnitures() {
        this._furnitureService.mustReloadFavoriteFurniture
            .pipe(
                filter((value) => value),
                switchMap(() => this._furnitureService.getFavoriteFurnitures())
            ).subscribe(({ furnitures }) => {
                this.furnitures = [];
                this.furnitures = furnitures;
            });
    }

    closeFavoritesList() {
        this._favoritesService.mustShowFavoritesListComponent = false;
        this._favoritesService.mustShowFavoritesListComponentValue = false;
    }

    removeFurniture(id: string) {

        this._furnitureService.markFurnitureAsFavorite(id).subscribe({
            next: () => {
                this.furnitures = this.furnitures.filter(furniture => furniture.id !== id);
            },
            error: () => {
                this._snackbarService.message = 'Ecountered an error removing the furniture!'
                this._snackbarService.mustShowSnackBar = true;
            }
        });
    }

    addFurnitureToCart(furniture: Furniture) {
        this._furnitureService.markFurnitureAsFavorite(furniture.id).subscribe({
            next: () => {
                this._favoritesService.mustShowFavoritesListComponent = false;
                this._favoritesService.mustShowFavoritesListComponentValue = false;
                this._shoppingCartService.setFurnituresToBuy(furniture, 1);
            },
            error: () => {
                this._snackbarService.message = 'Error adding the furniture to the cart!'
                this._snackbarService.mustShowSnackBar = true;
            }
        });

    }
}