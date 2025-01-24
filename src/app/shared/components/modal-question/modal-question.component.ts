import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'shared-modal-question-component',
    templateUrl: 'modal-question.component.html'
})

export class ModalQuestionComponent implements OnInit {

    content?: string = '';

    constructor(
        private _modalService: ModalService
    ) { }

    ngOnInit() {
        this.content = this._modalService.contentQuestionModal.username
            ? this._modalService.contentQuestionModal.username
            : this._modalService.contentQuestionModal.name;
    }

    onReply(respond: boolean) {
        this._modalService.respondFromQuestionModal = respond;
    }

    closeModal() {
        this._modalService.closeQuestionModal();
    }

}