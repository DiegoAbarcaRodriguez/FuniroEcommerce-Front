import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import {
    Chart,
    Colors,
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Legend,
    Tooltip
} from 'chart.js'
import { StatsService } from '../../services/stats.service';

Chart.register(
    Colors,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip
);



@Component({
    selector: 'dashboard-incomes-chart-component',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})

export class ChartComponent implements OnChanges, AfterViewInit {

    @ViewChild('ctx')
    ctx?: ElementRef<HTMLCanvasElement>;

    @Input()
    selectedYear?: number;

    selectedPeriod: 'weekly' | 'monthly' | 'yearly' = 'weekly';

    months: string[] = [];
    weeksByYear: string[] = [];
    years: string[] = [];

    chartData: number[] = [];
    private chart?: Chart;

    constructor(private _statsService: StatsService) { }

    ngAfterViewInit(): void {
        this.uploadChartData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedYear'].currentValue) {
            this.uploadChartData();
        }

    }



    private uploadChartData() {

        this.chartData = [];
        this.years = [];
        this.months = [];
        this.weeksByYear = []

        switch (this.selectedPeriod) {
            case 'weekly':
                this._statsService.getTotalOrdersByWeek(this.selectedYear!)
                    .subscribe(totals => {
                        this.chartData = totals;
                        this.chartData.forEach((data, index) => this.weeksByYear.push(`${index} week`));

                        if (this.chart) {
                            this.chart.destroy();
                        }

                        this.generateBarChart(this.weeksByYear, this.chartData, 'Earnings By Week');
                    });


                break;
            case 'monthly':
                this._statsService.getTotalOrdersByMonth(this.selectedYear!)
                    .subscribe(totals => {
                        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        this.chartData = totals;
                        if (this.chart) {
                            this.chart.destroy();
                        }

                        this.generateBarChart(this.months, this.chartData, 'Earnings By Month');
                    });


                break;
            case 'yearly':
                this._statsService.getTotalOrdersByYear()
                    .subscribe(totals => {
                        totals.forEach(total => {
                            this.years.push(total.date_part.toString());
                            this.chartData.push(total.total);
                        });
                        if (this.chart) {
                            this.chart.destroy();
                        }

                        this.generateBarChart(this.years, this.chartData, 'Earnings By Year');
                    });
                break;
            default:
                throw new Error('Option not available');
                break;
        }
    }

    private generateBarChart(labels: string[], data: number[], label: string) {
        if (!this.ctx) return;

        this.chart = new Chart(
            this.ctx.nativeElement,
            {
                type: 'bar',

                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: label
                        }
                    },

                },

                data: {
                    labels,
                    datasets: [
                        {
                            label,
                            data
                        }
                    ]
                }
            }
        );

    }

    changePeriod(period: 'weekly' | 'monthly' | 'yearly') {
        this.selectedPeriod = period;
        this.uploadChartData();
    }



}