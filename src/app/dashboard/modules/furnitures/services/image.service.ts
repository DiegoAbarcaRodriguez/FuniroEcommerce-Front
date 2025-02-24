import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageRespondApi } from '../interfaces/image-api.interface';

@Injectable({ providedIn: 'root' })
export class ImageService {

    private _url = `${Environment.imagesUrl}`;
    private _headers?: Object;
    private _images: any[] = [undefined, undefined, undefined];
    private _formDataPayload: FormData = new FormData();

    formDataImage(image: File | string | undefined, index: number): void {
        this._images.splice(index, 1, image);
    }

    get images(): File[] {
        return this._images;
    }

    resetImages() {
        this._images = [undefined, undefined, undefined];
        this._formDataPayload.delete('image-0');
        this._formDataPayload.delete('image-1');
        this._formDataPayload.delete('image-2');
    }


    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) {
        this._headers = { headers: { 'Authorization': `Bearer ${this._authService.token}` } };
    }

    uploadImage(id: string = ''): Observable<ImageRespondApi> {
        this.purgeImagesArray();
        return this._http.post<ImageRespondApi>(this._url + '/' + id, this._formDataPayload, this._headers);
    }

    private purgeImagesArray() {
        console.log(this._images)
        this._images.forEach((image, index) => {
            if (image instanceof File || image) {
                this._formDataPayload.append(`image-${index}`, typeof image == 'string' ? new File(['data'], image.split('/').at(4) as string, { 'type': 'text/plain' }) : image);
            }
        });
    }

    deleteImage(id: string) {
        return this._http.delete<ImageRespondApi>(this._url + '/' + id, this._headers);
    }

}