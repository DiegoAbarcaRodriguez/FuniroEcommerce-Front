import { NgModule } from '@angular/core';
import { MainModule } from '../../main.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './pages/checkout.component';

@NgModule({
    imports: [
        MainModule,
        CheckoutRoutingModule
    ],
    declarations: [CheckoutComponent],

})
export class CheckoutModule { }
