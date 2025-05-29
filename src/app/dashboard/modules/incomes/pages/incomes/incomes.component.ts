import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
    templateUrl: 'incomes.component.html',

})

export class IncomesComponent implements OnInit {

    yearSelector: FormControl<any> = new FormControl();

    selectedYear: number = 2025;

    constructor() { }

    ngOnInit() {
        this.yearSelector.setValue(new Date().getFullYear());
        this.onChangeYearValue();
    }

    private onChangeYearValue() {
        this.yearSelector.valueChanges.pipe(
            distinctUntilChanged()
        ).subscribe(value => this.selectedYear = value);
    }
}