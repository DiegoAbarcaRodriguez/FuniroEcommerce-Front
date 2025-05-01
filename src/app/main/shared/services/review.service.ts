import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { ReviewPayload, Review } from '../interfaces/review.interface';
import { TotalAverage } from '../../modules/product/interfaces/total-average.interface';
import { CustomerService } from './customer.service';

@Injectable({ providedIn: 'root' })
export class ReviewService {

    private _url = Environment.url;

    constructor(
        private _http: HttpClient,
        private _customerService: CustomerService
    ) { }

    getReviewByFurnitureId(furnitureId: string, page?: number, limit?: number): Observable<Review[]> {
        return this._http.get<{ reviews: Review[] }>(page ? `${this._url}/review/${furnitureId}/?page=${page}&limit=${limit}` : `${this._url}/review/${furnitureId}`)
            .pipe(
                catchError(() => []),
                map(({ reviews }) => reviews)
            );
    }

    createReview(reviewPayload: ReviewPayload) {
        return this._http.post<{ ok: true, review: Review }>(`${this._url}/review`, { ...reviewPayload }, { headers: { 'Authorization': `Bearer ${this._customerService.token}` } });
    }

    updateReview(reviewPayload: ReviewPayload, review_id: string) {
        return this._http.put<{ ok: true, review: Review }>(`${this._url}/review/update/${review_id}`, { ...reviewPayload }, { headers: { 'Authorization': `Bearer ${this._customerService.token}` } })
    }

    deleteReview(review_id: string) {
        return this._http.delete<{ ok: true, review: Review }>(`${this._url}/review/delete/${review_id}`,{ headers: { 'Authorization': `Bearer ${this._customerService.token}` } });
    }

    getTotalAndAverage(furnitureId: string): Observable<TotalAverage> {
        return this._http.get<TotalAverage>(`${this._url}/review/total-average/${furnitureId}`)
            .pipe(catchError(() => []));

    }
}