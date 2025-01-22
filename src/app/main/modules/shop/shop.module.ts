import { NgModule } from '@angular/core';
import { ShopComponent } from './pages/shop.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarFilterComponent } from './components/navbar-filter/navbar-filter.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedMainModule } from '../../shared/shared.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedMainModule,
        SharedModule,
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
