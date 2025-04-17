import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private _mustShowFavoritesListComponent: Subject<boolean> = new Subject();
    private _mustSHowFavoritesListComponetValue: boolean = false;

    set mustShowFavoritesListComponent(value: boolean) {
        this._mustShowFavoritesListComponent.next(value);
    }

    get mustShowFavoritesListComponent(): Observable<boolean> {
        return this._mustShowFavoritesListComponent.asObservable();
    }

    set mustShowFavoritesListComponentValue(value: boolean) {
        this._mustSHowFavoritesListComponetValue = value;
    }

    get mustSHowFavoritesListComponetValue() {
        return this._mustSHowFavoritesListComponetValue;
    }


    constructor() { }



}