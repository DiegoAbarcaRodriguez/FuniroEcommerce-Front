import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from '../../../../../shared/interfaces/furniture.interface';
import { Environment } from 'src/environments/environment';
import { FurnitureService } from '../../services/furniture.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ImageService } from '../../services/image.service';

@Component({
    selector: 'dashboard-furnitures-table-furnitures-component',
    templateUrl: 'table-furnitures.component.html',
    styles:
        [`
            .img-product {
              width: 108px;
              height: 105px;
              border-radius: 5%;
            }
    `]
})

export class TableFurnituresComponent implements OnInit {

    @Input()
    furnitures: Furniture[] = [];

    baseUrlImage: string = Environment.imagesUrl;

    constructor(
        private _furnitureService: FurnitureService,
        private _imageService: ImageService,
        private _modalService: ModalService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.onAcceptEliminateFurniture();
    }

    deleteFurniture(furniture: Furniture) {
        this._modalService.openQuestionModal(furniture);
    }

    onAcceptEliminateFurniture() {
        this._modalService.respondFromQuestionModal
            .pipe(
                switchMap(() => this._imageService.deleteImage(this._modalService.contentQuestionModal.id)),
                filter(({ ok }) => ok),
                switchMap(() => this._furnitureService.deleteFurniture(this._modalService.contentQuestionModal.name)))
            .subscribe({
                next: ({ message }) => {
                    this._modalService.openModal({ status: 'success', message });
                    setTimeout(() => { this._modalService.closeModal() }, 3000);
                    this.furnitures = this.furnitures.filter(furniture => furniture.id != this._modalService.contentQuestionModal.id);
                },
                error: ({ error }) => {
                    const { message } = error;
                    this._modalService.openModal({ status: 'error', message });
                    setTimeout(() => { this._modalService.closeModal() }, 3000);
                }
            });
    }
}