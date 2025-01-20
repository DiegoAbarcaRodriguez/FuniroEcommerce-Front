import { Component, OnInit } from '@angular/core';
import { FurnitureForm, KeyOfFurnitureForm } from '../../constant/furniture-form.object';
import { FurnitureService } from '../../services/furniture.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ImageService } from '../../services/image.service';



@Component({
    templateUrl: 'add-furniture.component.html',
    styleUrls: ['add-furniture.component.scss']
})

export class AddFurnitureComponent implements OnInit {

    areInValidAllTheForms: boolean = false;


    constructor(
        private _furnitureService: FurnitureService,
        private _imageService: ImageService,
        private _modalService: ModalService,
        private _router: Router
    ) { }

    ngOnInit() { }

    private validFormsStatus() {
        this.areInValidAllTheForms = Object.values(FurnitureForm).some(value => !value);
    }

    onToggleStatusForm(event: { value: boolean, form: FormGroup }, typeForm: KeyOfFurnitureForm) {
        const { value } = event;

        FurnitureForm[typeForm] = value;

        this.validFormsStatus();
    }

    submitForm() {

        if (this.areInValidAllTheForms)
            return;

        this._imageService.uploadImage()
            .pipe(
                filter(({ ok }) => ok),
                switchMap(({ name }) => this._furnitureService.createFurniture(name))
            )
            .subscribe({
                next: () => {
                    this._modalService.openModal({ status: 'success', message: 'The furniture has been created succesfully!' });
                    this._router.navigateByUrl('/dashboard/furnitures');
                },
                error: (({ error }) => this._modalService.openModal({ status: 'error', message: error.message }))
            });


    }


}