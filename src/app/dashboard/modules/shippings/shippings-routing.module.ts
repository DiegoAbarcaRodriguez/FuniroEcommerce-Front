import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardShippingComponent } from './pages/dashboard-shippings.component';

const routes: Routes = [
    {
        path: '',
        component: DashBoardShippingComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ShippingsRoutingModule { }
