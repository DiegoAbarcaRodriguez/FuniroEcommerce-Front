import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { catchError, Observable, of, Subject } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { CreateUserBody, RespondSuccessfullUserApi, UpdateUserBody } from '../interfaces/user.interface';



@Injectable({ providedIn: 'root' })
export class UserService {

    private _baseURL = Environment.url + '/user';
    private _headers?: Object;

    private _createdOrUpdatedUser: Subject<User> = new Subject();
    private _deletedUser: Subject<User> = new Subject();

    private _userToCreateOrModify?: User;
    private _mustShowModalForm: Subject<boolean> = new Subject();

    get mustShowModalForm(): Observable<boolean> {
        return this._mustShowModalForm.asObservable();
    }

    set mustShowModalForm(mustShow: boolean) {
        this._mustShowModalForm.next(mustShow);
        document.querySelector('body')?.classList.add('no-scroll');
    }


    get userToCreateOrModify(): User | undefined {
        return this._userToCreateOrModify;
    }

    set userToCreateOrModify(user: User | undefined) {
        this._userToCreateOrModify = user;
    }

    get createdOrUpdatedUser(): Observable<User> {
        return this._createdOrUpdatedUser.asObservable();
    }

    set createdOrUpdatedUser(user: User) {
        this._createdOrUpdatedUser.next(user);
    }
    
    get deletedUser(): Observable<User> {
        return this._deletedUser.asObservable();
    }

    set deletedUser(user: User) {
        this._deletedUser.next(user);
    }

    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) {
        this._headers = { headers: { 'Authorization': `Bearer ${this._authService.token}` } };

    }

    createUser(user: CreateUserBody): Observable<RespondSuccessfullUserApi> {
        return this._http.post<RespondSuccessfullUserApi>(`${this._baseURL}`, user, this._headers)
    }

    updateUser(user: UpdateUserBody): Observable<RespondSuccessfullUserApi> {
        return this._http.put<RespondSuccessfullUserApi>(`${this._baseURL}/${user.id}`, user, this._headers);
    }
    deleteUser(id: string): Observable<RespondSuccessfullUserApi> {
        return this._http.delete<RespondSuccessfullUserApi>(`${this._baseURL}/${id}`, this._headers);
    }

    getUsers(): Observable<User[]> {
        return this._http.get<User[]>(`${this._baseURL}`, this._headers)
            .pipe(
                catchError(() => of([]))
            );
    }

}