import { NgModule } from '@angular/core';
import { ExecutedOrderRoutingModule } from './executed-order-routing.module';
import { CommonModule } from '@angular/common';
import { ExecutedOrderComponent } from './pages/executed-order.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { PurchasedFurnituresCardComponent } from './components/purchased-furnitures-card/purchased-furnitures-card.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { ModalReviewComponent } from './components/modal-review/modal-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectStarDirective } from './directives/select-star.directive';
import { SharedMainModule } from '../../shared/shared.module';



@NgModule({
    imports: [
        ExecutedOrderRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        SharedMainModule
    ],
    declarations: [
        ExecutedOrderComponent,
        OrderCardComponent,
        PurchasedFurnituresCardComponent,
        OrderSummaryComponent,
        CustomerInformationComponent,
        ModalReviewComponent,

        SelectStarDirective
    ]
})
export class ExecutedOrderModule { }
