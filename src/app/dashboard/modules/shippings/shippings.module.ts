import { NgModule } from '@angular/core';
import { TableShippingComponent } from './components/table-shippings/table-shippings.component';
import { CommonModule } from '@angular/common';
import { ShippingsRoutingModule } from './shippings-routing.module';
import { DashBoardShippingComponent } from './pages/dashboard-shippings.component';
import { SharedModule } from "../../../shared/shared.module";
import { DashboardModule } from '../../dashboard.module';
import { OrdersFiltererComponent } from './components/orders-filterer/orders-filterer.component';


@NgModule({
    imports: [
        CommonModule,
        ShippingsRoutingModule,
        SharedModule,
        DashboardModule
    ],
    declarations: [
        TableShippingComponent,
        DashBoardShippingComponent,
        OrdersFiltererComponent
    ],

})
export class ShippingsModule { }
