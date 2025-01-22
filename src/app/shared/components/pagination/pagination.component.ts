import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'shared-component-pagination',
    templateUrl: 'pagination.component.html'
})

export class PaginationComponent implements OnChanges {

    @Input()
    pagesNumber: number = 0;

    @Output()
    changedPage: EventEmitter<number> = new EventEmitter();

    currentPage: number = 1;
    indexArray: number[] = [];
    lowerLimit: number = 0;
    upperLimit: number = 2;


    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        const { pagesNumber } = changes;
        this.createIndexArray(pagesNumber.currentValue);
    }



    private createIndexArray(currentPageNumber?: number) {
        if (!currentPageNumber) return;
        for (let index = 0; index < currentPageNumber; index++) {
            this.indexArray.push(index + 1);
        }
    }

    changeCurrentPage(pageNumber: number) {
        if (pageNumber < 0 || pageNumber > this.pagesNumber) return;

        this.lowerLimit = pageNumber - 2 < 0 ? 0 : pageNumber - 2;
        this.upperLimit = pageNumber + 1;

        this.currentPage = pageNumber;
        this.changedPage.emit(pageNumber);

    }


}