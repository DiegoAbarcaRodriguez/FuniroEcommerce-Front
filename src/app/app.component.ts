import { Component, OnInit } from '@angular/core';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mustShowModal: boolean = false;
  mustShowQuestionModal: boolean = false;

  constructor(private _modalService: ModalService) { }

  ngOnInit() {
    this._modalService.mustShowModal.subscribe(value => this.mustShowModal = value);
    this._modalService.mustShowQuestionModal.subscribe(value => this.mustShowQuestionModal = value);
  }


}
