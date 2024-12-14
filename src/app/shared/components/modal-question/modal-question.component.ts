import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'shared-modal-question-component',
    templateUrl: 'modal-question.component.html'
})

export class ModalQuestionComponent implements OnInit {

    content?: User;

    constructor(
        private _modalService: ModalService
    ) { }

    ngOnInit() {
        this.content = this._modalService.contentQuestionModal;
    }

    onReply(respond: boolean) {
        this._modalService.respondFromQuestionModal = respond;
    }

    closeModal() {
        this._modalService.closeQuestionModal();
    }

}