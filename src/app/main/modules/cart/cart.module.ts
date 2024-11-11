import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './pages/cart.component';
import { SharedMainModule } from '../../shared/shared.module';
import { SummaryComponent } from './components/summary-table/summary-table.component';
import { SummaryPricesComponent } from './components/summary-prices/summary-prices.component';

@NgModule({
    imports: [
        SharedMainModule,
        CartRoutingModule
    ],
    declarations: [
        CartComponent,
        SummaryComponent,
        SummaryPricesComponent
    ],

})
export class CartModule { }
