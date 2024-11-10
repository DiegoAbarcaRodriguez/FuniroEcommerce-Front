import { NgModule } from '@angular/core';
import { ProductComponent } from './pages/product.component';
import { MainModule } from '../../main.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MainModule,
        ProductRoutingModule
    ],
    exports: [],
    declarations: [
        BreadcrumbComponent,
        ProductCardComponent,
        ProductInformationComponent,

        ProductComponent
    ],
    providers: [],
})
export class ProductModule { }
