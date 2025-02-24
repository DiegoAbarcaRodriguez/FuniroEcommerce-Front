import { NgModule } from '@angular/core';
import { ProductComponent } from './pages/product.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedMainModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedMainModule,
        ProductRoutingModule,
        FormsModule,
        SharedModule
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
