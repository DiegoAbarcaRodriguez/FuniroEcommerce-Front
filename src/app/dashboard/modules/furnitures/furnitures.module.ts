import { NgModule } from '@angular/core';
import { FurnituresRoutingModule } from './furnitures-routing.module';
import { DashboardFurnituresComponent } from './pages/dashboard-furnitures/dashboard-furnitures.component';
import { AddFurnitureComponent } from './pages/add-furniture/add-furniture.component';
import { TableFurnituresComponent } from './components/table-furnitures/table-furnitures.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrincipalFormComponent } from './components/principal-form/principal-form.component';
import { GeneralFormComponent } from './components/general-form/general-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DimensionFormComponent } from './components/dimension-form/dimension-form.component';
import { WarrantyFormComponent } from './components/warranty-form/warranty-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from "../../dashboard.module";



@NgModule({
    imports: [
    FurnituresRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardModule
],
    exports: [],
    declarations: [
        DashboardFurnituresComponent,
        AddFurnitureComponent,
        TableFurnituresComponent,
        PrincipalFormComponent,
        GeneralFormComponent,
        ProductFormComponent,
        DimensionFormComponent,
        WarrantyFormComponent
    ],
    providers: [],
})
export class FurnituresModule { }
