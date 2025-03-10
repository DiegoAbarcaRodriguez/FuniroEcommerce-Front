import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {

    private _baseUrl = Environment.url;

    constructor(private _http: HttpClient) { }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = (control.value as string).trim();

        return this._http.get(`${this._baseUrl}/customer/${email}`).pipe(
            map(() => {
                if (control.touched) {
                    return { hasTaken: true }
                }
                return null
            }),
            catchError((error: any) => {
                if (error.status == 404) {
                    return of(null);
                }

                if (error.status == 400) {
                    return of({
                        email: true
                    })
                }

                return of({
                    hasError: true
                });
            })
        )

    }


}