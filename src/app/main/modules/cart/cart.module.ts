import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './pages/cart.component';
import { SharedMainModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedMainModule,
        CartRoutingModule
    ],
    declarations: [CartComponent],

})
export class CartModule { }
