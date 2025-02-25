import { NgModule } from '@angular/core';
import { ProductComparisonComponent } from './pages/product-comparison.component';
import { ProductComparisonRoutingModule } from './product-comparison-routing.module';
import { SharedMainModule } from '../../shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { GeneralDescriptionComponent } from './components/general-description/general-description.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductDimensionsComponent } from './components/product-dimensions/product-dimensions.component';
import { ProductWarrantyComponent } from './components/product-warranty/product-warranty.component';
import { AddCartComponent } from './components/add-cart/add-cart.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        SharedMainModule,
        ProductComparisonRoutingModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        ProductComparisonComponent,
        ProductCardComponent,
        AddProductComponent,
        GeneralDescriptionComponent,
        ProductDescriptionComponent,
        ProductDimensionsComponent,
        ProductWarrantyComponent,
        AddCartComponent
    ],

})
export class ProductComparisonModule { }
