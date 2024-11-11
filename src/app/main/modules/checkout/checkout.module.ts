import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './pages/checkout.component';
import { SharedMainModule } from '../../shared/shared.module';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { FormNamesComponent } from './components/form-names/form-names.component';
import { FormAddressComponent } from './components/form-address/form-address.component';
import { FormContactComponent } from './components/form-contact/form-contact.component';

@NgModule({
    imports: [
        SharedMainModule,
        CheckoutRoutingModule
    ],
    declarations: [
        CheckoutComponent,

        CardPaymentComponent,
        FormNamesComponent,
        FormAddressComponent,
        FormContactComponent
    ],

})
export class CheckoutModule { }
