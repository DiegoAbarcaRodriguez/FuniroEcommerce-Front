import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './pages/checkout.component';
import { SharedMainModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedMainModule,
        CheckoutRoutingModule
    ],
    declarations: [CheckoutComponent],

})
export class CheckoutModule { }
