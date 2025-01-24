import { Component, OnInit } from '@angular/core';
import { FurnitureForm, KeyOfFurnitureForm } from '../../constant/furniture-form.object';
import { FurnitureService } from '../../services/furniture.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Furniture } from '../../interfaces/furniture.interface';



@Component({
    templateUrl: 'add-furniture.component.html',
    styleUrls: ['add-furniture.component.scss']
})

export class AddFurnitureComponent implements OnInit {

    areInValidAllTheForms: boolean = false;
    furniture?: Furniture;


    constructor(
        private _furnitureService: FurnitureService,
        private _imageService: ImageService,
        private _modalService: ModalService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        if (!this._router.url.split('/').at(4))
            return;

        this._activatedRoute.params.pipe(switchMap(({ name }) => this._furnitureService.getOneFurniture(name)))
            .subscribe({
                next: ({ furniture }) => {
                    this.furniture = furniture;
                    this._furnitureService.loadedFurniture = furniture;
                },
                error: () => this._router.navigateByUrl('dashboard/furnitures')
            });
    }

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

        if (this._imageService.formDataImage.get('image')) {
            this._imageService.uploadImage(this.furniture?.id.toString() || '')
                .pipe(
                    filter(({ ok }) => ok),
                    switchMap(({ name }) => {

                        this._imageService.formDataImage.delete('image');

                        if (this.furniture) {
                            return this._furnitureService.updateFurniture(this.furniture.name, name)
                        }

                        return this._furnitureService.createFurniture(name);

                    }
                    ))
                .subscribe({
                    next: ({ message }) => {
                        this._modalService.openModal({ status: 'success', message });
                        this._router.navigateByUrl('/dashboard/furnitures');
                    },
                    error: (({ error }) => this._modalService.openModal({ status: 'error', message: error.message }))
                });
            return;
        }


        if (this.furniture) {
            this._furnitureService.updateFurniture(this.furniture.name)
                .subscribe({
                    next: ({ message }) => {
                        this._modalService.openModal({ status: 'success', message });
                        this._router.navigateByUrl('/dashboard/furnitures');
                    },
                    error: (({ error }) => this._modalService.openModal({ status: 'error', message: error.message }))
                });
            return;
        }






    }


}