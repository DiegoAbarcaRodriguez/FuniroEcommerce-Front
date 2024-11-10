import { NgModule } from '@angular/core';
import { ShopComponent } from './pages/shop.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainModule } from '../../main.module';
import { NavbarFilterComponent } from './components/navbar-filter/navbar-filter.component';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MainModule,
        ShopRoutingModule
    ],
    exports: [],
    declarations: [
        NavbarFilterComponent,

        ShopComponent
    ],
    providers: [],
})
export class ShopModule { }
