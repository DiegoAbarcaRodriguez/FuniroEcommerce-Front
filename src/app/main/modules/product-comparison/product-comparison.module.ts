import { NgModule } from '@angular/core';


import { ProductComparisonComponent } from './pages/product-comparison.component';
import { ProductComparisonRoutingModule } from './product-comparison-routing.module';
import { SharedMainModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedMainModule,
        ProductComparisonRoutingModule
    ],
    exports: [],
    declarations: [ProductComparisonComponent],
    providers: [],
})
export class ProductComparisonModule { }
