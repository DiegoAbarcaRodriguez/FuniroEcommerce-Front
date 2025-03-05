import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private _mustShowFavoritesListComponent: Subject<boolean> = new Subject();

    set mustShowFavoritesListComponent(value: boolean) {
        this._mustShowFavoritesListComponent.next(value);
    }

    get mustShowFavoritesListComponent(): Observable<boolean> {
        return this._mustShowFavoritesListComponent.asObservable();
    }


    constructor() { }



}