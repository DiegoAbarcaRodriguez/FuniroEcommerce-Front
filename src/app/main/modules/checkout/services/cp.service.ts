import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { Address } from '../interfaces/address.interface';

@Injectable({ providedIn: 'root' })
export class CPService {

    private base_url = Environment.url;

    constructor(private _http: HttpClient) { }

    getLocationFromCp(type: 'mx' | 'us' , cp: string): Observable<Address | null> {
        return this._http.get<Address>(`${this.base_url}/cp/${type}/${cp}`).pipe(
            catchError(() => of(null))
        )
    }

}