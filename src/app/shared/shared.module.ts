import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalQuestionComponent } from './components/modal-question/modal-question.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        ModalComponent,
        ModalQuestionComponent,
        PaginationComponent
    ],
    declarations: [
        ModalComponent,
        ModalQuestionComponent,
        PaginationComponent
    ],
})
export class SharedModule { }
