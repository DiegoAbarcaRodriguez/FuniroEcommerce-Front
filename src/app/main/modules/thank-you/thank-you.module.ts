import { NgModule } from '@angular/core';
import { ThankyouRoutingModule } from './thank-you-routing.module';
import { CommonModule } from '@angular/common';
import { ThankyouComponent } from './pages/thank-you.component';


@NgModule({
    imports: [
        ThankyouRoutingModule,
        CommonModule
    ],
    declarations: [ThankyouComponent],
})
export class ThankyouModule { }
