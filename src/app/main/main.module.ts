import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedMainModule } from './shared/shared.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
    imports: [
        MainRoutingModule,
        CommonModule,
        SharedMainModule
    ],
    declarations: [
        LayoutComponent,
    ]
})
export class MainModule { }
