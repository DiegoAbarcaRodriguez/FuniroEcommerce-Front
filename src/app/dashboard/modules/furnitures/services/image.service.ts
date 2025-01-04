import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GenericRespondApi } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageRespondApi } from '../interfaces/image-api.interface';

@Injectable({ providedIn: 'root' })
export class ImageService {

    private _url = `${Environment.imagesUrl}`;
    private _headers?: Object;
    private _formDataImage: FormData = new FormData();

    set formDataImage(image: File | undefined) {
        if (!image) return;
        this._formDataImage.append('image', image);
    }


    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) {
        this._headers = { headers: { 'Authorization': `Bearer ${this._authService.token}` } };
    }

    uploadImage(): Observable<ImageRespondApi> {
        return this._http.post<ImageRespondApi>(this._url, this._formDataImage, this._headers);
    }

}