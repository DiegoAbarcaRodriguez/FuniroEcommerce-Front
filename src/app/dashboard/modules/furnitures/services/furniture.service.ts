import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Environment } from 'src/environments/environment';
import { Furniture } from '../interfaces/furniture.interface';
import { RespondApiFurniture, RespondApiGetFurnitures, RespondApiGetFurnituresByQuery, RespondApiGetOneFurniture } from '../interfaces/furniture-api.interface';
import { FormGroup } from '@angular/forms';
import { GenericRespondApi } from 'src/app/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class FurnitureService {

    private _url = `${Environment.url}/furniture`;
    private _furniturePayload?: Furniture;
    private _loadedFurniture: Subject<Furniture> = new Subject();

    set furniturePayload(form: FormGroup) {
        this._furniturePayload = { ...this._furniturePayload, ...form.value };
    }

    get loadedFurniture(): Observable<Furniture> {
        return this._loadedFurniture.asObservable();
    }

    set loadedFurniture(furniture: Furniture) {
        this._loadedFurniture?.next(furniture);
    }

    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) { }

    createFurniture(imageName: string): Observable<RespondApiFurniture> {

        const [name, model_number] = this.normalizeNameAndModelNumber();

        return this._http.post<RespondApiFurniture>(this._url, { ...this._furniturePayload, name, model_number, image: imageName }, this._authService.headers)

    }
    updateFurniture(term: string, imageName: string = ''): Observable<RespondApiFurniture> {

        const [name, model_number] = this.normalizeNameAndModelNumber();

        return this._http.patch<RespondApiFurniture>(this._url + '/' + term, { ...this._furniturePayload, name, model_number, image: imageName, modify_at: new Date() }, this._authService.headers)

    }

    private normalizeNameAndModelNumber(): [string?, string?] {
        const { name, model_number } = this._furniturePayload!;
        const formatedName = name.toLocaleLowerCase().trimStart().trimEnd();
        const formatedModelNumber = model_number.toLocaleLowerCase().trimStart().trimEnd();


        return [formatedName, formatedModelNumber];
    }

    getFurnitures(page: number = 1, limit: number = 5): Observable<RespondApiGetFurnitures> {
        return this._http.get<RespondApiGetFurnitures>(`${this._url}/?page=${page}&limit=${limit}`)
            .pipe(
                catchError(() => of({ furnitures: [], total: 0 }))
            );
    }
    getFurnituresByQuery(query: string, limit: number = 5): Observable<RespondApiGetFurnituresByQuery> {
        return this._http.get<RespondApiGetFurnituresByQuery>(`${this._url}/byQuery?q=${query}&limit=${limit}`)
            .pipe(
                catchError(() => of({ furnitures: [], ok: false }))
            );
    }

    getOneFurniture(name: string): Observable<RespondApiGetOneFurniture> {
        name = isNaN(+name) ? name.toLocaleLowerCase().trimStart().trimEnd() : name;
        return this._http.get<RespondApiGetOneFurniture>(`${this._url}/${name}`);

    }

    deleteFurniture(name: string): Observable<GenericRespondApi> {
        name = isNaN(+name) ? name.toLocaleLowerCase().trimStart().trimEnd() : name;
        return this._http.delete<GenericRespondApi>(`${this._url}/${name}`, this._authService.headers);

    }

}

