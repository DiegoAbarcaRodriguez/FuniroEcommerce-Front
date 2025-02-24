import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Carrousel } from '../interfaces/carrousel.interface';
import { Furniture } from 'src/app/shared/interfaces';
import { catchError, map, Observable, of } from 'rxjs';
import { RespondApiGetFurnitures, RespondApiGetFurnituresByQuery, RespondApiGetOneFurniture } from 'src/app/dashboard/modules/furnitures/interfaces/furniture-api.interface';
import { Environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FurnitureService {


    private _url = `${Environment.url}/furniture`;

    constructor(private _http: HttpClient) { }

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