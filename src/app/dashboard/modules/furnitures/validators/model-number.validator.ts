import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { Environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ModelNumberValidator implements AsyncValidator {


    private _urlBase = Environment.url + '/furniture/byModel';

    constructor(
        private _http: HttpClient,
    ) { }

    validate(control: AbstractControl): Observable<any> {

        const modelNumber = control.value.toLocaleLowerCase().trimStart().trimEnd();


        return this._http.get(`${this._urlBase}/${modelNumber}`)
            .pipe(
                map(() => {
                    if (control.touched) {
                        return { hasTaken: true };
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