import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FurnitureNameValidator implements AsyncValidator {

    private _urlBase = Environment.url + '/furniture';

    constructor(
        private _http: HttpClient,
    ) { }

    validate(control: AbstractControl): Observable<any> {

        const name = control.value.toLocaleLowerCase().trimStart().trimEnd();

        return this._http.get(`${this._urlBase}/${name}`)
            .pipe(
                map(() => {
                    if (control.touched) {
                        return { hasTaken: true }
                    }
                    return null;
                }),
                catchError((error): any => {

                    if (error.status == 404) {
                        return of(null);
                    }
                   
                    return of({ hasError: true });
                }),

            );



    }


}