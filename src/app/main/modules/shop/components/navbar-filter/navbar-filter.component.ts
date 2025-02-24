import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'shop-component-navbar-filter',
    templateUrl: 'navbar-filter.component.html',
    styleUrls: ['navbar-filter.component.scss']
})

export class NavbarFilterComponent implements OnInit {

    @Input()
    total: number = 0;

    @Input()
    totalByPage: number = 0;

    @Output()
    onEmitShowOption: EventEmitter<number> = new EventEmitter();

    @Output()
    onEmitSortBy: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    onChangeShowOption(value: number) {
        this.totalByPage = value;
        this.onEmitShowOption.emit(value);
    }

    onSelectSortOption(value: string) {
        this.onEmitSortBy.emit(value);
    }

}