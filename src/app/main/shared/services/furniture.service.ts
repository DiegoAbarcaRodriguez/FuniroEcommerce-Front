import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Carrousel } from '../interfaces/carrousel.interface';
import { Furniture } from 'src/app/shared/interfaces';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { RespondApiGetFurnitures, RespondApiGetFurnituresByQuery, RespondApiGetOneFurniture } from 'src/app/dashboard/modules/furnitures/interfaces/furniture-api.interface';
import { Environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';

@Injectable({ providedIn: 'root' })
export class FurnitureService {


    private _url = `${Environment.url}/furniture`;
    private _mustReloadFavoriteFunirtures: Subject<boolean> = new Subject();

    set mustReloadFavoriteFurniture(value: boolean) {
        this._mustReloadFavoriteFunirtures.next(value);
    }

    get mustReloadFavoriteFurniture(): Observable<boolean> {
        return this._mustReloadFavoriteFunirtures.asObservable();
    }

    constructor(
        private _http: HttpClient,
        private _customerService: CustomerService
    ) { }

    getFurnitures(page: number = 1, limit: number = 5, sortBy = ''): Observable<RespondApiGetFurnitures> {
        return this._http.get<RespondApiGetFurnitures>(`${this._url}/?page=${page}&limit=${limit}&sortBy=${sortBy}`)
            .pipe(
                map(({ furnitures, total }) => {
                    furnitures = furnitures.map(furniture => ({
                        ...furniture,
                        discount_percentage: (furniture.discount || 0 * 100) / furniture.price
                    }));

                    return { furnitures, total };
                }),
                catchError(() => of({ furnitures: [], total: 0 }))
            );
    }

    getFurnituresByQuery(query: string, limit: number = 5): Observable<RespondApiGetFurnituresByQuery> {
        return this._http.get<RespondApiGetFurnituresByQuery>(`${this._url}/byQuery?q=${query}&limit=${limit}`)
            .pipe(
                map(({ furnitures }) => {
                    furnitures = furnitures.map(furniture => ({
                        ...furniture,
                        discount_percentage: (furniture.discount || 0 * 100) / furniture.price
                    }));

                    return { furnitures, ok: true };
                }),
                catchError(() => of({ furnitures: [], ok: false }))
            );
    }

    getOneFurniture(name: string): Observable<RespondApiGetOneFurniture> {
        name = isNaN(+name) ? name.toLocaleLowerCase().trimStart().trimEnd() : name;
        return this._http.get<RespondApiGetOneFurniture>(`${this._url}/${name}`);

    }


    getFavoriteFurnitures(): Observable<{ furnitures: Furniture[] }> {
        return this._http.get<{ furnitures: Furniture[] }>(`${this._url}/favorites`, { headers: { 'Authorization': `Bearer ${this._customerService.token}` } })
            .pipe(catchError(() => []));
    }

    markFurnitureAsFavorite(furniture_id: string) {
        return this._http.post(`${this._url}/mark-favorite`, { furniture_id }, { headers: { 'Authorization': `Bearer ${this._customerService.token}` } },)
    }

    getCarrouselElements(): Carrousel[] {
        return [
            {
                title: 'Bed Room',
                type: 'Inner Peace',
                img: '1'
            },
            {
                title: 'Coffe Table',
                type: 'Sweet Dreams',
                img: '2'
            },
            {
                title: 'Mirror',
                type: 'Black Swan',
                img: '3'
            },
            {
                title: 'Closet',
                type: 'Inner Peace',
                img: '4'
            }
        ]
    }

}