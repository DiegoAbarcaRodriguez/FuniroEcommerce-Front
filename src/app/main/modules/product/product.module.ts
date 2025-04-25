import { NgModule } from '@angular/core';
import { ProductComponent } from './pages/product.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedMainModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalComponent } from './components/modal/modal.component';
import { SelectStarDirective } from './directives/select-star.directive';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedMainModule,
        ProductRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        BreadcrumbComponent,
        ProductCardComponent,
        ProductInformationComponent,
        ModalComponent,

        ProductComponent,

        SelectStarDirective
    ],
    providers: [],
})
export class ProductModule { }
