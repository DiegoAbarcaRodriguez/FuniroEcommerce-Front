import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutedOrderComponent } from './pages/executed-order.component';

const routes: Routes = [
    {
        path: ':id',
        component: ExecutedOrderComponent
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
export class ExecutedOrderRoutingModule { }
