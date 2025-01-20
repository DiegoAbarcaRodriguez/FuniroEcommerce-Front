import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { LoginBody, RespondCheckLogginStatus, RespondSuccessLogin } from '../interfaces';
import { GenericRespondApi, User } from 'src/app/shared/interfaces';





@Injectable({ providedIn: 'root' })
export class AuthService {

    private _url = Environment.url + '/auth';
    private _token?: string;
    private _user?: User;

    get token(): string | undefined {
        return this._token;
    }
    get user(): User | undefined {
        return this._user;
    }

    constructor(private _http: HttpClient) {
        this.getTokenFromLocalStorage();
    }

    private saveToken(token: string) {
        localStorage.setItem('token', token);
        this._token = token;

    }

    private getTokenFromLocalStorage() {
        if (!localStorage.getItem('token')) {
            return;
        }

        this._token = localStorage.getItem('token')!;

    }

    login(body: LoginBody): Observable<RespondSuccessLogin | GenericRespondApi> {
        const username = body.username.trimStart().trimEnd().toLocaleLowerCase();
        return this._http.post<RespondSuccessLogin>(this._url, { ...body, username, mustValidateAdminStatus: true })
            .pipe(
                tap(({ token }) => this.saveToken(token)),
                catchError(({ error }) => of({ ok: error.ok, message: error.message }))
            );
    }

    checkLoggingStatus(): Observable<boolean> {
        return this._http.post<RespondCheckLogginStatus>(`${this._url}/check-jwt`, {}, { headers: { 'Authorization': `Bearer ${this._token}` } })
            .pipe(
                map(({ token, user, ok }) => {
                    if (!user.is_admin || !ok) return false;
                    this._token = token;
                    this._user = user;
                    return true;

                }),
                catchError(() => of(false))
            );


    }

    logOut() {
        localStorage.clear();
        this._token = undefined;
        this._user = undefined;

    }

}