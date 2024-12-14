import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ContentModal } from '../../interfaces/content-modal.interface';

@Component({
    selector: 'shared-modal-component',
    templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit {

    contentModal?: ContentModal;

    constructor(
        private _modalService: ModalService,
    ) { }



    ngOnInit() {
        this.contentModal = this._modalService.contentModal;
    }


    closeModal() {
        this._modalService.closeModal();
    }
}