import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Environment } from 'src/environments/environment';
import { GenericRespondApi } from 'src/app/shared/interfaces';
import { Furniture } from '../interfaces/furniture.interface';
import { RespondApiFurniture } from '../interfaces/furniture-api.interface';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FurnitureService {

    private _url = `${Environment.url}/furniture`;
    private _furniturePayload?: Furniture;

    set furniturePayload(form: FormGroup) {
        this._furniturePayload = { ...this._furniturePayload, ...form.value };
    }

    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) { }

    createFurniture(imageName: string): Observable<RespondApiFurniture> {

        const [name, model_number] = this.normalizeNameAndModelNumber();
        
        return this._http.post<RespondApiFurniture>(this._url, { ...this._furniturePayload, name, model_number, image: imageName }, this._authService.headers)

    }

    private normalizeNameAndModelNumber(): [string?, string?] {
        const { name, model_number } = this._furniturePayload!;
        const formatedName = name.toLocaleLowerCase().trimStart().trimEnd();
        const formatedModelNumber = model_number.toLocaleLowerCase().trimStart().trimEnd();


        return [formatedName, formatedModelNumber];
    }

}

