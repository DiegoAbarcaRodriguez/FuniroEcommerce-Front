import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private _mustShowFavoritesList: Subject<boolean> = new Subject();


    constructor() { }



}