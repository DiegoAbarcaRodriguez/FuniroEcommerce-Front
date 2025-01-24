import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardFurnituresComponent } from './pages/dashboard-furnitures/dashboard-furnitures.component';
import { AddFurnitureComponent } from './pages/add-furniture/add-furniture.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardFurnituresComponent,
    },
    {
        path: 'add',
        component: AddFurnitureComponent
    },
    {
        path: 'add/:name',
        component: AddFurnitureComponent
    }, {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class FurnituresRoutingModule { }
