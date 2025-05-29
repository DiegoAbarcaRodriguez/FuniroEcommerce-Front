import { NgModule } from '@angular/core';


import { ChartComponent } from './components/chart/chart.component';
import { CommonModule } from '@angular/common';
import { IncomesComponent } from './pages/incomes/incomes.component';
import { StatsCardComponent } from './components/stats-cards/stats-cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomesRoutingModule } from './incomes-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IncomesRoutingModule
    ],
    exports: [],
    declarations: [
        ChartComponent,
        IncomesComponent,
        StatsCardComponent
    ],
    providers: [],
})
export class IncomesModule { }
