import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'main-component-favorites-list',
    templateUrl: 'favorites-list.component.html',
    styleUrls: ['favorites-list.component.scss']
})

export class FavoritesListComponent implements OnInit {
    constructor(private _favoritesService: FavoritesService) { }

    ngOnInit() { }

    closeFavoritesList() {
        this._favoritesService.mustShowFavoritesListComponent = false;
    }
}