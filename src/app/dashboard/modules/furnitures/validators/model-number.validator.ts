import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { Environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ModelNumberValidator implements AsyncValidator {


    private _urlBase = Environment.url + '/furniture/byModel';

    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) { }

    validate(control: AbstractControl): Observable<any> {

        const modelNumber = control.value.toLocaleLowerCase().trimStart().trimEnd();


        return this._http.get(`${this._urlBase}/${modelNumber}`, this._authService.headers)
            .pipe(
                map(() => ({ hasTaken: true })),
                catchError((error): any => {

                    if (error.status == 404) {
                        return null;
                    }

                    return { hasError: true }
                }),

            );

    }

}