import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { Review } from 'src/app/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class ReviewService {

    private _url = Environment.url;

    constructor(private _http: HttpClient) { }

    getReviewByFurnitureId(furnitureId: string): Observable<Review[]> {
        return this._http.get<{ reviews: Review[] }>(`${this._url}/review/${furnitureId}`)
            .pipe(
                catchError(() => []),
                map(({ reviews }) => reviews)
            );
    }

}