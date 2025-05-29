import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OrderStatsResponse } from '../interfaces/order-stats-response.interface';
import { TotalOrdersByYear, TotalsByYear } from '../interfaces/total-orders-by-year-response.interface';

@Injectable({ providedIn: 'root' })
export class StatsService {

    private _baseURL = Environment.url + '/stats';



    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) { }

    getOrderStatsByYear(year: number): Observable<OrderStatsResponse> {
        return this._http.get<OrderStatsResponse>(`${this._baseURL}/orders?year=${year}`, { headers: { 'Authorization': `Bearer ${this._authService.token}` } })
            .pipe(catchError(() => of(({
                ok: false,
                incomesStats: []
            }))));
    }

    getTotalOrdersByWeek(year: number): Observable<number[]> {
        return this._http.get<{ ok: boolean, totalsByWeek: number[] }>(`${this._baseURL}/totalsByWeek?year=${year}`, { headers: { 'Authorization': `Bearer ${this._authService.token}` } })
            .pipe(
                map(({ totalsByWeek }) => totalsByWeek),
                catchError(() => of([]))
            );
    }

    getTotalOrdersByMonth(year: number): Observable<number[]> {
        return this._http.get<{ ok: boolean, totalsByMonth: number[] }>(`${this._baseURL}/totalsByMonth?year=${year}`, { headers: { 'Authorization': `Bearer ${this._authService.token}` } })
            .pipe(
                map(({ totalsByMonth }) => totalsByMonth),
                catchError(() => of([]))
            );
    }

    getTotalOrdersByYear(): Observable<TotalsByYear[]> {
        return this._http.get<TotalOrdersByYear>(`${this._baseURL}/totalsByYear`, { headers: { 'Authorization': `Bearer ${this._authService.token}` } })
            .pipe(
                map(({ totalsByYear }) => totalsByYear),
                catchError(() => of([]))
            );
    }


}