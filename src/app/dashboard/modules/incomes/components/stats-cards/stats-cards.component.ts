import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { IncomesStat, OrderStatsResponse } from '../../interfaces/order-stats-response.interface';

@Component({
    selector: 'dashboard-incomes-stats-cards-component',
    templateUrl: 'stats-cards.component.html',
    styles: [
        `
            .fs-custom {
                font-size:12px;
            }

        `
    ]
})

export class StatsCardComponent implements OnChanges {

    incomesStatTitlesMap = {
        '_sum':'Total Revenue',
        '_avg':'Average Order Value',
        '_count':'Total Orders'
    };

    @Input()
    selectedYear!: number;

    incomesStat: IncomesStat[] = [];



    constructor(private _statsService: StatsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedYear'].currentValue) {
            this.getStatsByYear();
        }

    }


    getStatsByYear() {
        this._statsService.getOrderStatsByYear(this.selectedYear)
            .subscribe(({ incomesStats }) => this.incomesStat = incomesStats);

    }
}