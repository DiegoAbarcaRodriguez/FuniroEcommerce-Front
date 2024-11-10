import { NgModule } from '@angular/core';


import { ProductComparisonComponent } from './pages/product-comparison.component';
import { MainModule } from '../../main.module';
import { ProductComparisonRoutingModule } from './product-comparison-routing.module';

@NgModule({
    imports: [
        MainModule,
        ProductComparisonRoutingModule
    ],
    exports: [],
    declarations: [ProductComparisonComponent],
    providers: [],
})
export class ProductComparisonModule { }
