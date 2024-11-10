import { NgModule } from '@angular/core';

import { MainModule } from '../../main.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './pages/cart.component';

@NgModule({
    imports: [
        MainModule,
        CartRoutingModule
    ],
    declarations: [CartComponent],

})
export class CartModule { }
