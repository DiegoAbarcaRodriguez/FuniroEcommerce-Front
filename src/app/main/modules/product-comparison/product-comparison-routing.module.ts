import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { ProductComparisonComponent } from './pages/product-comparison.component';

const routes: Routes = [
    {
        path: '',
        component: ProductComparisonComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class ProductComparisonRoutingModule { }
