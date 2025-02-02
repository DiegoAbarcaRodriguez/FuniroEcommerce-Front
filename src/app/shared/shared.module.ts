import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalQuestionComponent } from './components/modal-question/modal-question.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearcherComponent } from './components/searcher/searcher.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        ModalComponent,
        ModalQuestionComponent,
        PaginationComponent,
        SearcherComponent
    ],
    declarations: [
        ModalComponent,
        ModalQuestionComponent,
        PaginationComponent,
        SearcherComponent
    ],
})
export class SharedModule { }
